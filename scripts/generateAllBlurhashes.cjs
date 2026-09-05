const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { encode } = require('blurhash');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function computeBlurHash(input) {
  try {
    const buffer = typeof input === 'string' ? fs.readFileSync(input) : input;
    const { data, info } = await sharp(buffer)
      .rotate()
      .resize(32, 24, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);
  } catch (err) {
    return null;
  }
}

async function run() {
  console.log('--- Generating BlurHashes & Optimizing Images ---');

  // 1. Events images
  const eventsDir = path.join(PUBLIC_DIR, 'images', 'events');
  const eventFiles = fs.readdirSync(eventsDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });

  const eventHashes = {};
  for (const file of eventFiles) {
    const fullPath = path.join(eventsDir, file);
    const hash = await computeBlurHash(fullPath);
    if (!hash) {
      console.warn(`[SKIP] Invalid image file: ${file}`);
      continue;
    }
    eventHashes[file] = hash;
    console.log(`Event [${file}] => ${hash}`);

    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const base = path.basename(file, ext);
      const webpPath = path.join(eventsDir, `${base}.webp`);
      if (!fs.existsSync(webpPath)) {
        await sharp(fullPath)
          .rotate()
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80, effort: 4 })
          .toFile(webpPath);
        const webpHash = await computeBlurHash(webpPath);
        eventHashes[`${base}.webp`] = webpHash;
        console.log(`  -> Generated WebP: ${base}.webp => ${webpHash}`);
      }
    }
  }

  // 2. Members images
  const membersDir = path.join(PUBLIC_DIR, 'images', 'members');
  const memberFiles = fs.readdirSync(membersDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });

  const memberHashes = {};
  for (const file of memberFiles) {
    const fullPath = path.join(membersDir, file);
    const hash = await computeBlurHash(fullPath);
    if (!hash) continue;
    memberHashes[file] = hash;

    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      let cleanBase = path.basename(file, ext).replace(/\s*\(\d+\)/g, '').trim().toLowerCase();
      const webpPath = path.join(membersDir, `${cleanBase}.webp`);
      if (!fs.existsSync(webpPath)) {
        await sharp(fullPath)
          .rotate()
          .resize({ width: 600, height: 800, fit: 'cover', position: 'top' })
          .webp({ quality: 82, effort: 4 })
          .toFile(webpPath);
      }
      const webpHash = await computeBlurHash(webpPath);
      memberHashes[`${cleanBase}.webp`] = webpHash;
      console.log(`Member [${file}] => ${hash} | WebP: ${cleanBase}.webp => ${webpHash}`);
    }
  }

  // 3. Logos & Emblems
  const logoTargets = [
    'iete-logo.png',
    'rit-logo.png',
    'images/iete-isf-rit-emblem.png',
  ];

  const logoHashes = {};
  for (const rel of logoTargets) {
    const fullPath = path.join(PUBLIC_DIR, rel);
    if (fs.existsSync(fullPath)) {
      const hash = await computeBlurHash(fullPath);
      logoHashes[rel] = hash;
      console.log(`Logo [${rel}] => ${hash}`);
    }
  }

  const manifest = {
    events: eventHashes,
    members: memberHashes,
    logos: logoHashes
  };

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'imageBlurHashes.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\nSaved BlurHash manifest to: ${outputPath}`);
}

run().catch(console.error);
