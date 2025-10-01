import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { typography, radius, spacing } from "../../theme";
import {
  StoryContainer,
  SectionHeader,
  TokenGrid,
  TokenCard,
  CodeBlock,
} from "./shared";

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
    <StoryContainer>
      <SectionHeader
        title="Font Sizes"
        description="Our type scale provides consistent sizing for different content types and hierarchies."
        icon="📐"
      />

      <TokenGrid gap={4} minWidth="400px">
        {Object.entries(typography.fontSize).map(([size, value]) => (
          <TokenCard
            key={size}
            title={size}
            description={`${value} (${parseInt(value) * 16}px)`}
          >
            <div
              style={{
                fontSize: value as string,
                lineHeight: typography.lineHeight.normal,
                color: "#111827",
                marginBottom: spacing[2],
              }}
            >
              {sampleText}
            </div>
            <CodeBlock code={`typography.fontSize.${size}`} showCopy={false} />
          </TokenCard>
        ))}
      </TokenGrid>
    </StoryContainer>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Font Weights"
        description="Font weights help establish visual hierarchy and emphasis in text content."
        icon="⚖️"
      />

      <TokenGrid gap={4} minWidth="400px">
        {Object.entries(typography.fontWeight).map(([weight, value]) => (
          <TokenCard
            key={weight}
            title={weight}
            description={`Weight: ${value}`}
          >
            <div
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: value as string,
                lineHeight: typography.lineHeight.normal,
                color: "#111827",
                marginBottom: spacing[2],
              }}
            >
              {sampleText}
            </div>
            <CodeBlock
              code={`typography.fontWeight.${weight}`}
              showCopy={false}
            />
          </TokenCard>
        ))}
      </TokenGrid>
    </StoryContainer>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Line Heights"
        description="Line heights control the vertical spacing between lines of text, affecting readability and visual density."
        icon="📏"
      />

      <TokenGrid gap={4} minWidth="400px">
        {Object.entries(typography.lineHeight).map(([height, value]) => (
          <TokenCard
            key={height}
            title={height}
            description={`Line height: ${value}`}
          >
            <div
              style={{
                fontSize: typography.fontSize.base,
                lineHeight: value as string,
                color: "#111827",
                marginBottom: spacing[2],
              }}
            >
              {longText}
            </div>
            <CodeBlock
              code={`typography.lineHeight.${height}`}
              showCopy={false}
            />
          </TokenCard>
        ))}
      </TokenGrid>
    </StoryContainer>
  ),
};

export const TypographyShowcase: Story = {
  render: () => (
    <StoryContainer maxWidth="800px">
      <SectionHeader
        title="Typography in Action"
        description="See how different typography tokens work together in real content scenarios."
        icon="🎯"
      />

      {/* Article Example */}
      <TokenCard title="Article Example" variant="default">
        {/* Heading Hierarchy */}
        <h1
          style={{
            fontSize: typography.fontSize["3xl"],
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.tight,
            color: "#111827",
            marginBottom: spacing[4],
          }}
        >
          Design System Typography
        </h1>

        <h2
          style={{
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.semibold,
            lineHeight: typography.lineHeight.tight,
            color: "#111827",
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
            color: "#374151",
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
            color: "#111827",
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
            color: "#374151",
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
            backgroundColor: "#f9fafb",
            padding: "1.5rem",
            borderRadius: radius.md,
            marginTop: "2rem",
          }}
        >
          <h4
            style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.medium,
              color: "#111827",
              marginBottom: "1rem",
            }}
          >
            Usage Example
          </h4>
          <CodeBlock
            code={`fontSize: typography.fontSize.lg,
fontWeight: typography.fontWeight.medium,
lineHeight: typography.lineHeight.normal,`}
          />
        </div>

        {/* Caption */}
        <p
          style={{
            fontSize: typography.fontSize.sm,
            color: "#6b7280",
            marginTop: "1rem",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Example of a complete typography hierarchy using design tokens
        </p>
      </TokenCard>

      {/* Typography Reference */}
      <div style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          Quick Reference
        </h2>

        <TokenGrid gap={4} minWidth="300px">
          <TokenCard
            title="Button Text"
            description="fontSize.sm + fontWeight.medium"
            variant="primary"
          >
            <div
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              Example Button Text
            </div>
          </TokenCard>

          <TokenCard
            title="Body Text"
            description="fontSize.base + fontWeight.normal"
            variant="secondary"
          >
            <div
              style={{
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.normal,
              }}
            >
              Example body text with proper readability
            </div>
          </TokenCard>

          <TokenCard
            title="Headings"
            description="fontSize.xl+ + fontWeight.semibold+"
            variant="success"
          >
            <div
              style={{
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.semibold,
              }}
            >
              Example Heading
            </div>
          </TokenCard>
        </TokenGrid>
      </div>
    </StoryContainer>
  ),
};
