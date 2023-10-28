const konstaConfig = require('konsta/config');

export default konstaConfig({
  konsta: {
    colors: {
      primary: '#48bf53'
    }
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

