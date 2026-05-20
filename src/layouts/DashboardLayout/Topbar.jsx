// 🔧 Replace this with real customer data from props/API/context later
const CUSTOMER = {
  name: 'KST Health Organization',
  logo: null,
  initials: 'KH',
};

const Topbar = ({ title = 'Dashboard' }) => (
  <header
    style={{
      flexShrink: 0,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      background: 'transparent',
    }}
  >
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 40,
      background: '#FFFFFF',
      border: '1px solid #E8EDF5',
      borderTop: 'none',
      borderRadius: '0 0 14px 14px',
      padding: '0 24px',
      height: 54,
      width: '65%',
      justifyContent: 'space-between',
      boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
    }}>

      {/* Page title */}
      <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1C2B4A', letterSpacing: '-0.4px', margin: 0, whiteSpace: 'nowrap' }}>
        {title}
      </h1>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: '#E8EDF5' }} />

      {/* Customer branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg,#E57F4A,#F8A96B)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', flexShrink: 0,
        }}>
          {CUSTOMER.logo
            ? <img src={CUSTOMER.logo} alt={CUSTOMER.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{CUSTOMER.initials}</span>
          }
        </div>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1C2B4A', whiteSpace: 'nowrap' }}>
          {CUSTOMER.name}
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: '#E8EDF5' }} />

      {/* User pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        background: '#F8FAFC', border: '1px solid #E8EDF5',
        borderRadius: 22, padding: '5px 13px 5px 6px',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg,#4A7FE5,#6B9FF8)',
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
