import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { radius, shadows, colors, spacing } from "../../theme";

const meta: Meta = {
  title: "Design System/Radius & Shadows",
  parameters: {
    docs: {
      description: {
        component: `
# Border Radius & Shadows

Visual effects that add depth, hierarchy, and polish to interface elements. Border radius creates friendly, approachable shapes while shadows provide depth and layering information.

## Border Radius

Our radius scale provides consistent rounding for different component types:
- **none**: Sharp corners for technical or precise elements
- **sm/md**: Subtle rounding for most components  
- **lg/xl**: More pronounced rounding for cards and containers
- **full**: Complete rounding for circular elements and pills

## Shadows

Shadow tokens create visual hierarchy and depth:
- **Basic shadows**: Subtle elevation for cards and overlays
- **Button shadows**: Interactive depth for clickable elements
- **Glow effects**: Special emphasis and state indication

## Usage

\`\`\`typescript
import { radius, shadows } from '@/theme';

// Border radius
borderRadius: radius.md,

// Shadows
boxShadow: shadows.lg,

// Special effects
boxShadow: shadows.glow.primary,
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper component for radius visualization
const RadiusCard: React.FC<{
  name: string;
  value: string;
  size?: "small" | "medium" | "large";
}> = ({ name, value, size = "medium" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dimensions = {
    small: { width: "60px", height: "60px" },
    medium: { width: "100px", height: "100px" },
    large: { width: "140px", height: "80px" },
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: colors.background,
        border: `1px solid ${colors.default[200]}`,
        borderRadius: radius.md,
        textAlign: "center",
      }}
    >
      <button
        type="button"
        style={{
          margin: "0 auto 1rem",
          ...dimensions[size],
          backgroundColor: colors.primary[100],
          border: `2px solid ${colors.primary.DEFAULT}`,
          borderRadius: value,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.primary[700],
          fontWeight: "500",
          fontSize: "0.875rem",
          position: "relative",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onClick={copyToClipboard}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        title={`Click to copy ${value}`}
      >
        {name}
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
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: colors.foreground,
          marginBottom: "0.25rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: colors.default[600],
          fontFamily: "monospace",
        }}
      >
        {value}
      </div>
    </div>
  );
};

// Helper component for shadow visualization
const ShadowCard: React.FC<{
  name: string;
  value: string;
  description?: string;
}> = ({ name, value, description }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: colors.background,
        border: `1px solid ${colors.default[200]}`,
        borderRadius: radius.md,
      }}
    >
      <button
        type="button"
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: colors.background,
          borderRadius: radius.md,
          boxShadow: value,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          position: "relative",
          border: `1px solid ${colors.default[100]}`,
        }}
        onClick={copyToClipboard}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        title={`Click to copy shadow value`}
      >
        <span
          style={{
            color: colors.default[600],
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          {name}
        </span>
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
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: "600",
          color: colors.foreground,
          marginBottom: "0.25rem",
        }}
      >
        {name}
      </div>
      {description && (
        <div
          style={{
            fontSize: "0.75rem",
            color: colors.default[600],
            marginBottom: "0.5rem",
            lineHeight: "1.4",
          }}
        >
          {description}
        </div>
      )}
      <div
        style={{
          fontSize: "0.75rem",
          color: colors.default[500],
          fontFamily: "monospace",
          wordBreak: "break-all",
        }}
      >
        {value}
      </div>
    </div>
  );
};

export const BorderRadius: Story = {
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
          📐 Border Radius
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Border radius tokens for consistent corner rounding. Click any shape
          to copy its value.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {Object.entries(radius).map(([name, value]) => (
          <RadiusCard
            key={name}
            name={name}
            value={value as string}
            size={name === "full" ? "large" : "medium"}
          />
        ))}
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
          Usage Examples
        </h2>

        <div style={{ display: "grid", gap: "2rem" }}>
          {/* Buttons */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "1rem",
              }}
            >
              Buttons with Different Radius
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {[
                { name: "none", label: "Sharp" },
                { name: "sm", label: "Subtle" },
                { name: "md", label: "Default" },
                { name: "lg", label: "Rounded" },
                { name: "full", label: "Pill" },
              ].map(({ name, label }) => (
                <button
                  key={name}
                  style={{
                    padding: `${spacing[2]} ${spacing[4]}`,
                    backgroundColor: colors.primary.DEFAULT,
                    color: colors.primary.foreground,
                    border: "none",
                    borderRadius: radius[name as keyof typeof radius],
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: colors.default[500],
                fontFamily: "monospace",
              }}
            >
              borderRadius: radius.none → radius.full
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "1rem",
              }}
            >
              Cards and Containers
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                {
                  radius: "sm",
                  title: "Subtle Card",
                  desc: "Minimal rounding",
                },
                {
                  radius: "md",
                  title: "Default Card",
                  desc: "Standard rounding",
                },
                {
                  radius: "lg",
                  title: "Rounded Card",
                  desc: "Friendly rounding",
                },
                {
                  radius: "xl",
                  title: "Very Rounded",
                  desc: "Prominent rounding",
                },
              ].map(({ radius: r, title, desc }) => (
                <div
                  key={r}
                  style={{
                    padding: spacing[4],
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.default[200]}`,
                    borderRadius: radius[r as keyof typeof radius],
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: colors.foreground,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: colors.default[600],
                      marginBottom: "0.5rem",
                    }}
                  >
                    {desc}
                  </p>
                  <code
                    style={{
                      fontSize: "0.75rem",
                      color: colors.default[500],
                    }}
                  >
                    radius.{r}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Shadows: Story = {
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
          🌤️ Shadows & Effects
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: colors.default[600],
            lineHeight: "1.6",
          }}
        >
          Shadow tokens for elevation, depth, and visual hierarchy. Click any
          card to copy the shadow value.
        </p>
      </div>

      {/* Basic Shadows */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Basic Shadows
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              name: "none",
              value: shadows.none,
              desc: "No shadow - flat appearance",
            },
            { name: "sm", value: shadows.sm, desc: "Very subtle depth" },
            {
              name: "default",
              value: shadows.DEFAULT,
              desc: "Standard card elevation",
            },
            { name: "md", value: shadows.md, desc: "Medium elevation" },
            { name: "lg", value: shadows.lg, desc: "High elevation" },
            { name: "xl", value: shadows.xl, desc: "Very high elevation" },
          ].map((shadow) => (
            <ShadowCard
              key={shadow.name}
              name={shadow.name}
              value={shadow.value}
              description={shadow.desc}
            />
          ))}
        </div>
      </div>

      {/* Button Shadows */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Button Shadows
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <ShadowCard
            name="button"
            value={shadows.button}
            description="Standard button elevation"
          />
          <ShadowCard
            name="button-hover"
            value={shadows.buttonHover}
            description="Enhanced button hover state"
          />
        </div>
      </div>

      {/* Glow Effects */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Glow Effects
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {Object.entries(shadows.glow).map(([name, value]) => {
            const isHover = name.includes("Hover");
            const colorName = name.replace("Hover", "").toLowerCase();

            return (
              <ShadowCard
                key={name}
                name={name}
                value={value}
                description={`${colorName} glow ${
                  isHover ? "(hover state)" : ""
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Examples */}
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: colors.foreground,
            marginBottom: "1rem",
          }}
        >
          Interactive Examples
        </h2>

        <div style={{ display: "grid", gap: "2rem" }}>
          {/* Button with Shadow */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "1rem",
              }}
            >
              Button with Shadow Effects
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  padding: `${spacing[3]} ${spacing[4]}`,
                  backgroundColor: colors.primary.DEFAULT,
                  color: colors.primary.foreground,
                  border: "none",
                  borderRadius: radius.md,
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: shadows.button,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = shadows.buttonHover;
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = shadows.button;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Shadow Button
              </button>

              <button
                style={{
                  padding: `${spacing[3]} ${spacing[4]}`,
                  backgroundColor: colors.primary.DEFAULT,
                  color: colors.primary.foreground,
                  border: "none",
                  borderRadius: radius.md,
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  boxShadow: shadows.glow.primary,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = shadows.glow.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = shadows.glow.primary;
                }}
              >
                Glow Button
              </button>
            </div>
          </div>

          {/* Cards with Different Elevations */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: colors.foreground,
                marginBottom: "1rem",
              }}
            >
              Card Elevation Hierarchy
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                { shadow: shadows.sm, title: "Base Card", level: "Level 1" },
                {
                  shadow: shadows.DEFAULT,
                  title: "Elevated Card",
                  level: "Level 2",
                },
                {
                  shadow: shadows.lg,
                  title: "Floating Card",
                  level: "Level 3",
                },
                { shadow: shadows.xl, title: "Modal Card", level: "Level 4" },
              ].map(({ shadow, title, level }, index) => (
                <div
                  key={index}
                  style={{
                    padding: spacing[4],
                    backgroundColor: colors.background,
                    borderRadius: radius.lg,
                    boxShadow: shadow,
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: colors.foreground,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: colors.default[600],
                    }}
                  >
                    {level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
