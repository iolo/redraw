import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Redraw, type RedrawRef, loadImage, saveImage } from './index';

function Demo() {
  const redrawRef = useRef<RedrawRef>(null);
  const [dataUrl, setDataUrl] = useState('');

  return (
    <main style={{ margin: '2rem', minHeight: '100vh' }}>
      <header>
        <h1 style={{ fontFamily: '"Iowan Old Style", serif', fontSize: '2.5rem' }}>Redraw</h1>
        <p>
          Lightweight MSPaint-style drawing for React. Use the toolbar, import an image, or export the current
          drawing.
        </p>
        <nav><a href="https://iolo.kr">Home</a> | <a href="https://github.com/iolo/redraw">GitHub</a> | <a href="https://npmjs.org/package/@iolo/redraw">NPM</a></nav>
        <hr />
      </header>
      <div style={{ display: 'grid', gap: '1rem', padding: '2rem', background: '#f6f1eb' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => saveImage(redrawRef.current?.getDataUrl() ?? '', 'redraw-demo.png')}>
            Save PNG
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) {
                return;
              }
              const nextDataUrl = await loadImage(file);
              await redrawRef.current?.setDataUrl(nextDataUrl);
            }}
          />
        </div>
        <Redraw
          ref={redrawRef}
          width={720}
          height={480}
          onChange={(nextDataUrl) => setDataUrl(nextDataUrl)}
          dataUrl={dataUrl}
        />
      </div>
      <footer>
        <hr />
        <small>&copy; 1973-2026 IoloTheBard. All rights reserved.</small>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(<Demo />);
