module.exports = {
    purge: [
      './src/**/*.html',
      './src/**/*.js',
    ],
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    daisyui: {
      themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "forest"],
    },
    plugins: [require("daisyui")],
  };
  