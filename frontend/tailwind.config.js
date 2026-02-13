import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{vue,js,ts}'],
  plugins: [daisyui],

    daisyui: {
        themes: [
            {
                automation: {
                    "primary": "#4e937a",
                    "secondary": "#cbd5e1",
                    "accent": "#f7b32b",
                    "neutral": "#273043",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f1f5f9",
                    "base-300": "#cbd5e1",
                    "base-content": "#1f2937",
                    "error": "#b4656f",
                },
            },
        ],
    },

};
