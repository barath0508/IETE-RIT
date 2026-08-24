const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const convert = require('heic-convert');
const { encode } = require('blurhash');

const INPUT_ROOT = path.join(__dirname, '..', 'public', 'images', 'globe');
const OUTPUT_ROOT = path.join(INPUT_ROOT, 'optimized');
const MANIFEST_FILE = path.join(__dirname, '..', 'src', 'data', 'globeManifest.ts');

const EVENT_METADATA = {
  'energize': {
    eventName: 'Energize 2026 Hackathon',
    category: 'Hackathon',
    date: 'April 21, 2026',
    description: 'Smart Energy Hackathon organized at 4th Floor Green Building, fostering sustainable technology prototypes.'
  },
  'vision-of-skill': {
    eventName: 'Vision of Skill 2026',
    category: 'Competition',
    date: 'July 20, 2026',
    description: 'Skill development and tech competition celebrating youth leadership and hands-on engineering.'
  },
  'higher-ed-pathways': {
    eventName: 'Higher Education & Career Pathways',
    category: 'Seminar',
    date: 'July 29, 2026',
    description: 'Expert guest lecture by Mr. Mohamed Razik on global academic opportunities, career roadmaps, and communication.'
  },
  'silicon-maze': {
    eventName: 'Silicon Maze 2026',
    category: 'Competition',
    date: 'August 13, 2026',
    description: 'Flagship 3-round technical & logical challenge: Silicon Cipher, Circuit Detective, and Mainframe Override.'
  },
  'technical-workshops': {
    eventName: 'Technical Workshop & Forum Sessions',
    category: 'Workshop',
    date: 'Academic Year 2026',
    description: 'Interactive hardware, microcontroller programming, and IETE ISF chapter student development activities.'
  }
};

function cleanFilename(name) {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
}

function formatTitle(folderKey, filename, index) {
  const meta = EVENT_METADATA[folderKey] || { eventName: 'IETE Event' };
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const cleanName = nameWithoutExt.replace(/[-_]/g, ' ').replace(/\(\d+\)/g, '').trim();

  if (/^(IMG|PXL)[_-]?\d+/i.test(cleanName)) {
    return `${meta.eventName} — Moment ${index + 1}`;
  }

  return cleanName
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function processImage(folderKey, file, index) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) {
    return null;
  }

  const folderMeta = EVENT_METADATA[folderKey] || {
    eventName: 'IETE Event',
    category: 'Workshop',
    date: '2026',
    description: 'IETE Student Forum technical event activities.'
  };

  const inputDir = path.join(INPUT_ROOT, folderKey);
  const filePath = path.join(inputDir, file);
  const baseName = cleanFilename(file);
  const title = formatTitle(folderKey, file, index);

  const outFolderDir = path.join(OUTPUT_ROOT, folderKey);
  const outThumbDir = path.join(outFolderDir, 'thumbs');

  if (!fs.existsSync(outFolderDir)) fs.mkdirSync(outFolderDir, { recursive: true });
  if (!fs.existsSync(outThumbDir)) fs.mkdirSync(outThumbDir, { recursive: true });

  const mainWebpPath = path.join(outFolderDir, `${baseName}.webp`);
  const thumbWebpPath = path.join(outThumbDir, `${baseName}.webp`);

  console.log(`Processing [${folderKey}]: ${file} -> ${baseName}.webp...`);

  let imageBuffer;
  if (ext === '.heic') {
    try {
      const inputBuffer = fs.readFileSync(filePath);
      imageBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.9,
      });
    } catch (err) {
      console.error(`Failed to convert HEIC ${file}:`, err.message);
      return null;
    }
  } else {
    imageBuffer = fs.readFileSync(filePath);
  }

  try {
    // 1. Generate optimized full preview (max width 1200, WebP quality 75)
    await sharp(imageBuffer)
      .rotate()
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 75, effort: 4 })
      .toFile(mainWebpPath);

    // 2. Generate small globe thumbnail (480x320, WebP quality 60)
    await sharp(imageBuffer)
      .rotate()
      .resize({ width: 480, height: 320, fit: 'cover' })
      .webp({ quality: 60, effort: 4 })
      .toFile(thumbWebpPath);

    // 3. Compute BlurHash using small 32x24 raw pixel buffer
    const { data, info } = await sharp(imageBuffer)
      .rotate()
      .resize(32, 24, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const blurHash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);

    return {
      id: `globe-${folderKey}-${baseName}`,
      eventFolder: folderKey,
      eventName: folderMeta.eventName,
      title: title,
      category: folderMeta.category,
      date: folderMeta.date,
      image: `/images/globe/optimized/${folderKey}/${baseName}.webp`,
      thumb: `/images/globe/optimized/${folderKey}/thumbs/${baseName}.webp`,
      blurHash: blurHash,
      aspectRatio: Number((info.width / info.height).toFixed(3)),
      description: folderMeta.description,
    };
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
    return null;
  }
}

async function run() {
  const folders = fs.readdirSync(INPUT_ROOT).filter((f) => {
    const stat = fs.statSync(path.join(INPUT_ROOT, f));
    return stat.isDirectory() && f !== 'optimized';
  });

  console.log(`Found event folders: ${folders.join(', ')}`);

  // Remove old flat optimized directory files
  if (fs.existsSync(OUTPUT_ROOT)) {
    fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true });
  }

  const results = [];
  for (const folder of folders) {
    const folderPath = path.join(INPUT_ROOT, folder);
    const files = fs.readdirSync(folderPath).filter((f) => {
      const stat = fs.statSync(path.join(folderPath, f));
      return !stat.isDirectory();
    });

    console.log(`Processing folder [${folder}] (${files.length} images)...`);
    for (let i = 0; i < files.length; i++) {
      const item = await processImage(folder, files[i], i);
      if (item) {
        results.push(item);
      }
    }
  }

  const manifestContent = `export interface GlobeImageItem {
  id: string;
  eventFolder?: string;
  eventName?: string;
  title: string;
  category: 'Workshop' | 'Seminar' | 'Hackathon' | 'Industrial Visit' | 'Competition';
  date: string;
  image: string;
  thumb: string;
  blurHash: string;
  aspectRatio: number;
  description: string;
}

export const GLOBE_IMAGES_DATA: GlobeImageItem[] = ${JSON.stringify(results, null, 2)};
`;

  fs.writeFileSync(MANIFEST_FILE, manifestContent, 'utf-8');
  console.log(`Successfully generated manifest with ${results.length} items across ${folders.length} event folders.`);
}

run().catch(console.error);
