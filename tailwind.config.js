const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js', './config/**/*.js'],
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
        'Sriracha': ['Sriracha', 'Sriracha', ...defaultTheme.fontFamily.sans],
        'Gloria': ['Gloria Hallelujah', 'cursive', ...defaultTheme.fontFamily.sans],
        'SourceCode': ['Source Code Pro', 'monospace', ...defaultTheme.fontFamily.sans],
        'wotfard': ["Wotfard", 'Futura', '-apple-system', 'sans-serif' ]
      },
      height: {
        'f-card': '220px',
        'f-card-c': '200px',
        'p-card': '350px',
        '200': '40rem',
        '70': '70px',
        '9/10': '90%'
      },
      width: {
        '70': '70px',
        '80': '80px',
        'f-card': '350px',

      },
      maxHeight: {
        'screen-50': '50vh',
        'screen-60': '60vh',
      },
      minHeight: {
        '12': '40px',
        '40': '80px',
        '60': '100px',
        'f-card': '220px',
        'screen-40': '380px',
        'screen-25': '25vh',
        'screen-35': '35vh'
      },
      maxWidth: {
        'f-card': '420px',
        '47': '47rem'
      },
      minWidth: {
        'f-card': '420px',
        't-topic': '180px'
      },
      zIndex: {
        '1000': 1000,
      },
      colors: {
        'primary-color': 'var(--fg-primary)',
        'primary-bg': 'var(--bg-primary)',
        'primary-bg-float': 'var(--bg-primary-float)',
        'second-color': 'var(--fg-secondary)',
        'second-bg': 'var(--bg-secondary)', // post bg
        'third-color': 'var(--fg-third)',
        'third-bg': 'var(--bg-third)',
        'code-bg': 'var(--bg-code)',
        'code-color': 'var(--fg-code)',
        'playground-bg': 'var(--bg-playground)',
        'hover-color': 'var(--fg-hover)',
        'hover-bg': 'var(--bg-hover)',
        'blockquote-bg': 'var(--bg-blockquote)',
        'blockquote-l': 'var(--bg-blockquote-l)',
        'mask-bg': 'var(--bg-mask)',
        'success-bg': 'var(--bg-success)',
        'success-color': 'var(--fg-success)',
        'info-bg': 'var(--bg-info)',
        'info-color': 'var(--fg-info)',
        'warning-bg': 'var(--bg-warning)',
        'warning-color': 'var(--fg-warning)',
        'anchor-color': 'var(--fg-anchor)',
        'border-color': 'var(--fg-border)',
        'border-color-5': 'var(--fg-border-5)',

        'black-2': '#222222',
        'code': '#087ea4',
        'accent': 'var(--accent)',
        'nav-color': '#3d5b7d',
        'icon-color': '#00c2ff',
        's-color': "#3D5B7D",
        cyan: '#79FFE1',
      },
      backgroundImage: {
        'header-cover': 'linear-gradient(-165deg, var(--bg-primary-dark), var(--bg-primary-light))',
        'card-cover': 'linear-gradient(180deg, var(--bg-primary-dark), var(--bg-primary-light))',
        'post-cover': 'linear-gradient(90deg, var(--bg-primary-dark), var(--bg-primary-light))',
        'header-color': 'var(--rainbow-gradient, --fg-primary)',
        'ver-color': 'linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%)'
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
        '4xl': '-1rem 0 3rem -2rem #000',
        '5xl': '-2rem 0 3rem -2rem #000'

      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}
