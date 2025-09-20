import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, baseColors, radius } from "../../theme";

const meta: Meta = {
  title: "Design System/Colors",
  parameters: {
    docs: {
      description: {
        component: `
# Color System

Our color system is built on semantic color tokens that provide meaning and consistency across the design system. Each color has a full scale from 50 (lightest) to 900 (darkest).

## Semantic Colors

- **Primary**: Main brand color for primary actions
- **Secondary**: Secondary brand color for accent elements  
- **Default**: Neutral color for default states
- **Success**: Green color for positive states and success messages
- **Warning**: Yellow/orange color for warnings and caution
- **Danger**: Red color for errors and destructive actions

## Usage

\`\`\`typescript
import { colors } from '@/theme';

// Use semantic colors
const primaryColor = colors.primary.DEFAULT;
const primaryForeground = colors.primary.foreground;

// Use color scales
const lightPrimary = colors.primary[100];
const darkPrimary = colors.primary[800];
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper component for color swatches
const ColorSwatch: React.FC<{
  name: string;
  color: string;
  textColor?: string;
  isLarge?: boolean;
}> = ({ name, color, textColor = "#000", isLarge = false }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      style={{
        backgroundColor: color,
        color: textColor,
        padding: isLarge ? "2rem 1rem" : "1rem",
        borderRadius: radius.md,
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: `1px solid ${color === "#ffffff" ? "#e5e7eb" : "transparent"}`,
        position: "relative",
        userSelect: "none",
        width: "100%",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      title={`Click to copy ${color}`}
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
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "500",
          }}
        >
          Copied!
        </div>
      )}
    </button>
  );
};

// Helper to determine if text should be light or dark based on background
const getTextColor = (bgColor: string): string => {
  // Simple heuristic: if the color contains high values, use dark text
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? "#000000" : "#ffffff";
};

export const SemanticColors: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: colors.foreground,
            marginBottom: "0.5rem",
          }}
        >
          🎨 Semantic Colors
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Click on any color to copy its hex value. These semantic colors
          provide meaning and context across the design system.
        </p>
      </div>

      {Object.entries(colors).map(([colorName, colorObj]) => {
        if (
          typeof colorObj === "object" &&
          colorObj !== null &&
          "DEFAULT" in colorObj
        ) {
          const color = colorObj as Record<string, string>;
          const defaultColor = color.DEFAULT;
          const foregroundColor = color.foreground;

          return (
            <div key={colorName} style={{ marginBottom: "3rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    textTransform: "capitalize",
                    color: colors.foreground,
                    marginBottom: "0.25rem",
                  }}
                >
                  {colorName}
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: colors.default[600],
                  }}
                >
                  colors.{colorName}.DEFAULT
                </p>
              </div>

              {/* Main color display */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <ColorSwatch
                  name={`${colorName} (DEFAULT)`}
                  color={defaultColor}
                  textColor={foregroundColor}
                  isLarge={true}
                />
                <ColorSwatch
                  name="Foreground"
                  color={foregroundColor}
                  textColor={getTextColor(foregroundColor)}
                />
              </div>

              {/* Color scale */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {Object.entries(color).map(([shade, value]) => {
                  if (shade !== "DEFAULT" && shade !== "foreground") {
                    return (
                      <ColorSwatch
                        key={shade}
                        name={shade}
                        color={value}
                        textColor={getTextColor(value)}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  ),
};

export const BaseColors: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: colors.foreground,
            marginBottom: "0.5rem",
          }}
        >
          🎯 Base Color Palette
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          The foundational color palette used to build semantic colors. These
          are the raw color values.
        </p>
      </div>

      {Object.entries(baseColors).map(([colorName, colorValue]) => {
        if (typeof colorValue === "object") {
          return (
            <div key={colorName} style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  color: colors.foreground,
                  marginBottom: "1rem",
                }}
              >
                {colorName}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {Object.entries(colorValue).map(([shade, value]) => (
                  <ColorSwatch
                    key={shade}
                    name={shade}
                    color={value}
                    textColor={getTextColor(value)}
                  />
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div key={colorName} style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  color: colors.foreground,
                  marginBottom: "0.5rem",
                }}
              >
                {colorName}
              </h3>
              <div style={{ width: "200px" }}>
                <ColorSwatch
                  name={colorName}
                  color={colorValue}
                  textColor={getTextColor(colorValue)}
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  ),
};

export const ColorUsageGuide: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: colors.foreground,
            marginBottom: "0.5rem",
          }}
        >
          📖 Color Usage Guide
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Best practices and guidelines for using colors in your components.
        </p>
      </div>

      {/* Usage Examples */}
      <div style={{ display: "grid", gap: "2rem" }}>
        {[
          {
            title: "Primary Actions",
            description:
              "Use primary colors for main actions, CTAs, and interactive elements",
            example: (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: colors.primary.DEFAULT,
                    color: colors.primary.foreground,
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: radius.md,
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Primary Button
                </button>
                <button
                  style={{
                    color: colors.primary.DEFAULT,
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: "inherit",
                  }}
                >
                  Primary Link
                </button>
              </div>
            ),
          },
          {
            title: "Success States",
            description:
              "Use success colors for positive feedback, confirmations, and completed states",
            example: (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: colors.success[50],
                  border: `1px solid ${colors.success[200]}`,
                  borderRadius: radius.md,
                  color: colors.success[800],
                }}
              >
                ✅ Success! Your changes have been saved.
              </div>
            ),
          },
          {
            title: "Warning States",
            description:
              "Use warning colors for caution, alerts, and important information",
            example: (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: colors.warning[50],
                  border: `1px solid ${colors.warning[200]}`,
                  borderRadius: radius.md,
                  color: colors.warning[800],
                }}
              >
                ⚠️ Warning: Please review your information before proceeding.
              </div>
            ),
          },
          {
            title: "Error States",
            description:
              "Use danger colors for errors, destructive actions, and critical issues",
            example: (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: colors.danger[50],
                  border: `1px solid ${colors.danger[200]}`,
                  borderRadius: radius.md,
                  color: colors.danger[800],
                }}
              >
                ❌ Error: Something went wrong. Please try again.
              </div>
            ),
          },
          {
            title: "Neutral Content",
            description:
              "Use default colors for text, backgrounds, and neutral elements",
            example: (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.default[200]}`,
                  borderRadius: radius.md,
                }}
              >
                <h4
                  style={{
                    color: colors.foreground,
                    margin: "0 0 0.5rem 0",
                    fontWeight: "600",
                  }}
                >
                  Card Title
                </h4>
                <p
                  style={{
                    color: colors.default[600],
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
                  This is neutral content with proper contrast ratios for
                  accessibility.
                </p>
              </div>
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: "1.5rem",
              border: `1px solid ${colors.default[200]}`,
              borderRadius: radius.lg,
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "0.5rem",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.default[600],
                marginBottom: "1rem",
                lineHeight: "1.5",
              }}
            >
              {item.description}
            </p>
            <div>{item.example}</div>
          </div>
        ))}
      </div>

      {/* Code Examples */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Code Examples
        </h2>
        <div
          style={{
            backgroundColor: colors.default[50],
            padding: "1.5rem",
            borderRadius: radius.lg,
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ marginBottom: "1rem", color: colors.default[700] }}>
            {`// Import colors`}
            <br />
            {`import { colors } from '@/theme';`}
          </div>
          <div style={{ marginBottom: "1rem", color: colors.default[700] }}>
            {`// Use semantic colors`}
            <br />
            {`backgroundColor: colors.primary.DEFAULT,`}
            <br />
            {`color: colors.primary.foreground,`}
          </div>
          <div style={{ color: colors.default[700] }}>
            {`// Use color scales`}
            <br />
            {`backgroundColor: colors.primary[50],`}
            <br />
            {`borderColor: colors.primary[200],`}
            <br />
            {`color: colors.primary[800],`}
          </div>
        </div>
      </div>
    </div>
  ),
};
