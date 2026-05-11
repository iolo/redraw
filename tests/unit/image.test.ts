import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadImage, saveImage } from '../../src/utils/image';

describe('image helpers', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loads a file as a data URL', async () => {
    FileReader.prototype.readAsDataURL = vi.fn(function (this: FileReader) {
      Object.defineProperty(this, 'result', {
        configurable: true,
        value: 'data:image/png;base64,test'
      });
      this.onload?.(new ProgressEvent('load'));
    });

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    await expect(loadImage(file)).resolves.toBe('data:image/png;base64,test');
  });

  it('triggers a browser download', () => {
    const click = vi.fn();
    const createElement = vi.spyOn(document, 'createElement').mockReturnValue({
      click,
      href: '',
      download: ''
    } as unknown as HTMLAnchorElement);

    saveImage('data:image/png;base64,test', 'drawing.png');

    expect(createElement).toHaveBeenCalledWith('a');
    expect(click).toHaveBeenCalled();
  });
});
