'use client';

import SectionHeading from './SectionHeading';
import EditableText from './EditableText';
import s from './cv-edit.module.css';

export default function CVCertifications({ cv, onChange }) {
  const set = (i, field, val) => onChange(cv.certifications.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  const remove = (i) => onChange(cv.certifications.filter((_, idx) => idx !== i));
  const add = () => onChange([...cv.certifications, { year: '', description: '' }]);

  return (
    <div>
      <SectionHeading icon="fas fa-certificate">Certifications</SectionHeading>
      <div style={{ marginTop: 8 }}>
        {cv.certifications.map((cert, i) => (
          <div key={i} className={s.item} style={{ display: 'flex', gap: 14, fontSize: 11, marginTop: 3 }}>
            <EditableText
              style={{ width: 90, flexShrink: 0, textAlign: 'right', color: 'var(--muted)' }}
              value={cert.year}
              onChange={(v) => set(i, 'year', v)}
              placeholder="2023"
            />
            <EditableText
              style={{ flex: 1 }}
              value={cert.description}
              onChange={(v) => set(i, 'description', v)}
              placeholder="Certificate name…"
            />
            <button className={s.deleteBtn} onClick={() => remove(i)}>✕</button>
          </div>
        ))}
        <button className={s.addBtn} onClick={add}>+ certification</button>
      </div>
    </div>
  );
}
