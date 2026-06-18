'use client';

import { useState, useRef, useEffect } from 'react';
import { defaultCV } from '../data/cv';
import CVPreview from './CVPreview';

export default function Builder() {
  const [cv, setCv] = useState(defaultCV);
  const [fileName, setFileName] = useState('cv');
  const importRef = useRef(null);

  const update = (key, value) => setCv((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    document.title = cv.fullName || 'CV Builder';
  }, [cv.fullName]);

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const prevTitle = document.title;
    document.title = fileName;
    window.print();
    document.title = prevTitle;
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const text = await file.text();
    setCv(JSON.parse(text));
    setFileName(file.name.replace(/\.json$/i, ''));
  };

  return (
    <div className="builder-wrap" style={{ background: '#e8e8ea', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <nav style={{
        width: '100%',
        background: '#1a1366',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxSizing: 'border-box',
        fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
      }}>
        <input
          ref={importRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
        <button
          onClick={() => importRef.current?.click()}
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}>
          Import JSON
        </button>

        <button
          onClick={handleExportJSON}
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}>
          Export JSON
        </button>

        <div style={{ flex: 1 }} />

        <input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 6,
            fontSize: 13,
            width: 180,
            outline: 'none',
          }}
          placeholder="File name"
        />
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>.pdf</span>

        <button
          onClick={handleExportPDF}
          style={{
            background: '#fff',
            border: 'none',
            color: '#1a1366',
            padding: '6px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 700,
          }}>
          Export PDF
        </button>
      </nav>

      <div style={{ padding: 18 }}>
        <CVPreview cv={cv} update={update} />
      </div>
    </div>
  );
}
