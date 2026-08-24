const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const convert = require('heic-convert');
const { encode } = require('blurhash');

const INPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'globe');
const OUTPUT_MAIN_DIR = path.join(INPUT_DIR, 'optimized');
const OUTPUT_THUMB_DIR = path.join(OUTPUT_MAIN_DIR, 'thumbs');
const MANIFEST_FILE = path.join(__dirname, '..', 'src', 'data', 'globeManifest.ts');

if (!fs.existsSync(OUTPUT_MAIN_DIR)) {
  fs.mkdirSync(OUTPUT_MAIN_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_THUMB_DIR)) {
  fs.mkdirSync(OUTPUT_THUMB_DIR, { recursive: true });
}

function cleanFilename(name) {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
}

function formatTitle(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const cleanName = nameWithoutExt.replace(/[-_]/g, ' ').replace(/\(\d+\)/g, '').trim();
  
  if (/^IMG[_-]?\d+/i.test(cleanName) || /^PXL[_-]?\d+/i.test(cleanName)) {
    return `ISF Event Memory ${cleanName.replace(/^(IMG|PXL)[_-]?/i, '').slice(0, 10)}`;
  }
  
  return cleanName
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('hack') || lower.includes('competition') || lower.includes('contest')) return 'Competition';
  if (lower.includes('seminar') || lower.includes('pathway') || lower.includes('talk')) return 'Seminar';
  if (lower.includes('visit') || lower.includes('industrial')) return 'Industrial Visit';
  if (lower.includes('energize') || lower.includes('skill') || lower.includes('workshop')) return 'Workshop';
  return 'Workshop';
}

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) {
    return null;
  }

  const filePath = path.join(INPUT_DIR, file);
  const baseName = cleanFilename(file);
  const title = formatTitle(file);
  const category = inferCategory(file);
  
  console.log(`Processing: ${file} -> ${baseName}...`);

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
    const mainWebpPath = path.join(OUTPUT_MAIN_DIR, `${baseName}.webp`);
    const thumbWebpPath = path.join(OUTPUT_THUMB_DIR, `${baseName}.webp`);

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
      id: `globe-${baseName}`,
      title: title,
      category: category,
      date: 'IETE Events',
      image: `/images/globe/optimized/${baseName}.webp`,
      thumb: `/images/globe/optimized/thumbs/${baseName}.webp`,
      blurHash: blurHash,
      aspectRatio: info.width / info.height,
      description: `Glimpse from IETE Student Forum interactive sessions and student activities.`,
    };
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
    return null;
  }
}

async function run() {
  const files = fs.readdirSync(INPUT_DIR).filter((f) => {
    const stat = fs.statSync(path.join(INPUT_DIR, f));
    return !stat.isDirectory();
  });

  const results = [];
  for (const file of files) {
    const item = await processImage(file);
    if (item) {
      results.push(item);
    }
  }

  const manifestContent = `export interface GlobeImageItem {
  id: string;
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
  console.log(`\nSuccessfully processed ${results.length} globe images!`);
  console.log(`Manifest written to: ${MANIFEST_FILE}`);
}

run().catch(console.error);
