import { useState, useEffect } from 'react';
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
const IconMembers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
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

const IconBilling = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M2 10h20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M6 15h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconMessages = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAnalytics = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
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
  { path: ROUTES.MEMBERS,      icon: <IconMembers />,      label: 'Members' },
  { path: ROUTES.PATIENTS,     icon: <IconPatients />,     label: 'Patients' },
  { path: ROUTES.APPOINTMENTS, icon: <IconAppointments />, label: 'Appointments' },
  { path: '#lab',              icon: <IconLab />,          label: 'Lab' },
  { path: '#reports',          icon: <IconReports />,      label: 'Reports' },
  { path: '#pharmacy',         icon: <IconPharmacy />,     label: 'Pharmacy' },
  { path: '#billing',          icon: <IconBilling />,      label: 'Billing' },
  { path: '#messages',         icon: <IconMessages />,     label: 'Messages' },
  { path: '#analytics',        icon: <IconAnalytics />,    label: 'Analytics' },
];

const bottomNav = [
  { icon: <IconBell />,     label: 'Notifications' },
  { icon: <IconSettings />, label: 'Settings' },
];

// ── NavItem ───────────────────────────────────────────────
const NavItem = ({ path, icon, label, expanded, settled, mounted, isBtn = false }) => {
  const isHash = path?.startsWith('#');

      const row = (isActive) => (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: settled ? 'flex-start' : 'center',
      gap: 10,
      width: '100%',
      padding: '5px 4px',
      borderRadius: 12,
      cursor: 'pointer',
      transition: 'background .15s',
    }}>
      {/* icon circle */}
      <div style={{
        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
        background: isActive ? '#4A7FE5' : '#F1F5F9',
        boxShadow: isActive ? '0 3px 10px rgba(74,127,229,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isActive ? '#fff' : '#94A3B8',
        transition: 'all .18s',
      }}>
        {icon}
      </div>
      {/* label — only when expanded */}
      {expanded && (
        <span style={{
          fontSize: 13.5, fontWeight: isActive ? 700 : 500,
          color: isActive ? '#1C2B4A' : '#64748B',
          whiteSpace: 'nowrap',
          opacity: expanded ? 1 : 0,
          transition: mounted ? 'opacity .15s .1s' : 'none',
          overflow: 'hidden',
        }}>
          {label}
        </span>
      )}
    </div>
  );

  if (isBtn) return (
    <button
      title={!expanded ? label : undefined}
      style={{ background: 'none', border: 'none', width: '100%', padding: 0, cursor: 'pointer', textAlign: 'left' }}
    >
      {row(false)}
    </button>
  );

  return (
    <NavLink
      to={isHash ? '#' : path}
      onClick={(e) => isHash && e.preventDefault()}
      title={!expanded ? label : undefined}
      style={{ width: '100%', textDecoration: 'none', display: 'block' }}
    >
      {({ isActive }) => row(isActive && !isHash)}
    </NavLink>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [settled, setSettled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const W = expanded ? 210 : 72;

  useEffect(() => { setMounted(true); }, []);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      setTimeout(() => setSettled(false), 250);
    } else {
      setExpanded(true);
      setSettled(true);
    }
  };

  return (
    <div style={{
      width: W, flexShrink: 0, height: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '12px 0 12px 12px',
      background: 'transparent', boxSizing: 'border-box',
      overflow: 'hidden',
      transition: 'width .25s cubic-bezier(.4,0,.2,1)',
    }}>

      {/* ── Card 1: Logo ── */}
      <div style={{ ...card, flexShrink: 0, padding: '10px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: settled ? 'flex-start' : 'center', gap: 10, width: '100%' }}>
          <img src={care200Logo} alt="Care200"
            style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, flexShrink: 0 }}
          />
          {expanded && (
            <div style={{ opacity: expanded ? 1 : 0, transition: 'opacity .15s .15s', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#1C2B4A', letterSpacing: '-0.3px', lineHeight: 1.2 }}>Care200</div>
              <div style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 500 }}>Healthcare</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Card 2: Main nav + toggle ── */}
      <div style={{ ...card, flex: 1, margin: '14px 0', padding: '10px 8px', justifyContent: 'space-between', gap: 0, overflow: 'hidden' }}>
        {/* nav items — scrollable */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: 2, width: '100%', scrollbarWidth: 'none' }}>
          {mainNav.map((item, i) => <NavItem key={i} {...item} expanded={expanded} settled={settled} mounted={mounted} />)}
        </div>

        {/* toggle button */}
        <button
          onClick={() => toggle()}
          title={expanded ? 'Collapse' : 'Expand'}
          style={{
            marginTop: 10, width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 0', borderRadius: 12,
            border: '1.5px dashed #E2E8F0',
            background: 'transparent', cursor: 'pointer',
            color: '#94A3B8', fontSize: 11.5, fontWeight: 600,
            transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#4A7FE5'; e.currentTarget.style.color = '#4A7FE5'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#94A3B8'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            {expanded
              ? <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
          {expanded && <span>Collapse</span>}
        </button>
      </div>

      {/* ── Card 3: Bottom icons ── */}
      <div style={{ ...card, flexShrink: 0, padding: '10px 8px', gap: 4 }}>
        {bottomNav.map((item, i) => <NavItem key={i} {...item} expanded={expanded} settled={settled} mounted={mounted} isBtn />)}
      </div>

    </div>
  );
};

export default Sidebar;
