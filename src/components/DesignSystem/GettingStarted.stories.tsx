import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { linkTo } from "@storybook/addon-links";
import { colors, typography, spacing, radius, shadows } from "../../theme";
import {
  StoryContainer,
  SectionHeader,
  TokenGrid,
  TokenCard,
  CodeBlock,
} from "./shared";

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
    <StoryContainer maxWidth="1000px">
      <SectionHeader
        title="Quick Start Guide"
        description="Get up and running with Briza UI design tokens in minutes. Follow this guide to start building consistent interfaces."
        icon="🚀"
      />

      {/* Step-by-step guide with vertical layout and padding for step indicators */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: spacing[6],
          paddingLeft: spacing[8], // Add padding for step indicators
          position: "relative",
        }}
      >
        {/* Step 1: Installation */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-2rem",
              top: "1rem",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: colors.primary.DEFAULT,
              color: colors.primary.foreground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: typography.fontWeight.bold,
              fontSize: typography.fontSize.sm,
              boxShadow: shadows.md,
            }}
          >
            1
          </div>
          <TokenCard title="Installation" variant="primary">
            <p
              style={{
                fontSize: typography.fontSize.sm,
                color: colors.default[600],
                margin: 0,
                marginBottom: spacing[3],
                lineHeight: "1.5",
              }}
            >
              Start by installing the Briza UI React package in your project:
            </p>
            <CodeBlock
              code={`npm i briza-ui-react

# or with yarn
yarn add briza-ui-react`}
            />
          </TokenCard>
        </div>

        {/* Step 2: Import Tokens */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-2rem",
              top: "1rem",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: colors.secondary.DEFAULT,
              color: colors.secondary.foreground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: typography.fontWeight.bold,
              fontSize: typography.fontSize.sm,
              boxShadow: shadows.md,
            }}
          >
            2
          </div>
          <TokenCard
            title="Import Design Tokens"
            description="Import the design tokens you need in your components:"
            variant="secondary"
          >
            <CodeBlock
              code={`import { 
  colors, 
  spacing, 
  typography, 
  radius, 
  shadows 
} from 'briza-ui-react/theme';`}
            />
          </TokenCard>
        </div>

        {/* Step 3: Use in Components */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-2rem",
              top: "1rem",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: colors.success.DEFAULT,
              color: colors.success.foreground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: typography.fontWeight.bold,
              fontSize: typography.fontSize.sm,
              boxShadow: shadows.md,
            }}
          >
            3
          </div>
          <TokenCard
            title="Use in Your Components"
            description="Start using design tokens in your component styles:"
            variant="success"
          >
            <div style={{ marginBottom: spacing[6] }}>
              <CodeBlock
                code={`const Button = ({ children, variant = 'primary' }) => (
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
              />
            </div>

            {/* Live Example Section with better visual separation */}
            <div
              style={{
                borderTop: `2px solid ${colors.success[200]}`,
                paddingTop: spacing[5],
                marginTop: spacing[2],
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: spacing[4],
                }}
              >
                <h4
                  style={{
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: spacing[2],
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>🎯</span>
                  Live Result:
                </h4>
                <span
                  style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.success[600],
                    backgroundColor: colors.success[100],
                    padding: `${spacing[1]} ${spacing[2]}`,
                    borderRadius: radius.sm,
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  Interactive Demo
                </span>
              </div>

              <div
                style={{
                  padding: spacing[5],
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.default[200]}`,
                  borderRadius: radius.lg,
                  boxShadow: shadows.sm,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: spacing[3],
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {(
                    [
                      "primary",
                      "secondary",
                      "success",
                      "warning",
                      "danger",
                    ] as const
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
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                          minWidth: "80px",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = shadows.md;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = shadows.sm;
                        }}
                      >
                        {variant}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </TokenCard>
        </div>
      </div>

      {/* Best Practices */}
      <div style={{ marginTop: spacing[16] }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing[3],
            marginBottom: spacing[8],
            paddingBottom: spacing[4],
            borderBottom: `2px solid ${colors.default[200]}`,
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              background: `linear-gradient(135deg, ${colors.warning[400]}, ${colors.warning[600]})`,
              padding: spacing[3],
              borderRadius: radius.lg,
              boxShadow: shadows.md,
            }}
          >
            💡
          </div>
          <div>
            <h2
              style={{
                fontSize: typography.fontSize["2xl"],
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                margin: 0,
                marginBottom: spacing[1],
              }}
            >
              Best Practices
            </h2>
            <p
              style={{
                fontSize: typography.fontSize.sm,
                color: colors.default[600],
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Follow these guidelines to get the most out of design tokens
            </p>
          </div>
        </div>
        <TokenGrid gap={6} minWidth="280px">
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
            <TokenCard
              key={index}
              title={tip.title}
              description={tip.description}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: spacing[3] }}>
                {tip.icon}
              </div>
              <CodeBlock code={tip.example} showCopy={false} />
            </TokenCard>
          ))}
        </TokenGrid>
      </div>

      {/* Next Steps */}
      <div style={{ marginTop: spacing[16] }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing[3],
            marginBottom: spacing[8],
            paddingBottom: spacing[4],
            borderBottom: `2px solid ${colors.default[200]}`,
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.primary[600]})`,
              padding: spacing[3],
              borderRadius: radius.lg,
              boxShadow: shadows.md,
            }}
          >
            🎯
          </div>
          <div>
            <h2
              style={{
                fontSize: typography.fontSize["2xl"],
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                margin: 0,
                marginBottom: spacing[1],
              }}
            >
              Next Steps
            </h2>
            <p
              style={{
                fontSize: typography.fontSize.sm,
                color: colors.default[600],
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Continue your journey with these detailed guides
            </p>
          </div>
        </div>
        <TokenGrid gap={6} minWidth="280px">
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
            <button
              key={index}
              type="button"
              style={{
                position: "relative",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                padding: 0,
                width: "100%",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => linkTo(item.storyId)()}
              aria-label={`Navigate to ${item.title} documentation`}
            >
              <TokenCard
                title={item.title}
                description={item.description}
                variant="default"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: spacing[3],
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: radius.md,
                      backgroundColor: item.color[100],
                      border: `2px solid ${item.color[300]}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: item.color.DEFAULT,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: item.color[600],
                      fontWeight: typography.fontWeight.semibold,
                      display: "flex",
                      alignItems: "center",
                      gap: spacing[1],
                    }}
                  >
                    Explore
                    <span style={{ fontSize: "1.2em" }}>→</span>
                  </span>
                </div>
              </TokenCard>
            </button>
          ))}
        </TokenGrid>
      </div>
    </StoryContainer>
  ),
};

export const CheatSheet: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Design Tokens Cheat Sheet"
        description="Quick reference for all available design tokens and their common use cases."
        icon="📋"
      />

      <TokenGrid gap={6} minWidth="300px">
        {/* Colors */}
        <TokenCard title="🎨 Colors" variant="primary">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: spacing[2],
              fontSize: typography.fontSize.sm,
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
        </TokenCard>

        {/* Spacing */}
        <TokenCard title="📏 Spacing" variant="secondary">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: spacing[2],
              fontSize: typography.fontSize.sm,
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
        </TokenCard>

        {/* Typography */}
        <TokenCard title="📝 Typography" variant="success">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: spacing[2],
              fontSize: typography.fontSize.sm,
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
        </TokenCard>

        {/* Radius */}
        <TokenCard title="📐 Radius" variant="warning">
          <div
            style={{
              display: "grid",
              gap: spacing[2],
              fontSize: typography.fontSize.sm,
              fontFamily: "monospace",
            }}
          >
            <div>radius.sm → 2px</div>
            <div>radius.md → 6px</div>
            <div>radius.lg → 8px</div>
            <div>radius.xl → 12px</div>
          </div>
        </TokenCard>
      </TokenGrid>

      {/* Usage Examples */}
      <div style={{ marginTop: spacing[12] }}>
        <h2
          style={{
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.semibold,
            color: colors.foreground,
            marginBottom: spacing[6],
          }}
        >
          🔧 Common Usage Examples
        </h2>

        <TokenGrid gap={4} minWidth="300px">
          <TokenCard title="Button Component" variant="primary">
            <CodeBlock
              code={`// Primary button
backgroundColor: colors.primary.DEFAULT
color: colors.primary.foreground
padding: \`\${spacing[2]} \${spacing[4]}\`
borderRadius: radius.md`}
              showCopy={false}
            />
          </TokenCard>

          <TokenCard title="Card Layout" variant="secondary">
            <CodeBlock
              code={`// Card container
padding: spacing[6]
backgroundColor: colors.background
border: \`1px solid \${colors.default[200]}\`
borderRadius: radius.lg
gap: spacing[4]`}
              showCopy={false}
            />
          </TokenCard>

          <TokenCard title="Typography Hierarchy" variant="success">
            <CodeBlock
              code={`// Heading
fontSize: typography.fontSize["2xl"]
fontWeight: typography.fontWeight.semibold
marginBottom: spacing[4]

// Body text
fontSize: typography.fontSize.base
lineHeight: typography.lineHeight.relaxed`}
              showCopy={false}
            />
          </TokenCard>
        </TokenGrid>
      </div>
    </StoryContainer>
  ),
};
