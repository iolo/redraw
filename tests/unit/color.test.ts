import { describe, expect, it } from 'vitest';
import { normalizeHex, parseColor, rgbaToHex } from '../../src/utils/color';

describe('color utils', () => {
  it('normalizes short hex values', () => {
    expect(normalizeHex('#abc')).toBe('#aabbcc');
  });

  it('parses rgba strings', () => {
    expect(parseColor('rgba(10, 20, 30, 0.5)')).toEqual({
      r: 10,
      g: 20,
      b: 30,
      a: 128
    });
  });

  it('converts rgba to hex', () => {
    expect(rgbaToHex({ r: 255, g: 107, b: 53, a: 255 })).toBe('#ff6b35');
  });
});
