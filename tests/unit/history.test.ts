import { describe, expect, it } from 'vitest';
import { HistoryStack } from '../../src/utils/history';

const createSnapshot = (backgroundColor: string) => ({
  imageData: new ImageData(new Uint8ClampedArray(4), 1, 1),
  backgroundColor
});

describe('HistoryStack', () => {
  it('tracks undo and redo boundaries', () => {
    const history = new HistoryStack(3);
    history.push(createSnapshot('#000000'));
    history.push(createSnapshot('#111111'));
    history.push(createSnapshot('#222222'));

    expect(history.canUndo()).toBe(true);
    expect(history.undo()?.backgroundColor).toBe('#111111');
    expect(history.redo()?.backgroundColor).toBe('#222222');
  });

  it('drops the oldest snapshot at the limit', () => {
    const history = new HistoryStack(2);
    history.push(createSnapshot('#000000'));
    history.push(createSnapshot('#111111'));
    history.push(createSnapshot('#222222'));

    expect(history.undo()?.backgroundColor).toBe('#111111');
    expect(history.undo()).toBeNull();
  });
});
