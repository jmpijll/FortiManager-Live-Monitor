/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--background) / 1)`
            : `hsl(var(--background) / ${opacityValue})`,
        foreground: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--foreground) / 1)`
            : `hsl(var(--foreground) / ${opacityValue})`,
        border: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--border) / 1)`
            : `hsl(var(--border) / ${opacityValue})`,
        card: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--card) / 1)`
            : `hsl(var(--card) / ${opacityValue})`,
        'card-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--card-foreground) / 1)`
            : `hsl(var(--card-foreground) / ${opacityValue})`,
        popover: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--popover) / 1)`
            : `hsl(var(--popover) / ${opacityValue})`,
        'popover-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--popover-foreground) / 1)`
            : `hsl(var(--popover-foreground) / ${opacityValue})`,
        primary: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--primary) / 1)`
            : `hsl(var(--primary) / ${opacityValue})`,
        'primary-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--primary-foreground) / 1)`
            : `hsl(var(--primary-foreground) / ${opacityValue})`,
        secondary: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--secondary) / 1)`
            : `hsl(var(--secondary) / ${opacityValue})`,
        'secondary-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--secondary-foreground) / 1)`
            : `hsl(var(--secondary-foreground) / ${opacityValue})`,
        muted: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--muted) / 1)`
            : `hsl(var(--muted) / ${opacityValue})`,
        'muted-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--muted-foreground) / 1)`
            : `hsl(var(--muted-foreground) / ${opacityValue})`,
        accent: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--accent) / 1)`
            : `hsl(var(--accent) / ${opacityValue})`,
        'accent-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--accent-foreground) / 1)`
            : `hsl(var(--accent-foreground) / ${opacityValue})`,
        destructive: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--destructive) / 1)`
            : `hsl(var(--destructive) / ${opacityValue})`,
        'destructive-foreground': ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--destructive-foreground) / 1)`
            : `hsl(var(--destructive-foreground) / ${opacityValue})`,
        input: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--input) / 1)`
            : `hsl(var(--input) / ${opacityValue})`,
        ring: ({ opacityValue }) =>
          opacityValue === undefined
            ? `hsl(var(--ring) / 1)`
            : `hsl(var(--ring) / ${opacityValue})`,
      },
    },
  },
  plugins: [],
};
