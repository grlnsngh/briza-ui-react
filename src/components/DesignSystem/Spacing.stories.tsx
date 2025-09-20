import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { spacing, colors, radius } from "../../theme";

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

// Helper component to visualize spacing
const SpacingVisualizer: React.FC<{
  size: string;
  value: string;
  direction?: "horizontal" | "vertical" | "both";
}> = ({ size, value, direction = "both" }) => {
  const [showMeasurement, setShowMeasurement] = useState(false);

  return (
    <div
      style={{
        padding: "1rem",
        border: `1px solid ${colors.default[200]}`,
        borderRadius: radius.md,
        backgroundColor: colors.background,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: colors.foreground,
            }}
          >
            spacing[{size}]
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: colors.default[600],
              fontFamily: "monospace",
            }}
          >
            {value} ({parseFloat(value) * 16}px)
          </div>
        </div>
        <button
          onClick={() => setShowMeasurement(!showMeasurement)}
          style={{
            fontSize: "0.75rem",
            padding: "0.25rem 0.5rem",
            backgroundColor: colors.primary[100],
            color: colors.primary[700],
            border: `1px solid ${colors.primary[300]}`,
            borderRadius: radius.sm,
            cursor: "pointer",
          }}
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
          gap: "1rem",
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
              backgroundColor: colors.default[50],
              borderRadius: radius.sm,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: colors.primary.DEFAULT,
                borderRadius: radius.sm,
              }}
            />
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: colors.secondary.DEFAULT,
                borderRadius: radius.sm,
              }}
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
              backgroundColor: colors.default[50],
              borderRadius: radius.sm,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "20px",
                backgroundColor: colors.success.DEFAULT,
                borderRadius: radius.sm,
              }}
            />
            <div
              style={{
                width: "80px",
                height: "20px",
                backgroundColor: colors.warning.DEFAULT,
                borderRadius: radius.sm,
              }}
            />
            {showMeasurement && (
              <div
                style={{
                  position: "absolute",
                  right: "-4rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.75rem",
                  color: colors.default[600],
                  backgroundColor: colors.background,
                  padding: "0.25rem 0.5rem",
                  borderRadius: radius.sm,
                  border: `1px solid ${colors.default[300]}`,
                  whiteSpace: "nowrap",
                }}
              >
                gap: {value}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const SpacingScale: Story = {
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
          📏 Spacing Scale
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Our spacing scale provides consistent layout spacing. Click "Show
          Measurements" to see spacing in action.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        {Object.entries(spacing).map(([size, value]) => (
          <SpacingVisualizer key={size} size={size} value={value as string} />
        ))}
      </div>
    </div>
  ),
};

export const SpacingPatterns: Story = {
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
          🎯 Common Spacing Patterns
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Examples of how spacing tokens are used in common UI patterns and
          components.
        </p>
      </div>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Card Layout Pattern */}
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            Card Layout (spacing[4] internal, spacing[6] between)
          </h2>
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
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.default[200]}`,
                  borderRadius: radius.lg,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: colors.foreground,
                    marginBottom: spacing[2],
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: colors.default[600],
                    lineHeight: "1.5",
                    marginBottom: spacing[3],
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button
                  style={{
                    padding: `${spacing[2]} ${spacing[4]}`,
                    backgroundColor: colors.primary.DEFAULT,
                    color: colors.primary.foreground,
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
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: colors.default[50],
              borderRadius: radius.md,
              fontSize: "0.875rem",
              fontFamily: "monospace",
              color: colors.default[700],
            }}
          >
            gap: spacing[6], padding: spacing[4]
          </div>
        </div>

        {/* Form Layout Pattern */}
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            Form Layout (spacing[4] between fields, spacing[2] labels)
          </h2>
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
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: colors.default[50],
              borderRadius: radius.md,
              fontSize: "0.875rem",
              fontFamily: "monospace",
              color: colors.default[700],
            }}
          >
            marginBottom: spacing[4], labelMargin: spacing[2], padding:
            spacing[3]
          </div>
        </div>

        {/* Navigation Pattern */}
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: colors.foreground,
              marginBottom: "1rem",
            }}
          >
            Navigation (spacing[2] vertical, spacing[6] horizontal)
          </h2>
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
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: colors.default[50],
              borderRadius: radius.md,
              fontSize: "0.875rem",
              fontFamily: "monospace",
              color: colors.default[700],
            }}
          >
            gap: spacing[6], itemPadding: spacing[2] spacing[3]
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SpacingReference: Story = {
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
          📚 Spacing Reference
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Quick reference guide for when to use different spacing values.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {[
          {
            range: "spacing[0] - spacing[1]",
            usage: "Fine details, borders, very tight spacing",
            examples: [
              "Icon padding",
              "Border widths",
              "Subtle element separation",
            ],
            color: colors.default,
          },
          {
            range: "spacing[1.5] - spacing[3]",
            usage: "Component internal spacing, small gaps",
            examples: [
              "Button padding",
              "Input padding",
              "Small component gaps",
            ],
            color: colors.primary,
          },
          {
            range: "spacing[4] - spacing[6]",
            usage: "Component spacing, layout gaps",
            examples: ["Card padding", "Form field gaps", "Component margins"],
            color: colors.secondary,
          },
          {
            range: "spacing[8] - spacing[12]",
            usage: "Section spacing, large layout gaps",
            examples: [
              "Section margins",
              "Container padding",
              "Major layout spacing",
            ],
            color: colors.success,
          },
          {
            range: "spacing[16] - spacing[24]",
            usage: "Page-level spacing, major sections",
            examples: ["Page margins", "Hero sections", "Major content blocks"],
            color: colors.warning,
          },
        ].map((category, index) => (
          <div
            key={index}
            style={{
              padding: "1.5rem",
              backgroundColor: category.color[50],
              border: `1px solid ${category.color[200]}`,
              borderRadius: radius.lg,
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: category.color[800],
                marginBottom: "0.5rem",
              }}
            >
              {category.range}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: category.color[700],
                marginBottom: "1rem",
                lineHeight: "1.5",
              }}
            >
              {category.usage}
            </p>
            <div>
              <strong
                style={{
                  fontSize: "0.875rem",
                  color: category.color[800],
                }}
              >
                Common uses:
              </strong>
              <ul
                style={{
                  margin: "0.5rem 0 0 1.5rem",
                  fontSize: "0.875rem",
                  color: category.color[700],
                }}
              >
                {category.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

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
            {`// Import spacing tokens`}
            <br />
            {`import { spacing } from '@/theme';`}
          </div>
          <div style={{ marginBottom: "1rem", color: colors.default[700] }}>
            {`// Use in styles`}
            <br />
            {`padding: spacing[4],`}
            <br />
            {`margin: spacing[2],`}
            <br />
            {`gap: spacing[6],`}
          </div>
          <div style={{ color: colors.default[700] }}>
            {`// Combine with other properties`}
            <br />
            {`padding: \`\${spacing[3]} \${spacing[4]}\`,`}
            <br />
            {`margin: \`\${spacing[2]} 0\`,`}
          </div>
        </div>
      </div>
    </div>
  ),
};
