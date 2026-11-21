export const colors = {
  // Brand colors
  skyBlue: '#92C4EA',
  deepBlue: '#0552A2',
  nepalRed: '#EC1F27',
  goldenYellow: '#FDB716',
  pureWhite: '#FFFFFF',
  glacierWhite: '#FFFFFF',

  // Semantic colors
  background: '#FFFFFF',
  foreground: '#17212B',
  muted: '#6B7A8A',
  mutedLight: '#E8EDF2',
  border: '#E0E6ED',
  borderLight: '#F0F4F7',

  // Surface colors
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F2F8FD',

  // Accent colors (sparingly used)
  accentRed: '#EC1F27',
  accentYellow: '#FDB716',
  accentBlue: '#92C4EA',

  // Status
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',

  // Navigation
  navTransparent: 'transparent',
  navSolid: 'rgba(255, 255, 255, 0.95)',
  navScrolled: 'rgba(255, 255, 255, 0.98)',
  navBorder: 'rgba(23, 33, 43, 0.08)',
} as const;

export const typography = {
  fonts: {
    heading: 'DM Serif Display, Georgia, serif',
    body: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'JetBrains Mono, Fira Code, monospace',
  },
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '2rem',      // 32px
    '4xl': '2.5rem',    // 40px
    '5xl': '3.5rem',    // 56px
    '6xl': '4.5rem',    // 72px
    '7xl': '6rem',      // 96px
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.75',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const motion = {
  durations: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  stagger: {
    fast: '0.05s',
    normal: '0.08s',
    slow: '0.12s',
  },
} as const;

export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(23, 33, 43, 0.04)',
  sm: '0 1px 3px rgba(23, 33, 43, 0.06), 0 1px 2px rgba(23, 33, 43, 0.04)',
  md: '0 4px 6px rgba(23, 33, 43, 0.05), 0 2px 4px rgba(23, 33, 43, 0.03)',
  lg: '0 10px 15px rgba(23, 33, 43, 0.05), 0 4px 6px rgba(23, 33, 43, 0.03)',
  xl: '0 20px 25px rgba(23, 33, 43, 0.05), 0 8px 10px rgba(23, 33, 43, 0.03)',
  '2xl': '0 25px 50px rgba(23, 33, 43, 0.08)',
  inner: 'inset 0 2px 4px rgba(23, 33, 43, 0.04)',
  focus: '0 0 0 3px rgba(5, 82, 162, 0.3)',
} as const;

export const radii = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const zIndices = {
  hide: -1,
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0, 0, 0.2, 1)',
  normal: '300ms cubic-bezier(0, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0, 0, 0.2, 1)',
} as const;

export const container = {
  maxWidth: '1280px',
  padding: '1.5rem', // 24px
  paddingLg: '3rem', // 48px
} as const;

export type DesignTokens = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  breakpoints: typeof breakpoints;
  motion: typeof motion;
  shadows: typeof shadows;
  radii: typeof radii;
  zIndices: typeof zIndices;
  transitions: typeof transitions;
  container: typeof container;
};