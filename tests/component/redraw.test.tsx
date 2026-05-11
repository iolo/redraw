import { createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Redraw } from '../../src/Redraw';
import type { RedrawRef } from '../../src/types';

describe('Redraw', () => {
  it('renders the paint-style controls and canvas layers', () => {
    render(<Redraw width={320} height={180} />);

    expect(screen.getByRole('heading', { name: 'Tools' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Stroke' })).toBeTruthy();
    expect(screen.getByLabelText('Color swatches')).toBeTruthy();
    expect(document.querySelectorAll('canvas')).toHaveLength(3);
  });

  it('opens the custom color dialog from the swatch palette', () => {
    render(<Redraw width={320} height={180} />);

    const firstSwatch = screen.getAllByRole('gridcell', { name: /Swatch/i })[0];
    fireEvent.doubleClick(firstSwatch);

    expect(screen.getByRole('dialog', { name: 'Custom stroke color' })).toBeTruthy();
    expect(screen.getByLabelText('Custom color hex')).toBeTruthy();
  });

  it('exposes imperative methods', async () => {
    const ref = createRef<RedrawRef>();
    render(<Redraw ref={ref} />);

    expect(ref.current?.getDataUrl()).toContain('data:image/png');
    await expect(ref.current?.setDataUrl('')).resolves.toBeUndefined();
    expect(typeof ref.current?.undo).toBe('function');
    expect(typeof ref.current?.redo).toBe('function');
  });

  it('fires onChange after clear', async () => {
    const onChange = vi.fn();
    render(<Redraw onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});
