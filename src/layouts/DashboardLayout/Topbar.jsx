const Topbar = ({ title = 'Dashboard' }) => (
  <header
    className="flex items-center justify-between flex-shrink-0"
    style={{
      height: 58,
      background: 'transparent',
      padding: '0 20px 0 16px',
    }}
  >
    {/* Page title */}
    <h1
      style={{
        fontSize: 19,
        fontWeight: 700,
        color: '#1C2B4A',
        letterSpacing: '-0.4px',
        margin: 0,
      }}
    >
      {title}
    </h1>

    {/* User pill */}
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8EDF5',
        borderRadius: 22,
        padding: '5px 13px 5px 6px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg,#4A7FE5,#6B9FF8)',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2.2"/>
        </svg>
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#374151', whiteSpace: 'nowrap' }}>
        Eden Medicover
      </span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: '#9CA3AF', flexShrink: 0 }}>
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </header>
);

export default Topbar;
