import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SonGrim, type SonGrimRef, loadImage, saveImage } from './index';

function Demo() {
  const sonGrimRef = useRef<SonGrimRef>(null);
  const [dataUrl, setDataUrl] = useState('');

  return (
    <main style={{ padding: '2rem', background: '#f6f1eb', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: '"Iowan Old Style", serif', fontSize: '2.5rem' }}>SonGrim</h1>
      <p style={{ maxWidth: 620 }}>
        Lightweight MSPaint-style drawing for React. Use the toolbar, import an image, or export the current
        drawing.
      </p>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <SonGrim
          ref={sonGrimRef}
          width={720}
          height={480}
          onChange={(nextDataUrl) => setDataUrl(nextDataUrl)}
          dataUrl={dataUrl}
        />
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => saveImage(sonGrimRef.current?.getDataUrl() ?? '', 'songrim-demo.png')}>
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
              await sonGrimRef.current?.setDataUrl(nextDataUrl);
            }}
          />
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(<Demo />);
