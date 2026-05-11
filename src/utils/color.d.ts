import { RgbaColor } from '../types';
export declare const normalizeHex: (value: string) => string;
export declare const parseColor: (value: string) => RgbaColor;
export declare const rgbaToString: ({ r, g, b, a }: RgbaColor) => string;
export declare const rgbaToHex: ({ r, g, b }: RgbaColor) => string;
export declare const toSliderState: (value: string) => RgbaColor;
export declare const samePixel: (a: Uint8ClampedArray | number[], b: Uint8ClampedArray | number[]) => boolean;
