import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";
import { Button } from "../Button/Button";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A versatile loading spinner component with multiple animation types, sizes, and color variants.
Includes comprehensive accessibility features with ARIA live regions.

## Features
- 🎨 **Full theme integration** - Supports light/dark modes and system preference
- ♿ **Accessibility first** - WCAG compliant with ARIA live regions and labels
- 🎭 **Multiple animation types** - Circular, dots, pulse, and bars animations
- 📐 **Five size variants** - From xs (16px) to xl (48px)
- 🎯 **Design tokens** - Uses systematic spacing, colors, and transitions
- ⚡ **Performance optimized** - 60fps animations using transform and opacity
- 🔄 **Motion sensitivity** - Respects prefers-reduced-motion preference

## Animation Types
- **Circular**: Classic spinning circle with animated stroke
- **Dots**: Three bouncing dots
- **Pulse**: Pulsing circular animation
- **Bars**: Four vertical bars with wave effect

## Accessibility
The spinner includes proper ARIA attributes for screen readers:
- \`role="status"\` - Indicates loading state
- \`aria-live="polite"\` - Announces changes to assistive technologies
- \`aria-busy="true"\` - Indicates busy state
- \`aria-label\` - Provides descriptive text
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "inverse",
      ],
      description: "The color variant of the spinner",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the spinner",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    type: {
      control: { type: "select" },
      options: ["circular", "dots", "pulse", "bars"],
      description: "The animation type of the spinner",
      table: {
        defaultValue: { summary: "circular" },
      },
    },
    label: {
      control: { type: "text" },
      description: "Optional label text for accessibility",
    },
    ariaLive: {
      control: { type: "select" },
      options: ["polite", "assertive", "off"],
      description: "ARIA live region politeness setting",
      table: {
        defaultValue: { summary: "polite" },
      },
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Custom ARIA label (overrides default)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    type: "circular",
  },
};

/**
 * All color variants of the spinner
 */
export const Variants: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Circular */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Circular Animation
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner variant="default" type="circular" />
            <Spinner variant="primary" type="circular" />
            <Spinner variant="secondary" type="circular" />
            <Spinner variant="success" type="circular" />
            <Spinner variant="warning" type="circular" />
            <Spinner variant="danger" type="circular" />
          </div>
        </div>

        {/* Dots */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Dots Animation
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner variant="default" type="dots" />
            <Spinner variant="primary" type="dots" />
            <Spinner variant="secondary" type="dots" />
            <Spinner variant="success" type="dots" />
            <Spinner variant="warning" type="dots" />
            <Spinner variant="danger" type="dots" />
          </div>
        </div>

        {/* Pulse */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Pulse Animation
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner variant="default" type="pulse" />
            <Spinner variant="primary" type="pulse" />
            <Spinner variant="secondary" type="pulse" />
            <Spinner variant="success" type="pulse" />
            <Spinner variant="warning" type="pulse" />
            <Spinner variant="danger" type="pulse" />
          </div>
        </div>

        {/* Bars */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Bars Animation
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner variant="default" type="bars" />
            <Spinner variant="primary" type="bars" />
            <Spinner variant="secondary" type="bars" />
            <Spinner variant="success" type="bars" />
            <Spinner variant="warning" type="bars" />
            <Spinner variant="danger" type="bars" />
          </div>
        </div>

        {/* Inverse variant with colored backgrounds */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Inverse Variant (for colored backgrounds)
          </h3>
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-primary-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner variant="inverse" type="circular" />
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-success-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner variant="inverse" type="dots" />
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-danger-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner variant="inverse" type="pulse" />
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-warning-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner variant="inverse" type="bars" />
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "var(--color-secondary-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner variant="inverse" type="circular" size="sm" />
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#1f2937",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner variant="inverse" type="dots" size="sm" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * All size variants from xs to xl
 */
export const Sizes: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Circular */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Circular Sizes
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner size="xs" type="circular" />
            <Spinner size="sm" type="circular" />
            <Spinner size="md" type="circular" />
            <Spinner size="lg" type="circular" />
            <Spinner size="xl" type="circular" />
          </div>
        </div>

        {/* Dots */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Dots Sizes
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner size="xs" type="dots" />
            <Spinner size="sm" type="dots" />
            <Spinner size="md" type="dots" />
            <Spinner size="lg" type="dots" />
            <Spinner size="xl" type="dots" />
          </div>
        </div>

        {/* Pulse */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Pulse Sizes
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner size="xs" type="pulse" />
            <Spinner size="sm" type="pulse" />
            <Spinner size="md" type="pulse" />
            <Spinner size="lg" type="pulse" />
            <Spinner size="xl" type="pulse" />
          </div>
        </div>

        {/* Bars */}
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Bars Sizes
          </h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Spinner size="xs" type="bars" />
            <Spinner size="sm" type="bars" />
            <Spinner size="md" type="bars" />
            <Spinner size="lg" type="bars" />
            <Spinner size="xl" type="bars" />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Comparison of all animation types
 */
export const AnimationTypes: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          gap: "48px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Spinner type="circular" size="lg" />
          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Circular
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Spinner type="dots" size="lg" />
          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Dots
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Spinner type="pulse" size="lg" />
          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Pulse
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Spinner type="bars" size="lg" />
          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Bars
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Spinners with labels
 */
export const WithLabel: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <Spinner label="Loading..." />
      <Spinner label="Fetching data..." variant="success" type="dots" />
      <Spinner
        label="Processing request..."
        variant="warning"
        type="pulse"
        size="lg"
      />
      <Spinner
        label="Please wait..."
        variant="secondary"
        type="bars"
        size="sm"
      />
    </div>
  ),
};

/**
 * Integration with Button component
 */
export const InButton: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Loading State with Spinner
          </h3>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Button
              color="primary"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" />}
            >
              Loading...
            </Button>
            <Button
              color="success"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" type="dots" />}
            >
              Processing
            </Button>
            <Button
              color="danger"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" type="bars" />}
            >
              Deleting
            </Button>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Different Button Sizes
          </h3>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Button
              size="sm"
              color="primary"
              variant="solid"
              startContent={<Spinner size="xs" variant="inverse" />}
            >
              Small
            </Button>
            <Button
              size="md"
              color="primary"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" />}
            >
              Medium
            </Button>
            <Button
              size="lg"
              color="primary"
              variant="solid"
              startContent={<Spinner size="md" variant="inverse" />}
            >
              Large
            </Button>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Icon Only Button
          </h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button color="primary" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" />
            </Button>
            <Button color="success" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" type="dots" />
            </Button>
            <Button color="warning" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" type="pulse" />
            </Button>
            <Button color="danger" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" type="bars" />
            </Button>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Light Background Button
          </h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Use colored spinners for light/faded button variants
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Button
              color="secondary"
              variant="faded"
              startContent={
                <Spinner size="sm" variant="secondary" type="pulse" />
              }
            >
              Uploading
            </Button>
            <Button
              color="default"
              variant="bordered"
              startContent={<Spinner size="sm" variant="default" />}
            >
              Loading...
            </Button>
            <Button
              color="primary"
              variant="light"
              startContent={<Spinner size="sm" variant="primary" type="dots" />}
            >
              Processing
            </Button>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Inverse Variant on Solid Colored Buttons
          </h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            White spinners look great on solid colored button backgrounds
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Button
              color="primary"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" />}
            >
              Loading...
            </Button>
            <Button
              color="success"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" type="dots" />}
            >
              Processing
            </Button>
            <Button
              color="danger"
              variant="solid"
              startContent={
                <Spinner size="sm" variant="inverse" type="pulse" />
              }
            >
              Deleting
            </Button>
            <Button
              color="warning"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" type="bars" />}
            >
              Warning
            </Button>
            <Button
              color="secondary"
              variant="solid"
              startContent={<Spinner size="sm" variant="inverse" />}
            >
              Uploading
            </Button>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Inverse Variant Icon Only
          </h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button color="primary" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" />
            </Button>
            <Button color="success" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" type="dots" />
            </Button>
            <Button color="warning" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" type="pulse" />
            </Button>
            <Button color="danger" variant="solid" isIconOnly>
              <Spinner size="sm" variant="inverse" type="bars" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Loading states for different scenarios
 */
export const LoadingStates: Story = {
  render: () => {
    const cardStyle = {
      padding: "24px",
      borderRadius: "8px",
      border: "1px solid var(--color-default-300)",
      backgroundColor: "var(--color-background)",
      minWidth: "300px",
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Card Loading */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Spinner variant="primary" size="lg" />
            <p style={{ color: "var(--color-default-600)", margin: 0 }}>
              Loading content...
            </p>
          </div>
        </div>

        {/* Inline Loading */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Spinner variant="success" size="sm" type="dots" />
            <span style={{ color: "var(--color-foreground)" }}>
              Syncing data with server...
            </span>
          </div>
        </div>

        {/* Full Page Loading */}
        <div
          style={{
            ...cardStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
          }}
        >
          <Spinner variant="primary" size="xl" label="Loading application..." />
        </div>
      </div>
    );
  },
};

/**
 * Accessibility features demonstration
 */
export const Accessibility: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <h3
            style={{
              marginBottom: "8px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Default ARIA Label
          </h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Announces "Loading, please wait" to screen readers
          </p>
          <Spinner />
        </div>

        <div>
          <h3
            style={{
              marginBottom: "8px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            With Visible Label
          </h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Label is both visible and announced to screen readers
          </p>
          <Spinner label="Fetching user data..." />
        </div>

        <div>
          <h3
            style={{
              marginBottom: "8px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Custom ARIA Label
          </h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Custom aria-label for specific context
          </p>
          <Spinner ariaLabel="Loading user profile and settings" />
        </div>

        <div>
          <h3
            style={{
              marginBottom: "8px",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Assertive Live Region
          </h3>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Uses aria-live="assertive" for critical loading states
          </p>
          <Spinner
            ariaLive="assertive"
            label="Critical operation in progress"
            variant="danger"
          />
        </div>

        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "var(--color-primary-50)",
            border: "1px solid var(--color-primary-200)",
          }}
        >
          <h4
            style={{
              marginTop: 0,
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
          >
            ♿ Accessibility Features
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            <li>role="status" - Indicates loading state</li>
            <li>aria-live - Announces changes to assistive technologies</li>
            <li>aria-busy="true" - Indicates busy state</li>
            <li>aria-label - Provides descriptive text</li>
            <li>
              prefers-reduced-motion - Respects motion sensitivity preferences
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
