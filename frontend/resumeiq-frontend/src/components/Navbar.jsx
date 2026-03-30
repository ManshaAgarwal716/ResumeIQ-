function Navbar({ onNavigate }) {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      borderBottom: '0.5px solid #2a2a2a',
      background: '#0a0a0a',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div
        onClick={() => onNavigate('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
      >
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#378ADD', animation: 'pulse 2s infinite'
        }} />
        <span style={{ fontSize: '18px', fontWeight: 500, color: '#fff' }}>ResumeIQ</span>
      </div>
      <button
        onClick={() => onNavigate('upload')}
        style={{
          padding: '6px 16px', background: '#378ADD', color: '#fff',
          border: 'none', borderRadius: '8px', fontSize: '13px',
          cursor: 'pointer', transition: 'background 0.2s'
        }}
        onMouseOver={e => e.target.style.background = '#185FA5'}
        onMouseOut={e => e.target.style.background = '#378ADD'}
      >
        Analyze resume
      </button>
    </nav>
  )
}

export default Navbar