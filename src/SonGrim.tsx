import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent as ReactPointerEvent } from 'react';
import './styles.css';
import { ColorEditorDialog } from './components/ColorEditorDialog';
import { ColorStatus } from './components/ColorStatus';
import { ColorSwatches } from './components/ColorSwatches';
import { ControlsPanel } from './components/ControlsPanel';
import { ToolPalette } from './components/ToolPalette';
import type { RgbaColor, SonGrimProps, SonGrimRef, Tool } from './types';
import { normalizeHex, rgbaToHex, rgbaToString, toSliderState } from './utils/color';
import {
  DEFAULT_SWATCHES,
  applySnapshot,
  createSnapshot,
  drawCircle,
  drawLine,
  drawRectangle,
  drawSpray,
  floodFill,
  renderCompositeDataUrl,
  rgbaFromCanvas
} from './utils/drawing';
import { HistoryStack } from './utils/history';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_STROKE_COLOR = '#101418';
const DEFAULT_FILL_COLOR = '#ff6b35';
const DEFAULT_BACKGROUND_COLOR = '#ffffff';

const TOOLS: Tool[] = ['pen', 'spray', 'eraser', 'spoid', 'fill', 'line', 'rectangle', 'circle'];

interface Point {
  x: number;
  y: number;
}

const getRelativePoint = (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
  const rect = event.currentTarget.getBoundingClientRect();
  const scaleX = event.currentTarget.width / rect.width;
  const scaleY = event.currentTarget.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
};

const syncBackground = (canvas: HTMLCanvasElement | null, backgroundColor: string) => {
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const createEmptyDrawing = (canvas: HTMLCanvasElement | null) => {
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const SonGrim = forwardRef<SonGrimRef, SonGrimProps>(function SonGrim(
  {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    tool = 'pen',
    strokeColor = DEFAULT_STROKE_COLOR,
    strokeWidth = 2,
    fillColor = DEFAULT_FILL_COLOR,
    backgroundColor = DEFAULT_BACKGROUND_COLOR,
    dataUrl = '',
    onChange
  },
  ref
) {
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef(new HistoryStack());
  const drawingSessionRef = useRef<{ pointerId: number; start: Point; previous: Point } | null>(null);
  const initializedRef = useRef(false);
  const skipNextDataUrlRef = useRef(dataUrl);

  const [currentTool, setCurrentTool] = useState<Tool>(tool);
  const [currentStrokeColor, setCurrentStrokeColor] = useState(strokeColor);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(strokeWidth);
  const [currentFillColor, setCurrentFillColor] = useState(fillColor);
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(backgroundColor);
  const [strokeRgba, setStrokeRgba] = useState<RgbaColor>(() => toSliderState(strokeColor));
  const [fillRgba, setFillRgba] = useState<RgbaColor>(() => toSliderState(fillColor));
  const [historyState, setHistoryState] = useState({ canUndo: false, canRedo: false });
  const [activeColorTarget, setActiveColorTarget] = useState<'stroke' | 'fill'>('stroke');
  const [isColorEditorOpen, setIsColorEditorOpen] = useState(false);

  const publishChange = (backgroundOverride?: string) => {
    const drawingCanvas = drawingCanvasRef.current;
    if (!drawingCanvas) {
      return '';
    }

    const nextDataUrl = renderCompositeDataUrl(
      drawingCanvas,
      backgroundOverride ?? currentBackgroundColor
    );
    skipNextDataUrlRef.current = nextDataUrl;
    onChange?.(nextDataUrl);
    return nextDataUrl;
  };

  const refreshHistoryState = () => {
    setHistoryState({
      canUndo: historyRef.current.canUndo(),
      canRedo: historyRef.current.canRedo()
    });
  };

  const pushHistory = (backgroundOverride?: string) => {
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    historyRef.current.push(
      createSnapshot(
        drawingCtx,
        drawingCanvas.width,
        drawingCanvas.height,
        backgroundOverride ?? currentBackgroundColor
      )
    );
    refreshHistoryState();
  };

  const restoreSnapshot = (kind: 'undo' | 'redo') => {
    const snapshot = kind === 'undo' ? historyRef.current.undo() : historyRef.current.redo();
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    const backgroundCanvas = backgroundCanvasRef.current;

    if (!snapshot || !drawingCtx || !backgroundCanvas) {
      return;
    }

    applySnapshot(drawingCtx, snapshot, backgroundCanvas);
    setCurrentBackgroundColor(snapshot.backgroundColor);
    refreshHistoryState();
    publishChange(snapshot.backgroundColor);
  };

  const clearPreview = () => {
    const previewCanvas = previewCanvasRef.current;
    const previewCtx = previewCanvas?.getContext('2d');
    if (!previewCanvas || !previewCtx) {
      return;
    }

    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  };

  const setColorState = (
    setter: (value: string) => void,
    rgbaSetter: (value: RgbaColor) => void,
    value: string
  ) => {
    setter(value);
    rgbaSetter(toSliderState(value));
  };

  const setColorForTarget = (target: 'stroke' | 'fill', value: string) => {
    if (target === 'stroke') {
      setColorState(setCurrentStrokeColor, setStrokeRgba, value);
      return;
    }

    setColorState(setCurrentFillColor, setFillRgba, value);
  };

  const swapColors = () => {
    const nextStroke = currentFillColor;
    const nextFill = currentStrokeColor;
    setColorState(setCurrentStrokeColor, setStrokeRgba, nextStroke);
    setColorState(setCurrentFillColor, setFillRgba, nextFill);
  };

  const loadDataUrl = async (nextDataUrl: string) => {
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    if (!nextDataUrl) {
      createEmptyDrawing(drawingCanvas);
      pushHistory();
      publishChange();
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        drawingCtx.drawImage(image, 0, 0, drawingCanvas.width, drawingCanvas.height);
        resolve();
      };
      image.onerror = () => reject(new Error('Unable to load data URL.'));
      image.src = nextDataUrl;
    });

    pushHistory();
    publishChange();
  };

  useEffect(() => {
    setCurrentTool(tool);
  }, [tool]);

  useEffect(() => {
    setColorState(setCurrentStrokeColor, setStrokeRgba, strokeColor);
  }, [strokeColor]);

  useEffect(() => {
    setCurrentStrokeWidth(strokeWidth);
  }, [strokeWidth]);

  useEffect(() => {
    setColorState(setCurrentFillColor, setFillRgba, fillColor);
  }, [fillColor]);

  useEffect(() => {
    setCurrentBackgroundColor(backgroundColor);
    syncBackground(backgroundCanvasRef.current, backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    syncBackground(backgroundCanvasRef.current, currentBackgroundColor);
  }, [currentBackgroundColor]);

  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }
    if (dataUrl === skipNextDataUrlRef.current) {
      return;
    }
    void loadDataUrl(dataUrl);
  }, [dataUrl]);

  useEffect(() => {
    const drawingCanvas = drawingCanvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    const backgroundCanvas = backgroundCanvasRef.current;
    if (!drawingCanvas || !previewCanvas || !backgroundCanvas) {
      return;
    }

    drawingCanvas.width = width;
    drawingCanvas.height = height;
    previewCanvas.width = width;
    previewCanvas.height = height;
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    syncBackground(backgroundCanvas, currentBackgroundColor);
    createEmptyDrawing(drawingCanvas);
    clearPreview();
    historyRef.current = new HistoryStack();
    pushHistory();
    initializedRef.current = true;
    if (dataUrl) {
      void loadDataUrl(dataUrl);
    } else {
      publishChange();
    }
  }, [width, height]);

  useImperativeHandle(
    ref,
    () => ({
      getDataUrl: () =>
        drawingCanvasRef.current ? renderCompositeDataUrl(drawingCanvasRef.current, currentBackgroundColor) : '',
      setDataUrl: async (nextDataUrl: string) => {
        await loadDataUrl(nextDataUrl);
      },
      undo: () => restoreSnapshot('undo'),
      redo: () => restoreSnapshot('redo'),
      clear: () => {
        createEmptyDrawing(drawingCanvasRef.current);
        pushHistory();
        publishChange();
      }
    }),
    [currentBackgroundColor]
  );

  const previewShape = (start: Point, current: Point) => {
    const previewCanvas = previewCanvasRef.current;
    const previewCtx = previewCanvas?.getContext('2d');
    if (!previewCanvas || !previewCtx) {
      return;
    }

    clearPreview();
    const widthDelta = current.x - start.x;
    const heightDelta = current.y - start.y;

    if (currentTool === 'line') {
      drawLine(previewCtx, start.x, start.y, current.x, current.y, currentStrokeColor, currentStrokeWidth);
      return;
    }

    const x = widthDelta < 0 ? current.x : start.x;
    const y = heightDelta < 0 ? current.y : start.y;
    const absWidth = Math.abs(widthDelta);
    const absHeight = Math.abs(heightDelta);

    if (currentTool === 'rectangle') {
      drawRectangle(
        previewCtx,
        x,
        y,
        absWidth,
        absHeight,
        currentStrokeColor,
        currentStrokeWidth,
        currentFillColor
      );
      return;
    }

    drawCircle(previewCtx, x, y, absWidth, absHeight, currentStrokeColor, currentStrokeWidth, currentFillColor);
  };

  const commitShape = (start: Point, end: Point) => {
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    const widthDelta = end.x - start.x;
    const heightDelta = end.y - start.y;
    if (currentTool === 'line') {
      drawLine(drawingCtx, start.x, start.y, end.x, end.y, currentStrokeColor, currentStrokeWidth);
    } else {
      const x = widthDelta < 0 ? end.x : start.x;
      const y = heightDelta < 0 ? end.y : start.y;
      const absWidth = Math.abs(widthDelta);
      const absHeight = Math.abs(heightDelta);

      if (currentTool === 'rectangle') {
        drawRectangle(
          drawingCtx,
          x,
          y,
          absWidth,
          absHeight,
          currentStrokeColor,
          currentStrokeWidth,
          currentFillColor
        );
      } else {
        drawCircle(drawingCtx, x, y, absWidth, absHeight, currentStrokeColor, currentStrokeWidth, currentFillColor);
      }
    }

    clearPreview();
    pushHistory();
    publishChange();
  };

  const sampleCompositeColor = (point: Point) => {
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    const sampled = rgbaFromCanvas(drawingCtx, point.x, point.y);
    const fallback = sampled.a === 0 ? toSliderState(currentBackgroundColor) : sampled;
    setColorForTarget(activeColorTarget, rgbaToString(fallback));
  };

  const applyFill = (point: Point) => {
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    const imageData = drawingCtx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);
    if (!floodFill(imageData, point.x, point.y, currentFillColor)) {
      return;
    }
    drawingCtx.putImageData(imageData, 0, 0);
    pushHistory();
    publishChange();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const point = getRelativePoint(event);
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    if (currentTool === 'spoid') {
      sampleCompositeColor(point);
      return;
    }

    if (currentTool === 'fill') {
      applyFill(point);
      return;
    }

    drawingSessionRef.current = {
      pointerId: event.pointerId,
      start: point,
      previous: point
    };

    event.currentTarget.setPointerCapture(event.pointerId);

    if (currentTool === 'pen') {
      drawLine(drawingCtx, point.x, point.y, point.x, point.y, currentStrokeColor, currentStrokeWidth);
      return;
    }

    if (currentTool === 'spray') {
      drawSpray(drawingCtx, point.x, point.y, currentStrokeWidth * 2, currentStrokeColor);
      return;
    }

    if (currentTool === 'eraser') {
      drawLine(drawingCtx, point.x, point.y, point.x, point.y, '#000000', currentStrokeWidth * 2, true);
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const session = drawingSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) {
      return;
    }

    const point = getRelativePoint(event);
    const drawingCanvas = drawingCanvasRef.current;
    const drawingCtx = drawingCanvas?.getContext('2d');
    if (!drawingCanvas || !drawingCtx) {
      return;
    }

    if (currentTool === 'pen') {
      drawLine(
        drawingCtx,
        session.previous.x,
        session.previous.y,
        point.x,
        point.y,
        currentStrokeColor,
        currentStrokeWidth
      );
    } else if (currentTool === 'spray') {
      drawSpray(drawingCtx, point.x, point.y, currentStrokeWidth * 2, currentStrokeColor);
    } else if (currentTool === 'eraser') {
      drawLine(
        drawingCtx,
        session.previous.x,
        session.previous.y,
        point.x,
        point.y,
        '#000000',
        currentStrokeWidth * 2,
        true
      );
    } else {
      previewShape(session.start, point);
    }

    session.previous = point;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const session = drawingSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) {
      return;
    }

    const point = getRelativePoint(event);
    if (currentTool === 'line' || currentTool === 'rectangle' || currentTool === 'circle') {
      commitShape(session.start, point);
    } else {
      pushHistory();
      publishChange();
    }

    drawingSessionRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const updateTargetFromHex = (event: ChangeEvent<HTMLInputElement>) => {
    setColorForTarget(activeColorTarget, normalizeHex(event.target.value));
  };

  const updateTargetFromSlider = (channel: keyof RgbaColor, value: number) => {
    const current = activeColorTarget === 'stroke' ? strokeRgba : fillRgba;
    const next = { ...current, [channel]: value };
    setColorForTarget(activeColorTarget, rgbaToString(next));
  };

  const currentActiveColor = activeColorTarget === 'stroke' ? currentStrokeColor : currentFillColor;
  const currentActiveRgba = activeColorTarget === 'stroke' ? strokeRgba : fillRgba;

  return (
    <div className="songrim">
      <div className="songrim__workspace">
        <aside className="songrim__sidebar">
          <ToolPalette activeTool={currentTool} onToolChange={setCurrentTool} tools={TOOLS} />
          <ControlsPanel
            strokeWidth={currentStrokeWidth}
            canUndo={historyState.canUndo}
            canRedo={historyState.canRedo}
            onStrokeWidthChange={setCurrentStrokeWidth}
            onUndo={() => restoreSnapshot('undo')}
            onRedo={() => restoreSnapshot('redo')}
            onClear={() => {
              createEmptyDrawing(drawingCanvasRef.current);
              pushHistory();
              publishChange();
            }}
          />
        </aside>

        <section className="songrim__main">
          <div className="songrim__stage-panel">
            <div className="songrim__stage" style={{ width, height }}>
              <canvas className="songrim__canvas songrim__canvas--background" ref={backgroundCanvasRef} />
              <canvas
                className="songrim__canvas songrim__canvas--drawing"
                ref={drawingCanvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              />
              <canvas className="songrim__canvas songrim__canvas--preview" ref={previewCanvasRef} />
            </div>
          </div>
        </section>

        <div className="songrim__footer">
          <ColorStatus
            strokeColor={currentStrokeColor}
            fillColor={currentFillColor}
            activeTarget={activeColorTarget}
            onTargetChange={setActiveColorTarget}
            onSwap={swapColors}
          />
          <ColorSwatches
            swatches={DEFAULT_SWATCHES}
            activeTarget={activeColorTarget}
            activeColor={rgbaToHex(currentActiveRgba)}
            onSelectColor={(swatch) => setColorForTarget(activeColorTarget, swatch)}
            onCustomizeColor={() => setIsColorEditorOpen(true)}
          />
        </div>
      </div>

      {isColorEditorOpen ? (
        <ColorEditorDialog
          color={currentActiveColor}
          hexValue={rgbaToHex(currentActiveRgba)}
          rgba={currentActiveRgba}
          target={activeColorTarget}
          onChannelChange={updateTargetFromSlider}
          onHexChange={updateTargetFromHex}
          onClose={() => setIsColorEditorOpen(false)}
        />
      ) : null}
    </div>
  );
});
