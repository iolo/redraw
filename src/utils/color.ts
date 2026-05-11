import type { RgbaColor } from '../types';

const HEX_PATTERN = /^#([\da-f]{3,8})$/i;
const RGB_PATTERN =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const normalizeHex = (value: string): string => {
  const match = value.trim().match(HEX_PATTERN);
  if (!match) {
    return '#000000';
  }

  const digits = match[1];
  if (digits.length === 3 || digits.length === 4) {
    const expanded = digits
      .split('')
      .map((digit) => digit + digit)
      .join('');
    return `#${expanded.slice(0, 6)}`;
  }

  return `#${digits.slice(0, 6)}`;
};

export const parseColor = (value: string): RgbaColor => {
  const trimmed = value.trim();
  const hexMatch = trimmed.match(HEX_PATTERN);

  if (hexMatch) {
    const digits = hexMatch[1];

    if (digits.length === 3 || digits.length === 4) {
      const [r, g, b, a = 'f'] = digits.split('').map((digit) => digit + digit);
      return {
        r: Number.parseInt(r, 16),
        g: Number.parseInt(g, 16),
        b: Number.parseInt(b, 16),
        a: Math.round((Number.parseInt(a, 16) / 255) * 255)
      };
    }

    if (digits.length === 6 || digits.length === 8) {
      const r = Number.parseInt(digits.slice(0, 2), 16);
      const g = Number.parseInt(digits.slice(2, 4), 16);
      const b = Number.parseInt(digits.slice(4, 6), 16);
      const alpha = digits.length === 8 ? Number.parseInt(digits.slice(6, 8), 16) : 255;
      return { r, g, b, a: alpha };
    }
  }

  const rgbMatch = trimmed.match(RGB_PATTERN);
  if (rgbMatch) {
    return {
      r: clamp(Number.parseInt(rgbMatch[1], 10), 0, 255),
      g: clamp(Number.parseInt(rgbMatch[2], 10), 0, 255),
      b: clamp(Number.parseInt(rgbMatch[3], 10), 0, 255),
      a: Math.round(clamp(rgbMatch[4] ? Number.parseFloat(rgbMatch[4]) : 1, 0, 1) * 255)
    };
  }

  return { r: 0, g: 0, b: 0, a: 255 };
};

export const rgbaToString = ({ r, g, b, a }: RgbaColor): string => {
  const normalizedAlpha = Math.round((a / 255) * 1000) / 1000;
  return `rgba(${clamp(r, 0, 255)}, ${clamp(g, 0, 255)}, ${clamp(b, 0, 255)}, ${normalizedAlpha})`;
};

export const rgbaToHex = ({ r, g, b }: RgbaColor): string => {
  const toHex = (value: number) => clamp(value, 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const toSliderState = (value: string): RgbaColor => parseColor(value);

export const samePixel = (a: Uint8ClampedArray | number[], b: Uint8ClampedArray | number[]) =>
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
