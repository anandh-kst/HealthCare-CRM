import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
  AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar,
} from 'recharts';

// ─── Exact colors from screenshot ────────────────────────
const C = {
  navy:        '#1C2B4A',
  blue:        '#4A7FE5',
  blueLight:   '#EEF3FD',
  green:       '#4ADE80',
  greenBar:    '#BBF7D0',
  greenBarAct: '#4ADE80',
  blueBar:     '#4A7FE5',
  textDark:    '#1C2B4A',
  textMid:     '#64748B',
  textLight:   '#94A3B8',
  border:      '#E8EDF5',
  cardBg:      '#FFFFFF',
  pageBg:      '#EEF2F8',
  emerald:     '#10B981',
  red:         '#F87171',
};

// ─── Mock data ────────────────────────────────────────────
const chartData = {
  Week: [
    { n: 'Mon', v: 18, max: 40 }, { n: 'Tue', v: 30, max: 40 }, { n: 'Wed', v: 25, max: 40 },
    { n: 'Thu', v: 38, max: 40 }, { n: 'Fri', v: 32, max: 40 }, { n: 'Sat', v: 20, max: 40 }, { n: 'Sun', v: 14, max: 40 },
  ],
  Month: [
    { n: 'Jan', v: 18, max: 40 }, { n: 'Feb', v: 14, max: 40 }, { n: 'Mar', v: 28, max: 40 },
    { n: 'Apr', v: 20, max: 40 }, { n: 'May', v: 26, max: 40 }, { n: 'Jun', v: 32, max: 40 },
    { n: 'Jul', v: 22, max: 40 }, { n: 'Aug', v: 28, max: 40 }, { n: 'Sep', v: 24, max: 40 },
    { n: 'Oct', v: 36, max: 40 }, { n: 'Nov', v: 30, max: 40 }, { n: 'Dec', v: 18, max: 40 },
  ],
  Year: [
    { n: '2020', v: 280, max: 500 }, { n: '2021', v: 360, max: 500 }, { n: '2022', v: 320, max: 500 },
    { n: '2023', v: 420, max: 500 }, { n: '2024', v: 480, max: 500 },
  ],
};

// Oct is the highlighted bar (index 9 in Month)
const HIGHLIGHT_IDX = { Week: 3, Month: 9, Year: 3 };

const donutData = [
  { name: 'Consultations', pct: 33, color: '#FBBF24' },
  { name: 'Lab tests',     pct: 23, color: '#60A5FA' },
  { name: 'Operation',     pct: 19, color: '#34D399' },
  { name: 'Insurance',     pct: 13, color: '#A78BFA' },
  { name: 'Others',        pct: 12, color: '#F87171' },
];

const patients = [
  {
    id: 1, name: 'Chloe Wilson',  dx: 'Thyroid function follow-up',
    date: 'Tue, Nov 13, 2025, 9:30 a.m.', dr: 'Dr. Daniel Ross',
    initials: 'CW', bg: '#FEE2E2', fg: '#EF4444',
  },
  {
    id: 2, name: 'Marcus Reed',   dx: 'Check-up',
    date: 'Tue, Nov 13, 2025, 12 a.m.',   dr: 'Dr. Liam Taylor',
    initials: 'MR', bg: '#FEF3C7', fg: '#D97706',
  },
  {
    id: 3, name: 'Bessie Cooper', dx: 'Type 2 diabetes',
    date: 'Tue, Nov 13, 2025, 11:45 a.m.', dr: 'Dr. Emily Parker',
    initials: 'BC', bg: '#EDE9FE', fg: '#7C3AED',
  },
];

// ─── Mini chart variants ─────────────────────────────────
// ─── Mini charts matching reference ──────────────────────────
// Card 1 & 3: green vertical bars
const SparkBars = ({ vals = [] }) => {
  const max = Math.max(...vals);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52, flexShrink: 0 }}>
      {vals.map((v, i) => (
        <div key={i} style={{
          width: 7, borderRadius: 4,
          height: `${Math.max(20, (v / max) * 100)}%`,
          background: '#4ADE80',
          opacity: 0.45 + (i / vals.length) * 0.5,
        }} />
      ))}
    </div>
  );
};
// Card 2: blue wavy line
const SparkWave = ({ vals = [] }) => {
  const d = vals.map((v) => ({ v }));
  return (
    <LineChart width={130} height={56} data={d} margin={{ top: 8, right: 4, left: 4, bottom: 4 }}>
      <Line type="monotone" dataKey="v" stroke="#818CF8" strokeWidth={2}
        dot={false} isAnimationActive={false} />
    </LineChart>
  );
};
// Card 4: half-moon arc with tick
const SparkArc = ({ pct = 87 }) => {
  const W = 90, H = 58;
  const cx = W / 2, cy = H - 4;
  const r = 36, sw = 8;
  const toRad = (d) => (d * Math.PI) / 180;
  const pt = (deg) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];
  const [x1, y1] = pt(180);
  const [x2, y2] = pt(0);
  const endDeg = 180 - (pct / 100) * 180;
  const [ex, ey] = pt(endDeg);
  const lg = pct > 50 ? 1 : 0;
  return (
    <svg width={W} height={H}>
      <path d={`M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2}`}
        fill="none" stroke="#E8EDF5" strokeWidth={sw} strokeLinecap="round" />
      <path d={`M${x1},${y1} A${r},${r} 0 ${lg},1 ${ex},${ey}`}
        fill="none" stroke="#818CF8" strokeWidth={sw} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={14} fill="#EEF3FD" />
      <path d={`M${cx-5},${cy} l4 4 6-6`} stroke="#818CF8" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

// ─── Circular arc (client satisfaction) ──────────────────
const Arc = ({ pct }) => {
  const r = 26, cx = 34, cy = 34;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="68" height="68" viewBox="0 0 68 68">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E8EDF5" strokeWidth="5.5" />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={C.blue} strokeWidth="5.5"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* small tick icon at end */}
      <circle cx={cx} cy={cy} r="10" fill={C.blueLight} />
      <path d="M29 34l3 3 7-7" stroke={C.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
};

// ─── Rounded bar (used for both bg track and value) ────────────
const RBar = ({ x, y, width, height, fill }) => {
  if (!height || height < 1) return null;
  const r = Math.min(width / 2, height / 2);
  return (
    <path
      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height - r} Q${x + width},${y + height} ${x + width - r},${y + height} H${x + r} Q${x},${y + height} ${x},${y + height - r} Z`}
      fill={fill}
    />
  );
};

// ─── Tooltip ─────────────────────────────────────────────
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #E8EDF5', borderRadius: 10, padding: '6px 12px', fontSize: 12 }}>
      <div style={{ fontWeight: 600, color: C.textDark, marginBottom: 2 }}>{label}</div>
      <div style={{ color: C.blue, fontWeight: 700 }}>{payload[0].value} appts</div>
    </div>
  );
};

// ─── Stat card ────────────────────────────────────────────
const StatCard = ({ label, value, pct, pctColor = C.emerald, right, iconBg = '#F1F5F9', icon }) => (
  <div style={{ background: C.cardBg, borderRadius: 16, padding: '16px 18px', border: `1px solid ${C.border}`, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: C.textMid }}>{label}</span>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: C.textDark, letterSpacing: '-0.5px', marginBottom: 6 }}>{value}</div>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: pctColor }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {pct}
      </span>
      <div style={{ alignSelf: 'flex-end' }}>{right}</div>
    </div>
  </div>
);

// ─── SVG icons for stat cards ─────────────────────────────
// Total Members → group of people
const IcoUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
// Active members → user with checkmark
const IcoUserCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
    <path d="M16 11l2 2 4-4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
// Non-active members → user with X
const IcoUserX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
    <line x1="17" y1="10" x2="23" y2="16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <line x1="23" y1="10" x2="17" y2="16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
// New invites → envelope with plus
const IcoUserPlus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#94A3B8" strokeWidth="2"/>
    <path d="M2 8l10 7 10-7" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 3v4M15 5h4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IcoCoin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#94A3B8" strokeWidth="1.8"/>
    <path d="M12 7v1.5M12 15.5V17M9.5 10C9.5 8.9 10.6 8 12 8s2.5.9 2.5 2c0 2.2-5 2.2-5 4.5 0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IcoSmile = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#94A3B8" strokeWidth="1.8"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="9.5" r="1" fill="#94A3B8"/>
    <circle cx="15" cy="9.5" r="1" fill="#94A3B8"/>
  </svg>
);
const IcoCalSmall = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="#94A3B8" strokeWidth="2"/>
    <path d="M3 9h18M8 2v4M16 2v4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IcoDrSmall = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
  </svg>
);

// ─── Main ─────────────────────────────────────────────────
export default function DashboardPage() {
  const [tab, setTab] = useState('Month');
  const data = chartData[tab];
  const hiIdx = HIGHLIGHT_IDX[tab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>

      {/* ── Row 1: 4 stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>

        <StatCard
          label="Total Members"
          value="3,549"
          pct="31% this month"
          icon={<IcoUsers />}
          iconBg="#EEF3FD"
          right={<SparkBars vals={[8,12,10,16,13,18,15,20,17,22,19,24]} />}
        />
        <StatCard
          label="Active Members"
          value="2,847"
          pct="18% this month"
          icon={<IcoUserCheck />}
          iconBg="#D1FAE5"
          right={<SparkWave vals={[10,14,12,16,18,15,20,22,19,24,21,26]} />}
        />
        <StatCard
          label="Non Active Members"
          value="702"
          pct="8% this month"
          pctColor={C.red}
          icon={<IcoUserX />}
          iconBg="#FEE2E2"
          right={<SparkBars vals={[14,10,18,12,16,8,20,14,18,12,16,10]} />}
        />
        <StatCard
          label="New Invites (last 30 days)"
          value="+1,537"
          pct="13% this month"
          icon={<IcoUserPlus />}
          iconBg="#FEF3C7"
          right={<SparkArc pct={72} />}
        />
      </div>

      {/* ── Row 2: Bar chart + Donut ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>

        {/* Bar chart card */}
        <div style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px 0', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexShrink: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.textDark }}>Member Growth Trends</span>
            {/* Tab switcher */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 3, gap: 2 }}>
              {['Week', 'Month', 'Year'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: '4px 12px', borderRadius: 8, fontSize: 11.5, fontWeight: 600,
                    border: 'none', cursor: 'pointer', transition: 'all .15s',
                    background: tab === t ? '#FFFFFF' : 'transparent',
                    color: tab === t ? C.textDark : C.textLight,
                    boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={tab === 'Month' ? 26 : 34} margin={{ top: 10, right: 2, left: -22, bottom: 10 }} barCategoryGap="35%">
              <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="0" />
              <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fontSize: 10.5, fill: '#94A3B8', fontFamily: 'Inter' }} height={22} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10.5, fill: '#94A3B8', fontFamily: 'Inter' }} tickFormatter={(v) => `${v/1000 >= 1 ? v/1000+'k' : v}`} />
              <Tooltip content={<ChartTip />} cursor={false} />
              {/* Single value bar only — no background track */}
              <Bar dataKey="v" shape={<RBar />} isAnimationActive={false}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === hiIdx ? '#4A7FE5' : '#86EFAC'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Donut card */}
        <div style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.textDark, marginBottom: 12 }}>Revenue source distribution</span>

          {/* Donut chart */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: 10 }}>
            <PieChart width={170} height={170}>
              <Pie
                data={donutData} dataKey="pct"
                cx={81} cy={81}
                innerRadius={48} outerRadius={78}
                paddingAngle={2.5}
                startAngle={90} endAngle={-270}
                stroke="none"
              >
                {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
            </PieChart>
            {/* Center icon */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 36, height: 36, borderRadius: '50%',
              background: '#F1F5F9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IcoCoin />
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            {donutData.map((d) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ fontSize: 11.5, color: '#64748B' }}>{d.name}</span>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: C.textDark }}>{d.pct}%</span>
              </div>
            ))}
          </div>

          {/* Info banner */}
          <div style={{
            marginTop: 12, background: '#EEF3FD', borderRadius: 10,
            padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" stroke={C.blue} strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 11, color: C.blue, fontWeight: 500 }}>
              Your insurance income is climbing by 12%!
            </span>
          </div>
        </div>
      </div>

      {/* ── Row 3: Upcoming patients ── */}
      <div style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.textDark }}>Upcoming patients</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Prev / Next arrows */}
            {[
              <path key="l" d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>,
              <path key="r" d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>,
            ].map((p, i) => (
              <button key={i} style={{
                width: 26, height: 26, borderRadius: 7,
                border: `1px solid ${C.border}`, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#94A3B8',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">{p}</svg>
              </button>
            ))}
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: C.blue, background: 'none', border: 'none', cursor: 'pointer' }}>
              View all
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {patients.map((p) => (
            <div
              key={p.id}
              style={{
                border: `1px solid ${C.border}`, borderRadius: 14,
                padding: '14px 16px', cursor: 'pointer', transition: 'box-shadow .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(74,127,229,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Patient header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: p.bg, color: p.fg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, flexShrink: 0,
                }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.textDark, lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: C.textMid, marginTop: 1 }}>{p.dx}</div>
                </div>
              </div>
              {/* Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <IcoCalSmall />
                <span style={{ fontSize: 11, color: C.textMid }}>{p.date}</span>
              </div>
              {/* Doctor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <IcoDrSmall />
                <span style={{ fontSize: 11, color: C.textMid }}>{p.dr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
