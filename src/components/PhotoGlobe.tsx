import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Globe, Pause, Play, ZoomIn, ZoomOut, RefreshCw, Sparkles, Info } from 'lucide-react';
import { SITE_CONFIG, GalleryItem } from '../data/siteConfig';
import { PhotoGlobeModal } from './PhotoGlobeModal';
import { getGlobeFolderImages } from '../utils/globeImages';
import { drawBlurhashToCanvas } from '../utils/blurhashHelper';

export const PhotoGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const meshesRef = useRef<{ mesh: THREE.Mesh; item: GalleryItem; origScale: THREE.Vector3 }[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction tracking state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; time?: number }>({ x: 0, y: 0 });
  const rotVelRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.002 });
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseVecRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Auto-discover images directly from folder src/assets/globe/
  const folderImages = useMemo(() => getGlobeFolderImages(), []);

  const filteredItems = useMemo(() => {
    const pool = folderImages.length > 0 ? folderImages : SITE_CONFIG.gallery;
    if (pool.length === 0) return [];

    // Dynamically adjust tile count: minimum 36 cards to keep sphere full, up to 100 images
    const targetCount = Math.max(36, Math.min(100, pool.length));
    return Array.from({ length: targetCount }, (_, i) => {
      const baseItem = pool[i % pool.length];
      return {
        ...baseItem,
        id: `${baseItem.id}-sphere-${i}`,
      };
    });
  }, [folderImages]);

  // Helper to draw a rounded photo card texture on canvas with instant BlurHash placeholder
  const createRoundedImageTexture = (imgUrl: string, blurHash?: string): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    if (!ctx) return texture;

    // Draw dark card background container
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.roundRect(0, 0, 512, 340, 28);
    ctx.fill();

    // 1. Draw instant BlurHash placeholder if available
    let hasBlur = false;
    if (blurHash) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 320, 20);
      ctx.clip();
      hasBlur = drawBlurhashToCanvas(ctx, blurHash, 10, 10, 492, 320, 32, 24);
      ctx.restore();
    }

    if (!hasBlur) {
      // Fallback placeholder pattern
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 320, 20);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('IETE Event', 256, 170);
    }

    // 2. Draw outer glow border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(10, 10, 492, 320, 20);
    ctx.stroke();
    texture.needsUpdate = true;

    // 3. Asynchronously load the optimized thumbnail image and update texture
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Clear container and draw full background
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.roundRect(0, 0, 512, 340, 28);
      ctx.fill();

      // Clip inner rounded image
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 320, 20);
      ctx.clip();

      const imgAspect = img.width / img.height;
      const targetAspect = 492 / 320;
      let renderW = 492;
      let renderH = 320;
      let offsetX = 10;
      let offsetY = 10;

      if (imgAspect > targetAspect) {
        renderW = 320 * imgAspect;
        offsetX = 10 - (renderW - 492) / 2;
      } else {
        renderH = 492 / imgAspect;
        offsetY = 10 - (renderH - 320) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      ctx.restore();

      // Outer glow border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 320, 20);
      ctx.stroke();

      texture.needsUpdate = true;
    };

    img.onerror = () => {
      // Keep the instant BlurHash placeholder texture intact
      texture.needsUpdate = true;
    };

    img.src = imgUrl;

    return texture;
  };

  // Build the 3D sphere scene
  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const width = mountNode.clientWidth;
    const height = mountNode.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent bg
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Group holding all photo cards
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // Create cards on Fibonacci sphere
    const radius = 6.2;
    const itemsCount = filteredItems.length;
    meshesRef.current = [];

    // Card dimensions ratio (aspect 1.5:1)
    const cardWidth = 1.4;
    const cardHeight = 0.93;
    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

    filteredItems.forEach((item, index) => {
      // Golden Spiral / Fibonacci sphere coordinates
      const phi = Math.acos(1 - (2 * (index + 0.5)) / itemsCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const cardPosition = new THREE.Vector3(x, y, z);

      // Card Material
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(cardPosition);

      // Make card face outwards from sphere center
      mesh.lookAt(cardPosition.clone().multiplyScalar(2));

      mesh.userData = { item, index };
      mainGroup.add(mesh);

      const origScale = mesh.scale.clone();
      meshesRef.current.push({ mesh, item, origScale });

      // Load rounded texture with immediate BlurHash and streaming thumbnail
      const thumbUrl = item.thumb || item.image;
      const texture = createRoundedImageTexture(thumbUrl, item.blurHash);
      material.map = texture;
      material.needsUpdate = true;
    });

    // Resize Handler
    const handleResize = () => {
      if (!mountNode || !cameraRef.current || !rendererRef.current) return;
      const newW = mountNode.clientWidth;
      const newH = mountNode.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (mainGroupRef.current) {
        // Friction & Spin inertia
        if (!isDraggingRef.current) {
          if (autoRotate) {
            rotVelRef.current.y = THREE.MathUtils.lerp(rotVelRef.current.y, 0.0025, 0.05);
          } else {
            rotVelRef.current.y *= 0.94;
          }
          rotVelRef.current.x *= 0.94;
        }

        mainGroupRef.current.rotation.y += rotVelRef.current.y;
        mainGroupRef.current.rotation.x += rotVelRef.current.x;

        // Clamp tilt along X axis to avoid upside down flip
        mainGroupRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, mainGroupRef.current.rotation.x));
      }

      // Raycasting hover check
      if (cameraRef.current && mainGroupRef.current && mouseVecRef.current.x !== -999) {
        raycasterRef.current.setFromCamera(mouseVecRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(
          meshesRef.current.map((m) => m.mesh)
        );

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object as THREE.Mesh;
          if (hoveredMeshRef.current !== hitMesh) {
            // Reset previous hovered mesh
            if (hoveredMeshRef.current) {
              const prevData = meshesRef.current.find((m) => m.mesh === hoveredMeshRef.current);
              if (prevData) prevData.mesh.scale.copy(prevData.origScale);
            }
            hoveredMeshRef.current = hitMesh;
            hitMesh.scale.set(1.2, 1.2, 1.2);
            setHoveredTitle((hitMesh.userData.item as GalleryItem).title);
          }
        } else {
          if (hoveredMeshRef.current) {
            const prevData = meshesRef.current.find((m) => m.mesh === hoveredMeshRef.current);
            if (prevData) prevData.mesh.scale.copy(prevData.origScale);
            hoveredMeshRef.current = null;
            setHoveredTitle(null);
          }
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (mountNode && rendererRef.current) {
        mountNode.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [filteredItems, autoRotate]);

  // Helper to handle selection via raycast from screen pixel coordinates
  const pickCardAt = (clientX: number, clientY: number) => {
    if (!mountRef.current || !cameraRef.current || !mainGroupRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
    const tapVec = new THREE.Vector2(ndcX, ndcY);

    raycasterRef.current.setFromCamera(tapVec, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(
      meshesRef.current.map((m) => m.mesh),
      false
    );

    if (intersects.length > 0) {
      // Find the closest card (front-most in view)
      const hitMesh = intersects[0].object as THREE.Mesh;
      const item = hitMesh.userData.item as GalleryItem;
      if (item) {
        setSelectedItem(item);
      }
    }
  };

  // Mouse & Touch Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    if (mountRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mountRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    if (!isDraggingRef.current) return;

    const distFromStart = Math.hypot(
      e.clientX - dragStartRef.current.x,
      e.clientY - dragStartRef.current.y
    );

    if (distFromStart > 12) {
      hasMovedRef.current = true;
    }

    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    rotVelRef.current.y = deltaX * 0.005;
    rotVelRef.current.x = deltaY * 0.005;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;

    const totalDist = Math.hypot(
      (e.clientX || dragStartRef.current.x) - dragStartRef.current.x,
      (e.clientY || dragStartRef.current.y) - dragStartRef.current.y
    );
    const duration = Date.now() - (dragStartRef.current.time || 0);

    // If tap/click with movement < 14px or quick duration without sustained drag
    if (!hasMovedRef.current || totalDist < 14 || duration < 350) {
      const clickX = e.clientX || dragStartRef.current.x;
      const clickY = e.clientY || dragStartRef.current.y;
      pickCardAt(clickX, clickY);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMovedRef.current) {
      pickCardAt(e.clientX, e.clientY);
    }
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
    mouseVecRef.current.set(-999, -999);
    setHoveredTitle(null);
  };

  // Zoom control
  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = THREE.MathUtils.clamp(
      cameraRef.current.position.z + delta,
      10,
      25
    );
  };

  // Reset sphere orientation
  const handleResetView = () => {
    if (!mainGroupRef.current || !cameraRef.current) return;
    mainGroupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.z = 16;
    rotVelRef.current = { x: 0, y: 0.002 };
  };

  // Modal Next/Prev navigation
  const handleSelectNext = () => {
    if (!selectedItem) return;
    const currentIdx = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
  };

  const handleSelectPrev = () => {
    if (!selectedItem) return;
    const currentIdx = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
  };

  return (
    <section id="photo-globe" className="py-20 bg-slate-950 text-white relative overflow-hidden select-none">
      
      {/* Background glow effects matching screenshot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800/60 shadow-lg mb-3">
            <Globe className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" />
            <span>Interactive 3D Experience</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            IETE 3D Memory Globe
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Drag to spin the 3D globe in any direction. Touch or click any photo tile to open an enlarged view.
          </p>
        </div>

        {/* Hovered Image Title Indicator */}
        <div className="h-8 flex items-center justify-center mb-2">
          {hoveredTitle ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs text-brand-accent font-semibold shadow-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>{hoveredTitle}</span>
            </motion.div>
          ) : (
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Hover over cards to see title • Tap to expand</span>
            </div>
          )}
        </div>

        {/* 3D Canvas Viewport */}
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className="w-full h-[380px] xs:h-[460px] sm:h-[620px] lg:h-[700px] cursor-grab active:cursor-grabbing rounded-3xl relative overflow-hidden bg-slate-950/40 border border-slate-800/80 shadow-2xl touch-none"
        >
          {/* Controls Bar Overlay inside Globe Canvas */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl">
            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium ${
                autoRotate ? 'bg-brand-blue/20 text-brand-blue' : 'text-slate-400 hover:text-white'
              }`}
              title={autoRotate ? 'Pause Rotation' : 'Start Rotation'}
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">{autoRotate ? 'Spinning' : 'Paused'}</span>
            </button>

            <div className="w-px h-4 bg-slate-800 mx-1" />

            {/* Zoom In */}
            <button
              onClick={() => handleZoom(-2)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={() => handleZoom(2)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <div className="w-px h-4 bg-slate-800 mx-1" />

            {/* Reset View */}
            <button
              onClick={handleResetView}
              className="p-2 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Reset Sphere"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

      </div>

      {/* Enlarged Photo Lightbox Modal */}
      <PhotoGlobeModal
        item={selectedItem}
        allItems={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />
    </section>
  );
};
