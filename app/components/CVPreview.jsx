import CVHeader from './CVHeader';
import CVAbout from './CVAbout';
import CVSkills from './CVSkills';
import CVExperience from './CVExperience';
import CVCertifications from './CVCertifications';
import CVHonours from './CVHonours';
import CVLanguages from './CVLanguages';

export default function CVPreview({ cv, update }) {
  return (
    <div className="cv-sheet" style={{
      '--accent': '#1a1366',
      '--text': '#1d1d1f',
      '--muted': '#555',
      '--rule': '#1a1366',
      width: '210mm',
      minHeight: '297mm',
      padding: '10mm 10mm',
      background: '#fff',
      boxShadow: '0 2px 14px rgba(0,0,0,.15)',
      fontFamily: '"Source Sans Pro","Segoe UI",Helvetica,Arial,sans-serif',
      color: 'var(--text)',
      lineHeight: 1.4,
}}>
      <CVHeader cv={cv} onChange={update} />
      <CVAbout cv={cv} onChange={(val) => update('aboutMe', val)} />
      <CVSkills cv={cv} onChange={(val) => update('skills', val)} />
      <CVExperience cv={cv} onChange={(val) => update('experience', val)} />
      <CVCertifications cv={cv} onChange={(val) => update('certifications', val)} />
      <div style={{ display: 'flex', gap: 26, marginTop: 4 }}>
        <div style={{ flex: '2 1 0' }}>
          <CVHonours cv={cv} onChange={(val) => update('honours', val)} />
        </div>
        <div style={{ flex: '1 1 0' }}>
          <CVLanguages cv={cv} onChange={(val) => update('languages', val)} />
        </div>
      </div>
    </div>
  );
}
