import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        foreground: "var(--fg)",
        "foreground-muted": "var(--fg-muted)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        accent: "var(--accent)",
        "accent-secondary": "var(--accent-secondary)",
        "accent-muted": "var(--accent-muted)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-display)", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        bespoke: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        prose: "56ch",
      },
    },
  },
  plugins: [],
};

export default config;
