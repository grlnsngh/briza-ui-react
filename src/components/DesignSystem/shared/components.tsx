/**
 * Shared styled components for Design System stories
 */

import React, { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { radius, spacing } from "../../../theme";
import {
  StoryContainerProps,
  TokenCardProps,
  CodeBlockProps,
  CopyableTextProps,
  ColorSwatchProps,
} from "./types";
import {
  useTextColor,
  useClipboard,
  handleKeyboardActivation,
  generateId,
} from "./utils";

/**
 * Container component for consistent story layout
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const StoryContainer: React.FC<StoryContainerProps> = ({
  children,
  maxWidth = "none",
  padding = "2rem",
  forceTheme = "light",
}) => {
  const containerBackground = forceTheme === "dark" ? "#0f172a" : "#ffffff";
  const containerColor = forceTheme === "dark" ? "#f9fafb" : "#111827";

  useIsomorphicLayoutEffect(() => {
    if (!forceTheme || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const body = document.body;

    const previousTheme = root.getAttribute("data-theme");
    const previousRootBackground = root.style.backgroundColor;
    const previousBodyBackground = body.style.backgroundColor;
    const previousBodyColor = body.style.color;

    const forcedBackground = forceTheme === "dark" ? "#0f172a" : "#ffffff";
    const forcedForeground = forceTheme === "dark" ? "#f9fafb" : "#111827";

    const selectors = [
      "#storybook-root",
      ".sb-show-main",
      ".docs-story",
      ".sbdocs",
      ".sbdocs-wrapper",
      ".sbdocs-content",
      ".sbdocs-preview",
    ];

    const forcedElements = new Map<HTMLElement, string>();

    const applyForcedTheme = () => {
      if (root.getAttribute("data-theme") !== forceTheme) {
        root.setAttribute("data-theme", forceTheme);
      }

      root.style.backgroundColor = forcedBackground;
      body.style.backgroundColor = forcedBackground;
      body.style.color = forcedForeground;

      selectors.forEach((selector) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          if (!forcedElements.has(element)) {
            forcedElements.set(element, element.style.backgroundColor);
          }
          element.style.backgroundColor = forcedBackground;
        });
      });
    };

    applyForcedTheme();

    const observer =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (
                mutation.type === "attributes" &&
                mutation.attributeName === "data-theme" &&
                root.getAttribute("data-theme") !== forceTheme
              ) {
                applyForcedTheme();
              }
            }
          })
        : null;

    observer?.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer?.disconnect();

      forcedElements.forEach((originalBackground, element) => {
        if (originalBackground) {
          element.style.backgroundColor = originalBackground;
        } else {
          element.style.removeProperty("background-color");
        }
      });

      if (previousTheme !== null) {
        root.setAttribute("data-theme", previousTheme);
      } else {
        root.removeAttribute("data-theme");
      }

      root.style.backgroundColor = previousRootBackground;
      body.style.backgroundColor = previousBodyBackground;
      body.style.color = previousBodyColor;
    };
  }, [forceTheme]);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: containerBackground,
        color: containerColor,
        minHeight: "100vh",
        // Override Storybook's canvas padding completely
        margin: "-1rem -1rem 0 -1rem",
        padding: `calc(${padding} + 1rem)`,
        // Ensure content is centered if maxWidth is set
        display: maxWidth !== "none" ? "flex" : "block",
        flexDirection: maxWidth !== "none" ? "column" : undefined,
        alignItems: maxWidth !== "none" ? "center" : undefined,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth, width: "100%" }}>{children}</div>
    </div>
  );
};

/**
 * Card component for displaying token information
 */
export const TokenCard: React.FC<TokenCardProps> = ({
  title,
  description,
  children,
  variant = "default",
}) => {
  // Use fixed light colors for Design System stories (don't adapt to dark mode)
  const cardColors = {
    default: { bg: "#ffffff", border: "#e5e7eb" },
    primary: { bg: "#eff6ff", border: "#bfdbfe" },
    secondary: { bg: "#faf5ff", border: "#e9d5ff" },
    success: { bg: "#f0fdf4", border: "#bbf7d0" },
    warning: { bg: "#fefce8", border: "#fef08a" },
    danger: { bg: "#fef2f2", border: "#fecaca" },
  };

  const { bg, border } = cardColors[variant];

  return (
    <div
      style={{
        padding: spacing[6],
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderRadius: radius.lg,
        marginBottom: spacing[4],
      }}
    >
      <div
        style={{
          marginBottom: spacing[4],
          paddingBottom: spacing[3],
          borderBottom: `1px solid ${border}`,
        }}
      >
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
            margin: 0,
            marginBottom: description ? spacing[2] : 0,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#4b5563",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

/**
 * Code block component with syntax highlighting and copy functionality
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { copyToClipboard } = useClipboard();
  const codeId = useMemo(() => generateId("code-block"), []);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: radius.lg,
        overflow: "hidden",
      }}
    >
      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          onKeyDown={(e) => handleKeyboardActivation(handleCopy, e)}
          aria-label="Copy code to clipboard"
          style={{
            position: "absolute",
            top: spacing[2],
            right: spacing[2],
            padding: `${spacing[1]} ${spacing[2]}`,
            backgroundColor: copied ? "#22c55e" : "#e5e7eb",
            color: copied ? "#ffffff" : "#374151",
            border: "none",
            borderRadius: radius.sm,
            fontSize: "0.75rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            zIndex: 1,
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      <pre
        id={codeId}
        style={{
          margin: 0,
          padding: spacing[4],
          paddingRight: showCopy ? spacing[16] : spacing[4],
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: "0.875rem",
          color: "#1f2937",
          lineHeight: "1.5",
          overflow: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

/**
 * Enhanced copyable text component with accessibility
 */
export const CopyableText: React.FC<CopyableTextProps> = ({
  text,
  label,
  className = "",
  showIcon = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { copyToClipboard } = useClipboard();
  const buttonId = useMemo(() => generateId("copyable-text"), []);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      id={buttonId}
      type="button"
      onClick={handleCopy}
      onKeyDown={(e) => handleKeyboardActivation(handleCopy, e)}
      className={className}
      aria-label={`Copy ${label}: ${text}`}
      title={`Click to copy ${text}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing[1],
        padding: `${spacing[1]} ${spacing[2]}`,
        backgroundColor: copied ? "#dcfce7" : "#f3f4f6",
        color: copied ? "#15803d" : "#374151",
        border: `1px solid ${copied ? "#86efac" : "#d1d5db"}`,
        borderRadius: radius.sm,
        fontSize: "0.75rem",
        fontFamily: "monospace",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {showIcon && (
        <span style={{ fontSize: "0.7rem" }}>{copied ? "✓" : "📋"}</span>
      )}
      {copied ? "Copied!" : text}
    </button>
  );
};

/**
 * Enhanced color swatch component with accessibility and performance optimizations
 */
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  color,
  textColor: providedTextColor,
  isLarge = false,
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { copyToClipboard } = useClipboard();
  const textColor = useTextColor(providedTextColor || color);
  const swatchId = useMemo(() => generateId("color-swatch"), []);

  const handleCopy = async () => {
    if (!showCopy) return;

    const success = await copyToClipboard(color);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonStyle = {
    backgroundColor: color,
    color: textColor,
    padding: isLarge ? "2rem 1rem" : "1rem",
    borderRadius: radius.md,
    cursor: showCopy ? "pointer" : "default",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    border: `1px solid ${color === "#ffffff" ? "#e5e7eb" : "transparent"}`,
    position: "relative" as const,
    userSelect: "none" as const,
    width: "100%",
    textAlign: "left" as const,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (showCopy) {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (showCopy) {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  return (
    <button
      id={swatchId}
      type="button"
      onClick={handleCopy}
      onKeyDown={(e) => handleKeyboardActivation(handleCopy, e)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={!showCopy}
      aria-label={`${name} color: ${color}${showCopy ? ". Click to copy" : ""}`}
      title={showCopy ? `Click to copy ${color}` : `${name}: ${color}`}
      style={buttonStyle}
    >
      <div
        style={{
          fontWeight: "500",
          marginBottom: "0.25rem",
          fontSize: isLarge ? "1rem" : "0.875rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: isLarge ? "0.875rem" : "0.75rem",
          opacity: 0.8,
        }}
      >
        {color.toUpperCase()}
      </div>
      {copied && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: radius.sm,
            fontSize: "0.75rem",
            fontWeight: "500",
            pointerEvents: "none",
          }}
        >
          Copied!
        </div>
      )}
    </button>
  );
};

/**
 * Section header component for consistent story section styling
 */
export const SectionHeader: React.FC<{
  title: string;
  description?: string;
  icon?: string;
}> = ({ title, description, icon }) => (
  <div style={{ marginBottom: spacing[8] }}>
    <h1
      style={{
        fontSize: "2rem",
        fontWeight: "700",
        color: "#111827",
        marginBottom: spacing[3],
        display: "flex",
        alignItems: "center",
        gap: icon ? spacing[2] : "0",
      }}
    >
      {icon && <span>{icon}</span>}
      {title}
    </h1>
    {description && (
      <p
        style={{
          fontSize: "1rem",
          color: "#4b5563",
          lineHeight: "1.6",
          margin: 0,
          maxWidth: "800px",
        }}
      >
        {description}
      </p>
    )}
  </div>
);

/**
 * Grid layout component for consistent token displays
 */
export const TokenGrid: React.FC<{
  children: React.ReactNode;
  columns?: string;
  gap?: keyof typeof spacing;
  minWidth?: string;
}> = ({ children, columns, gap = 6, minWidth = "280px" }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        columns || `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      gap: spacing[gap],
      marginBottom: spacing[8],
    }}
  >
    {children}
  </div>
);
