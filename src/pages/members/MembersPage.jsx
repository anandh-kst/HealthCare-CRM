import { useMemo, useState } from 'react';
import { FiCalendar, FiCheckCircle, FiMail, FiMoreVertical, FiUser, FiUsers } from 'react-icons/fi';
import Dropdown from '@components/shared/Dropdown';
import InviteMembersPopup from '@components/shared/InviteMembersPopup';

const C = {
  blue:      '#4A7FE5',
  blueDark:  '#3B6FD4',
  blueLight: '#EEF3FD',
  textDark:  'rgb(61,61,61)',
  textMid:   'rgb(61,61,61)',
  textLight: 'rgb(61,61,61)',
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
  person: <FiUser size={14} />,
  group: <FiUsers size={14} />,
  calendar: <FiCalendar size={14} />,
  invite: <FiMail size={14} />,
  status: <FiCheckCircle size={14} />,
  more: <FiMoreVertical size={14} />,
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
  const [showInvitePopup, setShowInvitePopup] = useState(false);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return ALL_MEMBERS
      .filter(m => {
        return (
          (m.name.toLowerCase().includes(query) || m.email.toLowerCase().includes(query)) &&
          (status === 'All Status' || m.status === status) &&
          (group === 'All Groups' || m.group === group)
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
  }, [search, status, group, sortKey, sortDir]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filtered.length / perPage)), [filtered.length, perPage]);
  const safePage   = Math.min(page, totalPages);
  const paged      = useMemo(() => filtered.slice((safePage - 1) * perPage, safePage * perPage), [filtered, safePage, perPage]);

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
      const n = parseInt(goTo, 10);
      if (!isNaN(n) && n >= 1 && n <= totalPages) setPage(n);
      setGoTo('');
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 ,padding:"10px 0px"}}>

      {/* ── Single Row: Invite + Search + Filters + Export ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* Search */}
        <div style={{ flex: 1, height: 50, display: 'flex', alignItems: 'center', gap: 8, background: C.cardBg, borderRadius: 10, padding: '0 14px', border: `1px solid ${C.border}` }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={C.textDark} strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke={C.textDark} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => reset(setSearch)(e.target.value)} placeholder="Search members..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: C.textDark, width: '100%' }} />
        </div>

        {/* Filters — grouped section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Dropdown value={status} onChange={reset(setStatus)} options={STATUSES} height={50} minWidth={140} />
          <Dropdown value={group}  onChange={reset(setGroup)}  options={GROUPS}   height={50} minWidth={160} />
          <Dropdown value={sort}   onChange={handleSortChange} options={SORTS}    height={50} minWidth={160} searchable={false} />
        </div>

        {/* Invite */}
        <button type="button" onClick={() => setShowInvitePopup(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, height: 50, padding: '0 18px', borderRadius: 10, border: 'none', background: C.blue, fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(74,127,229,0.25)', flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Invite Member
        </button>

        {/* Export */}
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 7, height: 50, padding: '0 18px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.cardBg, fontSize: 14, fontWeight: 700, color: C.textDark, cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export
        </button>

      </div>

      <InviteMembersPopup
        isOpen={showInvitePopup}
        onClose={() => setShowInvitePopup(false)}
        onSubmit={(payload) => {
          console.log('Invite payload:', payload);
        }}
      />

      {/* ── Row 3: Table ── */}
      <div className="responsive-table" style={{ background: C.cardBg, borderRadius: 16, border: `1px solid ${C.border}` }}>
        <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', borderSpacing: 0 }}>
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
                      fontSize: 12,
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
                        fontSize: 14,
                        fontWeight: 800,
                        cursor: col.key === 'actions' ? 'default' : 'pointer',
                        justifyContent: col.key === 'actions' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {col.icon && <span style={{ display: 'inline-flex', color: C.textDark }}>{HEADER_ICONS[col.icon]}</span>}
                        <span>{col.label || ''}</span>
                      {col.key !== 'actions' && <span style={{ fontSize: 14, color: C.textDark, fontWeight: 700 }}>{indicator}</span>}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: C.textDark, fontSize: 14, fontWeight: 700 }}>
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
                <td style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19" cy="15" r="7" fill="#94A3B8" opacity="0.9"/>
                        <ellipse cx="19" cy="32" rx="12" ry="8" fill="#94A3B8" opacity="0.9"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: C.textDark, lineHeight: 1.4, textTransform: 'uppercase' }}>{m.name}</div>
                      <div style={{ fontSize: 14, color: C.textDark, fontWeight: 400, marginTop: 1 }}>{m.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, fontSize: 14, color: C.textDark, fontWeight: 400, verticalAlign: 'middle' }}>{m.group}</td>
                <td style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, fontSize: 14, color: C.textDark, fontWeight: 400, verticalAlign: 'middle' }}>{m.joined}</td>
                <td style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, color: C.textDark, fontWeight: 400, lineHeight: 1.4 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
                      <circle cx="12" cy="8" r="4" stroke={C.textDark} strokeWidth="2"/>
                      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke={C.textDark} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ lineHeight: '20px' }}>{m.invitedBy}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 18px', borderRight: `1px solid ${C.border}`, verticalAlign: 'middle' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 14, fontWeight: 400, borderRadius: 20,
                    padding: '4px 10px',
                    background: STATUS_COLORS[m.status].bg,
                    color: STATUS_COLORS[m.status].color,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[m.status].dot, flexShrink: 0 }} />
                    {m.status}
                  </span>
                </td>
                <td style={{ padding: '10px 18px', textAlign: 'right', verticalAlign: 'middle' }}>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <button type="button" onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: C.textDark, display: 'flex', alignItems: 'center' }}>
                      <FiMoreVertical size={18} />
                    </button>
                    {openMenu === m.id && (
                      <div style={{ position: 'absolute', right: 0, top: 32, zIndex: 10, background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 150, overflow: 'hidden' }}>
                        {['View Profile', 'Edit Member', 'Change Status', 'Remove'].map((action, i) => (
                          <button key={i} onClick={() => setOpenMenu(null)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', fontSize: 14, fontWeight: 400, cursor: 'pointer', color: action === 'Remove' ? C.red : C.textDark }}
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
          <span style={{ fontSize: 14, color: C.textDark, fontWeight: 700 }}>Rows per page</span>
        </div>

        {/* Col 2: page info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PagBtn label="Prev" disabled={safePage === 1} onClick={() => setPage(p => p - 1)} />
          <span style={{ fontSize: 14, color: C.textDark, minWidth: 80, textAlign: 'center' }}>{safePage} / {totalPages}</span>
          <PagBtn label="Next" disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)} />
        </div>

        {/* Col 3: go to page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: C.textDark, fontWeight: 700 }}>Go to page</span>
          <input
            value={goTo}
            onChange={e => setGoTo(e.target.value)}
            onKeyDown={handleGoTo}
            placeholder={String(safePage)}
            style={{ width: 52, padding: '6px 10px', borderRadius: 9, border: `1px solid ${C.border}`, fontSize: 14, color: C.textDark, outline: 'none', textAlign: 'center' }}
          />
        </div>
      </div>

    </div>
  );
}

const PagBtn = ({ label, onClick, disabled, active }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    style={{
      minWidth: 34, height: 34, padding: '0 10px', borderRadius: 9,
      border: `1px solid ${active ? C.blue : '#E8EDF5'}`,
      background: active ? C.blue : '#FFFFFF',
      fontSize: 14, fontWeight: 600,
      color: active ? '#fff' : 'rgb(61,61,61)',
      cursor: disabled ? 'default' : 'pointer',
    }}
  >{label}</button>
);
