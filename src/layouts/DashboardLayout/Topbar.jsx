// 🔧 Replace with real customer data later
const CUSTOMER = {
  name: 'KST Health Organization',
  logo: null,
  initials: 'KH',
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const Topbar = ({ title = 'Dashboard' }) => (
  <header
    style={{
      height: 76,
      flexShrink: 0,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      alignItems: 'stretch',
      background: 'transparent',
      padding: '0 28px 0 24px',
    }}
  >
    {/* Left — Page title */}
    <h1 style={{ fontSize: 19, fontWeight: 700, color: '#1C2B4A', letterSpacing: '-0.4px', margin: 0, alignSelf: 'center' }}>
      {title}
    </h1>

    {/* Center — Greeting */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <span style={{ fontSize: 17, fontWeight: 800, color: '#1C2B4A', whiteSpace: 'nowrap', letterSpacing: '-0.3px' }}>
        Welcome back to KST Health Org Portal
      </span>
    </div>

    {/* Right — User profile */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        background: '#FFFFFF', border: '1px solid #E8EDF5',
        borderRadius: 22, padding: '5px 13px 5px 6px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg,#5060A8,#7B8DC4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2.2"/>
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151', whiteSpace: 'nowrap' }}>
          Anandh KS
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: '#9CA3AF', flexShrink: 0 }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </header>
);

export default Topbar;
