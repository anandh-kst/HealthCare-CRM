import { NavLink } from 'react-router-dom';
import { ROUTES } from '@constants/routes.constants';

// ── Icons ─────────────────────────────────────────────────
// Dashboard → Hospital/cross
const IconGrid = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.9"/>
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);
// Patients → Stethoscope
const IconPatients = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M6 3H4M6 3h2M18 3h-2M18 3h2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <circle cx="19" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.9"/>
    <path d="M18 16v-2a6 6 0 0 1-6 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);
// Appointments → Medical calendar
const IconCalendar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.9"/>
    <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M12 13v4M10 15h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);
// Lab → Syringe
const IconFlask = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M18 2l4 4-1.5 1.5-4-4L18 2z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 3.5l4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M14 6l-8 8-2 4 4-2 8-8-2-2z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10l2 2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);
// Reports → ECG / heartbeat
const IconReport = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M2 12h3l2-7 3 14 3-9 2 4 2-2h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
// Layers → Pill
const IconLayers = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="1.9"/>
    <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M7 14v3a5 5 0 0 0 10 0v-3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);
// Profile → Doctor/nurse
const IconUser = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.9"/>
    <path d="M4 21v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M10 7h4M12 5v4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);
// Notifications → Medical alert
const IconBell = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M12 2a7 7 0 0 1 7 7c0 4.5 1 6 2 7H3c1-1 2-2.5 2-7a7 7 0 0 1 7-7z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 21h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M12 6v3M12 11v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconSettings = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.9"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.9"/>
  </svg>
);

// ── Shared card style ─────────────────────────────────────
const card = {
  background: '#FFFFFF',
  borderRadius: 18,
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px 8px',
};

// ── Nav button style helper ───────────────────────────────
const navBtn = (isActive) => ({
  width: 40, height: 40, borderRadius: 12,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: isActive ? '#4A7FE5' : '#94A3B8',
  background: isActive ? '#EEF3FD' : 'transparent',
  border: 'none', cursor: 'pointer',
  transition: 'all .18s',
  textDecoration: 'none',
  flexShrink: 0,
});

const mainNav = [
  { path: ROUTES.DASHBOARD,    icon: <IconGrid />,     label: 'Dashboard' },
  { path: ROUTES.PATIENTS,     icon: <IconPatients />, label: 'Patients' },
  { path: ROUTES.APPOINTMENTS, icon: <IconCalendar />, label: 'Appointments' },
  { path: '#lab',              icon: <IconFlask />,    label: 'Lab' },
  { path: '#reports',          icon: <IconReport />,   label: 'Reports' },
  { path: '#layers',           icon: <IconLayers />,   label: 'Layers' },
  { path: '#profile',          icon: <IconUser />,     label: 'Profile' },
];

const bottomNav = [
  { icon: <IconBell />,     label: 'Notifications' },
  { icon: <IconSettings />, label: 'Settings' },
];

const Sidebar = () => (
  /*
   * Outer column — transparent, just provides left+top+bottom gap.
   * The 3 white cards sit inside with a visible gap between them.
   * The page bg (#EEF2F8) shows through the gaps.
   */
  <div
    style={{
      width: 64,
      flexShrink: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '12px 0 12px 18px',
      background: 'transparent',
      boxSizing: 'border-box',
    }}
  >

    {/* ── Card 1: Logo ── */}
    <div style={{ ...card, padding: '10px 8px', flexShrink: 0 }}>
      <div
        style={{
          width: 38, height: 38, borderRadius: 12,
          background: 'linear-gradient(135deg,#4A7FE5 0%,#6B9FF8 100%)',
          boxShadow: '0 4px 10px rgba(74,127,229,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 20.5C12 20.5 2.5 13.5 2.5 8C2.5 5.24 4.74 3 7.5 3C9.16 3 10.65 3.8 11.6 5.03C12.55 3.8 14.04 3 15.7 3C18.46 3 20.7 5.24 20.7 8C20.7 13.5 12 20.5 12 20.5Z"
            fill="white"
          />
          <path d="M12 8.5v3M10.5 10h3" stroke="#4A7FE5" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    </div>

    {/* ── Card 2: Main nav (flex-1 so it fills remaining space) ── */}
    <div style={{ ...card, flexShrink: 0, gap: 2 }}>
      {mainNav.map(({ path, icon, label }, i) => (
        <NavLink
          key={i}
          to={path.startsWith('#') ? '#' : path}
          onClick={(e) => path.startsWith('#') && e.preventDefault()}
          title={label}
          style={({ isActive }) => navBtn(isActive && !path.startsWith('#'))}
          onMouseEnter={(e) => {
            if (e.currentTarget.style.background === 'transparent') {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.color = '#64748B';
            }
          }}
          onMouseLeave={(e) => {
            if (e.currentTarget.style.background === 'rgb(248, 250, 252)') {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#94A3B8';
            }
          }}
        >
          {icon}
        </NavLink>
      ))}
    </div>

    {/* ── Card 3: Bottom icons ── */}
    <div style={{ ...card, flexShrink: 0, gap: 4 }}>
      {bottomNav.map(({ icon, label }, i) => (
        <button
          key={i}
          title={label}
          style={navBtn(false)}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#64748B'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
        >
          {icon}
        </button>
      ))}
    </div>

  </div>
);

export default Sidebar;
