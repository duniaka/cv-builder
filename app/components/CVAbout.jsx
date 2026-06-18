'use client';

import SectionHeading from './SectionHeading';
import GrowTextarea from './GrowTextarea';

export default function CVAbout({ cv, onChange }) {
  return (
    <div>
      <SectionHeading icon="fas fa-user">About Me</SectionHeading>
      <GrowTextarea
        block
        value={cv.aboutMe}
        onChange={onChange}
        placeholder="About me paragraph…"
        style={{ fontSize: 12, marginTop: 8 }}
      />
    </div>
  );
}
