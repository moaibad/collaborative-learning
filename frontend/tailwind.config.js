const { left } = require("@popperjs/core");

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Wix Madefor Display', 'sans-serif'],
      body: ['Wix Madefor'],
    },
    extend: {
      fontSize: {
        xxs: ['0.625rem', '0.75rem'],
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'brown': '#AB8A5C',
        'silver': '#BEBEBE',
        'gold': '#E5BC42',
        'platinum': '#6DA4AE',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      inset: {
        '70px': '70px',
        '78px': '78px',
      },
      width: {
        84: '21rem',
        88: '22rem',
        120: '30rem',
        160: '40rem',
        180: '45rem', 
        200: '50rem',
        300: '75rem',
        400: '100rem',
        760: '760px',
        780: '780px',
        800: '800px',
        1100: '68.75rem',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      top: {
        30: '7.5rem',
        34: '8.5rem'
      },
      height: {
        84: '21rem',
        88: '22rem',
        160: '40rem',
        180: '45rem', 
        200: '50rem',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
    },
  },
  plugins: [],
};