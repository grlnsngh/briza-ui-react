/**
 * Design token utilities
 *
 * These utilities provide helper functions for working with design tokens
 * in components and make it easier to consume tokens consistently.
 */

import {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  opacity,
} from "./tokens";

import type {
  ButtonColor,
  ButtonSize,
  ButtonRadius,
  ColorValue,
  SpacingValue,
  RadiusValue,
  FontSizeValue,
  FontWeightValue,
} from "./types";

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Get color value by semantic color name
 */
export function getColor(
  colorName: ButtonColor,
  shade?: keyof typeof colors.primary
): ColorValue {
  const colorObj = colors[colorName];
  if (shade && shade in colorObj) {
    return colorObj[shade as keyof typeof colorObj] as string;
  }
  return colorObj.DEFAULT;
}

/**
 * Get foreground color for a given background color
 */
export function getForegroundColor(colorName: ButtonColor): ColorValue {
  return colors[colorName].foreground;
}

/**
 * Get color with opacity applied
 */
export function getColorWithOpacity(
  colorName: ButtonColor,
  opacityValue: keyof typeof opacity
): string {
  const color = getColor(colorName);
  const opacityVal = opacity[opacityValue];

  // Convert hex to rgba if needed
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacityVal})`;
  }

  return color;
}

// =============================================================================
// SPACING UTILITIES
// =============================================================================

/**
 * Get spacing value by key
 */
export function getSpacing(spacingKey: keyof typeof spacing): SpacingValue {
  return spacing[spacingKey];
}

/**
 * Get multiple spacing values (useful for padding/margin shorthand)
 */
export function getSpacingValues(...keys: Array<keyof typeof spacing>): string {
  return keys.map((key) => spacing[key]).join(" ");
}

// =============================================================================
// TYPOGRAPHY UTILITIES
// =============================================================================

/**
 * Get font size for button size
 */
export function getButtonFontSize(size: ButtonSize): FontSizeValue {
  const sizeMap: Record<ButtonSize, keyof typeof typography.fontSize> = {
    xs: "xs", // 12px
    sm: "sm", // 14px
    md: "sm", // 14px
    lg: "base", // 16px
    xl: "lg", // 18px
  };

  return typography.fontSize[sizeMap[size]];
}

/**
 * Get font weight for button size
 */
export function getButtonFontWeight(size: ButtonSize): FontWeightValue {
  const weightMap: Record<ButtonSize, keyof typeof typography.fontWeight> = {
    xs: "medium", // 500
    sm: "medium", // 500
    md: "medium", // 500
    lg: "medium", // 500
    xl: "semibold", // 600
  };

  return typography.fontWeight[weightMap[size]];
}

// =============================================================================
// RADIUS UTILITIES
// =============================================================================

/**
 * Get border radius value by key
 */
export function getRadius(radiusKey: ButtonRadius): RadiusValue {
  const radiusMap: Record<ButtonRadius, keyof typeof radius> = {
    none: "none",
    sm: "sm",
    md: "md",
    lg: "lg",
    full: "full",
  };

  return radius[radiusMap[radiusKey]];
}

// =============================================================================
// BUTTON UTILITIES
// =============================================================================

/**
 * Get button padding based on size
 */
export function getButtonPadding(
  size: ButtonSize,
  isIconOnly = false
): { x: SpacingValue; y: SpacingValue } {
  if (isIconOnly) {
    const iconPaddingMap: Record<ButtonSize, keyof typeof spacing> = {
      xs: 1, // 4px
      sm: 1.5, // 6px
      md: 2, // 8px
      lg: 3, // 12px
      xl: 4, // 16px
    };

    const paddingKey = iconPaddingMap[size];
    return { x: spacing[paddingKey], y: spacing[paddingKey] };
  }

  const paddingMap: Record<
    ButtonSize,
    { x: keyof typeof spacing; y: keyof typeof spacing }
  > = {
    xs: { x: 2, y: 1 }, // 8px x 4px
    sm: { x: 3, y: 1.5 }, // 12px x 6px
    md: { x: 4, y: 2 }, // 16px x 8px
    lg: { x: 6, y: 3 }, // 24px x 12px
    xl: { x: 8, y: 4 }, // 32px x 16px
  };

  const { x, y } = paddingMap[size];
  return { x: spacing[x], y: spacing[y] };
}

/**
 * Get shadow for button variant
 */
export function getButtonShadow(
  variant: "shadow" | "glowing",
  color?: ButtonColor,
  isHover = false
): string {
  if (variant === "shadow") {
    return isHover ? shadows.buttonHover : shadows.button;
  }

  if (variant === "glowing" && color) {
    const glowMap: Record<ButtonColor, keyof typeof shadows.glow> = {
      default: isHover ? "defaultHover" : "default",
      primary: isHover ? "primaryHover" : "primary",
      secondary: isHover ? "secondaryHover" : "secondary",
      success: isHover ? "successHover" : "success",
      warning: isHover ? "warningHover" : "warning",
      danger: isHover ? "dangerHover" : "danger",
    };

    return shadows.glow[glowMap[color]];
  }

  return shadows.none;
}

// =============================================================================
// CSS CUSTOM PROPERTIES UTILITIES
// =============================================================================

/**
 * Generate CSS custom properties from design tokens
 */
export function generateCSSCustomProperties(): Record<string, string> {
  const cssProps: Record<string, string> = {};

  // Color properties
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === "object" && "DEFAULT" in colorValue) {
      cssProps[`--color-${colorName}`] = colorValue.DEFAULT;
      cssProps[`--color-${colorName}-foreground`] = colorValue.foreground;

      // Add shade variations
      Object.entries(colorValue).forEach(([shade, value]) => {
        if (shade !== "DEFAULT" && shade !== "foreground") {
          cssProps[`--color-${colorName}-${shade}`] = value as string;
        }
      });
    } else if (typeof colorValue === "string") {
      cssProps[`--color-${colorName}`] = colorValue;
    }
  });

  // Spacing properties
  Object.entries(spacing).forEach(([key, value]) => {
    cssProps[`--spacing-${key}`] = value;
  });

  // Radius properties
  Object.entries(radius).forEach(([key, value]) => {
    cssProps[`--radius-${key}`] = value;
  });

  // Typography properties
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    cssProps[`--font-size-${key}`] = value;
  });

  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    cssProps[`--font-weight-${key}`] = value;
  });

  return cssProps;
}

/**
 * Convert design tokens to CSS variables for use in stylesheets
 */
export function createCSSVariables(): string {
  const props = generateCSSCustomProperties();

  return `:root {\n${Object.entries(props)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n")}\n}`;
}
