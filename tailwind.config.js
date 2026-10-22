/** @type {import('tailwindcss').Config} */
// Colors are Lampcircle's brand roles (the app's docs/brand/README.md), laid onto the Midnight Luxe structure:
// midnight navy for the dark, amber for the accent, cream for the light.
// Type, spacing and line-height follow the golden ratio (GOLDEN-RATIO-AUDIT.md).
const PHI = 1.61803398875;
const rem = n => `${+n.toFixed(6)}rem`;

// Spacer ladder: s6 = 1.5rem, each step φ apart. Halves and doubles are for top/bottom padding only.
const spacing = {};
for (let n = 1; n <= 11; n++) {
  const step = 1.5 * PHI ** (n - 6);
  spacing[`s${n}`] = rem(step);
  spacing[`half-s${n}`] = rem(step / 2);
  spacing[`double-s${n}`] = rem(step * 2);
}

// Type scale: t0 = 1rem, each step φ apart.
const fontSize = {};
for (let n = -1; n <= 5; n++) fontSize[`t${n}`] = rem(PHI ** n);

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Replaced, not extended, so only the φ sizes and line-heights exist.
    fontSize,
    lineHeight: {
      none: '1', // glyphs centered in fixed boxes
      tight: '1.145898',
      snug: '1.236064',
      read: '1.381966',
      loose: '1.618034',
    },
    extend: {
      spacing,
      colors: {
        midnight: '#070D13',
        navy: '#10283A',
        panel: '#0D1822',
        raised: '#15263A',
        line: '#1E3243',
        edge: '#3A5873',
        cream: '#F6ECDD',
        paper: '#FBF7F1',
        mist: '#97A9B9', // secondary text on dark
        smoke: '#5D6B77', // secondary text on light
        amber: {
          DEFAULT: '#F0A64B',
          light: '#E8A24E',
          hover: '#FFC777',
          text: '#F5B35E', // amber text on dark
          deep: '#94570F', // amber text on cream
        },
        // Section shades from the app, quietest to strongest.
        shade: { light: '#EDE3D3', mid: '#CFD8E0', dark: '#46617A' },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        drama: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(240 166 75 / 0.35), 0 0 28px -2px rgb(240 166 75 / 0.55)',
        card: '0 30px 60px -36px rgb(16 40 58 / 0.45)',
      },
    },
  },
  plugins: [],
};
