import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { spacing, colors, radius } from "../../theme";
import {
  StoryContainer,
  SectionHeader,
  TokenGrid,
  TokenCard,
  CodeBlock,
  CopyableText,
} from "./shared";

const meta: Meta = {
  title: "Design System/Spacing",
  parameters: {
    docs: {
      description: {
        component: `
# Spacing System

Our spacing system provides consistent layout and component spacing throughout the design system. The spacing scale follows a logical progression that makes it easy to create harmonious layouts.

## Spacing Scale

The spacing scale is based on rem units, providing consistent spacing that scales with the user's font size preferences. Each value is carefully chosen to work well with the overall design system.

## Usage

\`\`\`typescript
import { spacing } from '@/theme';

// Use for padding
padding: spacing[4],

// Use for margins  
margin: spacing[2],

// Use for gaps
gap: spacing[6],
\`\`\`

## Common Patterns

- **Component padding**: Use spacing[2] to spacing[4] for internal component spacing
- **Layout gaps**: Use spacing[4] to spacing[8] for spacing between components
- **Section spacing**: Use spacing[8] to spacing[16] for major layout sections
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Enhanced spacing visualizer with better accessibility
const SpacingVisualizer: React.FC<{
  size: string;
  value: string;
  direction?: "horizontal" | "vertical" | "both";
}> = ({ size, value, direction = "both" }) => {
  const [showMeasurement, setShowMeasurement] = useState(false);

  return (
    <TokenCard
      title={`spacing[${size}]`}
      description={`${value} (${parseFloat(value) * 16}px)`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing[4],
        }}
      >
        <CopyableText text={`spacing[${size}]`} label="spacing token" />
        <button
          onClick={() => setShowMeasurement(!showMeasurement)}
          style={{
            fontSize: "0.75rem",
            padding: `${spacing[1]} ${spacing[2]}`,
            backgroundColor: "#dbeafe",
            color: "#1d4ed8",
            border: "1px solid #93c5fd",
            borderRadius: radius.sm,
            cursor: "pointer",
          }}
          aria-label={`${
            showMeasurement ? "Hide" : "Show"
          } measurements for spacing ${size}`}
        >
          {showMeasurement ? "Hide" : "Show"} Measurements
        </button>
      </div>

      {/* Visual representation */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: spacing[4],
        }}
      >
        {/* Horizontal spacing */}
        {(direction === "horizontal" || direction === "both") && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: value,
              padding: "0.5rem",
              backgroundColor: "#f9fafb",
              borderRadius: radius.sm,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#3b82f6",
                borderRadius: radius.sm,
              }}
              aria-label="First element"
            />
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#9333ea",
                borderRadius: radius.sm,
              }}
              aria-label="Second element"
            />
            {showMeasurement && (
              <div
                style={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.75rem",
                  color: colors.default[600],
                  backgroundColor: colors.background,
                  padding: "0.25rem 0.5rem",
                  borderRadius: radius.sm,
                  border: `1px solid ${colors.default[300]}`,
                }}
              >
                gap: {value}
              </div>
            )}
          </div>
        )}

        {/* Vertical spacing */}
        {(direction === "vertical" || direction === "both") && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: value,
              padding: "0.5rem",
              backgroundColor: "#f9fafb",
              borderRadius: radius.sm,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "20px",
                backgroundColor: "#22c55e",
                borderRadius: radius.sm,
              }}
              aria-label="First element"
            />
            <div
              style={{
                width: "80px",
                height: "20px",
                backgroundColor: "#eab308",
                borderRadius: radius.sm,
              }}
              aria-label="Second element"
            />
            {showMeasurement && (
              <div
                style={{
                  position: "absolute",
                  right: "-4rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.75rem",
                  color: "#4b5563",
                  backgroundColor: "#ffffff",
                  padding: "0.25rem 0.5rem",
                  borderRadius: radius.sm,
                  border: "1px solid #d1d5db",
                  whiteSpace: "nowrap",
                }}
              >
                gap: {value}
              </div>
            )}
          </div>
        )}
      </div>
    </TokenCard>
  );
};

export const SpacingScale: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Spacing Scale"
        description="Our spacing scale provides consistent layout spacing. Click 'Show Measurements' to see spacing in action."
        icon="📏"
      />

      <TokenGrid gap={4} minWidth="320px">
        {Object.entries(spacing).map(([size, value]) => (
          <SpacingVisualizer key={size} size={size} value={value as string} />
        ))}
      </TokenGrid>
    </StoryContainer>
  ),
};

export const SpacingPatterns: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Common Spacing Patterns"
        description="Examples of how spacing tokens are used in common UI patterns and components."
        icon="🎯"
      />

      <TokenGrid gap={6} minWidth="400px">
        {/* Card Layout Pattern */}
        <TokenCard
          title="Card Layout (spacing[4] internal, spacing[6] between)"
          variant="primary"
        >
          <div
            style={{
              display: "grid",
              gap: spacing[6],
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {["Card 1", "Card 2", "Card 3"].map((title, index) => (
              <div
                key={index}
                style={{
                  padding: spacing[4],
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: radius.lg,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: spacing[2],
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    lineHeight: "1.5",
                    marginBottom: spacing[3],
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button
                  style={{
                    padding: `${spacing[2]} ${spacing[4]}`,
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: radius.md,
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <CodeBlock
              code="gap: spacing[6], padding: spacing[4]"
              showCopy={false}
            />
          </div>
        </TokenCard>

        {/* Form Layout Pattern */}
        <TokenCard
          title="Form Layout (spacing[4] between fields, spacing[2] labels)"
          variant="secondary"
        >
          <div
            style={{
              maxWidth: "400px",
              padding: spacing[6],
              backgroundColor: colors.background,
              border: `1px solid ${colors.default[200]}`,
              borderRadius: radius.lg,
            }}
          >
            <div style={{ marginBottom: spacing[4] }}>
              <label
                htmlFor="fullName"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: colors.foreground,
                  marginBottom: spacing[2],
                }}
              >
                Full Name
              </label>
              <input
                id="fullName"
                style={{
                  width: "100%",
                  padding: spacing[3],
                  border: `1px solid ${colors.default[300]}`,
                  borderRadius: radius.md,
                  fontSize: "1rem",
                }}
                placeholder="Enter your name"
              />
            </div>
            <div style={{ marginBottom: spacing[4] }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: colors.foreground,
                  marginBottom: spacing[2],
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                style={{
                  width: "100%",
                  padding: spacing[3],
                  border: `1px solid ${colors.default[300]}`,
                  borderRadius: radius.md,
                  fontSize: "1rem",
                }}
                placeholder="Enter your email"
              />
            </div>
            <button
              style={{
                width: "100%",
                padding: `${spacing[3]} ${spacing[4]}`,
                backgroundColor: colors.primary.DEFAULT,
                color: colors.primary.foreground,
                border: "none",
                borderRadius: radius.md,
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <CodeBlock
              code="marginBottom: spacing[4], labelMargin: spacing[2], padding: spacing[3]"
              showCopy={false}
            />
          </div>
        </TokenCard>

        {/* Navigation Pattern */}
        <TokenCard
          title="Navigation (spacing[2] vertical, spacing[6] horizontal)"
          variant="success"
        >
          <nav
            style={{
              display: "flex",
              gap: spacing[6],
              padding: `${spacing[3]} ${spacing[4]}`,
              backgroundColor: colors.background,
              border: `1px solid ${colors.default[200]}`,
              borderRadius: radius.lg,
            }}
          >
            {["Home", "About", "Services", "Contact"].map((item, index) => (
              <button
                key={index}
                style={{
                  padding: `${spacing[2]} ${spacing[3]}`,
                  backgroundColor:
                    index === 0 ? colors.primary.DEFAULT : "transparent",
                  color:
                    index === 0 ? colors.primary.foreground : colors.foreground,
                  border: "none",
                  borderRadius: radius.md,
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: "1rem" }}>
            <CodeBlock
              code="gap: spacing[6], itemPadding: spacing[2] spacing[3]"
              showCopy={false}
            />
          </div>
        </TokenCard>
      </TokenGrid>
    </StoryContainer>
  ),
};

export const SpacingReference: Story = {
  render: () => (
    <StoryContainer>
      <SectionHeader
        title="Spacing Reference"
        description="Quick reference guide for when to use different spacing values."
        icon="📚"
      />

      <TokenGrid>
        {[
          {
            range: "spacing[0] - spacing[1]",
            usage: "Fine details, borders, very tight spacing",
            examples: [
              "Icon padding",
              "Border widths",
              "Subtle element separation",
            ],
            variant: "default" as const,
          },
          {
            range: "spacing[1.5] - spacing[3]",
            usage: "Component internal spacing, small gaps",
            examples: [
              "Button padding",
              "Input padding",
              "Small component gaps",
            ],
            variant: "primary" as const,
          },
          {
            range: "spacing[4] - spacing[6]",
            usage: "Component spacing, layout gaps",
            examples: ["Card padding", "Form field gaps", "Component margins"],
            variant: "secondary" as const,
          },
          {
            range: "spacing[8] - spacing[12]",
            usage: "Section spacing, large layout gaps",
            examples: [
              "Section margins",
              "Container padding",
              "Major layout spacing",
            ],
            variant: "success" as const,
          },
          {
            range: "spacing[16] - spacing[24]",
            usage: "Page-level spacing, major sections",
            examples: ["Page margins", "Hero sections", "Major content blocks"],
            variant: "warning" as const,
          },
        ].map((category, index) => (
          <TokenCard
            key={index}
            title={category.range}
            description={category.usage}
            variant={category.variant}
          >
            <div>
              <strong style={{ fontSize: "0.875rem" }}>Common uses:</strong>
              <ul
                style={{
                  margin: "0.5rem 0 0 1.5rem",
                  fontSize: "0.875rem",
                }}
              >
                {category.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
          </TokenCard>
        ))}
      </TokenGrid>

      {/* Usage Code */}
      <div style={{ marginTop: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Code Examples
        </h2>
        <CodeBlock
          code={`// Import spacing tokens
import { spacing } from '@/theme';

// Use in styles
padding: spacing[4],
margin: spacing[2],
gap: spacing[6],

// Combine with other properties
padding: \`\${spacing[3]} \${spacing[4]}\`,
margin: \`\${spacing[2]} 0\`,`}
        />
      </div>
    </StoryContainer>
  ),
};
