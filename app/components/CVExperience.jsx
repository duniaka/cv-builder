'use client';

import SectionHeading from './SectionHeading';
import GrowTextarea from './GrowTextarea';
import EditableText from './EditableText';
import s from './cv-edit.module.css';

const TAG_TYPES = ['dev', 'data', 'domain', 'biz'];

const tagColors = {
  dev: { color: '#ec407a', borderColor: '#ec407a', background: '#fdeef4' },
  data: { color: '#3f6fd1', borderColor: '#3f6fd1', background: '#eef2fb' },
  domain: { color: '#e8995e', borderColor: '#e8995e', background: '#fcf2e9' },
  biz: { color: '#8a8a8a', borderColor: '#8a8a8a', background: '#f2f2f2' },
};

function ExpEntry({ exp, onExpChange, onRemove, first }) {
  const setField = (field, val) => onExpChange({ ...exp, [field]: val });

  const setBullet = (i, val) => {
    const bullets = exp.bullets.map((b, idx) => idx === i ? val : b);
    onExpChange({ ...exp, bullets });
  };

  const addBullet = () => onExpChange({ ...exp, bullets: [...exp.bullets, ''] });
  const removeBullet = (i) => onExpChange({ ...exp, bullets: exp.bullets.filter((_, idx) => idx !== i) });

  const setTag = (i, field, val) => {
    const tags = exp.tags.map((t, idx) => idx === i ? { ...t, [field]: val } : t);
    onExpChange({ ...exp, tags });
  };

  const cycleTagType = (i) => {
    const next = TAG_TYPES[(TAG_TYPES.indexOf(exp.tags[i].type) + 1) % TAG_TYPES.length];
    setTag(i, 'type', next);
  };


  const addTag = () => onExpChange({ ...exp, tags: [...exp.tags, { text: '', type: 'dev' }] });
  const removeTag = (i) => onExpChange({ ...exp, tags: exp.tags.filter((_, idx) => idx !== i) });

  return (
    <div className={s.entry} style={{ marginTop: first ? 8 : 13 }}>
      <div style={{ width: 90, flexShrink: 0, textAlign: 'right', fontSize: 11.5, color: 'var(--muted)', paddingTop: 1 }}>
        <EditableText style={{ display: 'block', textAlign: 'right', fontSize: 11.5, color: 'var(--muted)' }} value={exp.end} onChange={(v) => setField('end', v)} placeholder="2024" />
        <EditableText style={{ display: 'block', textAlign: 'right', fontSize: 11.5, color: 'var(--muted)' }} value={exp.start} onChange={(v) => setField('start', v)} placeholder="2022" />
      </div>
      <div style={{ flex: '1 1 auto', borderLeft: '1px solid #ccc', paddingLeft: 14 }}>
        <div style={{ fontSize: 11.5 }}>
          <EditableText value={exp.role} onChange={(v) => setField('role', v)} style={{ fontWeight: 700 }} placeholder="Job title" />
          <span style={{ color: 'var(--muted)' }}> — </span>
          <EditableText value={exp.company} onChange={(v) => setField('company', v)} placeholder="Company" />
          <button className={s.deleteBtn} onClick={onRemove} style={{ opacity: 1, fontSize: 10, color: '#ddd' }}>✕</button>
        </div>
        <ul style={{ margin: '4px 0 6px', paddingLeft: 18, fontSize: 11.5, listStyle: 'none' }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ margin: '1px 0' }} className={`${s.item} ${s.bullet}`}>
              <GrowTextarea block value={b} onChange={(v) => setBullet(i, v)} placeholder="Bullet point…" />
              <button className={s.deleteBtn} onClick={() => removeBullet(i)}>✕</button>
            </li>
          ))}
        </ul>
        <button className={s.addBtn} onClick={addBullet}>+ bullet</button>
        <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
          {exp.tags.map((tag, i) => {
            const colors = tagColors[tag.type] || tagColors.biz;
            return (
              <span
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  border: '1px solid', borderRadius: 4, fontSize: 10, lineHeight: 1.5,
                  padding: '1px 4px 1px 5px', userSelect: 'none',
                  ...colors,
                }}
              >
                <span
                  className="no-print"
                  onClick={() => cycleTagType(i)}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: colors.color, flexShrink: 0, cursor: 'pointer' }}
                />
                <EditableText
                  style={{ fontSize: 10 }}
                  value={tag.text}
                  onChange={(v) => setTag(i, 'text', v)}
                  placeholder="tag"
                />
                <button
                  className={s.deleteBtn}
                  style={{ opacity: 1, color: colors.color, fontSize: 9 }}
                  onClick={(e) => { e.stopPropagation(); removeTag(i); }}
                >✕</button>
              </span>
            );
          })}
          <button className={s.addBtn} onClick={addTag} style={{ marginTop: 0 }}>+ tag</button>
        </div>
      </div>
    </div>
  );
}

export default function CVExperience({ cv, onChange }) {
  const update = (i, newExp) => onChange(cv.experience.map((e, idx) => idx === i ? newExp : e));
  const remove = (i) => onChange(cv.experience.filter((_, idx) => idx !== i));
  const add = () => onChange([...cv.experience, { end: '', start: '', role: '', company: '', bullets: [''], tags: [] }]);

  return (
    <div>
      <SectionHeading icon="fas fa-briefcase">Professional Experience</SectionHeading>
      <div style={{ marginTop: 8 }}>
        {cv.experience.map((exp, i) => (
          <ExpEntry key={i} exp={exp} first={i === 0} onExpChange={(v) => update(i, v)} onRemove={() => remove(i)} />
        ))}
        <button className={s.addBtn} onClick={add} style={{ marginTop: 10 }}>+ position</button>
      </div>
    </div>
  );
}
