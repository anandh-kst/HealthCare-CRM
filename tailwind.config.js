/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand Blue (dashboard primary) ──
        primary: {
          DEFAULT: '#5060A8',
          light:   '#7B8DC4',
          lighter: '#D6DAF5',
          dark:    '#3D4E8A',
          darker:  '#2C3A6E',
        },
        // ── Success / Green ──
        success: {
          DEFAULT: '#7DC4A0',
          light:   '#C3EDD8',
          lighter: '#EDFAF3',
          dark:    '#4A9E72',
        },
        // ── Danger / Red ──
        danger: {
          DEFAULT: '#D48A8A',
          light:   '#FAD0D0',
          lighter: '#FEF2F2',
          dark:    '#B85555',
        },
        // ── Warning / Amber ──
        warning: {
          DEFAULT: '#E8C97A',
          light:   '#FAE5B0',
          lighter: '#FEF9EC',
          dark:    '#C9A030',
        },
        // ── Purple / Accent ──
        accent: {
          DEFAULT: '#A89FD4',
          light:   '#D6D2F0',
          lighter: '#F0EFFE',
          dark:    '#7C6FBF',
        },
        // ── Neutral / Surface ──
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F8FAFC',
          subtle:  '#F1F5F9',
          border:  '#E8EDF5',
          borderDark: '#D0DEFA',
        },
        // ── Page background ──
        page: {
          DEFAULT: '#dde1f0',
        },
        // ── Text ──
        text: {
          primary:   'rgb(61,61,61)',
          secondary: 'rgb(61,61,61)',
          muted:     'rgb(61,61,61)',
          inverse:   '#FFFFFF',
        },
        // ── Donut / Status ──
        status: {
          active:   '#7DC4A0',
          inactive: '#D48A8A',
          pending:  '#E8C97A',
        },
      },
      fontFamily: {
        sans: ['Myriad Pro', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['2.25rem', { lineHeight: '2.5rem',  fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'heading-lg': ['1.5rem',   { lineHeight: '2rem',    fontWeight: '600' }],
        'heading-sm': ['1.25rem',  { lineHeight: '1.75rem', fontWeight: '600' }],
        'body-lg':    ['1rem',     { lineHeight: '1.75rem' }],
        'body-sm':    ['0.875rem', { lineHeight: '1.5rem'  }],
        'caption':    ['0.75rem',  { lineHeight: '1.25rem' }],
      },
      spacing: {
        sidebar:             '16rem',
        'sidebar-collapsed': '4.5rem',
        topbar:              '4rem',
      },
      boxShadow: {
        card:     '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        panel:    '0 4px 6px -1px rgba(0,0,0,0.07)',
        modal:    '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        dropdown: '0 10px 15px -3px rgba(0,0,0,0.08)',
        blue:     '0 2px 8px rgba(74,127,229,0.25)',
        card_hover: '0 8px 32px rgba(74,127,229,0.13)',
      },
      borderRadius: {
        card: '0.75rem',
        xl2: '1rem',
        xl3: '1.25rem',
      },
      screens: {
        xs: '475px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
