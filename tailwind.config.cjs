/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-li-hover': '#4256D0',
        'blue-bg-aside': '#4658AC',
      },
      backgroundImage: {
        'schema-gradient':
          'linear-gradient(180deg, #131C55 0%, rgba(19, 28, 85, 0.35) 104.8%, rgba(19, 28, 85, 0.00) 169.64%);',
        'schema-pattern': "url('../public/images/schema-pattern.png')",
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },

  plugins: [],
};
