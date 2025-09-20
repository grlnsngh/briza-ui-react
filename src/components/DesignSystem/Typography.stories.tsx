import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { typography, colors, radius } from "../../theme";

const meta: Meta = {
  title: "Design System/Typography",
  parameters: {
    docs: {
      description: {
        component: `
# Typography System

Our typography system provides consistent text styling across the design system. It includes font sizes, weights, line heights, and letter spacing values that work harmoniously together.

## Font Sizes

Font sizes follow a type scale that ensures good visual hierarchy and readability across different screen sizes and use cases.

## Font Weights

Font weights provide emphasis and hierarchy in text content:
- **Normal (400)**: Body text and regular content
- **Medium (500)**: Slightly emphasized text, buttons
- **Semi-bold (600)**: Headings and important content  
- **Bold (700)**: Strong emphasis and primary headings

## Usage

\`\`\`typescript
import { typography } from '@/theme';

// Use font sizes
fontSize: typography.fontSize.lg,

// Use font weights  
fontWeight: typography.fontWeight.medium,

// Use line heights
lineHeight: typography.lineHeight.normal,
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const sampleText = "The quick brown fox jumps over the lazy dog";
const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

export const FontSizes: Story = {
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
          📐 Font Sizes
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Our type scale provides consistent sizing for different content types
          and hierarchies.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {Object.entries(typography.fontSize).map(([size, value]) => (
          <div
            key={size}
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
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.75rem",
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${colors.default[100]}`,
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.foreground,
                  margin: 0,
                }}
              >
                {size}
              </h3>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.default[500],
                  fontFamily: "monospace",
                }}
              >
                {value} ({parseInt(value) * 16}px)
              </div>
            </div>
            <div
              style={{
                fontSize: value as string,
                lineHeight: typography.lineHeight.normal,
                color: colors.foreground,
              }}
            >
              {sampleText}
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: colors.default[500],
                fontFamily: "monospace",
              }}
            >
              typography.fontSize.{size}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
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
          ⚖️ Font Weights
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Font weights help establish visual hierarchy and emphasis in text
          content.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {Object.entries(typography.fontWeight).map(([weight, value]) => (
          <div
            key={weight}
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
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.75rem",
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${colors.default[100]}`,
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.foreground,
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {weight}
              </h3>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.default[500],
                  fontFamily: "monospace",
                }}
              >
                {value}
              </div>
            </div>
            <div
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: value as string,
                lineHeight: typography.lineHeight.normal,
                color: colors.foreground,
              }}
            >
              {sampleText}
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: colors.default[500],
                fontFamily: "monospace",
              }}
            >
              typography.fontWeight.{weight}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const LineHeights: Story = {
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
          📏 Line Heights
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Line heights control the vertical spacing between lines of text,
          affecting readability and visual density.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {Object.entries(typography.lineHeight).map(([height, value]) => (
          <div
            key={height}
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
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.75rem",
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${colors.default[100]}`,
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.foreground,
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {height}
              </h3>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.default[500],
                  fontFamily: "monospace",
                }}
              >
                {value}
              </div>
            </div>
            <div
              style={{
                fontSize: typography.fontSize.base,
                lineHeight: value as string,
                color: colors.foreground,
              }}
            >
              {longText}
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: colors.default[500],
                fontFamily: "monospace",
              }}
            >
              typography.lineHeight.{height}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const TypographyShowcase: Story = {
  render: () => (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: "2rem",
      }}
    >
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: colors.foreground,
            marginBottom: "0.5rem",
          }}
        >
          🎯 Typography in Action
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          See how different typography tokens work together in real content
          scenarios.
        </p>
      </div>

      {/* Article Example */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: colors.background,
          border: `1px solid ${colors.default[200]}`,
          borderRadius: radius.lg,
        }}
      >
        {/* Heading Hierarchy */}
        <h1
          style={{
            fontSize: typography.fontSize["3xl"],
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.tight,
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Design System Typography
        </h1>

        <h2
          style={{
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.semibold,
            lineHeight: typography.lineHeight.tight,
            color: colors.foreground,
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          Building Consistent Interfaces
        </h2>

        <p
          style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.normal,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.default[700],
            marginBottom: "1.5rem",
          }}
        >
          Typography plays a crucial role in creating intuitive and accessible
          user interfaces. A well-designed type system helps establish clear
          information hierarchy, improves readability, and enhances the overall
          user experience.
        </p>

        <h3
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            lineHeight: typography.lineHeight.normal,
            color: colors.foreground,
            marginBottom: "0.75rem",
            marginTop: "2rem",
          }}
        >
          Key Principles
        </h3>

        <ul
          style={{
            fontSize: typography.fontSize.base,
            lineHeight: typography.lineHeight.relaxed,
            color: colors.default[700],
            paddingLeft: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <li style={{ marginBottom: "0.5rem" }}>
            <strong style={{ fontWeight: typography.fontWeight.medium }}>
              Hierarchy:
            </strong>{" "}
            Clear visual distinction between heading levels
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong style={{ fontWeight: typography.fontWeight.medium }}>
              Readability:
            </strong>{" "}
            Appropriate line heights and font sizes for content
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong style={{ fontWeight: typography.fontWeight.medium }}>
              Consistency:
            </strong>{" "}
            Systematic approach to typography choices
          </li>
        </ul>

        {/* Code Example */}
        <div
          style={{
            backgroundColor: colors.default[50],
            padding: "1.5rem",
            borderRadius: radius.md,
            marginTop: "2rem",
          }}
        >
          <h4
            style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.medium,
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            Usage Example
          </h4>
          <code
            style={{
              fontSize: typography.fontSize.sm,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              color: colors.default[700],
              lineHeight: typography.lineHeight.relaxed,
              display: "block",
              whiteSpace: "pre",
            }}
          >
            {`fontSize: typography.fontSize.lg,
fontWeight: typography.fontWeight.medium,
lineHeight: typography.lineHeight.normal,`}
          </code>
        </div>

        {/* Caption */}
        <p
          style={{
            fontSize: typography.fontSize.sm,
            color: colors.default[500],
            marginTop: "1rem",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Example of a complete typography hierarchy using design tokens
        </p>
      </div>

      {/* Typography Reference */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Quick Reference
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: colors.primary[50],
              border: `1px solid ${colors.primary[200]}`,
              borderRadius: radius.md,
            }}
          >
            <h4
              style={{
                color: colors.primary[800],
                margin: "0 0 0.5rem 0",
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              Button Text
            </h4>
            <div
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                color: colors.primary[700],
              }}
            >
              fontSize.sm + fontWeight.medium
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              backgroundColor: colors.secondary[50],
              border: `1px solid ${colors.secondary[200]}`,
              borderRadius: radius.md,
            }}
          >
            <h4
              style={{
                color: colors.secondary[800],
                margin: "0 0 0.5rem 0",
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              Body Text
            </h4>
            <div
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.normal,
                color: colors.secondary[700],
              }}
            >
              fontSize.base + fontWeight.normal
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              backgroundColor: colors.success[50],
              border: `1px solid ${colors.success[200]}`,
              borderRadius: radius.md,
            }}
          >
            <h4
              style={{
                color: colors.success[800],
                margin: "0 0 0.5rem 0",
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              Headings
            </h4>
            <div
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.normal,
                color: colors.success[700],
              }}
            >
              fontSize.xl+ + fontWeight.semibold+
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
