'use client';

import SectionHeading from './SectionHeading';
import EditableText from './EditableText';
import s from './cv-edit.module.css';

export default function CVHonours({ cv, onChange }) {
  const set = (i, field, val) => onChange(cv.honours.map((h, idx) => idx === i ? { ...h, [field]: val } : h));
  const remove = (i) => onChange(cv.honours.filter((_, idx) => idx !== i));
  const add = () => onChange([...cv.honours, { year: '', text: '' }]);

  return (
    <div>
      <SectionHeading icon="fas fa-trophy">Honours</SectionHeading>
      <div style={{ marginTop: 8 }}>
        {cv.honours.map((h, i) => (
          <div key={i} className={s.item} style={{ display: 'flex', gap: 14, fontSize: 11.5, marginTop: 3 }}>
            <EditableText
              style={{ width: 90, flexShrink: 0, textAlign: 'right', color: 'var(--muted)' }}
              value={h.year}
              onChange={(v) => set(i, 'year', v)}
              placeholder="2023"
            />
            <EditableText
              style={{ flex: 1 }}
              value={h.text}
              onChange={(v) => set(i, 'text', v)}
              placeholder="Award or achievement…"
            />
            <button className={s.deleteBtn} onClick={() => remove(i)}>✕</button>
          </div>
        ))}
        <button className={s.addBtn} onClick={add}>+ honour</button>
      </div>
    </div>
  );
}
