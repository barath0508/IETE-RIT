import { decode } from 'blurhash';

/**
 * Decodes a BlurHash string into an offscreen canvas and draws it scaled smoothly onto a target context.
 */
export function drawBlurhashToCanvas(
  ctx: CanvasRenderingContext2D,
  blurHash: string,
  targetX: number,
  targetY: number,
  targetWidth: number,
  targetHeight: number,
  decodeWidth = 32,
  decodeHeight = 24
): boolean {
  try {
    if (!blurHash || blurHash.length < 6) return false;
    const pixels = decode(blurHash, decodeWidth, decodeHeight);
    const offscreen = document.createElement('canvas');
    offscreen.width = decodeWidth;
    offscreen.height = decodeHeight;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return false;

    const imgData = offCtx.createImageData(decodeWidth, decodeHeight);
    imgData.data.set(pixels);
    offCtx.putImageData(imgData, 0, 0);

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(offscreen, targetX, targetY, targetWidth, targetHeight);
    ctx.restore();
    return true;
  } catch (err) {
    return false;
  }
}
