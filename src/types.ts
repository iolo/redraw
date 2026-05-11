export type Tool =
  | 'pen'
  | 'spray'
  | 'eraser'
  | 'spoid'
  | 'fill'
  | 'line'
  | 'rectangle'
  | 'circle';

export interface SonGrimProps {
  width?: number;
  height?: number;
  tool?: Tool;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  backgroundColor?: string;
  dataUrl?: string;
  onChange?: (dataUrl: string) => void;
}

export interface SonGrimRef {
  getDataUrl: () => string;
  setDataUrl: (dataUrl: string) => Promise<void>;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

export interface HistorySnapshot {
  imageData: ImageData;
  backgroundColor: string;
}

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}
