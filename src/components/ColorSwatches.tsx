interface ColorSwatchesProps {
  swatches: string[];
  activeTarget: 'stroke' | 'fill';
  activeColor: string;
  onSelectColor: (color: string) => void;
  onCustomizeColor: () => void;
}

export function ColorSwatches({
  swatches,
  activeTarget,
  activeColor,
  onSelectColor,
  onCustomizeColor
}: ColorSwatchesProps) {
  return (
    <section className="redraw__panel redraw__palette" aria-labelledby="redraw-palette-title">
      <div className="redraw__panel-heading">
        <h2 id="redraw-palette-title" className="redraw__panel-title">
          Palette
        </h2>
        <span className="redraw__panel-meta">Editing {activeTarget}</span>
      </div>
      <div className="redraw__swatches" role="grid" aria-label="Color swatches">
        {swatches.map((swatch, index) => (
          <button
            key={`${swatch}-${index}`}
            type="button"
            role="gridcell"
            aria-label={`Swatch ${swatch}`}
            className="redraw__swatch"
            data-selected={activeColor === swatch ? 'true' : 'false'}
            style={{ backgroundColor: swatch }}
            onClick={() => onSelectColor(swatch)}
            onDoubleClick={onCustomizeColor}
          />
        ))}
      </div>
    </section>
  );
}
