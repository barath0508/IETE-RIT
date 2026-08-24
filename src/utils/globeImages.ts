import { GalleryItem } from '../data/siteConfig';
import { GLOBE_IMAGES_DATA } from '../data/globeManifest';

/**
 * Returns all optimized globe image items with BlurHash and WebP thumbnails.
 */
export function getGlobeFolderImages(): GalleryItem[] {
  return GLOBE_IMAGES_DATA as GalleryItem[];
}

