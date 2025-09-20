/**
 * TypeScript types for design tokens
 *
 * These types provide type safety and IntelliSense support for design tokens
 * throughout the component library.
 */

import type {
  baseColors,
  colors,
  typography,
  spacing,
  radius,
  shadows,
  opacity,
  transitions,
  zIndex,
} from "./tokens";

// =============================================================================
// COLOR TYPES
// =============================================================================

// Base color scale type (50-900)
export type ColorScale = {
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
};

// Semantic color type with DEFAULT and foreground
export type SemanticColor = ColorScale & {
  DEFAULT: string;
  foreground: string;
};

// Extract color keys for component props
export type ColorKey = keyof typeof colors;
export type BaseColorKey = keyof typeof baseColors;

// Color token values
export type ColorValue = string;

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================

export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type LetterSpacing = keyof typeof typography.letterSpacing;

export type FontSizeValue = (typeof typography.fontSize)[FontSize];
export type FontWeightValue = (typeof typography.fontWeight)[FontWeight];
export type LineHeightValue = (typeof typography.lineHeight)[LineHeight];
export type LetterSpacingValue =
  (typeof typography.letterSpacing)[LetterSpacing];

// =============================================================================
// SPACING TYPES
// =============================================================================

export type SpacingKey = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingKey];

// =============================================================================
// RADIUS TYPES
// =============================================================================

export type RadiusKey = keyof typeof radius;
export type RadiusValue = (typeof radius)[RadiusKey];

// =============================================================================
// SHADOW TYPES
// =============================================================================

export type ShadowKey = keyof typeof shadows;
export type ShadowValue = string;

// Glow shadow keys
export type GlowShadowKey = keyof typeof shadows.glow;

// =============================================================================
// OPACITY TYPES
// =============================================================================

export type OpacityKey = keyof typeof opacity;
export type OpacityValue = (typeof opacity)[OpacityKey];

// =============================================================================
// TRANSITION TYPES
// =============================================================================

export type TransitionDuration = keyof typeof transitions.duration;
export type TransitionTiming = keyof typeof transitions.timing;

export type TransitionDurationValue =
  (typeof transitions.duration)[TransitionDuration];
export type TransitionTimingValue =
  (typeof transitions.timing)[TransitionTiming];

// =============================================================================
// Z-INDEX TYPES
// =============================================================================

export type ZIndexKey = keyof typeof zIndex;
export type ZIndexValue = (typeof zIndex)[ZIndexKey];

// =============================================================================
// COMPONENT-SPECIFIC TYPES
// =============================================================================

// Button component color options (matches Button component)
export type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

// Button size options (matches Button component)
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Button radius options (matches Button component)
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

// =============================================================================
// THEME INTERFACE
// =============================================================================

export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  opacity: typeof opacity;
  transitions: typeof transitions;
  zIndex: typeof zIndex;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

// Extract all possible token values for a given category
export type AllColorValues = ColorValue;
export type AllSpacingValues = SpacingValue;
export type AllRadiusValues = RadiusValue;
export type AllShadowValues = ShadowValue;
export type AllOpacityValues = OpacityValue;

// Helper type for CSS custom properties
export type CSSVariable = `--${string}`;

// Helper type for component styling props
export interface ThemeProps {
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
}

// =============================================================================
// TOKEN MAPPING HELPERS
// =============================================================================

// Helper to map semantic color names to actual color objects
export type ColorTokens = {
  [K in ButtonColor]: SemanticColor;
};

// Helper to map button sizes to typography and spacing tokens
export type SizeTokens = {
  [K in ButtonSize]: {
    fontSize: FontSizeValue;
    fontWeight: FontWeightValue;
    padding: {
      x: SpacingValue;
      y: SpacingValue;
    };
  };
};

// Helper to map button radius to actual radius values
export type RadiusTokens = {
  [K in ButtonRadius]: RadiusValue;
};
