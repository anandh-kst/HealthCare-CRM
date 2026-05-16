import { useState } from 'react';

const C = {
  blue:      '#4A7FE5',
  textDark:  '#1C2B4A',
  textMid:   '#64748B',
  textLight: '#94A3B8',
  border:    '#E8EDF5',
  cardBg:    '#FFFFFF',
  red:       '#F87171',
};

const STATUS_COLORS = {
  Active:   { bg: '#D1FAE5', color: '#059669' },
  Pending:  { bg: '#FEF3C7', color: '#D97706' },
  Inactive: { bg: '#FEE2E2', color: '#DC2626' },
};

const ALL_MEMBERS = [
  { id: 1,  name: 'Chloe Wilson',    email: 'chloe.wilson@email.com',    avatar: 'CW', bg: '#FEE2E2', fg: '#EF4444', group: 'Cardio Warriors',  joined: 'Nov 1, 2025',  invitedBy: 'Dr. Sarah Mills',     status: 'Active' },
  { id: 2,  name: 'Marcus Reed',     email: 'marcus.reed@email.com',     avatar: 'MR', bg: '#FEF3C7', fg: '#D97706', group: 'Yoga Beginners',   joined: 'Oct 15, 2025', invitedBy: 'Coach Liam Ray',      status: 'Active' },
  { id: 3,  name: 'Bessie Cooper',   email: 'bessie.cooper@email.com',   avatar: 'BC', bg: '#EDE9FE', fg: '#7C3AED', group: 'Step Challenge',   joined: 'Sep 20, 2025', invitedBy: 'Dr. Emily Parker',    status: 'Inactive' },
  { id: 4,  name: 'James Howell',    email: 'james.howell@email.com',    avatar: 'JH', bg: '#D1FAE5', fg: '#059669', group: 'Wellness Group',   joined: 'Nov 3, 2025',  invitedBy: 'Dr. Sarah Mills',     status: 'Pending' },
  { id: 5,  name: 'Natalie Brooks',  email: 'natalie.brooks@email.com',  avatar: 'NB', bg: '#EEF3FD', fg: '#4A7FE5', group: 'Cardio Warriors',  joined: 'Oct 28, 2025', invitedBy: 'Coach Liam Ray',      status: 'Active' },
  { id: 6,  name: 'Ethan Clarke',    email: 'ethan.clarke@email.com',    avatar: 'EC', bg: '#FEE2E2', fg: '#EF4444', group: 'Yoga Beginners',   joined: 'Nov 5, 2025',  invitedBy: 'Instructor Priya K.', status: 'Active' },
  { id: 7,  name: 'Sophia Turner',   email: 'sophia.turner@email.com',   avatar: 'ST', bg: '#FEF3C7', fg: '#D97706', group: 'Step Challenge',   joined: 'Oct 10, 2025', invitedBy: 'Dr. Emily Parker',    status: 'Inactive' },
  { id: 8,  name: 'Liam Foster',     email: 'liam.foster@email.com',     avatar: 'LF', bg: '#EDE9FE', fg: '#7C3AED', group: 'Wellness Group',   joined: 'Nov 7, 2025',  invitedBy: 'Dr. Sarah Mills',     status: 'Pending' },
  { id: 9,  name: 'Ava Mitchell',    email: 'ava.mitchell@email.com',    avatar: 'AM', bg: '#D1FAE5', fg: '#059669', group: 'Cardio Warriors',  joined: 'Nov 9, 2025',  invitedBy: 'Coach Liam Ray',      status: 'Active' },
  { id: 10, name: 'Noah Bennett',    email: 'noah.bennett@email.com',    avatar: 'NB', bg: '#EEF3FD', fg: '#4A7FE5', group: 'Yoga Beginners',   joined: 'Oct 5, 2025',  invitedBy: 'Dr. Sarah Mills',     status: 'Active' },
  { id: 11, name: 'Isabella Ross',   email: 'isabella.ross@email.com',   avatar: 'IR', bg: '#FEE2E2', fg: '#EF4444', group: 'Step Challenge',   joined: 'Sep 14, 2025', invitedBy: 'Dr. Emily Parker',    status: 'Inactive' },
  { id: 12, name: 'Oliver Hayes',    email: 'oliver.hayes@email.com',    avatar: 'OH', bg: '#FEF3C7', fg: '#D97706', group: 'Wellness Group',   joined: 'Nov 11, 2025', invitedBy: 'Instructor Priya K.', status: 'Pending' },
  { id: 13, name: 'Emma Watson',      email: 'emma.watson@email.com',      avatar: 'EW', bg: '#D1FAE5', fg: '#059669', group: 'Cardio Warriors',  joined: 'Nov 12, 2025', invitedBy: 'Dr. Sarah Mills',     status: 'Active' },
  { id: 14, name: 'Ryan Cooper',      email: 'ryan.cooper@email.com',      avatar: 'RC', bg: '#EEF3FD', fg: '#4A7FE5', group: 'Step Challenge',   joined: 'Oct 22, 2025', invitedBy: 'Coach Liam Ray',      status: 'Active' },
  { id: 15, name: 'Mia Johnson',      email: 'mia.johnson@email.com',      avatar: 'MJ', bg: '#FEE2E2', fg: '#EF4444', group: 'Yoga Beginners',   joined: 'Sep 30, 2025', invitedBy: 'Dr. Emily Parker',    status: 'Inactive' },
  { id: 16, name: 'Lucas Martin',     email: 'lucas.martin@email.com',     avatar: 'LM', bg: '#EDE9FE', fg: '#7C3AED', group: 'Wellness Group',   joined: 'Nov 14, 2025', invitedBy: 'Dr. Sarah Mills',     status: 'Pending' },
  { id: 17, name: 'Grace Lee',        email: 'grace.lee@email.com',        avatar: 'GL', bg: '#FEF3C7', fg: '#D97706', group: 'Cardio Warriors',  joined: 'Oct 18, 2025', invitedBy: 'Instructor Priya K.', status: 'Active' },
  { id: 18, name: 'Henry Wilson',     email: 'henry.wilson@email.com',     avatar: 'HW', bg: '#D1FAE5', fg: '#059669', group: 'Step Challenge',   joined: 'Nov 2, 2025',  invitedBy: 'Coach Liam Ray',      status: 'Active' },
  { id: 19, name: 'Zoe Anderson',     email: 'zoe.anderson@email.com',     avatar: 'ZA', bg: '#EEF3FD', fg: '#4A7FE5', group: 'Yoga Beginners',   joined: 'Oct 8, 2025',  invitedBy: 'Dr. Emily Parker',    status: 'Inactive' },
  { id: 20, name: 'Jack Thompson',    email: 'jack.thompson@email.com',    avatar: 'JT', bg: '#FEE2E2', fg: '#EF4444', group: 'Wellness Group',   joined: 'Nov 6, 2025',  invitedBy: 'Dr. Sarah Mills',     status: 'Active' },
  { id: 21, name: 'Lily Evans',       email: 'lily.evans@email.com',       avatar: 'LE', bg: '#EDE9FE', fg: '#7C3AED', group: 'Cardio Warriors',  joined: 'Sep 25, 2025', invitedBy: 'Coach Liam Ray',      status: 'Pending' },
  { id: 22, name: 'Daniel Scott',     email: 'daniel.scott@email.com',     avatar: 'DS', bg: '#FEF3C7', fg: '#D97706', group: 'Step Challenge',   joined: 'Nov 8, 2025',  invitedBy: 'Instructor Priya K.', status: 'Active' },
  { id: 23, name: 'Chloe Adams',      email: 'chloe.adams@email.com',      avatar: 'CA', bg: '#D1FAE5', fg: '#059669', group: 'Yoga Beginners',   joined: 'Oct 30, 2025', invitedBy: 'Dr. Emily Parker',    status: 'Active' },
];

const GROUPS   = ['All Groups',  ...new Set(ALL_MEMBERS.map(m => m.group))];
const STATUSES = ['All Status', 'Active', 'Pending', 'Inactive'];
const SORTS    = ['Newest First', 'Oldest First', 'Name A–Z', 'Name Z–A'];
const PER_PAGE_OPTIONS = [5, 10, 20];

const Sel = ({ value, onChange, options, style = {} }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ padding: '7px 10px', borderRadius: 9, border: `1px solid ${C.border}`, fontSize: 13, color: C.textDark, background: C.cardBg, cursor: 'pointer', outline: 'none', fontWeight: 500, ...style }}>
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
);

export default function MembersPage() {
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('All Status');
  const [group,    setGroup]    = useState('All Groups');
  const [sort,     setSort]     = useState('Newest First');
  const [page,     setPage]     = useState(1);
  const [perPage,  setPerPage]  = useState(10);
  const [goTo,     setGoTo]     = useState('');
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = ALL_MEMBERS
    .filter(m => {
      const q = search.toLowerCase();
      return (
        (m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)) &&
        (status === 'All Status' || m.status === status) &&
        (group  === 'All Groups' || m.group  === group)
      );
    })
    .sort((a, b) => {
      if (sort === 'Name A–Z')     return a.name.localeCompare(b.name);
      if (sort === 'Name Z–A')     return b.name.localeCompare(a.name);
      if (sort === 'Oldest First') return a.id - b.id;
      return b.id - a.id;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const reset = (setter) => (val) => { setter(val); setPage(1); };

  const handleGoTo = (e) => {
    if (e.key === 'Enter') {
      const n = parseInt(goTo);
      if (!isNaN(n) && n >= 1 && n <= totalPages) setPage(n);
      setGoTo('');
    }
  };

  // page numbers with ellipsis
  const pageNums = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3)   return [1, 2, 3, '...', totalPages];
    if (safePage >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Row 1: Invite + Export ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 10, border: 'none', background: C.blue, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Invite Member
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.cardBg, fontSize: 13, fontWeight: 600, color: C.textDark, cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export
        </button>
      </div>

      {/* ── Row 2: Search + Filters ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.cardBg, borderRadius: 14, padding: '12px 16px', border: `1px solid ${C.border}` }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', borderRadius: 10, padding: '8px 12px', border: `1px solid ${C.border}` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={C.textLight} strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke={C.textLight} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => reset(setSearch)(e.target.value)} placeholder="Search members..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: C.textDark, width: '100%' }} />
        </div>
        <Sel value={status} onChange={reset(setStatus)} options={STATUSES} />
        <Sel value={group}  onChange={reset(setGroup)}  options={GROUPS} />
        <Sel value={sort}   onChange={reset(setSort)}   options={SORTS} />
      </div>

      {/* ── Row 3: Table ── */}
      <div style={{ background: C.cardBg, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        {/* Table head */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1.3fr 1.6fr 1fr 44px', padding: '15px 20px', borderBottom: `1px solid ${C.border}`, background: '#F8FAFC' }}>
          {['Member', 'Group', 'Joined At', 'Invited By', 'Status', ''].map((h, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.7px', fontFamily: '"DM Sans", "Inter", system-ui, sans-serif' }}>{h}</span>
          ))}
        </div>

        {paged.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: C.textLight, fontSize: 13 }}>No members found.</div>
        ) : paged.map((m, idx) => (
          <div key={m.id}
            style={{ display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1.3fr 1.6fr 1fr 44px', alignItems: 'center', padding: '13px 20px', borderBottom: idx < paged.length - 1 ? `1px solid ${C.border}` : 'none', transition: 'background .15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Member */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="19" cy="15" r="7" fill="#94A3B8" opacity="0.9"/>
                  <ellipse cx="19" cy="32" rx="12" ry="8" fill="#94A3B8" opacity="0.9"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: C.textDark, lineHeight: 1.4 }}>{m.name}</div>
                <div style={{ fontSize: 11.5, color: C.textLight, marginTop: 1 }}>{m.email}</div>
              </div>
            </div>

            {/* Group */}
            <div style={{ fontSize: 13, color: C.textDark, fontWeight: 500 }}>{m.group}</div>

            {/* Joined At */}
            <div style={{ fontSize: 13, color: C.textMid }}>{m.joined}</div>

            {/* Invited By */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke={C.textLight} strokeWidth="2"/>
                <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke={C.textLight} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13, color: C.textDark }}>{m.invitedBy}</span>
            </div>

            {/* Status */}
            <div>
              <span style={{ fontSize: 11.5, fontWeight: 600, borderRadius: 20, padding: '4px 11px', background: STATUS_COLORS[m.status].bg, color: STATUS_COLORS[m.status].color }}>
                {m.status}
              </span>
            </div>

            {/* Three dots */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: C.textLight, display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5"  r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
                </svg>
              </button>
              {openMenu === m.id && (
                <div style={{ position: 'absolute', right: 0, top: 32, zIndex: 10, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 150, overflow: 'hidden' }}>
                  {['View Profile', 'Edit Member', 'Change Status', 'Remove'].map((action, i) => (
                    <button key={i} onClick={() => setOpenMenu(null)}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: action === 'Remove' ? C.red : C.textDark }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >{action}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 4: Pagination ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 8px' }}>

        {/* Col 1: rows per page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: C.textMid }}>Rows per page</span>
          <Sel value={String(perPage)} onChange={v => { setPerPage(Number(v)); setPage(1); }} options={PER_PAGE_OPTIONS.map(String)} style={{ padding: '5px 8px' }} />
        </div>

        {/* Col 2: page buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <PagBtn label="Prev" disabled={safePage === 1} onClick={() => setPage(p => p - 1)} />
          {pageNums().map((p, i) =>
            p === '...'
              ? <span key={i} style={{ padding: '0 4px', color: C.textLight, fontSize: 13 }}>…</span>
              : <PagBtn key={i} label={p} active={p === safePage} onClick={() => setPage(p)} />
          )}
          <PagBtn label="Next" disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)} />
        </div>

        {/* Col 3: go to page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: C.textMid }}>Go to page</span>
          <input
            value={goTo}
            onChange={e => setGoTo(e.target.value)}
            onKeyDown={handleGoTo}
            placeholder={String(safePage)}
            style={{ width: 52, padding: '6px 10px', borderRadius: 9, border: `1px solid ${C.border}`, fontSize: 13, color: C.textDark, outline: 'none', textAlign: 'center' }}
          />
        </div>
      </div>

    </div>
  );
}

const PagBtn = ({ label, onClick, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      minWidth: 34, height: 34, padding: '0 10px', borderRadius: 9,
      border: `1px solid ${active ? C.blue : '#E8EDF5'}`,
      background: active ? '#4A7FE5' : '#FFFFFF',
      fontSize: 13, fontWeight: 600,
      color: active ? '#fff' : disabled ? '#94A3B8' : '#1C2B4A',
      cursor: disabled ? 'default' : 'pointer',
    }}
  >{label}</button>
);
