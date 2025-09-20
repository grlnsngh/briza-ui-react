/**
 * Utility functions for Design System stories
 */

import { useMemo, useCallback } from "react";

/**
 * Determines if text should be light or dark based on background color
 * Uses relative luminance calculation for better accuracy
 */
export const getTextColor = (bgColor: string): string => {
  // Remove # if present
  const hex = bgColor.replace("#", "");

  // Parse RGB values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance using sRGB coefficients
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return dark text for bright backgrounds, light text for dark backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

/**
 * Memoized version of getTextColor for performance optimization
 */
export const useTextColor = (bgColor: string): string => {
  return useMemo(() => getTextColor(bgColor), [bgColor]);
};

/**
 * Enhanced clipboard functionality with error handling and fallback
 */
export const useClipboard = () => {
  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }

        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        return success;
      } catch (error) {
        console.warn("Copy to clipboard failed:", error);
        return false;
      }
    },
    []
  );

  return { copyToClipboard };
};

/**
 * Keyboard event handler for accessibility
 */
export const handleKeyboardActivation = (
  callback: () => void,
  event: React.KeyboardEvent
): void => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
};

/**
 * Convert rem values to pixels for display
 */
export const remToPx = (remValue: string): string => {
  const numValue = parseFloat(remValue);
  return `${numValue * 16}px`;
};

/**
 * Generate accessibility-friendly unique IDs
 */
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format token names for display (capitalize, handle special cases)
 */
export const formatTokenName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim();
};

/**
 * Check if a color object has the expected semantic color structure
 */
export const isSemanticColor = (
  colorObj: unknown
): colorObj is { DEFAULT: string; foreground: string } => {
  return (
    typeof colorObj === "object" &&
    colorObj !== null &&
    "DEFAULT" in colorObj &&
    "foreground" in colorObj
  );
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
