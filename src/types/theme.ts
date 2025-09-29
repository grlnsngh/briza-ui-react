/**
 * Theme utility types for the Briza UI component library
 * These types provide structure for theme configuration and CSS variables
 */

/**
 * Standard color names used across the component library
 * Based on the Button component's color prop
 */
export type ColorName =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

/**
 * Standard size scale used across components
 * Based on the Button component's size prop
 */
export type SizeName = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Standard radius scale for border-radius values
 * Based on the Button component's radius prop
 */
export type RadiusName = "none" | "sm" | "md" | "lg" | "full";

/**
 * Theme configuration structure
 * This will be useful when implementing a theme provider
 */
export interface ThemeConfig {
  colors: Record<ColorName, string>;
  sizes: Record<SizeName, string>;
  radius: Record<RadiusName, string>;
  spacing: Record<SizeName, string>;
}

/**
 * CSS Custom Properties (CSS Variables) structure
 * Maps theme values to CSS custom properties
 */
export type CSSCustomProperties = Record<string, string>;

/**
 * Responsive breakpoint configuration
 * For future responsive component implementations
 */
export interface BreakpointConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Component theme variants
 * Generic structure for component-specific theming
 */
export type ComponentTheme<T extends string> = Record<T, CSSCustomProperties>;
