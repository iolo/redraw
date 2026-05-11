interface ControlsPanelProps {
    strokeWidth: number;
    canUndo: boolean;
    canRedo: boolean;
    onStrokeWidthChange: (value: number) => void;
    onUndo: () => void;
    onRedo: () => void;
    onClear: () => void;
}
export declare function ControlsPanel({ strokeWidth, canUndo, canRedo, onStrokeWidthChange, onUndo, onRedo, onClear }: ControlsPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
