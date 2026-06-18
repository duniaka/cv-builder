'use client';

import { useRef } from 'react';
import EditableText from './EditableText';

const base = { border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', padding: 0 };

function scaleToBase64(file, maxSize = 200) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = url;
  });
}

export default function CVHeader({ cv, onChange }) {
  const fileRef = useRef(null);
  const set = (field) => (v) => onChange(field, v);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await scaleToBase64(file);
    onChange('photo', dataUrl);
  };

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <EditableText
          style={{ ...base, fontSize: 29, fontWeight: 700, letterSpacing: '.5px', color: 'var(--accent)', display: 'block', marginBottom: 2 }}
          value={cv.fullName}
          onChange={set('fullName')}
          placeholder="Full Name"
        />
        <EditableText
          style={{ ...base, fontSize: 14, color: 'var(--accent)', display: 'block', marginBottom: 8 }}
          value={cv.jobTitle}
          onChange={set('jobTitle')}
          placeholder="Job Title"
        />
        <div style={{ fontSize: 11.5, color: 'var(--muted)', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 0' }}>
            <span style={{ marginRight: 14, whiteSpace: 'nowrap' }}>
              <i className="fas fa-phone" />{' '}
              <EditableText style={base} value={cv.phone} onChange={set('phone')} placeholder="Phone" />
            </span>
            <span style={{ marginRight: 14, whiteSpace: 'nowrap' }}>
              <i className="fas fa-envelope" />{' '}
              <EditableText style={base} value={cv.email} onChange={set('email')} placeholder="Email" />
            </span>
            <span style={{ marginRight: 14, whiteSpace: 'nowrap' }}>
              <i className="fas fa-location-dot" />{' '}
              <EditableText style={base} value={cv.location} onChange={set('location')} placeholder="City, Country" />
            </span>
            <span style={{ marginRight: 14, whiteSpace: 'nowrap' }}>
              <i className="fas fa-globe" />{' '}
              <EditableText style={base} value={cv.website} onChange={set('website')} placeholder="website.com" />
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 0' }}>
            <span className="print-hide-empty" style={{ marginRight: 14, whiteSpace: 'nowrap' }}>
              <i className="fab fa-linkedin" />{' '}
              <EditableText style={base} value={cv.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/…" />
            </span>
            <span className="print-hide-empty" style={{ marginRight: 14, whiteSpace: 'nowrap' }}>
              <i className="fab fa-github" />{' '}
              <EditableText style={base} value={cv.github} onChange={set('github')} placeholder="github.com/…" />
            </span>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }} onClick={() => fileRef.current.click()} title="Click to change photo">
        <img src={cv.photo || '/person.png'} alt="Profile" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
      </div>
    </div>
  );
}
