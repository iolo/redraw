interface ControlsPanelProps {
  strokeWidth: number;
  canUndo: boolean;
  canRedo: boolean;
  onStrokeWidthChange: (value: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'songrim__action-icon-svg',
  'aria-hidden': true
};

export function ControlsPanel({
  strokeWidth,
  canUndo,
  canRedo,
  onStrokeWidthChange,
  onUndo,
  onRedo,
  onClear
}: ControlsPanelProps) {
  return (
    <section className="songrim__panel songrim__controls" aria-labelledby="songrim-controls-title">
      <div className="songrim__panel-heading">
        <h2 id="songrim-controls-title" className="songrim__panel-title">
          Controls
        </h2>
      </div>
      <label className="songrim__field">
        <span>Stroke width</span>
        <input
          aria-label="Stroke width"
          type="range"
          min={1}
          max={48}
          value={strokeWidth}
          onChange={(event) => onStrokeWidthChange(Number(event.target.value))}
        />
      </label>
      <div className="songrim__actions">
        <button type="button" onClick={onUndo} disabled={!canUndo} aria-label="Undo">
          <span className="songrim__action-icon">
            <svg {...ICON_PROPS}>
              <path d="M9 7 5 11l4 4" />
              <path d="M5 11h8a5 5 0 1 1 0 10h-1" />
            </svg>
          </span>
        </button>
        <button type="button" onClick={onRedo} disabled={!canRedo} aria-label="Redo">
          <span className="songrim__action-icon">
            <svg {...ICON_PROPS}>
              <path d="m15 7 4 4-4 4" />
              <path d="M19 11h-8a5 5 0 1 0 0 10h1" />
            </svg>
          </span>
        </button>
        <button type="button" onClick={onClear} aria-label="Clear">
          <span className="songrim__action-icon">
            <svg {...ICON_PROPS}>
              <path d="M4 7h16" />
              <path d="M9 7V5h6v2" />
              <path d="m7 7 1 12h8l1-12" />
              <path d="M10 11v5M14 11v5" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
