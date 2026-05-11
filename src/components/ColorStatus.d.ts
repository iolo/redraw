interface ColorStatusProps {
    strokeColor: string;
    fillColor: string;
    activeTarget: 'stroke' | 'fill';
    onTargetChange: (target: 'stroke' | 'fill') => void;
    onSwap: () => void;
}
export declare function ColorStatus({ strokeColor, fillColor, activeTarget, onTargetChange, onSwap }: ColorStatusProps): import("react/jsx-runtime").JSX.Element;
export {};
