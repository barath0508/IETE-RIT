import { GalleryItem } from '../data/siteConfig';

// Auto-discover all image files placed inside `src/assets/globe/`
const globeAssetModules: Record<string, any> = (import.meta as any).glob(
  '../assets/globe/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true }
);

/**
 * Formats image filenames like "energize-2026.jpg" or "my_photo_1.png"
 * into a clean title like "Energize 2026" or "My Photo 1"
 */
function formatTitleFromFilename(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const cleanName = nameWithoutExt.replace(/[-_]/g, ' ');
  return cleanName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Returns all image items automatically discovered inside `src/assets/globe/`
 */
export function getGlobeFolderImages(): GalleryItem[] {
  const items: GalleryItem[] = [];

  if (!globeAssetModules) return items;

  Object.entries(globeAssetModules).forEach(([filePath, moduleObj], idx) => {
    const filename = filePath.split('/').pop() || `photo-${idx}`;
    const title = formatTitleFromFilename(filename);
    const imageUrl = typeof moduleObj === 'string' ? moduleObj : (moduleObj?.default || '');

    if (imageUrl) {
      items.push({
        id: `globe-folder-img-${idx}-${filename}`,
        title: title,
        category: 'Workshop',
        date: 'IETE Gallery',
        image: imageUrl,
        description: `Photo loaded directly from the globe folder (${filename}).`,
      });
    }
  });

  return items;
}
