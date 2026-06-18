'use client';

import { useEffect, useRef } from 'react';

export default function EditableText({ value, onChange, placeholder, style, className, block }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value ?? '';
    }
  }, [value]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      className={className}
      style={{
        outline: 'none', cursor: 'text',
        ...(block && { display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }),
        ...(!block && { whiteSpace: 'pre' }),
        ...style,
      }}
      onInput={e => onChange(e.currentTarget.textContent)}
    />
  );
}
