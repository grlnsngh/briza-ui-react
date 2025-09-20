/**
 * Briza UI React Theme System
 *
 * This module exports the complete design system including design tokens,
 * types, and utilities for building consistent UI components.
 */

// Design tokens (raw values)
export * from "./tokens";

// TypeScript types for design tokens
export * from "./types";

// Utility functions for working with design tokens
export * from "./utils";

// Create a default theme object
import {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  opacity,
  transitions,
  zIndex,
} from "./tokens";

import type { Theme } from "./types";

/**
 * Default theme configuration
 *
 * This is the main theme object that contains all design tokens
 * organized in a structured way. Use this as the foundation for
 * your component styling.
 */
export const defaultTheme: Theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  opacity,
  transitions,
  zIndex,
} as const;

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: React.ReactNode;
}

// Re-export common types for convenience
export type {
  ButtonColor,
  ButtonSize,
  ButtonRadius,
  ColorValue,
  SpacingValue,
  RadiusValue,
  FontSizeValue,
  FontWeightValue,
  ColorKey,
  SpacingKey,
  RadiusKey,
} from "./types";
