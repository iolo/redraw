import { describe, expect, it } from 'vitest';
import { floodFill } from '../../src/utils/drawing';

const createImageData = () => {
  const pixels = new Uint8ClampedArray([
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 255, 0, 0, 255,
    255, 0, 0, 255, 255, 0, 0, 255
  ]);
  return new ImageData(pixels, 2, 3);
};

describe('floodFill', () => {
  it('fills matching connected pixels only', () => {
    const imageData = createImageData();
    const changed = floodFill(imageData, 0, 0, '#00ff00');

    expect(changed).toBe(true);
    expect(Array.from(imageData.data.slice(0, 8))).toEqual([0, 255, 0, 255, 0, 255, 0, 255]);
    expect(Array.from(imageData.data.slice(8, 16))).toEqual([0, 255, 0, 255, 255, 0, 0, 255]);
  });
});
