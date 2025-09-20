import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { linkTo } from "@storybook/addon-links";
import { colors, typography, spacing, radius, shadows } from "../../theme";

const meta: Meta = {
  title: "Design System/Getting Started",
  parameters: {
    docs: {
      description: {
        component: `
# Getting Started with Briza UI Design System

Welcome to the Briza UI React design system! This comprehensive guide will help you understand and effectively use our design tokens to build consistent, beautiful interfaces.

## What are Design Tokens?

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. They act as a single source of truth to democratize the design system and ensure consistency across all platforms and experiences.

## Why Use Design Tokens?

- **Consistency**: Ensure visual consistency across all components and applications
- **Maintainability**: Make design changes from a single source of truth
- **Scalability**: Easily adapt designs for different themes, brands, or platforms
- **Developer Experience**: Get type safety and IntelliSense support

## Installation & Setup

\`\`\`bash
npm i briza-ui-react
\`\`\`

\`\`\`typescript
import { colors, spacing, typography } from 'briza-ui-react/theme';
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const QuickStart: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          🚀 Quick Start Guide
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: colors.default[600],
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          Get up and running with Briza UI design tokens in minutes. Follow this
          guide to start building consistent interfaces.
        </p>
      </div>

      {/* Step 1: Installation */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "2rem",
              backgroundColor: colors.primary.DEFAULT,
              color: colors.primary.foreground,
              borderRadius: radius.full,
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            1
          </span>
          Installation
        </h2>
        <div
          style={{
            backgroundColor: colors.default[50],
            padding: "1.5rem",
            borderRadius: radius.lg,
            border: `1px solid ${colors.default[200]}`,
            marginBottom: "1rem",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: "0.875rem",
              color: colors.default[800],
            }}
          >
            {`npm i briza-ui-react

# or with yarn
yarn add briza-ui-react`}
          </pre>
        </div>
      </div>

      {/* Step 2: Import Tokens */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "2rem",
              backgroundColor: colors.secondary.DEFAULT,
              color: colors.secondary.foreground,
              borderRadius: radius.full,
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            2
          </span>
          Import Design Tokens
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
            marginBottom: "1rem",
          }}
        >
          Import the design tokens you need in your components:
        </p>
        <div
          style={{
            backgroundColor: colors.default[50],
            padding: "1.5rem",
            borderRadius: radius.lg,
            border: `1px solid ${colors.default[200]}`,
            marginBottom: "1rem",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: "0.875rem",
              color: colors.default[800],
            }}
          >
            {`import { 
  colors, 
  spacing, 
  typography, 
  radius, 
  shadows 
} from 'briza-ui-react/theme';`}
          </pre>
        </div>
      </div>

      {/* Step 3: Use in Components */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "2rem",
              backgroundColor: colors.success.DEFAULT,
              color: colors.success.foreground,
              borderRadius: radius.full,
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            3
          </span>
          Use in Your Components
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
            marginBottom: "1rem",
          }}
        >
          Start using design tokens in your component styles:
        </p>
        <div
          style={{
            backgroundColor: colors.default[50],
            padding: "1.5rem",
            borderRadius: radius.lg,
            border: `1px solid ${colors.default[200]}`,
            marginBottom: "1rem",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: "0.875rem",
              color: colors.default[800],
              lineHeight: "1.5",
            }}
          >
            {`const Button = ({ children, variant = 'primary' }) => (
  <button
    style={{
      // Use color tokens
      backgroundColor: colors[variant].DEFAULT,
      color: colors[variant].foreground,
      
      // Use spacing tokens
      padding: \`\${spacing[2]} \${spacing[4]}\`,
      
      // Use radius tokens
      borderRadius: radius.md,
      
      // Use typography tokens
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      
      // Use shadow tokens
      boxShadow: shadows.sm,
      
      border: 'none',
      cursor: 'pointer'
    }}
  >
    {children}
  </button>
);`}
          </pre>
        </div>

        {/* Live Example */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.background,
            border: `1px solid ${colors.default[200]}`,
            borderRadius: radius.lg,
            marginTop: "1rem",
          }}
        >
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            Live Result:
          </h4>
          <div style={{ display: "flex", gap: spacing[3], flexWrap: "wrap" }}>
            {(
              ["primary", "secondary", "success", "warning", "danger"] as const
            ).map((variant) => {
              const colorVariant = colors[variant];
              return (
                <button
                  key={variant}
                  style={{
                    backgroundColor: colorVariant.DEFAULT,
                    color: colorVariant.foreground,
                    padding: `${spacing[2]} ${spacing[4]}`,
                    borderRadius: radius.md,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    boxShadow: shadows.sm,
                    border: "none",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {variant}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          💡 Best Practices
        </h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {[
            {
              icon: "🎨",
              title: "Use Semantic Colors",
              description:
                "Use semantic color names (primary, success, danger) instead of specific color values",
              example: 'colors.primary.DEFAULT instead of "#3b82f6"',
            },
            {
              icon: "📏",
              title: "Consistent Spacing",
              description:
                "Use the spacing scale for all margins, padding, and gaps",
              example: 'padding: spacing[4] instead of "16px"',
            },
            {
              icon: "📝",
              title: "Typography Hierarchy",
              description:
                "Use typography tokens to maintain consistent text styling",
              example: "fontSize: typography.fontSize.lg",
            },
            {
              icon: "🌊",
              title: "Responsive Design",
              description: "Tokens work well with responsive design patterns",
              example: "Use different spacing values for different breakpoints",
            },
          ].map((tip, index) => (
            <div
              key={index}
              style={{
                padding: "1.5rem",
                backgroundColor: colors.background,
                border: `1px solid ${colors.default[200]}`,
                borderRadius: radius.lg,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{tip.icon}</span>
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: colors.foreground,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {tip.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: colors.default[600],
                      lineHeight: "1.5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {tip.description}
                  </p>
                  <code
                    style={{
                      fontSize: "0.75rem",
                      color: colors.primary[700],
                      backgroundColor: colors.primary[50],
                      padding: "0.25rem 0.5rem",
                      borderRadius: radius.sm,
                    }}
                  >
                    {tip.example}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          🎯 Next Steps
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              title: "Explore Colors",
              description:
                "Browse the complete color palette and usage examples",
              storyId: "design-system-colors--semantic-colors",
              color: colors.primary,
              storyTitle: "Design System/Colors",
              storyName: "SemanticColors",
            },
            {
              title: "Typography Guide",
              description: "Learn about font sizes, weights, and hierarchy",
              storyId: "design-system-typography--font-sizes",
              color: colors.secondary,
              storyTitle: "Design System/Typography",
              storyName: "FontSizes",
            },
            {
              title: "Spacing System",
              description: "Master consistent spacing and layout",
              storyId: "design-system-spacing--spacing-scale",
              color: colors.success,
              storyTitle: "Design System/Spacing",
              storyName: "SpacingScale",
            },
            {
              title: "Effects & Shadows",
              description: "Add depth with radius and shadow tokens",
              storyId: "design-system-radius-shadows--border-radius",
              color: colors.warning,
              storyTitle: "Design System/Radius & Shadows",
              storyName: "BorderRadius",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={`?path=/story/${item.storyId}`}
              onClick={(e) => {
                e.preventDefault();
                // Use Storybook's linkTo with story ID
                linkTo(item.storyId)();
              }}
              style={{
                padding: "1.5rem",
                backgroundColor: item.color[50],
                border: `1px solid ${item.color[200]}`,
                borderRadius: radius.lg,
                transition: "transform 0.2s ease",
                cursor: "pointer",
                textDecoration: "none",
                display: "block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: item.color[800],
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: item.color[700],
                  lineHeight: "1.5",
                  marginBottom: "1rem",
                }}
              >
                {item.description}
              </p>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: item.color[600],
                  fontWeight: "500",
                }}
              >
                Explore →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const CheatSheet: Story = {
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
          📋 Design Tokens Cheat Sheet
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Quick reference for all available design tokens and their common use
          cases.
        </p>
      </div>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Colors */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.background,
            border: `1px solid ${colors.default[200]}`,
            borderRadius: radius.lg,
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            🎨 Colors
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
          >
            <div>colors.primary.DEFAULT</div>
            <div>colors.secondary.DEFAULT</div>
            <div>colors.success.DEFAULT</div>
            <div>colors.warning.DEFAULT</div>
            <div>colors.danger.DEFAULT</div>
            <div>colors.default.DEFAULT</div>
          </div>
        </div>

        {/* Spacing */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.background,
            border: `1px solid ${colors.default[200]}`,
            borderRadius: radius.lg,
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            📏 Spacing
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
          >
            <div>spacing[1] → 4px</div>
            <div>spacing[2] → 8px</div>
            <div>spacing[3] → 12px</div>
            <div>spacing[4] → 16px</div>
            <div>spacing[6] → 24px</div>
            <div>spacing[8] → 32px</div>
          </div>
        </div>

        {/* Typography */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: colors.background,
            border: `1px solid ${colors.default[200]}`,
            borderRadius: radius.lg,
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            📝 Typography
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
          >
            <div>typography.fontSize.sm</div>
            <div>typography.fontSize.base</div>
            <div>typography.fontSize.lg</div>
            <div>typography.fontWeight.medium</div>
            <div>typography.fontWeight.semibold</div>
            <div>typography.lineHeight.normal</div>
          </div>
        </div>

        {/* Radius & Shadows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: colors.background,
              border: `1px solid ${colors.default[200]}`,
              borderRadius: radius.lg,
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "1rem",
              }}
            >
              📐 Radius
            </h2>
            <div
              style={{
                display: "grid",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontFamily: "monospace",
              }}
            >
              <div>radius.sm</div>
              <div>radius.md</div>
              <div>radius.lg</div>
              <div>radius.full</div>
            </div>
          </div>

          <div
            style={{
              padding: "1.5rem",
              backgroundColor: colors.background,
              border: `1px solid ${colors.default[200]}`,
              borderRadius: radius.lg,
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "1rem",
              }}
            >
              🌤️ Shadows
            </h2>
            <div
              style={{
                display: "grid",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontFamily: "monospace",
              }}
            >
              <div>shadows.sm</div>
              <div>shadows.DEFAULT</div>
              <div>shadows.lg</div>
              <div>shadows.button</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
