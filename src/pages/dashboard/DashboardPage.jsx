import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie,
  AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar,
} from 'recharts';

// ─── Design tokens (mirrors tailwind.config.js) ─────────
const C = {
  navy:        '#1C2B4A',   // text.primary
  blue:        '#5060A8',   // primary.DEFAULT
  blueLight:   '#D6DAF5',   // primary.lighter
  blueMuted:   '#7B8DC4',   // primary.light
  green:       '#7DC4A0',   // success.DEFAULT
  greenLight:  '#C3EDD8',   // success.light
  red:         '#D48A8A',   // danger.DEFAULT
  redLight:    '#FAD0D0',   // danger.light
  amber:       '#E8C97A',   // warning.DEFAULT
  amberLight:  '#FAE5B0',   // warning.light
  purple:      '#A89FD4',   // accent.DEFAULT
  textDark:    '#1C2B4A',   // text.primary
  textMid:     '#64748B',   // text.secondary
  textLight:   '#94A3B8',   // text.muted
  border:      '#E8EDF5',   // surface.border
  cardBg:      '#FFFFFF',   // surface.DEFAULT
  pageBg:      '#dde1f0',   // page.DEFAULT
  emerald:     '#7DC4A0',   // success.DEFAULT
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
  { name: 'Active',   pct: 45, color: '#7DC4A0' },
  { name: 'Inactive', pct: 30, color: '#D48A8A' },
  { name: 'Pending',  pct: 25, color: '#E8C97A' },
];

const challenges = [
  {
    id: 1, title: '10K Step Challenge', type: 'Step Challenge',
    date: 'Nov 15 – Nov 30, 2025', participants: 142,
    progress: 68, iconBg: '#EEF3FD', iconColor: '#4A7FE5',
    createdBy: 'Dr. Sarah Mills', groups: 8, device: 'Fitbit / Apple Watch', location: 'Citywide',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 4v7h7M5 20l4-4m0 0l3-3m-3 3l-3-3m3 3l3 3" stroke="#4A7FE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    id: 2, title: 'Wellness Week Event', type: 'Wellness Event',
    date: 'Dec 1 – Dec 7, 2025', participants: 89,
    progress: 40, iconBg: '#D1FAE5', iconColor: '#10B981',
    createdBy: 'Coach Liam Ray', groups: 5, device: 'Any Device', location: 'Main Hall, Block B',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 4 13.5 4 8.5a8 8 0 0 1 16 0C20 13.5 12 21 12 21z" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8.5" r="2.5" stroke="#10B981" strokeWidth="2"/></svg>,
  },
  {
    id: 3, title: 'Morning Yoga Series', type: 'Yoga Session',
    date: 'Dec 5 – Dec 20, 2025', participants: 57,
    progress: 25, iconBg: '#EDE9FE', iconColor: '#7C3AED',
    createdBy: 'Instructor Priya K.', groups: 3, device: 'Yoga Mat App', location: 'Studio 2, Floor 3',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="2" stroke="#7C3AED" strokeWidth="2"/><path d="M12 6v5m0 0l-4 4m4-4l4 4M8 21l2-4m6 4l-2-4" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

// ─── Card 1: thin bars, gap, highest = blue
const SparkBars = ({ vals = [] }) => {
  const max = Math.max(...vals);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 52, width: '100%' }}>
      {vals.map((v, i) => (
        <div key={i} style={{
          width: 6, flexShrink: 0, borderRadius: 4,
          height: `${Math.max(15, (v / max) * 100)}%`,
          background: v === max ? '#7BA7D4' : '#7DC4A0',
        }} />
      ))}
    </div>
  );
};
// Card 2: area chart with filled bg
const SparkArea = ({ vals = [] }) => {
  const d = vals.map((v) => ({ v }));
  return (
    <div style={{ width: '100%', height: 52 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={d} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7BA7D4" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7BA7D4" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke="#7BA7D4" strokeWidth={2}
            fill="url(#areaGrad)" dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
// Card 3: thin bars each with gray top padding (like a track behind each bar)
const SparkBarsGray = ({ vals = [] }) => {
  const max = Math.max(...vals);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 52, width: '100%' }}>
      {vals.map((v, i) => {
        const pct = Math.max(15, (v / max) * 100);
        return (
          <div key={i} style={{ width: 6, flexShrink: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: 4, overflow: 'hidden', background: 'rgba(241,245,249,0.7)' }}>
            <div style={{ height: `${pct}%`, background: v >= 30 ? '#7DC4A0' : '#D48A8A', borderRadius: 4 }} />
          </div>
        );
      })}
    </div>
  );
};
// Card 4: speedometer gauge
const SparkArc = ({ pct = 80 }) => {
  const vW = 100, vH = 56;
  const cx = vW / 2, cy = vH;
  const r = 40, sw = 12;
  const toRad = (d) => (d * Math.PI) / 180;
  const pt = (deg) => [
    cx + r * Math.cos(toRad(deg)),
    cy - r * Math.sin(toRad(deg)),
  ];
  const [sx, sy] = pt(180);
  const [ex, ey] = pt(0);
  // total arc length of semicircle
  const arcLen = Math.PI * r;
  const fillLen = (pct / 100) * arcLen;
  const fillDeg = 180 - (pct / 100) * 180;
  const [nx, ny] = pt(fillDeg);
  const nLen = r - 8;
  const needleX = cx + nLen * Math.cos(toRad(fillDeg));
  const needleY = cy - nLen * Math.sin(toRad(fillDeg));
  return (
    <div style={{ width: '100%', height: vH }}>
      <svg width="100%" height={vH} viewBox={`0 0 ${vW} ${vH}`} preserveAspectRatio="xMidYMid meet">
        {/* full gray track */}
        <path d={`M${sx},${sy} A${r},${r} 0 0,1 ${ex},${ey}`}
          fill="none" stroke="#E2E8F0" strokeWidth={sw} strokeLinecap="butt" opacity={0.5} />
        {/* colored fill using dasharray — same path, no gap */}
        <path d={`M${sx},${sy} A${r},${r} 0 0,1 ${ex},${ey}`}
          fill="none" stroke="#A89FD4" strokeWidth={sw} strokeLinecap="butt" opacity={0.6}
          strokeDasharray={`${fillLen} ${arcLen}`} />
        {/* needle */}
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#475569" strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
        <circle cx={cx} cy={cy} r="3.5" fill="#475569" opacity={0.5} />
      </svg>
    </div>
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

// ─── Rounded Donut (custom SVG arcs with rounded ends) ──────────
const RoundedDonut = ({ data, size = 170, cx = 81, cy = 81, innerRadius = 48, outerRadius = 78, animate = false }) => {
  const r = (innerRadius + outerRadius) / 2;
  const sw = outerRadius - innerRadius;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.pct, 0);
  // extra angle to hide the rounded cap overlap (half strokeWidth on each side)
  const gapAngle = (40 / (2 * Math.PI * r)) * 360;
  let angle = 90;
  return (
    <div style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {data.map((d, idx) => {
          const sweep = (d.pct / total) * 360 - gapAngle;
          const start = angle;
          angle += sweep + gapAngle;
          const endA = start + sweep;
          const toRad = (a) => (a * Math.PI) / 180;
          const x1 = cx + r * Math.cos(toRad(start));
          const y1 = cy - r * Math.sin(toRad(start));
          const x2 = cx + r * Math.cos(toRad(endA));
          const y2 = cy - r * Math.sin(toRad(endA));
          const large = (endA - start) > 180 ? 1 : 0;
          const arcLen = (sweep / 360) * circ;
          return (
            <path
              key={d.name}
              d={`M${x1},${y1} A${r},${r} 0 ${large},0 ${x2},${y2}`}
              fill="none"
              stroke={d.color}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={`${arcLen} ${circ}`}
              strokeDashoffset={animate ? 0 : arcLen}
              style={{ transition: `stroke-dashoffset 0.9s ease ${idx * 0.08}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
};

const AnimatedNumber = ({ target, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(Math.max(0, target - 20));

  useEffect(() => {
    const start = Math.max(0, target - 20);
    let current = start;
    const increment = Math.max(1, Math.ceil((target - start) / 20));
    setCount(current);
    const interval = window.setInterval(() => {
      current = Math.min(target, current + increment);
      setCount(current);
      if (current >= target) {
        window.clearInterval(interval);
      }
    }, 50);
    return () => window.clearInterval(interval);
  }, [target]);

  return (
    <span>{prefix}{new Intl.NumberFormat().format(count)}{suffix}</span>
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
const StatCard = ({ label, value, prefix = '', suffix = '', animated = false, pct, pctColor = C.emerald, right, iconBg = '#F1F5F9', icon }) => (
  <div
    className="dashboard-card"
    style={{ background: C.cardBg, borderRadius: 16, padding: '24px 18px', border: `1px solid ${C.border}`, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20, transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'default' }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(74,127,229,0.13)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
  >
    {/* Row 1: title + icon */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span className="card-title">{label}</span>
      <div style={{ width: 38, height: 38, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>

    </div>
    {/* Row 2: value+pct (50%) + graph (50%) */}
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: C.textDark, letterSpacing: '-0.5px', lineHeight: 1 }}>
          {animated && typeof value === 'number' ? (
            <AnimatedNumber target={value} prefix={prefix} suffix={suffix} />
          ) : typeof value === 'number' ? (
            `${prefix}${new Intl.NumberFormat().format(value)}${suffix}`
          ) : (
            value
          )}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: pctColor }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          {pct}
        </span>
      </div>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        {right}
      </div>
    </div>
  </div>
);

// ─── SVG icons ─────────────────────────────────────────────
const IcoUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#1C2B4A" strokeWidth="2.5"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const IcoUserCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#1C2B4A" strokeWidth="2.5"/>
    <path d="M16 11l2 2 4-4" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoUserX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="9" cy="7" r="4" stroke="#1C2B4A" strokeWidth="2.5"/>
    <line x1="17" y1="10" x2="23" y2="16" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="23" y1="10" x2="17" y2="16" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const IcoUserPlus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#1C2B4A" strokeWidth="2.5"/>
    <path d="M2 8l10 7 10-7" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M17 3v4M15 5h4" stroke="#1C2B4A" strokeWidth="2.5" strokeLinecap="round"/>
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
  const [ready, setReady] = useState(false);
  const [chartDataState, setChartDataState] = useState([]);
  const data = chartData[tab];
  const hiIdx = HIGHLIGHT_IDX[tab];

  useEffect(() => {
    setReady(false);
    setChartDataState([]);
    const timer = window.setTimeout(() => {
      setChartDataState(chartData[tab]);
      setReady(true);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [tab]);


  return (
    <div className="dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', padding: '8px 0 16px' }}>

      {/* ── Row 1: 4 stat cards ── */}
      <div className="dashboard-grid-cols-4 dashboard-stat-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>

        <StatCard
          label="Total Members"
          value={3549}
          pct="31% this month"
          icon={<IcoUsers />}
          iconBg="#D6E4FA"
          right={<SparkBars vals={[8,12,10,16,13,18,15]} />}
          animated
        />
        <StatCard
          label="Active Members"
          value={2847}
          pct="18% this month"
          icon={<IcoUserCheck />}
          iconBg="#C3EDD8"
          right={<SparkArea vals={[10,14,12,16,18,15,20,22,19,24,21,26]} />}
          animated
        />
        <StatCard
          label="Non Active Members"
          value={702}
          pct="8% this month"
          pctColor={C.red}
          icon={<IcoUserX />}
          iconBg="#FAD0D0"
          right={<SparkBarsGray vals={[14,10,18,12,16,8,20]} />}
          animated
        />
        <StatCard
          label="New Invites (last 30 days)"
          value={1537}
          prefix="+"
          pct="13% this month"
          icon={<IcoUserPlus />}
          iconBg="#FAE5B0"
          right={<SparkArc pct={80} />}
          animated
        />
      </div>

      {/* ── Row 2: Bar chart + Donut ── */}
      <div className="dashboard-grid-cols-2 dashboard-card-row" style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14 }}>

        {/* Bar chart card */}
        <div className="dashboard-card dashboard-chart-card" style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px 0', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexShrink: 0 }}>
            <span className="card-title">Member Growth Trends</span>
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
            <BarChart data={ready ? chartDataState : []} barSize={tab === 'Month' ? 26 : 34} margin={{ top: 10, right: 2, left: -22, bottom: 10 }} barCategoryGap="35%">
              <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="0" />
              <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fontSize: 10.5, fill: '#94A3B8', fontFamily: 'Inter' }} height={22} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10.5, fill: '#94A3B8', fontFamily: 'Inter' }} tickFormatter={(v) => `${v/1000 >= 1 ? v/1000+'k' : v}`} />
              <Tooltip content={<ChartTip />} cursor={false} />
              {/* Single value bar only — no background track */}
              <Bar dataKey="v" shape={<RBar />} animationBegin={80} animationDuration={1000} animationEasing="ease-out" isAnimationActive={ready}>
                {(ready ? chartDataState : []).map((_, i) => (
                  <Cell key={i} fill={i === hiIdx ? '#7BA7D4' : '#7DC4A0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Donut card */}
        <div className="dashboard-card dashboard-donut-card" style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
          <span className="card-title" style={{ marginBottom: 12 }}>Member Status Distribution</span>

          {/* Donut + legend side by side */}
          <div className="dashboard-donut-layout" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div className="dashboard-donut-visual" style={{ position: 'relative', flexShrink: 0, width: '50%', display: 'flex', justifyContent: 'center' }}>
              <RoundedDonut data={donutData} size={220} cx={106} cy={106} innerRadius={64} outerRadius={100} animate={ready} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 36, height: 36, borderRadius: '50%',
                background: '#F1F5F9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            {/* Legend + banner stacked in 40% */}
            <div className="dashboard-donut-legend" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '50%' }}>
              {donutData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ fontSize: 12, color: '#64748B' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.textDark }}>{d.pct}%</span>
                </div>
              ))}
              {/* Info banner inside 40% column */}
              <div style={{ marginTop: 4, background: '#EEF3FD', borderRadius: 10, padding: '7px 10px', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="9" stroke={C.blue} strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke={C.blue} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: 11, color: C.blue, fontWeight: 500, lineHeight: 1.5 }}>
                  Active members increased by 12% this month!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Upcoming Challenges ── */}
      <div className="dashboard-card dashboard-challenges-card" style={{ background: C.cardBg, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          <span className="card-title">Upcoming Challenges</span>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: C.blue, background: 'none', border: 'none', cursor: 'pointer' }}>
            View all
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="dashboard-grid-cols-3 dashboard-challenges-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {challenges.map((c) => (
            <div
              key={c.id}
              style={{ border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 18px', cursor: 'pointer', transition: 'box-shadow .2s, transform .2s', background: C.cardBg }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(74,127,229,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.textDark, lineHeight: 1.3 }}>{c.title}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c.iconColor, background: c.iconBg, borderRadius: 20, padding: '2px 8px', display: 'inline-block', marginTop: 3 }}>{c.type}</span>
                </div>
              </div>

              {/* Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, background: '#F8FAFC', borderRadius: 8, padding: '6px 10px' }}>
                <IcoCalSmall />
                <span style={{ fontSize: 12, color: C.textMid, fontWeight: 500 }}>{c.date}</span>
              </div>

              {/* Meta info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                  { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#94A3B8" strokeWidth="2"/></svg>, label: 'Created By', value: c.createdBy },
                  { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#94A3B8" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#94A3B8" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#94A3B8" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="#94A3B8" strokeWidth="2"/></svg>, label: 'Groups', value: `${c.groups} groups` },
                  { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke="#94A3B8" strokeWidth="2"/><path d="M12 18h.01" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/></svg>, label: 'Device', value: c.device },
                  { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" stroke="#94A3B8" strokeWidth="2"/><circle cx="12" cy="10" r="2" stroke="#94A3B8" strokeWidth="2"/></svg>, label: 'Location', value: c.location },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#F8FAFC', borderRadius: 8, padding: '7px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                      {item.icon}
                      <span style={{ fontSize: 10, color: C.textLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textDark }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: C.textMid, fontWeight: 500 }}>{c.participants} members</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.iconColor }}>{c.progress}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: '#F1F5F9', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${c.progress}%`, background: c.iconColor, borderRadius: 99, opacity: 0.75 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
