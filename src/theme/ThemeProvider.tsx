/* eslint-disable react-refresh/only-export-components */
/**
 * Theme Provider Component for Briza UI React
 *
 * Provides theme context to all child components with support for:
 * - Light/dark mode switching
 * - System preference detection
 * - localStorage persistence
 * - Custom theme overrides
 * - CSS variable injection
 */

import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { defaultTheme } from "./index";
import type { Theme } from "./types";
import { generateCSSCustomProperties } from "./utils";

// =============================================================================
// TYPES
// =============================================================================

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  /** Current theme object */
  theme: Theme;
  /** Current theme mode */
  mode: ThemeMode;
  /** Resolved theme mode (system resolves to light/dark) */
  resolvedMode: "light" | "dark";
  /** Set theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark modes */
  toggleMode: () => void;
  /** Check if dark mode is active */
  isDark: boolean;
  /** Check if system preference is being used */
  isSystem: boolean;
}

// =============================================================================
// PROVIDER PROPS
// =============================================================================

export interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Custom theme overrides */
  theme?: Partial<Theme>;
  /** Default theme mode */
  defaultMode?: ThemeMode;
  /** Whether to enable localStorage persistence */
  enablePersistence?: boolean;
  /** localStorage key for theme persistence */
  storageKey?: string;
  /** Whether to inject CSS variables */
  enableCSSVariables?: boolean;
  /** Custom CSS variables to inject */
  customCSSVariables?: Record<string, string>;
}

// =============================================================================
// CONTEXT
// =============================================================================

export const ThemeContext = createContext<ThemeContextValue | null>(null);

// =============================================================================
// UTILITIES
// =============================================================================

/** Storage key for theme persistence */
const DEFAULT_STORAGE_KEY = "briza-ui-theme";

/** Get system theme preference */
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/** Get stored theme from localStorage */
const getStoredTheme = (storageKey: string): ThemeMode | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && ["light", "dark", "system"].includes(stored)) {
      return stored as ThemeMode;
    }
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
  }

  return null;
};

/** Store theme to localStorage */
const storeTheme = (mode: ThemeMode, storageKey: string): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(storageKey, mode);
  } catch (error) {
    console.warn("Failed to store theme to localStorage:", error);
  }
};

/** Resolve theme mode to actual light/dark */
const resolveThemeMode = (mode: ThemeMode): "light" | "dark" => {
  return mode === "system" ? getSystemTheme() : mode;
};

/** Generate dark theme from light theme */
const generateDarkTheme = (lightTheme: Theme): Theme => {
  // For now, we'll use the existing theme structure with CSS variables
  // The actual dark mode implementation will be handled by CSS variables
  return lightTheme;
};

/** Inject CSS variables into document */
const injectCSSVariables = (
  theme: Theme,
  mode: "light" | "dark",
  customVariables?: Record<string, string>
) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Set theme mode attribute
  root.setAttribute("data-theme", mode);

  // Generate and inject CSS variables
  const cssVariables = generateCSSCustomProperties();

  Object.entries(cssVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Inject custom variables if provided
  if (customVariables) {
    Object.entries(customVariables).forEach(([property, value]) => {
      root.style.setProperty(
        property.startsWith("--") ? property : `--${property}`,
        value
      );
    });
  }
};

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: customTheme,
  defaultMode = "system",
  enablePersistence = true,
  storageKey = DEFAULT_STORAGE_KEY,
  enableCSSVariables = true,
  customCSSVariables,
}) => {
  // Initialize theme mode from storage or default
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (!enablePersistence) return defaultMode;
    return getStoredTheme(storageKey) ?? defaultMode;
  });

  // Track system theme changes when mode is 'system'
  useEffect(() => {
    if (mode !== "system") return;

    const handleSystemChange = () => {
      // Force re-render when system theme changes and mode is 'system'
      setModeState("system");
    };

    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", handleSystemChange);

      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, [mode]);

  // Resolve current theme mode
  const resolvedMode = useMemo(() => resolveThemeMode(mode), [mode]);

  // Create merged theme
  const theme = useMemo(() => {
    const baseTheme = { ...defaultTheme, ...customTheme };
    return resolvedMode === "dark" ? generateDarkTheme(baseTheme) : baseTheme;
  }, [customTheme, resolvedMode]);

  // Set theme mode with persistence
  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      if (enablePersistence) {
        storeTheme(newMode, storageKey);
      }
    },
    [enablePersistence, storageKey]
  );

  // Toggle between light and dark modes
  const toggleMode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode, setMode]);

  // Inject CSS variables when theme changes
  useEffect(() => {
    if (enableCSSVariables) {
      injectCSSVariables(theme, resolvedMode, customCSSVariables);
    }
  }, [theme, resolvedMode, enableCSSVariables, customCSSVariables]);

  // Create context value
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mode,
      resolvedMode,
      setMode,
      toggleMode,
      isDark: resolvedMode === "dark",
      isSystem: mode === "system",
    }),
    [theme, mode, resolvedMode, setMode, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// useTheme hook is exported from separate file for fast refresh compatibility

// Types are already exported above
