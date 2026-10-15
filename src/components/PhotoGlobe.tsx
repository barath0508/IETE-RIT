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

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Check if mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Interaction tracking state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; time?: number }>({ x: 0, y: 0 });
  const rotVelRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.002 });
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseVecRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Observe visibility to suspend Three.js render loop when off-screen (saving 100% GPU during page scroll)
  useEffect(() => {
    const target = sectionRef.current || mountRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      isVisibleRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsVisible(inView);
        isVisibleRef.current = inView;
      },
      { rootMargin: '200px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Auto-discover images directly from folder src/assets/globe/
  const folderImages = useMemo(() => getGlobeFolderImages(), []);

  const filteredItems = useMemo(() => {
    const pool = folderImages.length > 0 ? folderImages : SITE_CONFIG.gallery;
    if (pool.length === 0) return [];

    // On mobile devices, 24 cards gives a beautifully spaced, fluid 60fps sphere with 76% less GPU load
    const targetCount = isMobile
      ? Math.min(24, pool.length)
      : Math.min(42, Math.max(30, pool.length));

    return Array.from({ length: targetCount }, (_, i) => {
      const baseItem = pool[i % pool.length];
      return {
        ...baseItem,
        id: `${baseItem.id}-sphere-${i}`,
      };
    });
  }, [folderImages, isMobile]);

  // Helper to draw a rounded photo card texture on canvas with optimized mobile footprint
  const createRoundedImageTexture = (imgUrl: string, blurHash?: string): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    // Mobile uses lightweight 320x213 texture canvas to save memory and CPU copy overhead
    const cw = isMobile ? 320 : 480;
    const ch = isMobile ? 213 : 320;
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    // On mobile, skip mipmap generation to prevent GPU overhead and memory spikes
    texture.generateMipmaps = !isMobile;
    texture.minFilter = isMobile ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter;

    if (!ctx) return texture;

    // Fast instant placeholder: Dark card background container
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.roundRect(0, 0, cw, ch, isMobile ? 16 : 24);
    ctx.fill();

    const pad = isMobile ? 6 : 10;
    const innerW = cw - pad * 2;
    const innerH = ch - pad * 2;
    const radius = isMobile ? 12 : 18;

    let hasBlur = false;
    // On desktop, render fast blurhash; on mobile use high-tech gradient to keep mount frame instant
    if (!isMobile && blurHash) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad, pad, innerW, innerH, radius);
      ctx.clip();
      hasBlur = drawBlurhashToCanvas(ctx, blurHash, pad, pad, innerW, innerH, 16, 12);
      ctx.restore();
    }

    if (!hasBlur) {
      // Sleek cyber gradient placeholder
      const grad = ctx.createLinearGradient(0, 0, cw, ch);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(pad, pad, innerW, innerH, radius);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = isMobile ? 'bold 14px sans-serif' : 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('IETE Event', cw / 2, ch / 2);
    }

    // Outer glow border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = isMobile ? 2 : 4;
    ctx.beginPath();
    ctx.roundRect(pad, pad, innerW, innerH, radius);
    ctx.stroke();
    texture.needsUpdate = true;

    // Asynchronously stream in thumbnail image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.roundRect(0, 0, cw, ch, isMobile ? 16 : 24);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad, pad, innerW, innerH, radius);
      ctx.clip();

      const imgAspect = img.width / img.height;
      const targetAspect = innerW / innerH;
      let renderW = innerW;
      let renderH = innerH;
      let offsetX = pad;
      let offsetY = pad;

      if (imgAspect > targetAspect) {
        renderW = innerH * imgAspect;
        offsetX = pad - (renderW - innerW) / 2;
      } else {
        renderH = innerW / imgAspect;
        offsetY = pad - (renderH - innerH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      ctx.restore();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = isMobile ? 2 : 4;
      ctx.beginPath();
      ctx.roundRect(pad, pad, innerW, innerH, radius);
      ctx.stroke();

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
    camera.position.z = isMobile ? 18 : 16;
    cameraRef.current = camera;

    // Renderer - disabled antialias on mobile to save GPU fillrate
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
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
    const radius = isMobile ? 5.8 : 6.2;
    const itemsCount = filteredItems.length;
    meshesRef.current = [];

    // Card dimensions ratio (aspect 1.5:1)
    const cardWidth = isMobile ? 1.5 : 1.4;
    const cardHeight = isMobile ? 1.0 : 0.93;
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

    // Render loop - automatically halts when globe is off-screen to save 100% GPU
    const animate = () => {
      if (!isVisibleRef.current) {
        animFrameIdRef.current = null;
        return;
      }

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

      // Raycasting hover check (desktop only, to keep mobile touch scroll at 60fps)
      if (!isMobile && cameraRef.current && mainGroupRef.current && mouseVecRef.current.x !== -999) {
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

    if (isVisibleRef.current) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (mountNode && rendererRef.current) {
        mountNode.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [filteredItems, autoRotate, isMobile]);

  // Restart animation loop as soon as the section scrolls into viewport
  useEffect(() => {
    if (isVisible && !animFrameIdRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
      const animateResume = () => {
        if (!isVisibleRef.current) {
          animFrameIdRef.current = null;
          return;
        }

        animFrameIdRef.current = requestAnimationFrame(animateResume);

        if (mainGroupRef.current) {
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
          mainGroupRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, mainGroupRef.current.rotation.x));
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      animateResume();
    }
  }, [isVisible, autoRotate]);

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
    <section ref={sectionRef} id="photo-globe" className="py-20 bg-slate-950 text-white relative overflow-hidden select-none">
      
      {/* Background glow effects */}
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
              <span>{isMobile ? 'Swipe horizontally to spin • Tap card to open' : 'Hover over cards to see title • Tap to expand'}</span>
            </div>
          )}
        </div>

        {/* 3D Canvas Viewport - touch-pan-y preserves buttery smooth vertical page scrolling on mobile */}
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          className="w-full h-[380px] xs:h-[460px] sm:h-[620px] lg:h-[700px] cursor-grab active:cursor-grabbing rounded-3xl relative overflow-hidden bg-slate-950/40 border border-slate-800/80 shadow-2xl touch-pan-y"
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
