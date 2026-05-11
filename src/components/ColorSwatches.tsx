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
    <section className="songrim__panel songrim__palette" aria-labelledby="songrim-palette-title">
      <div className="songrim__panel-heading">
        <h2 id="songrim-palette-title" className="songrim__panel-title">
          Palette
        </h2>
        <span className="songrim__panel-meta">Editing {activeTarget}</span>
      </div>
      <div className="songrim__swatches" role="grid" aria-label="Color swatches">
        {swatches.map((swatch, index) => (
          <button
            key={`${swatch}-${index}`}
            type="button"
            role="gridcell"
            aria-label={`Swatch ${swatch}`}
            className="songrim__swatch"
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
