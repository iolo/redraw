import type { ChangeEvent } from 'react';
import type { RgbaColor } from '../types';

interface ColorEditorDialogProps {
  color: string;
  hexValue: string;
  rgba: RgbaColor;
  target: 'stroke' | 'fill';
  onChannelChange: (channel: keyof RgbaColor, value: number) => void;
  onHexChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const CHANNELS: Array<keyof RgbaColor> = ['r', 'g', 'b', 'a'];

export function ColorEditorDialog({
  color,
  hexValue,
  rgba,
  target,
  onChannelChange,
  onHexChange,
  onClose
}: ColorEditorDialogProps) {
  return (
    <div className="redraw__dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="redraw__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="redraw-color-editor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="redraw__panel-heading">
          <h2 id="redraw-color-editor-title" className="redraw__panel-title">
            Custom {target} color
          </h2>
          <button type="button" className="redraw__dialog-close" onClick={onClose} aria-label="Close color editor">
            Close
          </button>
        </div>
        <div className="redraw__dialog-preview">
          <span className="redraw__dialog-preview-chip" style={{ backgroundColor: color }} />
          <input aria-label="Custom color hex" value={hexValue} onChange={onHexChange} />
        </div>
        <div className="redraw__sliders">
          {CHANNELS.map((channel) => (
            <label key={channel} className="redraw__slider">
              <span>{channel.toUpperCase()}</span>
              <input
                type="range"
                min={0}
                max={255}
                value={rgba[channel]}
                onChange={(event) => onChannelChange(channel, Number(event.target.value))}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
