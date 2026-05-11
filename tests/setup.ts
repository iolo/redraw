import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

class MockImageData implements ImageData {
  colorSpace: PredefinedColorSpace = 'srgb';
  data: Uint8ClampedArray;
  height: number;
  width: number;

  constructor(data: Uint8ClampedArray, width: number, height: number) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
}

if (!globalThis.ImageData) {
  Object.assign(globalThis, { ImageData: MockImageData });
}

HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  drawImage: vi.fn(),
  getImageData: vi.fn(() => new ImageData(new Uint8ClampedArray(4 * 16), 4, 4)),
  putImageData: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  rect: vi.fn(),
  fill: vi.fn(),
  ellipse: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  fillStyle: '#000000',
  strokeStyle: '#000000',
  lineWidth: 1,
  lineCap: 'round',
  lineJoin: 'round',
  globalCompositeOperation: 'source-over'
})) as typeof HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,mocked');
