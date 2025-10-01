/**
 * Shared TypeScript interfaces and types for Design System stories
 */

// Color-related types
export interface ColorScale {
  DEFAULT: string;
  foreground: string;
  [key: string]: string;
}

export interface SemanticColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  DEFAULT: string;
  foreground: string;
}

export interface BaseColorPalette {
  [key: string]: string | { [shade: string]: string };
}

// Typography types
export interface TypographyScale {
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    [key: string]: string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    [key: string]: string;
  };
  lineHeight: {
    none: string;
    tight: string;
    normal: string;
    relaxed: string;
    [key: string]: string;
  };
}

// Spacing types
export interface SpacingScale {
  [key: string]: string;
}

// Radius types
export interface RadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  full: string;
  [key: string]: string;
}

// Shadow types
export interface ShadowScale {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  button: string;
  buttonHover: string;
  glow: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    success: string;
    successHover: string;
    warning: string;
    warningHover: string;
    danger: string;
    dangerHover: string;
    [key: string]: string;
  };
  [key: string]: string | { [key: string]: string };
}

// Component props
export interface StoryContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
  /** Force a specific Storybook theme while this container is mounted */
  forceTheme?: "light" | "dark" | null;
}

export interface TokenCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

export interface CodeBlockProps {
  code: string;
  showCopy?: boolean;
}

export interface CopyableTextProps {
  text: string;
  label: string;
  className?: string;
  showIcon?: boolean;
}

export interface ColorSwatchProps {
  name: string;
  color: string;
  textColor?: string;
  isLarge?: boolean;
  showCopy?: boolean;
}

export interface SpacingVisualizerProps {
  size: string;
  value: string;
  direction?: "horizontal" | "vertical" | "both";
}

export interface RadiusCardProps {
  name: string;
  value: string;
  size?: "small" | "medium" | "large";
}

export interface ShadowCardProps {
  name: string;
  value: string;
  description?: string;
}
