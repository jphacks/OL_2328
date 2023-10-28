const konstaConfig = require('konsta/config');

export default konstaConfig({
  konsta: {
    colors: {
      primary: '#48bf53',
      "brand-pink": "#ff00ff",
      "brand-black": "#000000",
      "brand-blue": "#0000ff",
    }
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

