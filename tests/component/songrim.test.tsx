import { createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SonGrim } from '../../src/SonGrim';
import type { SonGrimRef } from '../../src/types';

describe('SonGrim', () => {
  it('renders the toolbar and canvas layers', () => {
    render(<SonGrim width={320} height={180} />);

    expect(screen.getByText('Tool')).toBeTruthy();
    expect(screen.getByLabelText('Stroke hex')).toBeTruthy();
    expect(document.querySelectorAll('canvas')).toHaveLength(3);
  });

  it('exposes imperative methods', async () => {
    const ref = createRef<SonGrimRef>();
    render(<SonGrim ref={ref} />);

    expect(ref.current?.getDataUrl()).toContain('data:image/png');
    await expect(ref.current?.setDataUrl('')).resolves.toBeUndefined();
    expect(typeof ref.current?.undo).toBe('function');
    expect(typeof ref.current?.redo).toBe('function');
  });

  it('fires onChange after clear', async () => {
    const onChange = vi.fn();
    render(<SonGrim onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});
