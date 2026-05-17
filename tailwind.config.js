/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B8DEF',
          light:   '#7BA7F7',
          dark:    '#3B6FD4',
        },
        secondary: {
          DEFAULT: '#6366F1',
          light:   '#818CF8',
          dark:    '#4F46E5',
        },
        success: {
          DEFAULT: '#22C55E',
          light:   '#4ADE80',
          dark:    '#16A34A',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light:   '#FCD34D',
          dark:    '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',
          light:   '#FCA5A5',
          dark:    '#DC2626',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F8FAFC',
          border:  '#E2E8F0',
        },
        text: {
          primary:   '#0F172A',
          secondary: '#475569',
          muted:     '#94A3B8',
          inverse:   '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
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
        sidebar:         '16rem',
        'sidebar-collapsed': '4.5rem',
        topbar:          '4rem',
      },
      boxShadow: {
        card:   '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        panel:  '0 4px 6px -1px rgba(0,0,0,0.07)',
        modal:  '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        dropdown: '0 10px 15px -3px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        card: '0.75rem',
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
