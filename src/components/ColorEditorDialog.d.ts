import { ChangeEvent } from 'react';
import { RgbaColor } from '../types';
interface ColorEditorDialogProps {
    color: string;
    hexValue: string;
    rgba: RgbaColor;
    target: 'stroke' | 'fill';
    onChannelChange: (channel: keyof RgbaColor, value: number) => void;
    onHexChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
}
export declare function ColorEditorDialog({ color, hexValue, rgba, target, onChannelChange, onHexChange, onClose }: ColorEditorDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
