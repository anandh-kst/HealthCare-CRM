import { useState } from 'react';
import Dropdown from '@components/shared/Dropdown';

const C = {
  blue:      '#4A7FE5',
  blueDark:  '#3B6FD4',
  blueLight: '#EEF3FD',
  textDark:  '#1C2B4A',
  textMid:   '#64748B',
  textLight: '#94A3B8',
  border:    '#E8EDF5',
  cardBg:    '#FFFFFF',
  pageBg:    '#F8FAFC',
  red:       '#EF4444',
  rowHover:  '#F8FAFC',
  theadBg:   '#F8FAFC',
};

const STATUS_COLORS = {
  Active:   { bg: '#EEF9F4', color: '#16A34A', dot: '#22C55E' },
  Pending:  { bg: '#FFF8EC', color: '#B45309', dot: '#F59E0B' },
  Inactive: { bg: '#FEF2F2', color: '#DC2626', dot: '#EF4444' },
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

const TABLE_COLUMNS = [
  { key: 'member',    label: 'Member',    icon: 'person' },
  { key: 'group',     label: 'Group',     icon: 'group' },
  { key: 'joined',    label: 'Joined At', icon: 'calendar' },
  { key: 'invitedBy', label: 'Invited By',icon: 'invite' },
  { key: 'status',    label: 'Status',    icon: 'status' },
  { key: 'actions',   label: 'Actions',   icon: null },
];

const HEADER_ICONS = {
  person: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  group: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3z" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 19c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  calendar: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  invite: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20c0-3.31 2.69-6 6-6h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 15l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  status: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l7 4v6c0 5-3.81 9.74-7 10-3.19-.26-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  more: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
};

const SORT_COLUMN_LABELS = {
  joined:   { asc: 'Oldest First', desc: 'Newest First' },
  member:   { asc: 'Name A–Z',    desc: 'Name Z–A' },
};

const SORT_ACCESSORS = {
  member:    m => m.name.toLowerCase(),
  group:     m => m.group.toLowerCase(),
  joined:    m => new Date(m.joined),
  invitedBy: m => m.invitedBy.toLowerCase(),
  status:    m => m.status.toLowerCase(),
};

const SORT_MAP = {
  'Newest First': { key: 'joined', dir: 'desc' },
  'Oldest First': { key: 'joined', dir: 'asc' },
  'Name A–Z':     { key: 'member', dir: 'asc' },
  'Name Z–A':     { key: 'member', dir: 'desc' },
};

export default function MembersPage() {
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('All Status');
  const [group,    setGroup]    = useState('All Groups');
  const [sort,     setSort]     = useState('Newest First');
  const [sortKey,  setSortKey]  = useState('joined');
  const [sortDir,  setSortDir]  = useState('desc');
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
      const aValue = SORT_ACCESSORS[sortKey](a);
      const bValue = SORT_ACCESSORS[sortKey](b);
      let result = 0;

      if (aValue instanceof Date && bValue instanceof Date) {
        result = aValue - bValue;
      } else {
        result = aValue.localeCompare(bValue);
      }

      return sortDir === 'asc' ? result : -result;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const reset = (setter) => (val) => { setter(val); setPage(1); };

  const handleSortChange = (value) => {
    const next = SORT_MAP[value] || SORT_MAP['Newest First'];
    setSort(value);
    setSortKey(next.key);
    setSortDir(next.dir);
    setPage(1);
  };

  const handleHeaderSort = (key) => {
    const nextDir = sortKey === key ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortKey(key);
    setSortDir(nextDir);
    setPage(1);
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 ,padding:"10px 0px"}}>

      {/* ── Single Row: Invite + Search + Filters + Export ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* Invite */}
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, height: 50, padding: '0 18px', borderRadius: 10, border: 'none', background: C.blue, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(74,127,229,0.25)', flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Invite Member
        </button>

        {/* Search */}
        <div style={{ flex: 1, height: 50, display: 'flex', alignItems: 'center', gap: 8, background: C.cardBg, borderRadius: 10, padding: '0 14px', border: `1px solid ${C.border}` }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={C.textLight} strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke={C.textLight} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => reset(setSearch)(e.target.value)} placeholder="Search members..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: C.textDark, width: '100%' }} />
        </div>

        {/* Filters — grouped section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Dropdown value={status} onChange={reset(setStatus)} options={STATUSES} height={50} minWidth={140} />
          <Dropdown value={group}  onChange={reset(setGroup)}  options={GROUPS}   height={50} minWidth={160} />
          <Dropdown value={sort}   onChange={handleSortChange} options={SORTS}    height={50} minWidth={160} searchable={false} />
        </div>

        {/* Export */}
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, height: 50, padding: '0 18px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.cardBg, fontSize: 13, fontWeight: 600, color: C.textMid, cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export
        </button>

      </div>

      {/* ── Row 3: Table ── */}
      <div style={{ background: C.cardBg, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '27%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '6%' }} />
          </colgroup>
          <thead>
            <tr style={{ background: '#EFF6FF' }}>
              {TABLE_COLUMNS.map((col, i) => {
                const isActive = sortKey === col.key;
                const indicator = col.key === 'actions' ? '' : (isActive ? (sortDir === 'asc' ? '▲' : '▼') : '⇅');
                return (
                  <th
                    key={col.key}
                    style={{
                      padding: '13px 20px',
                      textAlign: col.key === 'actions' ? 'right' : 'left',
                      fontSize: 11,
                      fontWeight: 800,
                      color: C.textDark,
                      textTransform: 'uppercase',
                      letterSpacing: '0.9px',
                      borderRight: i < TABLE_COLUMNS.length - 1 ? `1px solid ${C.border}` : 'none',
                      borderBottom: `1px solid ${C.border}`,
                      verticalAlign: 'middle',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => col.key !== 'actions' && handleHeaderSort(col.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        margin: 0,
                        textAlign: 'left',
                        color: C.textDark,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: col.key === 'actions' ? 'default' : 'pointer',
                        justifyContent: col.key === 'actions' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {col.icon && <span style={{ display: 'inline-flex', color: C.textDark }}>{HEADER_ICONS[col.icon]}</span>}
                      <span>{col.label || ''}</span>
                      {col.key !== 'actions' && <span style={{ fontSize: 10, color: C.textMid }}>{indicator}</span>}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: C.textLight, fontSize: 13 }}>
                  No members found.
                </td>
              </tr>
            ) : paged.map((m, idx) => (
              <tr
                key={m.id}
                style={{
                  background: 'transparent',
                  transition: 'background .15s',
                  borderBottom: idx < paged.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.rowHover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '13px 20px', borderRight: `1px solid ${C.border}` }}>
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
                </td>
                <td style={{ padding: '13px 20px', borderRight: `1px solid ${C.border}`, fontSize: 13, color: C.textDark, fontWeight: 500 }}>{m.group}</td>
                <td style={{ padding: '13px 20px', borderRight: `1px solid ${C.border}`, fontSize: 13, color: C.textMid }}>{m.joined}</td>
                <td style={{ padding: '13px 20px', borderRight: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: C.textDark }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke={C.textLight} strokeWidth="2"/>
                    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke={C.textLight} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{m.invitedBy}</span>
                </td>
                <td style={{ padding: '13px 20px', borderRight: `1px solid ${C.border}` }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 11.5, fontWeight: 600, borderRadius: 20,
                    padding: '4px 10px',
                    background: STATUS_COLORS[m.status].bg,
                    color: STATUS_COLORS[m.status].color,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[m.status].dot, flexShrink: 0 }} />
                    {m.status}
                  </span>
                </td>
                <td style={{ padding: '13px 20px', textAlign: 'right' }}>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <button onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: C.textDark, display: 'flex', alignItems: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                        <path d="M10 10.5l2 2 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    {openMenu === m.id && (
                      <div style={{ position: 'absolute', right: 0, top: 32, zIndex: 10, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 150, overflow: 'hidden' }}>
                        {['View Profile', 'Edit Member', 'Change Status', 'Remove'].map((action, i) => (
                          <button key={i} onClick={() => setOpenMenu(null)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: action === 'Remove' ? C.red : C.textDark }}
                            onMouseEnter={e => e.currentTarget.style.background = C.rowHover}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                          >{action}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Row 4: Pagination ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 8px' }}>

        {/* Col 1: rows per page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: C.textMid }}>Rows per page</span>
          <Dropdown value={String(perPage)} onChange={v => { setPerPage(Number(v)); setPage(1); }} options={PER_PAGE_OPTIONS.map(String)} height={36} minWidth={80} searchable={false} />
        </div>

        {/* Col 2: page info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PagBtn label="Prev" disabled={safePage === 1} onClick={() => setPage(p => p - 1)} />
          <span style={{ fontSize: 13, color: C.textDark, minWidth: 80, textAlign: 'center' }}>{safePage} / {totalPages}</span>
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
      background: active ? C.blue : '#FFFFFF',
      fontSize: 13, fontWeight: 600,
      color: active ? '#fff' : disabled ? '#94A3B8' : '#1C2B4A',
      cursor: disabled ? 'default' : 'pointer',
    }}
  >{label}</button>
);
