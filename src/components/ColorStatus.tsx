interface ColorStatusProps {
  strokeColor: string;
  fillColor: string;
  activeTarget: 'stroke' | 'fill';
  onTargetChange: (target: 'stroke' | 'fill') => void;
  onSwap: () => void;
}

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'redraw__action-icon-svg',
  'aria-hidden': true
};

export function ColorStatus({
  strokeColor,
  fillColor,
  activeTarget,
  onTargetChange,
  onSwap
}: ColorStatusProps) {
  return (
    <section className="redraw__panel redraw__color-status" aria-labelledby="redraw-colors-title">
      <div className="redraw__panel-heading">
        <h2 id="redraw-colors-title" className="redraw__panel-title">
          Colors
        </h2>
        <button type="button" className="redraw__swap-button" onClick={onSwap} aria-label="Swap">
          <span className="redraw__action-icon">
            <svg {...ICON_PROPS}>
              <path d="M7 8h10" />
              <path d="m13 4 4 4-4 4" />
              <path d="M17 16H7" />
              <path d="m11 12-4 4 4 4" />
            </svg>
          </span>
        </button>
      </div>
      <div className="redraw__color-preview-stack">
        <button
          type="button"
          className="redraw__current-color"
          data-active={activeTarget === 'stroke' ? 'true' : 'false'}
          onClick={() => onTargetChange('stroke')}
          aria-pressed={activeTarget === 'stroke'}
        >
          <span className="redraw__current-color-chip" style={{ backgroundColor: strokeColor }} />
          <span className="redraw__current-color-label">Stroke</span>
        </button>
        <button
          type="button"
          className="redraw__current-color"
          data-active={activeTarget === 'fill' ? 'true' : 'false'}
          onClick={() => onTargetChange('fill')}
          aria-pressed={activeTarget === 'fill'}
        >
          <span className="redraw__current-color-chip" style={{ backgroundColor: fillColor }} />
          <span className="redraw__current-color-label">Fill</span>
        </button>
      </div>
    </section>
  );
}
