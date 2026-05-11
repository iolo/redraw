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
    <div className="songrim__dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="songrim__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="songrim-color-editor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="songrim__panel-heading">
          <h2 id="songrim-color-editor-title" className="songrim__panel-title">
            Custom {target} color
          </h2>
          <button type="button" className="songrim__dialog-close" onClick={onClose} aria-label="Close color editor">
            Close
          </button>
        </div>
        <div className="songrim__dialog-preview">
          <span className="songrim__dialog-preview-chip" style={{ backgroundColor: color }} />
          <input aria-label="Custom color hex" value={hexValue} onChange={onHexChange} />
        </div>
        <div className="songrim__sliders">
          {CHANNELS.map((channel) => (
            <label key={channel} className="songrim__slider">
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
