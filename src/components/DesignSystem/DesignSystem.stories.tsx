import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, typography, spacing, radius } from "../../theme";

const meta: Meta = {
  title: "Design System/Overview",
  parameters: {
    docs: {
      description: {
        component: `
# Briza UI Design System

Welcome to the Briza UI React component library design system. This comprehensive design token system provides the foundation for consistent and beautiful user interfaces.

## Design Philosophy

Our design system is built on the principle of **systematic consistency**. Every color, spacing value, typography scale, and visual effect is carefully designed to work together harmoniously.

## Token Categories

- **Colors**: Semantic color system with full scales
- **Typography**: Font sizes, weights, and spacing
- **Spacing**: Consistent spacing scale for layouts
- **Radius**: Border radius values for rounded corners
- **Shadows**: Elevation and visual depth
- **Effects**: Visual enhancements and interactions

## Getting Started

Import design tokens in your components:

\`\`\`typescript
import { colors, spacing, typography } from '@/theme';

// Use in your components
const primaryColor = colors.primary.DEFAULT;
const buttonPadding = spacing[4];
const fontSize = typography.fontSize.lg;
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DesignSystemOverview: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          🎨 Briza UI Design System
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: colors.default[600],
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          A comprehensive design token system that provides the foundation for
          consistent, accessible, and beautiful user interfaces.
        </p>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.primary[50],
            borderRadius: radius.lg,
            border: `1px solid ${colors.primary[200]}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.primary.DEFAULT,
            }}
          >
            6
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: colors.primary[700],
              fontWeight: "500",
            }}
          >
            Semantic Colors
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.secondary[50],
            borderRadius: radius.lg,
            border: `1px solid ${colors.secondary[200]}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.secondary.DEFAULT,
            }}
          >
            15
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: colors.secondary[700],
              fontWeight: "500",
            }}
          >
            Spacing Values
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.success[50],
            borderRadius: radius.lg,
            border: `1px solid ${colors.success[200]}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.success.DEFAULT,
            }}
          >
            7
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: colors.success[700],
              fontWeight: "500",
            }}
          >
            Typography Sizes
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.warning[50],
            borderRadius: radius.lg,
            border: `1px solid ${colors.warning[200]}`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.warning.DEFAULT,
            }}
          >
            8
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: colors.warning[700],
              fontWeight: "500",
            }}
          >
            Border Radius
          </div>
        </div>
      </div>

      {/* Color Preview */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          🎨 Color Palette Preview
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {Object.entries(colors).map(([name, colorObj]) => {
            if (
              typeof colorObj === "object" &&
              colorObj !== null &&
              "DEFAULT" in colorObj
            ) {
              const color = colorObj as { DEFAULT: string; foreground: string };
              return (
                <div
                  key={name}
                  style={{
                    padding: "1rem",
                    backgroundColor: color.DEFAULT,
                    color: color.foreground,
                    borderRadius: radius.md,
                    textAlign: "center",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {name}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Typography Preview */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          📝 Typography Scale
        </h2>
        <div
          style={{
            backgroundColor: colors.background,
            padding: "1.5rem",
            borderRadius: radius.lg,
            border: `1px solid ${colors.default[200]}`,
          }}
        >
          {Object.entries(typography.fontSize).map(([size, value]) => (
            <div
              key={size}
              style={{
                fontSize: value as string,
                lineHeight: "1.5",
                marginBottom: "0.5rem",
                color: colors.foreground,
              }}
            >
              {size} - The quick brown fox jumps over the lazy dog
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          🛠️ Usage Examples
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
          <div style={{ marginBottom: "1rem", color: colors.foreground }}>
            <strong>Import tokens:</strong>
          </div>
          <div style={{ color: colors.default[700], marginBottom: "1rem" }}>
            {`import { colors, spacing, typography } from '@/theme';`}
          </div>
          <div style={{ marginBottom: "1rem", color: colors.foreground }}>
            <strong>Use in components:</strong>
          </div>
          <div style={{ color: colors.default[700] }}>
            {`const primaryColor = colors.primary.DEFAULT;`}
            <br />
            {`const padding = spacing[4];`}
            <br />
            {`const fontSize = typography.fontSize.lg;`}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TokensReference: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: colors.foreground,
          marginBottom: "2rem",
        }}
      >
        📚 Design Tokens Reference
      </h1>

      {/* Colors Reference */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          Colors
        </h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {Object.entries(colors).map(([name, colorObj]) => {
            if (
              typeof colorObj === "object" &&
              colorObj !== null &&
              "DEFAULT" in colorObj
            ) {
              const color = colorObj as { DEFAULT: string };
              return (
                <div
                  key={name}
                  style={{
                    padding: "1rem",
                    border: `1px solid ${colors.default[200]}`,
                    borderRadius: radius.md,
                  }}
                >
                  <h3
                    style={{
                      textTransform: "capitalize",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {name}
                  </h3>
                  <code
                    style={{ fontSize: "0.875rem", color: colors.default[600] }}
                  >
                    colors.{name}.DEFAULT = "{color.DEFAULT}"
                  </code>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>

      {/* Spacing Reference */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          Spacing
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {Object.entries(spacing).map(([key, value]) => (
            <div
              key={key}
              style={{
                padding: "1rem",
                border: `1px solid ${colors.default[200]}`,
                borderRadius: radius.md,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <code style={{ fontSize: "0.875rem" }}>spacing[{key}]</code>
              <span
                style={{ fontSize: "0.875rem", color: colors.default[600] }}
              >
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
