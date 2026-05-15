import React from 'react';
import { NavLink } from 'react-router-dom';
import care200Logo from '@assets/images/care200.png';
import { ROUTES } from '@constants/routes.constants';

// ── Icons (20px, strokeWidth 2.2 for bolder look) ─────────
const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.2"/>
  </svg>
);
const IconPatients = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6 3v7a6 6 0 0 0 12 0V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M6 3H4M6 3h2M18 3h-2M18 3h2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="19" cy="17" r="2.2" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M12 16v1.5a4.5 4.5 0 0 0 4.8 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconAppointments = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M12 13v4M10 15h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconLab = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 3h6M9 3v7l-5 9h16l-5-9V3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 16h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="10" cy="18" r="1" fill="currentColor"/>
    <circle cx="14" cy="19" r="1" fill="currentColor"/>
  </svg>
);
const IconReports = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 12h3l2-7 3 14 3-9 2 4 2-2h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPharmacy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M10.5 3.5a5 5 0 0 0-7 7l10 10a5 5 0 0 0 7-7l-10-10z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconProfile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M4 21v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M10.5 6.5h3M12 5v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="18" cy="5" r="2.5" fill="#EF4444"/>
  </svg>
);
const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2.2"/>
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
  padding: '10px',
};

const mainNav = [
  { path: ROUTES.DASHBOARD,    icon: <IconDashboard />,    label: 'Dashboard' },
  { path: ROUTES.PATIENTS,     icon: <IconPatients />,     label: 'Patients' },
  { path: ROUTES.APPOINTMENTS, icon: <IconAppointments />, label: 'Appointments' },
  { path: '#lab',              icon: <IconLab />,          label: 'Lab' },
  { path: '#reports',          icon: <IconReports />,      label: 'Reports' },
  { path: '#pharmacy',         icon: <IconPharmacy />,     label: 'Pharmacy' },
  { path: '#profile',          icon: <IconProfile />,      label: 'Profile' },
];

const bottomNav = [
  { icon: <IconBell />,     label: 'Notifications' },
  { icon: <IconSettings />, label: 'Settings' },
];

// ── NavItem: circular icon that changes bg on hover/active ──
const NavItem = ({ path, icon, label, isBtn = false, onClick }) => {
  const [hovered, setHovered] = React.useState(false);

  const iconBox = (isActive) => ({
    width: 42, height: 42, borderRadius: '50%',
    background: isActive ? '#3B6FD4' : hovered ? '#DBEAFE' : '#FFFFFF',
    boxShadow: isActive ? '0 2px 8px rgba(59,111,212,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: isActive ? '#FFFFFF' : hovered ? '#4A7FE5' : '#94A3B8',
    transition: 'all .18s',
    flexShrink: 0,
    cursor: 'pointer',
    border: 'none',
  });

  if (isBtn) return (
    <button
      title={label}
      style={iconBox(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {icon}
    </button>
  );

  return (
    <NavLink
      to={path.startsWith('#') ? '#' : path}
      onClick={(e) => path.startsWith('#') && e.preventDefault()}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {({ isActive }) => (
        <div style={iconBox(isActive && !path.startsWith('#'))}>{icon}</div>
      )}
    </NavLink>
  );
};

const Sidebar = ({ title }) => (
  <div
    style={{
      width: 72,
      flexShrink: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '12px 0 12px 10px',
      background: 'transparent',
      boxSizing: 'border-box',
    }}
  >
    {/* ── Card 1: Logo ── */}
    <div style={{ ...card, flexShrink: 0, padding: '10px' }}>
      <img
        src={care200Logo}
        alt="Care200"
        style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8 }}
      />
    </div>

    {/* ── Card 2: Main nav ── */}
    <div style={{ ...card, flexShrink: 0, gap: 6 }}>
      {mainNav.map((item, i) => <NavItem key={i} {...item} />)}
    </div>

    {/* ── Card 3: Bottom icons ── */}
    <div style={{ ...card, flexShrink: 0, gap: 6 }}>
      {bottomNav.map((item, i) => <NavItem key={i} {...item} isBtn />)}
    </div>
  </div>
);

export default Sidebar;
