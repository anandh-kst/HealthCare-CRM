import { useState, useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Today's appointments",
  'Active patients count',
  'Latest lab results',
  'Schedule a follow-up',
];

const WELCOME = {
  id: 0, role: 'bot', time: ts(),
  text: "Hi 👋 I'm **Care Bot**, your AI healthcare assistant.\nAsk me anything about patients, appointments, or reports.",
};

function ts() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── Bold markdown ─────────────────────────────────────────
const Md = ({ text }) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  );

// ── Typing dots ───────────────────────────────────────────
const Dots = () => (
  <div style={{ display: 'flex', gap: 5, padding: '3px 0' }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{
        width: 7, height: 7, borderRadius: '50%', background: '#94A3B8',
        display: 'inline-block',
        animation: `cbDot 1.2s ease-in-out ${i * 0.2}s infinite`,
      }} />
    ))}
  </div>
);

// ── Bot mini avatar ───────────────────────────────────────
const Avatar = ({ s = 28 }) => (
  <div style={{
    width: s, height: s, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg,#4A7FE5,#7BAAF7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <svg width={s * 0.54} height={s * 0.54} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="12" rx="4" fill="white"/>
      <circle cx="9"  cy="14" r="1.4" fill="#4A7FE5"/>
      <circle cx="15" cy="14" r="1.4" fill="#4A7FE5"/>
      <path d="M9 18h6" stroke="#4A7FE5" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 8V5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="4" r="1.4" fill="white"/>
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────
export default function CareBot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput]       = useState('');
  const [messages, setMessages] = useState([WELCOME]);
  const [typing, setTyping]     = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const taRef     = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => { if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [chatOpen]);
  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 96) + 'px';
    }
  }, [input]);

  const send = (txt) => {
    const t = (txt ?? input).trim();
    if (!t) return;
    setMessages((p) => [...p, { id: Date.now(), role: 'user', text: t, time: ts() }]);
    setInput('');
    setTyping(true);
    // ── TODO: replace with ChatGPT API ──
    // await fetch('https://api.openai.com/v1/chat/completions', { ... })
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [...p, {
        id: Date.now() + 1, role: 'bot', time: ts(),
        text: `You asked: **"${t}"**\n\nConnect your OpenAI API key and I'll answer with real healthcare data.`,
      }]);
    }, 1400);
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      <style>{`
        @keyframes cbDot {
          0%,80%,100%{transform:translateY(0);opacity:.3}
          40%{transform:translateY(-5px);opacity:1}
        }
        @keyframes cbUp {
          from{opacity:0;transform:translateY(18px) scale(.96)}
          to  {opacity:1;transform:translateY(0)    scale(1)}
        }
        @keyframes cbIn {
          from{opacity:0;transform:translateY(6px)}
          to  {opacity:1;transform:translateY(0)}
        }
        @keyframes cbGlow {
          0%,100%{box-shadow:0 8px 28px rgba(74,127,229,.45)}
          50%    {box-shadow:0 8px 36px rgba(74,127,229,.7)}
        }
        @keyframes cbDotPulse {
          0%,100%{transform:scale(1);opacity:1}
          50%    {transform:scale(1.4);opacity:.7}
        }
        .cb-fab{
          display:flex; align-items:center; gap:11px;
          background:linear-gradient(135deg,#4A7FE5 0%,#7BAAF7 100%);
          border-radius:50px; height:54px;
          padding:0 20px 0 10px;
          border:none; cursor:pointer;
          animation:cbGlow 3s ease-in-out infinite;
          transition:transform .2s ease, filter .2s ease;
        }
        .cb-fab:hover{ transform:translateY(-3px); filter:brightness(1.06); }
        /* chat panel */
        .cb-panel{ animation:cbUp .28s cubic-bezier(.22,1,.36,1) both; }
        .cb-msg  { animation:cbIn .2s ease both; }
        /* scrollbar */
        .cb-scroll::-webkit-scrollbar{width:3px}
        .cb-scroll::-webkit-scrollbar-thumb{background:#E2E8F0;border-radius:4px}
        /* input */
        .cb-ta{ transition:border-color .15s,box-shadow .15s; }
        .cb-ta:focus{ outline:none; border-color:#4A7FE5 !important; box-shadow:0 0 0 3px rgba(74,127,229,.1) !important; }
        /* send */
        .cb-send:hover:not(:disabled){ filter:brightness(1.1); transform:scale(1.05); }
        /* chip */
        .cb-chip:hover{ background:#EEF3FD !important; border-color:#4A7FE5 !important; color:#4A7FE5 !important; }
        /* header close */
        .cb-hdr-x:hover{ background:rgba(255,255,255,.28) !important; }
      `}</style>

      {/* ══════════════════════════════════════════
          FAB — fixed pill, always icon + text
      ══════════════════════════════════════════ */}
      <div className="cb-fab-wrap" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999 }}>
        <button
          className="cb-fab"
          onClick={() => setChatOpen((o) => !o)}
        >
          {/* Icon circle */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="18" height="12" rx="4" fill="white"/>
              <circle cx="9"  cy="14" r="1.6" fill="#4A7FE5"/>
              <circle cx="15" cy="14" r="1.6" fill="#4A7FE5"/>
              <path d="M9 18h6" stroke="#4A7FE5" strokeWidth="1.7" strokeLinecap="round"/>
              <path d="M12 8V5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="12" cy="4" r="1.6" fill="white"/>
            </svg>
            {/* Green online dot */}
            <span style={{
              position: 'absolute', bottom: 1, right: 1,
              width: 9, height: 9, borderRadius: '50%',
              background: '#22C55E',
              border: '1.5px solid white',
              animation: 'cbDotPulse 2.5s ease-in-out infinite',
            }} />
          </div>

          {/* Text */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.1px' }}>
              Care Bot
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', fontWeight: 500, lineHeight: 1.2 }}>
              AI Assistant
            </div>
          </div>
        </button>
      </div>

      {/* ══════════════════════════════════════════
          Chat Panel
      ══════════════════════════════════════════ */}
      {chatOpen && (
        <div
          className="cb-panel-wrap"
          style={{
            position: 'fixed', bottom: 92, right: 28, zIndex: 9998,
            width: 385,
            background: '#fff',
            borderRadius: 22,
            boxShadow: '0 24px 72px rgba(0,0,0,.14), 0 4px 20px rgba(0,0,0,.07)',
            border: '1px solid rgba(74,127,229,.1)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,#4A7FE5,#7BAAF7)',
            padding: '13px 14px',
            display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0,
          }}>
            <Avatar s={42} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff' }}>Care Bot</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
                  Online · AI Healthcare Assistant
                </span>
              </div>
            </div>
            {/* X close */}
            <button
              className="cb-hdr-x"
              onClick={() => setChatOpen(false)}
              style={{
                width: 30, height: 30, borderRadius: 9,
                background: 'rgba(255,255,255,.15)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background .15s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.3" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Date divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 2px' }}>
            <div style={{ flex: 1, height: 1, background: '#F1F5F9' }} />
            <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 500, whiteSpace: 'nowrap' }}>
              {new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <div style={{ flex: 1, height: 1, background: '#F1F5F9' }} />
          </div>

          {/* Messages */}
          <div className="cb-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 6px', minHeight: 260, maxHeight: 340 }}>
            {messages.map((m) => (
              <div key={m.id} className="cb-msg" style={{
                display: 'flex',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end', gap: 8, marginBottom: 14,
              }}>
                {m.role === 'bot' && <Avatar s={26} />}
                {m.role === 'user' && (
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: '#EEF2F8', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="7" r="4" stroke="#64748B" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                <div style={{ maxWidth: '75%' }}>
                  <div style={{
                    padding: '9px 13px',
                    borderRadius: m.role === 'user' ? '16px 16px 3px 16px' : '16px 16px 16px 3px',
                    background: m.role === 'user' ? 'linear-gradient(135deg,#4A7FE5,#7BAAF7)' : '#F8FAFC',
                    color: m.role === 'user' ? '#fff' : '#1C2B4A',
                    fontSize: 13.5, lineHeight: 1.6,
                    border: m.role === 'bot' ? '1px solid #EEF2F8' : 'none',
                    whiteSpace: 'pre-line',
                    boxShadow: m.role === 'user' ? '0 3px 10px rgba(74,127,229,.22)' : '0 1px 3px rgba(0,0,0,.04)',
                  }}>
                    <Md text={m.text} />
                  </div>
                  <div style={{
                    fontSize: 10, color: '#B0BAC9', marginTop: 3,
                    textAlign: m.role === 'user' ? 'right' : 'left',
                    padding: m.role === 'user' ? '0 4px 0 0' : '0 0 0 4px',
                  }}>{m.time}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="cb-msg" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 14 }}>
                <Avatar s={26} />
                <div style={{
                  padding: '9px 13px', borderRadius: '16px 16px 16px 3px',
                  background: '#F8FAFC', border: '1px solid #EEF2F8',
                }}>
                  <Dots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div style={{ padding: '2px 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTIONS.map((s) => (
                <button key={s} className="cb-chip" onClick={() => send(s)} style={{
                  fontSize: 11.5, fontWeight: 500, color: '#64748B',
                  background: '#F8FAFC', border: '1px solid #E8EDF5',
                  borderRadius: 20, padding: '5px 11px',
                  cursor: 'pointer', transition: 'all .15s',
                }}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '9px 11px 11px', borderTop: '1px solid #F1F5F9',
            display: 'flex', alignItems: 'flex-end', gap: 8,
            flexShrink: 0, background: '#FAFBFD',
          }}>
            <textarea
              ref={(el) => { inputRef.current = el; taRef.current = el; }}
              className="cb-ta"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask Care Bot anything…"
              rows={1}
              style={{
                flex: 1, resize: 'none', border: '1.5px solid #E8EDF5',
                borderRadius: 13, padding: '9px 12px',
                fontSize: 13.5, color: '#1C2B4A',
                background: '#fff', fontFamily: 'Inter,system-ui,sans-serif',
                lineHeight: 1.5, overflowY: 'hidden',
              }}
            />
            <button
              className="cb-send"
              onClick={() => send()}
              disabled={!input.trim()}
              style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: input.trim() ? 'linear-gradient(135deg,#4A7FE5,#7BAAF7)' : '#EEF2F8',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .18s',
                boxShadow: input.trim() ? '0 4px 12px rgba(74,127,229,.3)' : 'none',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke={input.trim() ? 'white' : '#94A3B8'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" fill={input.trim() ? 'white' : 'none'} stroke={input.trim() ? 'white' : '#94A3B8'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center', fontSize: 10.5, color: '#C8D0DC',
            padding: '5px 0 9px', background: '#FAFBFD',
          }}>
            Powered by <strong style={{ color: '#94A3B8' }}>Care Bot AI</strong> · Ready for ChatGPT
          </div>
        </div>
      )}
    </>
  );
}
