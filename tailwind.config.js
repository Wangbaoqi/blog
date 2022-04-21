const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js'],
  darkMode: 'class',
  theme: {
    fontSize: {
      'pre': '13px',
      'tiny': '15px',
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      fontFamily: {
        'sans': ['Titillium Web', ...defaultTheme.fontFamily.sans],
        'advent': ['Advent Pro', ...defaultTheme.fontFamily.sans],
        'source': ['Source Code Pro', 'monospace', ...defaultTheme.fontFamily.sans],
        'Sriracha': ['Sriracha', 'Sriracha', ...defaultTheme.fontFamily.sans],
      },
      height: {
        'f-card': '300px'
      },
      width: {
      },
      maxHeight: {
        'screen-50': '50vh',
      },
      minHeight: {
        'f-card': '300px'
      },
      maxWidth: {
        'f-card': '420px',
      },
      minWidth: {
        'f-card': '420px'
      },
      zIndex: {
        '1000': 1000,
      },
      colors: {
        'primary-color': 'var(--fg-primary)',
        'primary-bg': 'var(--bg-primary)',
        'second-color': '',
        'second-bg': 'var(--bg-secondary)',
        'third-color': 'var(--fg-third)',
        'third-bg': 'var(--bg-third)',

        'code-bg': 'var(--bg-code)',
        'code-color': 'var(--fg-code)',
        'playground-bg': 'var(--bg-playground)',
        'hover-color': 'var(--fg-hover)',
        'blockquote-bg': 'var(--bg-blockquote)',
        'blockquote-l': 'var(--bg-blockquote-l)',
        
        'black-2': '#222222',
        'code': '#087ea4',
        'border-color': 'var(--fg-border)',
        'border-color-5': 'var(--fg-border-5)',
        'accent': 'var(--accent)',
        // 'accent-2': '#EAEAEA',
        // 'accent-7': '#333',
        'nav-color': '#3d5b7d',
        'icon-color': '#00c2ff',
        's-color': "#3D5B7D",
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      backgroundImage: {
        'header-cover': 'linear-gradient(0deg, var(--bg-primary-dark), var(--bg-primary-light) )'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
        '3xl': '0px 0.8px 2px rgba(0,0,0,0.032),0px 2.7px 6.7px rgba(0,0,0,0.048),0px 12px 30px rgba(0,0,0,0.08)',

      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}
