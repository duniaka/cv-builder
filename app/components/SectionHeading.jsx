export default function SectionHeading({ icon, children }) {
  return (
    <h2 style={{
      fontSize: 14,
      fontVariant: 'small-caps',
      letterSpacing: 1,
      textTransform: 'lowercase',
      color: 'var(--accent)',
      fontWeight: 700,
      margin: '18px 0 0',
      borderBottom: '1.5px solid var(--rule)',
      paddingBottom: 3,
    }}>
      {icon && <i className={icon} style={{ marginRight: 5 }} />}
      {children}
    </h2>
  );
}