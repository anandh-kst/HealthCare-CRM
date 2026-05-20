import { useState, useRef, useEffect } from 'react';

/**
 * Reusable custom Dropdown
 * Props:
 *   value       – current selected value (string)
 *   onChange    – (value: string) => void
 *   options     – string[] | { label, value }[]
 *   placeholder – string
 *   searchable  – boolean (default true)
 *   height      – number (trigger height, default 50)
 *   minWidth    – number (default 150)
 */
const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  searchable = true,
  height = 50,
  minWidth = 150,
}) => {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const ref               = useRef(null);
  const searchRef         = useRef(null);

  const normalised = options.map(o =>
    typeof o === 'string' ? { label: o, value: o } : o
  );

  const filtered = query
    ? normalised.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : normalised;

  const selected  = normalised.find(o => o.value === value);
  const isDefault = selected?.value === normalised[0]?.value;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && searchable) setTimeout(() => searchRef.current?.focus(), 50);
    if (!open) setQuery('');
  }, [open]);

  const select = (val) => { onChange(val); setOpen(false); };

  return (
    <div ref={ref} style={{ position: 'relative', minWidth }}>

      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          height, width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          padding: '0 12px',
          background: '#fff',
          border: 'none',
          borderRadius: open ? '10px 10px 0 0' : 10,
          cursor: 'pointer', outline: 'none',
          boxShadow: open ? '0 2px 12px rgba(80,96,168,0.12)' : 'none',
          transition: 'border-color .15s, box-shadow .15s',
        }}
      >
        <span style={{
          fontSize: 13, fontWeight: isDefault ? 400 : 600,
          color: isDefault ? '#94A3B8' : '#1C2B4A',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {selected ? selected.label : placeholder}
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          style={{ flexShrink: 0, color: '#94A3B8', transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
          background: '#fff',
          border: 'none',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 8px 24px rgba(80,96,168,0.15)',
          overflow: 'hidden',
        }}>

          {/* Search */}
          {searchable && (
            <div style={{ padding: '8px 10px', borderBottom: '1px solid #E8EDF5' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: '#F8FAFC', borderRadius: 8, padding: '6px 10px',
                border: '1px solid #E8EDF5',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#94A3B8" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  ref={searchRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 12, color: '#1C2B4A', width: '100%' }}
                />
                {query && (
                  <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94A3B8', display: 'flex' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options — max 5 visible */}
          <div style={{ maxHeight: 5 * 38, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 14px', fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>No results</div>
            ) : filtered.map(o => {
              const isSel = o.value === value;
              return (
                <button
                  key={o.value}
                  onClick={() => select(o.value)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '9px 14px',
                    background: isSel ? '#ECEEF8' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontSize: 13, fontWeight: isSel ? 600 : 400,
                    color: isSel ? '#5060A8' : '#1C2B4A',
                    transition: 'background .1s',
                  }}
                  onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = '#F8FAFC'; }}
                  onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
                >
                  {o.label}
                  {isSel && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#5060A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
