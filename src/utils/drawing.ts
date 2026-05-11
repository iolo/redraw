import type { HistorySnapshot, RgbaColor } from '../types';
import { parseColor, samePixel } from './color';

export const DEFAULT_SWATCHES = [
  '#101418',
  '#fafaf9',
  '#ff6b35',
  '#1f7a8c',
  '#2d6a4f',
  '#d90429',
  '#4361ee',
  '#f4a261'
];

export const createSnapshot = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  backgroundColor: string
): HistorySnapshot => ({
  imageData: ctx.getImageData(0, 0, width, height),
  backgroundColor
});

export const applySnapshot = (
  ctx: CanvasRenderingContext2D,
  snapshot: HistorySnapshot,
  backgroundCanvas: HTMLCanvasElement
) => {
  ctx.putImageData(snapshot.imageData, 0, 0);
  const backgroundCtx = backgroundCanvas.getContext('2d');
  if (backgroundCtx) {
    backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundCtx.fillStyle = snapshot.backgroundColor;
    backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  }
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string,
  width: number,
  erase = false
) => {
  ctx.save();
  ctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over';
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  strokeColor: string,
  strokeWidth: number,
  fillColor: string
) => {
  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.rect(startX, startY, width, height);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  strokeColor: string,
  strokeWidth: number,
  fillColor: string
) => {
  const centerX = startX + width / 2;
  const centerY = startY + height / 2;
  const radiusX = Math.abs(width / 2);
  const radiusY = Math.abs(height / 2);

  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export const drawSpray = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  const density = Math.max(12, Math.round(radius * 4));
  ctx.save();
  ctx.fillStyle = color;
  for (let index = 0; index < density; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    ctx.fillRect(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, 1.2, 1.2);
  }
  ctx.restore();
};

export const floodFill = (
  imageData: ImageData,
  x: number,
  y: number,
  fillColor: string
) => {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  const startX = Math.floor(x);
  const startY = Math.floor(y);

  if (startX < 0 || startX >= width || startY < 0 || startY >= height) {
    return false;
  }

  const color = parseColor(fillColor);
  const targetIndex = (startY * width + startX) * 4;
  const targetPixel = data.slice(targetIndex, targetIndex + 4);
  const replacementPixel = new Uint8ClampedArray([color.r, color.g, color.b, color.a]);

  if (samePixel(targetPixel, replacementPixel)) {
    return false;
  }

  const stack: Array<[number, number]> = [[startX, startY]];

  while (stack.length > 0) {
    const [currentX, currentY] = stack.pop() as [number, number];
    if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) {
      continue;
    }

    const index = (currentY * width + currentX) * 4;
    const currentPixel = data.slice(index, index + 4);
    if (!samePixel(currentPixel, targetPixel)) {
      continue;
    }

    data[index] = replacementPixel[0];
    data[index + 1] = replacementPixel[1];
    data[index + 2] = replacementPixel[2];
    data[index + 3] = replacementPixel[3];

    stack.push([currentX + 1, currentY]);
    stack.push([currentX - 1, currentY]);
    stack.push([currentX, currentY + 1]);
    stack.push([currentX, currentY - 1]);
  }

  return true;
};

export const rgbaFromCanvas = (ctx: CanvasRenderingContext2D, x: number, y: number): RgbaColor => {
  const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
  return { r: pixel[0], g: pixel[1], b: pixel[2], a: pixel[3] };
};

export const renderCompositeDataUrl = (
  drawingCanvas: HTMLCanvasElement,
  backgroundColor: string
): string => {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = drawingCanvas.width;
  exportCanvas.height = drawingCanvas.height;
  const exportCtx = exportCanvas.getContext('2d');
  if (!exportCtx) {
    return '';
  }

  exportCtx.fillStyle = backgroundColor;
  exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  exportCtx.drawImage(drawingCanvas, 0, 0);
  return exportCanvas.toDataURL('image/png');
};
