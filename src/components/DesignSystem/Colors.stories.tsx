import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors, baseColors, radius, spacing } from "../../theme";
import {
  StoryContainer,
  SectionHeader,
  TokenGrid,
  ColorSwatch,
  TokenCard,
  CodeBlock,
  isSemanticColor,
} from "./shared";

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

export const SemanticColors: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Semantic Colors"
        description="Click on any color to copy its hex value. These semantic colors provide meaning and context across the design system."
        icon="🎨"
      />

      {Object.entries(colors).map(([colorName, colorObj]) => {
        if (isSemanticColor(colorObj)) {
          const color = colorObj;
          const defaultColor = color.DEFAULT;
          const foregroundColor = color.foreground;

          return (
            <TokenCard
              key={colorName}
              title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
              description={`colors.${colorName}.DEFAULT`}
              variant={
                colorName as
                  | "default"
                  | "primary"
                  | "secondary"
                  | "success"
                  | "warning"
                  | "danger"
              }
            >
              {/* Main color display */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: spacing[4],
                  marginBottom: spacing[4],
                }}
              >
                <ColorSwatch
                  name={`${colorName} (DEFAULT)`}
                  color={defaultColor}
                  textColor={foregroundColor}
                  isLarge={true}
                />
                <ColorSwatch name="Foreground" color={foregroundColor} />
              </div>

              {/* Color scale */}
              <TokenGrid columns="repeat(auto-fit, minmax(100px, 1fr))" gap={2}>
                {Object.entries(color).map(([shade, value]) => {
                  if (shade !== "DEFAULT" && shade !== "foreground") {
                    return (
                      <ColorSwatch key={shade} name={shade} color={value} />
                    );
                  }
                  return null;
                })}
              </TokenGrid>
            </TokenCard>
          );
        }
        return null;
      })}
    </StoryContainer>
  ),
};

export const BaseColors: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Base Color Palette"
        description="The foundational color palette used to build semantic colors. These are the raw color values."
        icon="🎯"
      />

      {Object.entries(baseColors).map(([colorName, colorValue]) => {
        if (typeof colorValue === "object") {
          return (
            <TokenCard
              key={colorName}
              title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
            >
              <TokenGrid columns="repeat(auto-fit, minmax(100px, 1fr))" gap={2}>
                {Object.entries(colorValue).map(([shade, value]) => (
                  <ColorSwatch key={shade} name={shade} color={value} />
                ))}
              </TokenGrid>
            </TokenCard>
          );
        } else {
          return (
            <TokenCard
              key={colorName}
              title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
            >
              <div style={{ width: "200px" }}>
                <ColorSwatch name={colorName} color={colorValue} />
              </div>
            </TokenCard>
          );
        }
      })}
    </StoryContainer>
  ),
};

export const ColorUsageGuide: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Color Usage Guide"
        description="Best practices and guidelines for using colors in your components."
        icon="📖"
      />

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
          <TokenCard
            key={index}
            title={item.title}
            description={item.description}
          >
            {item.example}
          </TokenCard>
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
        <CodeBlock
          code={`// Import colors
import { colors } from '@/theme';

// Use semantic colors
backgroundColor: colors.primary.DEFAULT,
color: colors.primary.foreground,

// Use color scales
backgroundColor: colors.primary[50],
borderColor: colors.primary[200],
color: colors.primary[800],`}
        />
      </div>
    </StoryContainer>
  ),
};
