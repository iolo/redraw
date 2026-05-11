import type { ReactElement } from 'react';
import type { Tool } from '../types';

const TOOL_LABELS: Record<Tool, string> = {
  pen: 'Pen',
  spray: 'Spray',
  eraser: 'Eraser',
  spoid: 'Picker',
  fill: 'Fill',
  line: 'Line',
  rectangle: 'Rect',
  circle: 'Ellipse'
};

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'songrim__tool-icon-svg',
  'aria-hidden': true
};

const TOOL_ICONS: Record<Tool, ReactElement> = {
  pen: (
    <svg {...ICON_PROPS}>
      <path d="M5 19l3.5-.8L18 8.7 15.3 6 5.8 15.5 5 19Z" />
      <path d="M13.9 7.4 16.6 10.1" />
    </svg>
  ),
  spray: (
    <svg {...ICON_PROPS}>
      <path d="M4 12a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M6 10V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4" />
      <path d="M10 7h1" />
      <path d="M15 7h.01M18 9h.01M18 5h.01M21 3h.01M21 7h.01M21 11h.01" />
    </svg>
  ),
  eraser: (
    <svg {...ICON_PROPS}>
      <path d="M8.2 7 4.5 10.7a2 2 0 0 0 0 2.8l2 2a2 2 0 0 0 2.8 0L13 11.8a2 2 0 0 0 0-2.8l-2-2a2 2 0 0 0-2.8 0Z" />
      <path d="M11 18h8" />
    </svg>
  ),
  spoid: (
    <svg {...ICON_PROPS}>
      <path d="M11 7 17 13" />
      <path d="M4 16 15.7 4.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L8 20H4v-4" />
    </svg>
  ),
  fill: (
    <svg {...ICON_PROPS}>
      <path d="M5 16l1.465 1.638a2 2 0 1 1-3.015.099L5 16" />
      <path d="M13.737 9.737c2.299-2.3 3.23-5.095 2.081-6.245-1.15-1.15-3.945-.217-6.244 2.082-2.3 2.299-3.231 5.095-2.082 6.244 1.15 1.15 3.946.218 6.245-2.081" />
      <path d="M7.492 11.818c.362.362.768.676 1.208.934l6.895 4.047c1.078.557 2.255-.075 3.692-1.512 1.437-1.437 2.07-2.614 1.512-3.692-.372-.718-1.72-3.017-4.047-6.895a6.015 6.015 0 0 0-.934-1.208" />
    </svg>
  ),
  line: (
    <svg {...ICON_PROPS}>
      <path d="M5 18 19 6" />
      <path d="M5 18h.01M19 6h.01" />
    </svg>
  ),
  rectangle: (
    <svg {...ICON_PROPS}>
      <rect x="5" y="7" width="14" height="10" rx="1" />
    </svg>
  ),
  circle: (
    <svg {...ICON_PROPS}>
      <ellipse cx="12" cy="12" rx="7" ry="5" />
    </svg>
  )
};

interface ToolPaletteProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  tools: Tool[];
}

export function ToolPalette({ activeTool, onToolChange, tools }: ToolPaletteProps) {
  return (
    <section className="songrim__panel songrim__tools" aria-labelledby="songrim-tools-title">
      <div className="songrim__panel-heading">
        <h2 id="songrim-tools-title" className="songrim__panel-title">
          Tools
        </h2>
      </div>
      <div className="songrim__tool-grid" role="radiogroup" aria-label="Tools">
        {tools.map((tool) => (
          <button
            key={tool}
            type="button"
            role="radio"
            aria-label={TOOL_LABELS[tool]}
            aria-checked={activeTool === tool}
            className="songrim__tool-button"
            data-active={activeTool === tool ? 'true' : 'false'}
            onClick={() => onToolChange(tool)}
          >
            <span className="songrim__tool-icon">{TOOL_ICONS[tool]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
