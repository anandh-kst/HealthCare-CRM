import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiUser, FiCalendar, FiMoreVertical } from 'react-icons/fi';
import { ROUTES } from '@constants/routes.constants';

const navItems = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: <FiHome /> },
  { label: 'Members', to: ROUTES.MEMBERS, icon: <FiUsers /> },
  { label: 'Patients', to: ROUTES.PATIENTS, icon: <FiUser /> },
  { label: 'Appointments', to: ROUTES.APPOINTMENTS, icon: <FiCalendar /> },
];

const moreItems = [
  { label: 'Lab', to: '#lab' },
  { label: 'Reports', to: '#reports' },
  { label: 'Pharmacy', to: '#pharmacy' },
  { label: 'Billing', to: '#billing' },
  { label: 'Messages', to: '#messages' },
  { label: 'Analytics', to: '#analytics' },
];

const BottomNav = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreOpen && moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen]);

  const handleMoreSelect = (item) => {
    setMoreOpen(false);
    if (item.to.startsWith('#')) {
      window.location.hash = item.to;
    }
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="mobile-bottom-nav__bar">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mobile-bottom-nav__item${isActive ? ' active' : ''}`
            }
          >
            {item.icon}
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </NavLink>
        ))}

        <div ref={moreRef} className="mobile-bottom-nav__more-wrap">
          <button
            type="button"
            className={`mobile-bottom-nav__item mobile-bottom-nav__more-button${moreOpen ? ' active' : ''}`}
            onClick={() => setMoreOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={moreOpen}
          >
            <FiMoreVertical />
            <span className="mobile-bottom-nav__label">More</span>
          </button>
          {moreOpen && (
            <div className="mobile-bottom-nav__more-menu" role="menu">
              {moreItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="mobile-bottom-nav__more-item"
                  onClick={() => handleMoreSelect(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
