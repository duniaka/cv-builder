'use client';

import SectionHeading from './SectionHeading';
import EditableText from './EditableText';
import s from './cv-edit.module.css';

function Dots({ level, onSet }) {
  return (
    <span style={{ display: 'inline-flex', gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          onClick={() => onSet(i + 1)}
          title={`Set level ${i + 1}`}
          style={{
            width: 11, height: 11, borderRadius: '50%', cursor: 'pointer',
            border: '1.5px solid var(--accent)',
            background: i < level ? 'var(--accent)' : 'transparent',
          }}
        />
      ))}
    </span>
  );
}

export default function CVLanguages({ cv, onChange }) {
  const set = (i, field, val) => onChange(cv.languages.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  const remove = (i) => onChange(cv.languages.filter((_, idx) => idx !== i));
  const add = () => onChange([...cv.languages, { name: '', level: 3 }]);

  return (
    <div>
      <SectionHeading icon="fas fa-language">Languages</SectionHeading>
      <div style={{ marginTop: 8 }}>
        {cv.languages.map((lang, i) => (
          <div key={i} className={s.item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, margin: '5px 0', fontSize: 11.5 }}>
            <EditableText
              style={{ textAlign: 'right', minWidth: 70 }}
              value={lang.name}
              onChange={(v) => set(i, 'name', v)}
              placeholder="Language"
            />
            <Dots level={lang.level} onSet={(v) => set(i, 'level', v)} />
            <button className={s.deleteBtn} style={{ opacity: 1, color: '#ddd' }} onClick={() => remove(i)}>✕</button>
          </div>
        ))}
        <div style={{ textAlign: 'right' }}>
          <button className={s.addBtn} onClick={add}>+ language</button>
        </div>
      </div>
    </div>
  );
}
