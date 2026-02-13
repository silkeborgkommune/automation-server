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
                    "primary-content": "#374151",
                    "secondary-content": "#374151",
                    "accent-content": "#374151",
                    "error-content": "#374151",
                },
            },
            {
                "automation-dark": {
                    "color-scheme": "dark",
                    "primary": "#5ba88b",
                    "primary-content": "#ffffff",
                    "secondary": "#3a4a5e",
                    "secondary-content": "#cbd5e1",
                    "accent": "#f7b32b",
                    "accent-content": "#1f2937",
                    "neutral": "#151b27",
                    "neutral-content": "#ffffff",
                    "base-100": "#1e2636",
                    "base-200": "#1a2130",
                    "base-300": "#2d3a4e",
                    "base-content": "#cbd5e1",
                    "error": "#c47a83",
                    "error-content": "#ffffff",
                },
            },
        ],
    },

};
