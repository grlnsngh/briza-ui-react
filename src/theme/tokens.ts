/**
 * Design Tokens for Briza UI React
 *
 * This file contains the core design tokens that define the visual foundation
 * of the design system. Tokens are organized into categories and follow a
 * naming convention that makes them easy to use and maintain.
 */

// =============================================================================
// BASE COLORS (Primitive colors - raw values)
// =============================================================================
export const baseColors = {
  // Grays (neutral colors)
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Blue (primary)
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // Purple (secondary)
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
  },

  // Green (success)
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  // Yellow (warning)
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
  },

  // Red (danger)
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // White and Black
  white: "#ffffff",
  black: "#000000",
} as const;

// =============================================================================
// SEMANTIC COLORS (Mapped to base colors with semantic meaning)
// =============================================================================
export const colors = {
  // Default/Neutral colors (used for default button)
  default: {
    50: baseColors.gray[50],
    100: baseColors.gray[100],
    200: baseColors.gray[200],
    300: baseColors.gray[300],
    400: baseColors.gray[400],
    500: baseColors.gray[500],
    DEFAULT: baseColors.gray[400], // Used as main default color
    600: baseColors.gray[600],
    700: baseColors.gray[700],
    800: baseColors.gray[800],
    900: baseColors.gray[900],
    foreground: baseColors.gray[900],
  },

  // Primary colors (main brand color)
  primary: {
    50: baseColors.blue[50],
    100: baseColors.blue[100],
    200: baseColors.blue[200],
    300: baseColors.blue[300],
    400: baseColors.blue[400],
    500: baseColors.blue[500],
    DEFAULT: baseColors.blue[500], // Used as main primary color
    600: baseColors.blue[600],
    700: baseColors.blue[700],
    800: baseColors.blue[800],
    900: baseColors.blue[900],
    foreground: baseColors.white,
  },

  // Secondary colors
  secondary: {
    50: baseColors.purple[50],
    100: baseColors.purple[100],
    200: baseColors.purple[200],
    300: baseColors.purple[300],
    400: baseColors.purple[400],
    500: baseColors.purple[500],
    DEFAULT: baseColors.purple[600], // Used as main secondary color (matches CSS)
    600: baseColors.purple[600],
    700: baseColors.purple[700],
    800: baseColors.purple[800],
    900: baseColors.purple[900],
    foreground: baseColors.white,
  },

  // Success colors
  success: {
    50: baseColors.green[50],
    100: baseColors.green[100],
    200: baseColors.green[200],
    300: baseColors.green[300],
    400: baseColors.green[400],
    500: baseColors.green[500],
    DEFAULT: baseColors.green[500], // Used as main success color
    600: baseColors.green[600],
    700: baseColors.green[700],
    800: baseColors.green[800],
    900: baseColors.green[900],
    foreground: baseColors.white,
  },

  // Warning colors
  warning: {
    50: baseColors.yellow[50],
    100: baseColors.yellow[100],
    200: baseColors.yellow[200],
    300: baseColors.yellow[300],
    400: baseColors.yellow[400],
    500: baseColors.yellow[500],
    DEFAULT: baseColors.yellow[500], // Used as main warning color
    600: baseColors.yellow[600],
    700: baseColors.yellow[700],
    800: baseColors.yellow[800],
    900: baseColors.yellow[900],
    foreground: baseColors.black,
  },

  // Danger/Error colors
  danger: {
    50: baseColors.red[50],
    100: baseColors.red[100],
    200: baseColors.red[200],
    300: baseColors.red[300],
    400: baseColors.red[400],
    500: baseColors.red[500],
    DEFAULT: baseColors.red[500], // Used as main danger color
    600: baseColors.red[600],
    700: baseColors.red[700],
    800: baseColors.red[800],
    900: baseColors.red[900],
    foreground: baseColors.white,
  },

  // Background and foreground
  background: baseColors.white,
  foreground: baseColors.gray[900],
} as const;

// =============================================================================
// TYPOGRAPHY SCALE
// =============================================================================
export const typography = {
  // Font sizes (based on Button component usage)
  fontSize: {
    xs: "0.75rem", // 12px - used in button--xs
    sm: "0.875rem", // 14px - used in button--sm and button--md
    base: "1rem", // 16px - used in button--lg
    lg: "1.125rem", // 18px - used in button--xl
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
  },

  // Font weights (based on Button component usage)
  fontWeight: {
    normal: "400",
    medium: "500", // used in most button sizes
    semibold: "600", // used in button--xl
    bold: "700",
  },

  // Line heights
  lineHeight: {
    none: "1",
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// =============================================================================
// SPACING SCALE
// =============================================================================
export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px - used in button--xs padding
  1.5: "0.375rem", // 6px - used in button--sm padding
  2: "0.5rem", // 8px - used in button--md padding, button content spacing
  3: "0.75rem", // 12px - used in button--lg padding
  4: "1rem", // 16px - used in button--xl padding
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px - used in button--xl padding
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================
export const radius = {
  none: "0px", // button--radius-none
  sm: "0.125rem", // 2px - button--radius-sm
  DEFAULT: "0.25rem", // 4px - button--radius-md (default)
  md: "0.25rem", // 4px - button--radius-md
  lg: "0.5rem", // 8px - button--radius-lg
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px", // button--radius-full
} as const;

// =============================================================================
// SHADOWS
// =============================================================================
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",

  // Button-specific shadows (from button.module.css)
  button:
    "0 8px 25px -5px rgba(0, 0, 0, 0.25), 0 4px 10px -2px rgba(0, 0, 0, 0.1)",
  buttonHover:
    "0 20px 40px -10px rgba(0, 0, 0, 0.35), 0 8px 20px -4px rgba(0, 0, 0, 0.15)",

  // Glow effects (from button.module.css glowing variant)
  glow: {
    default: "0 0 20px rgba(212, 212, 216, 0.6)",
    defaultHover: "0 0 30px rgba(212, 212, 216, 0.8)",
    primary: "0 0 20px rgba(59, 130, 246, 0.6)",
    primaryHover: "0 0 30px rgba(59, 130, 246, 0.8)",
    secondary: "0 0 20px rgba(139, 92, 246, 0.6)",
    secondaryHover: "0 0 30px rgba(139, 92, 246, 0.8)",
    success: "0 0 20px rgba(34, 197, 94, 0.6)",
    successHover: "0 0 30px rgba(34, 197, 94, 0.8)",
    warning: "0 0 20px rgba(234, 179, 8, 0.6)",
    warningHover: "0 0 30px rgba(234, 179, 8, 0.8)",
    danger: "0 0 20px rgba(239, 68, 68, 0.6)",
    dangerHover: "0 0 30px rgba(239, 68, 68, 0.8)",
  },
} as const;

// =============================================================================
// OPACITY
// =============================================================================
export const opacity = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5", // used in button loading/disabled states
  60: "0.6", // used in button faded variant
  70: "0.7",
  75: "0.75",
  80: "0.8", // used in button faded hover
  90: "0.9",
  95: "0.95",
  100: "1",
} as const;

// =============================================================================
// TRANSITIONS & ANIMATIONS
// =============================================================================
export const transitions = {
  duration: {
    75: "75ms",
    100: "100ms", // used in button active state
    150: "150ms",
    200: "200ms", // used in button default transition
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },

  timing: {
    linear: "linear",
    ease: "ease", // used in button transitions
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
} as const;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
} as const;
