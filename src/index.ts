export { Button, Input } from "./components";
export type {
  ButtonColor,
  ButtonVariant,
  ButtonSize,
  ButtonRadius,
  InputProps,
  InputSize,
  InputStatus,
} from "./components";

// Theme System
export {
  ThemeProvider,
  useTheme,
  // Re-export design tokens for convenience
  colors,
  typography,
  spacing,
  radius,
  shadows,
  defaultTheme,
} from "./theme";

export type {
  ThemeMode,
  ThemeContextValue,
  ThemeProviderProps,
  Theme,
  ColorValue,
  SpacingValue,
  RadiusValue,
} from "./theme";
