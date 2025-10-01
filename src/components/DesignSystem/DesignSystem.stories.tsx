import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, typography, spacing, radius } from "../../theme";
import { StoryContainer } from "./shared";

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
    <StoryContainer maxWidth="1200px">
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          🎨 Briza UI Design System
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
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
            backgroundColor: "#eff6ff",
            borderRadius: radius.lg,
            border: "1px solid #bfdbfe",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#3b82f6",
            }}
          >
            6
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#1d4ed8",
              fontWeight: "500",
            }}
          >
            Semantic Colors
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#faf5ff",
            borderRadius: radius.lg,
            border: "1px solid #e9d5ff",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#9333ea",
            }}
          >
            15
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#7c3aed",
              fontWeight: "500",
            }}
          >
            Spacing Values
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#f0fdf4",
            borderRadius: radius.lg,
            border: "1px solid #bbf7d0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#22c55e",
            }}
          >
            7
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#15803d",
              fontWeight: "500",
            }}
          >
            Typography Sizes
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#fefce8",
            borderRadius: radius.lg,
            border: "1px solid #fef08a",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#eab308",
            }}
          >
            8
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "#a16207",
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
            color: "#111827",
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
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          📝 Typography Scale
        </h2>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: radius.lg,
            border: "1px solid #e5e7eb",
          }}
        >
          {Object.entries(typography.fontSize).map(([size, value]) => (
            <div
              key={size}
              style={{
                fontSize: value as string,
                lineHeight: "1.5",
                marginBottom: "0.5rem",
                color: "#111827",
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
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          🛠️ Usage Examples
        </h2>
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "1.5rem",
            borderRadius: radius.lg,
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ marginBottom: "1rem", color: "#111827" }}>
            <strong>Import tokens:</strong>
          </div>
          <div style={{ color: "#374151", marginBottom: "1rem" }}>
            {`import { colors, spacing, typography } from '@/theme';`}
          </div>
          <div style={{ marginBottom: "1rem", color: "#111827" }}>
            <strong>Use in components:</strong>
          </div>
          <div style={{ color: "#374151" }}>
            {`const primaryColor = colors.primary.DEFAULT;`}
            <br />
            {`const padding = spacing[4];`}
            <br />
            {`const fontSize = typography.fontSize.lg;`}
          </div>
        </div>
      </div>
    </StoryContainer>
  ),
};

export const TokensReference: Story = {
  render: () => (
    <StoryContainer>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#111827",
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
                    border: "1px solid #e5e7eb",
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
                  <code style={{ fontSize: "0.875rem", color: "#4b5563" }}>
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
                border: "1px solid #e5e7eb",
                borderRadius: radius.md,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <code style={{ fontSize: "0.875rem" }}>spacing[{key}]</code>
              <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </StoryContainer>
  ),
};
