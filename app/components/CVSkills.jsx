'use client';

import SectionHeading from './SectionHeading';
import EditableText from './EditableText';
import s from './cv-edit.module.css';

const TAG_TYPES = ['dev', 'data', 'domain', 'biz'];
const TAG_LABELS = { dev: 'Development', data: 'Data & Infra', domain: 'Domain', biz: 'Product & Business' };
const tagColors = {
  dev: { color: '#ec407a', borderColor: '#ec407a', background: '#fdeef4' },
  data: { color: '#3f6fd1', borderColor: '#3f6fd1', background: '#eef2fb' },
  domain: { color: '#e8995e', borderColor: '#e8995e', background: '#fcf2e9' },
  biz: { color: '#8a8a8a', borderColor: '#8a8a8a', background: '#f2f2f2' },
};

const tagStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  border: '1px solid', borderRadius: 4, padding: '1px 7px', fontSize: 11, lineHeight: 1.5,
};

export default function CVSkills({ cv, onChange }) {
  const set = (i, field, val) => {
    const skills = cv.skills.map((sk, idx) => idx === i ? { ...sk, [field]: val } : sk);
    onChange(skills);
  };

  const cycleType = (i) => {
    const next = TAG_TYPES[(TAG_TYPES.indexOf(cv.skills[i].type) + 1) % TAG_TYPES.length];
    set(i, 'type', next);
  };

  const remove = (i) => onChange(cv.skills.filter((_, idx) => idx !== i));
  const add = () => onChange([...cv.skills, { category: 'Category', type: 'biz', value: '' }]);

  return (
    <div>
      <SectionHeading icon="fas fa-layer-group">Skills</SectionHeading>
      <div style={{ marginTop: 8 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 11.5, marginTop: 6 }}>
          <tbody>
            {cv.skills.map((skill, i) => {
              const colors = tagColors[skill.type] || tagColors.biz;
              return (
                <tr key={i} className={s.row}>
                  <td style={{ width: 160, textAlign: 'right', whiteSpace: 'nowrap', padding: '2px 12px 2px 0', verticalAlign: 'top' }}>
                    <span style={{ ...tagStyle, color: colors.color, borderColor: colors.borderColor, background: colors.background }}>
                      <span
                        className="no-print"
                        onClick={() => cycleType(i)}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: colors.color, flexShrink: 0, cursor: 'pointer' }}
                      />
                      <EditableText
                        style={{ textAlign: 'center' }}
                        value={skill.category}
                        onChange={(v) => set(i, 'category', v)}
                        placeholder={TAG_LABELS[skill.type] || 'Category'}
                      />
                    </span>
                  </td>
                  <td style={{ verticalAlign: 'top', padding: '2px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <EditableText
                        style={{ flex: 1 }}
                        value={skill.value}
                        onChange={(v) => set(i, 'value', v)}
                        placeholder="Skill 1, Skill 2…"
                      />
                      <button className={`${s.deleteBtn} no-print`} onClick={() => remove(i)}>✕</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className={s.addBtn} onClick={add}>+ skill category</button>
      </div>
    </div>
  );
}
