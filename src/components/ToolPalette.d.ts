import { Tool } from '../types';
interface ToolPaletteProps {
    activeTool: Tool;
    onToolChange: (tool: Tool) => void;
    tools: Tool[];
}
export declare function ToolPalette({ activeTool, onToolChange, tools }: ToolPaletteProps): import("react/jsx-runtime").JSX.Element;
export {};
