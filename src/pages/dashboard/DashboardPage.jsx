import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
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
    { n: 'Mon', v: 18 }, { n: 'Tue', v: 30 }, { n: 'Wed', v: 25 },
    { n: 'Thu', v: 38 }, { n: 'Fri', v: 32 }, { n: 'Sat', v: 20 }, { n: 'Sun', v: 14 },
  ],
  Month: [
    { n: 'Jan', v: 18 }, { n: 'Feb', v: 14 }, { n: 'Mar', v: 28 },
    { n: 'Apr', v: 20 }, { n: 'May', v: 26 }, { n: 'Jun', v: 32 },
    { n: 'Jul', v: 22 }, { n: 'Aug', v: 28 }, { n: 'Sep', v: 24 },
    { n: 'Oct', v: 36 }, { n: 'Nov', v: 30 }, { n: 'Dec', v: 18 },
  ],
  Year: [
    { n: '2020', v: 280 }, { n: '2021', v: 360 }, { n: '2022', v: 320 },
    { n: '2023', v: 420 }, { n: '2024', v: 480 },
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

// ─── Sparkline bars ───────────────────────────────────────
const Spark = ({ color, vals }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 32 }}>
    {vals.map((h, i) => (
      <div
        key={i}
        style={{
          width: 5, height: h, borderRadius: 2,
          background: color, opacity: 0.55 + i * 0.05,
        }}
      />
    ))}
  </div>
);

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

// ─── Rounded-top bar shape ────────────────────────────────
const RBar = ({ x, y, width, height, fill }) => {
  if (!height || height < 1) return null;
  const r = Math.min(4, width / 2);
  return (
    <path
      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} H${x} Z`}
      fill={fill}
    />
  );
};

// ─── Tooltip ─────────────────────────────────────────────
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #E8EDF5', borderRadius: 10, padding: '6px 12px', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ fontWeight: 600, color: C.textDark, marginBottom: 2 }}>{label}</div>
      <div style={{ color: C.blue, fontWeight: 700 }}>{payload[0].value} appts</div>
    </div>
  );
};

// ─── Stat card ────────────────────────────────────────────
const StatCard = ({ label, value, pct, pctColor = C.emerald, right, iconBg = '#F1F5F9', icon }) => (
  <div style={{ background: C.cardBg, borderRadius: 16, padding: '16px 18px', border: `1px solid ${C.border}`, flex: 1, minWidth: 0 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ fontSize: 12.5, fontWeight: 500, color: C.textMid }}>{label}</span>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color: C.textDark, letterSpacing: '-0.5px', marginBottom: 8 }}>{value}</div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: pctColor }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {pct}
      </span>
      {right}
    </div>
  </div>
);

// ─── SVG icons for stat cards ─────────────────────────────
const IcoUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#94A3B8" strokeWidth="1.8"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IcoUserPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#94A3B8" strokeWidth="1.8"/>
    <line x1="19" y1="8" x2="19" y2="14" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="22" y1="11" x2="16" y2="11" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
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
          label="Active patients"
          value="3,549"
          pct="31% this month"
          icon={<IcoUsers />}
          right={<Spark color="#4ADE80" vals={[8,12,10,16,13,18,15,20,17,22]} />}
        />
        <StatCard
          label="New patients"
          value="+1,537"
          pct="13% this month"
          pctColor={C.red}
          icon={<IcoUserPlus />}
          right={<Spark color="#93C5FD" vals={[10,8,14,12,16,14,18,16,20,18]} />}
        />
        <StatCard
          label="Revenue"
          value="$11,750"
          pct="17% this month"
          icon={<IcoCoin />}
          right={<Spark color="#4ADE80" vals={[12,10,18,14,20,16,22,18,24,20]} />}
        />

        {/* Client satisfaction — special layout */}
        <div style={{ background: C.cardBg, borderRadius: 16, padding: '16px 18px', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: C.textMid }}>Client satisfaction</span>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IcoSmile />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.textDark, letterSpacing: '-0.5px', marginBottom: 6 }}>87%</div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: C.emerald }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                11% this month
              </span>
            </div>
            <Arc pct={87} />
          </div>
        </div>
      </div>

      {/* ── Row 2: Bar chart + Donut ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>

        {/* Bar chart card */}
        <div style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.textDark }}>Total appointments</span>
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
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={data} barSize={tab === 'Month' ? 16 : 24} margin={{ top: 2, right: 2, left: -22, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="0" />
              <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fontSize: 10.5, fill: '#94A3B8', fontFamily: 'Inter' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10.5, fill: '#94A3B8', fontFamily: 'Inter' }} tickFormatter={(v) => `${v/1000 >= 1 ? v/1000+'k' : v}`} />
              <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(74,127,229,0.06)', radius: 6 }} />
              <Bar dataKey="v" shape={<RBar />}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === hiIdx ? C.blueBar : C.greenBar} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut card */}
        <div style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 12 }}>Revenue source distribution</span>

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
          <span style={{ fontSize: 14, fontWeight: 700, color: C.textDark }}>Upcoming patients</span>
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
