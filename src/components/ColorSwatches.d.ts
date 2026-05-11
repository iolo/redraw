interface ColorSwatchesProps {
    swatches: string[];
    activeTarget: 'stroke' | 'fill';
    activeColor: string;
    onSelectColor: (color: string) => void;
    onCustomizeColor: () => void;
}
export declare function ColorSwatches({ swatches, activeTarget, activeColor, onSelectColor, onCustomizeColor }: ColorSwatchesProps): import("react/jsx-runtime").JSX.Element;
export {};
