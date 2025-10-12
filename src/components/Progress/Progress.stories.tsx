import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

/**
 * Progress Component
 *
 * Progress indicators show the completion status of an operation or task.
 * The component supports both linear (horizontal bar) and circular variants,
 * with determinate (known progress) and indeterminate (unknown progress) modes.
 *
 * ## Features
 * - **Two Variants**: Linear progress bars and circular progress indicators
 * - **Determinate/Indeterminate**: Show specific progress or continuous animation
 * - **Value Display**: Optional labels showing percentage or custom formatted values
 * - **Striped Pattern**: Optional diagonal stripes with animation
 * - **Accessible**: Full ARIA support for screen readers
 * - **Themeable**: Built with design tokens, supports light/dark themes
 * - **Responsive**: Adapts to container size with configurable dimensions
 */
const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Progress indicators provide visual feedback about the status of ongoing operations. Use linear progress for tasks with a clear horizontal flow, and circular progress for loading states or compact spaces.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["linear", "circular"],
      description: "Visual style of the progress indicator",
      table: {
        type: { summary: "linear | circular" },
        defaultValue: { summary: "linear" },
      },
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
      description: "Color theme for the progress indicator",
      table: {
        type: {
          summary: "default | primary | secondary | success | warning | danger",
        },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size of the progress indicator",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description:
        "Current progress value (0-100). Leave undefined for indeterminate mode",
      table: {
        type: { summary: "number" },
      },
    },
    maxValue: {
      control: { type: "number", min: 1, max: 1000 },
      description: "Maximum value for progress calculation",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    minValue: {
      control: { type: "number", min: 0, max: 99 },
      description: "Minimum value for progress calculation",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    showValueLabel: {
      control: "boolean",
      description: "Whether to show the progress value label",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    formatValueLabel: {
      control: false,
      description: "Custom formatter for the value label",
      table: {
        type: { summary: "(value: number, maxValue: number) => string" },
      },
    },
    label: {
      control: "text",
      description: "Label text displayed above the progress indicator",
      table: {
        type: { summary: "string" },
      },
    },
    isStriped: {
      control: "boolean",
      description: "Whether to show diagonal stripes (linear variant only)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isAnimated: {
      control: "boolean",
      description:
        "Whether to animate the stripes (requires isStriped=true for linear)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disableAnimation: {
      control: "boolean",
      description: "Disable all animations including transitions",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    ariaLabel: {
      control: "text",
      description: "Custom aria-label for accessibility",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground to test all Progress component props.
 * Adjust the controls to see how different configurations affect the appearance.
 */
export const Playground: Story = {
  args: {
    variant: "linear",
    color: "primary",
    size: "md",
    value: 60,
    showValueLabel: true,
    label: "Loading...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls below to experiment with different configurations of the Progress component.",
      },
    },
  },
};

// =============================================================================
// Linear Progress Stories
// =============================================================================

/**
 * Linear progress bar with specific percentage value.
 * The progress animates smoothly when the value changes.
 */
export const LinearDeterminate: Story = {
  args: {
    variant: "linear",
    value: 65,
    showValueLabel: true,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Progress {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Determinate progress shows a specific completion percentage. Use when you can calculate the progress of an operation.",
      },
    },
  },
};

/**
 * Linear progress with indeterminate animation for unknown duration tasks.
 * The bar continuously animates from left to right.
 */
export const LinearIndeterminate: Story = {
  args: {
    variant: "linear",
    value: undefined,
    label: "Processing...",
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Progress {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Indeterminate progress is used when the duration of an operation is unknown. The animation provides feedback that the system is working.",
      },
    },
  },
};

/**
 * Linear progress with diagonal stripe pattern.
 * Stripes can be static or animated.
 */
export const LinearStriped: Story = {
  args: {
    variant: "linear",
    value: 75,
    isStriped: true,
  },
  render: (args) => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
          Static Stripes
        </p>
        <Progress {...args} />
      </div>
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
          Animated Stripes
        </p>
        <Progress {...args} isAnimated />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Striped progress bars add visual interest and can help indicate activity. Animated stripes emphasize ongoing operations.",
      },
    },
  },
};

/**
 * Linear progress with custom value formatting.
 * Shows how to display progress in different formats (MB, items, etc).
 */
export const LinearCustomFormat: Story = {
  args: {
    variant: "linear",
    value: 450,
    maxValue: 1000,
    showValueLabel: true,
    formatValueLabel: (value: number) => value + "MB / 1000MB",
    label: "Downloading file...",
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <Progress {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use formatValueLabel to display progress in custom units like MB, items processed, or any other metric.",
      },
    },
  },
};

// =============================================================================
// Circular Progress Stories
// =============================================================================

/**
 * Circular progress indicator with specific percentage value.
 * Shows the percentage in the center of the circle.
 */
export const CircularDeterminate: Story = {
  args: {
    variant: "circular",
    value: 70,
    showValueLabel: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Circular progress is ideal for compact spaces or when you want to emphasize a single metric.",
      },
    },
  },
};

/**
 * Circular progress with indeterminate animation for loading states.
 * The arc continuously rotates and changes size.
 */
export const CircularIndeterminate: Story = {
  args: {
    variant: "circular",
    value: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Indeterminate circular progress is commonly used for loading spinners when the duration is unknown.",
      },
    },
  },
};

/**
 * Circular progress with custom label.
 * Shows how to display additional context beyond the percentage.
 */
export const CircularWithLabel: Story = {
  args: {
    variant: "circular",
    value: 85,
    showValueLabel: true,
    label: "Profile Completion",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combine a descriptive label with the percentage to provide clear context about what's being measured.",
      },
    },
  },
};

// =============================================================================
// Size Variations
// =============================================================================

/**
 * Progress indicators in all available sizes.
 * Compare small, medium, and large variants.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          Linear Sizes
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "400px",
          }}
        >
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Small</p>
            <Progress variant="linear" size="sm" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Medium</p>
            <Progress variant="linear" size="md" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Large</p>
            <Progress variant="linear" size="lg" value={60} />
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          Circular Sizes
        </h3>
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-end" }}>
          <div style={{ textAlign: "center" }}>
            <Progress variant="circular" size="sm" value={60} showValueLabel />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Small</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress variant="circular" size="md" value={60} showValueLabel />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Medium</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress variant="circular" size="lg" value={60} showValueLabel />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Large</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Choose the appropriate size based on the context. Small for compact UIs, medium for general use, and large for emphasis.",
      },
    },
  },
};

// =============================================================================
// Color Variations
// =============================================================================

/**
 * Progress indicators in all available color themes.
 * Each color conveys different semantic meaning.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          Linear Colors
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "400px",
          }}
        >
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Default</p>
            <Progress variant="linear" color="default" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Primary</p>
            <Progress variant="linear" color="primary" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Secondary</p>
            <Progress variant="linear" color="secondary" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Success</p>
            <Progress variant="linear" color="success" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Warning</p>
            <Progress variant="linear" color="warning" value={60} />
          </div>
          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>Danger</p>
            <Progress variant="linear" color="danger" value={60} />
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          Circular Colors
        </h3>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <Progress
              variant="circular"
              color="default"
              value={60}
              showValueLabel
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Default</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress
              variant="circular"
              color="primary"
              value={60}
              showValueLabel
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Primary</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress
              variant="circular"
              color="secondary"
              value={60}
              showValueLabel
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Secondary</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress
              variant="circular"
              color="success"
              value={60}
              showValueLabel
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Success</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress
              variant="circular"
              color="warning"
              value={60}
              showValueLabel
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Warning</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Progress
              variant="circular"
              color="danger"
              value={60}
              showValueLabel
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>Danger</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use colors to convey meaning: success for completed tasks, warning for attention needed, danger for errors or critical states.",
      },
    },
  },
};

// =============================================================================
// Real-World Examples
// =============================================================================

/**
 * File upload progress with custom formatting and striped animation.
 * Simulates a typical file upload scenario.
 */
export const FileUploadExample: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <Progress
        variant="linear"
        value={850}
        maxValue={1250}
        showValueLabel
        formatValueLabel={(value: number) => value + "MB / 1250MB"}
        label="Uploading document.pdf"
        color="primary"
        isStriped
        isAnimated
        size="md"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of a file upload progress indicator with custom MB formatting and animated stripes.",
      },
    },
  },
};

/**
 * Profile completion indicator using circular progress.
 * Shows percentage of completed profile fields.
 */
export const ProfileCompletionExample: Story = {
  render: () => (
    <div style={{ textAlign: "center" }}>
      <Progress
        variant="circular"
        value={75}
        showValueLabel
        label="Profile Completion"
        color="success"
        size="lg"
      />
      <p
        style={{
          marginTop: "16px",
          fontSize: "14px",
          color: "var(--color-foreground)",
        }}
      >
        3 out of 4 sections completed
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Circular progress works well for profile completion or onboarding progress indicators.",
      },
    },
  },
};

/**
 * Multi-step process progress with color-coded stages.
 * Shows different colors for different completion levels.
 */
export const MultiStepExample: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Progress
        variant="linear"
        value={25}
        label="Step 1: Account Information"
        color="success"
        showValueLabel
      />
      <Progress
        variant="linear"
        value={50}
        label="Step 2: Personal Details"
        color="warning"
        showValueLabel
      />
      <Progress
        variant="linear"
        value={0}
        label="Step 3: Verification"
        color="default"
        showValueLabel
      />
      <Progress
        variant="linear"
        value={0}
        label="Step 4: Confirmation"
        color="default"
        showValueLabel
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use different colors to indicate completion status across multiple steps in a process.",
      },
    },
  },
};

// =============================================================================
// Accessibility
// =============================================================================

/**
 * Progress component with full accessibility features.
 * Demonstrates proper ARIA attributes and screen reader support.
 */
export const Accessibility: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        maxWidth: "500px",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          Screen Reader Friendly
        </h3>
        <p style={{ marginBottom: "16px", fontSize: "14px" }}>
          All progress indicators include proper ARIA attributes:
        </p>
        <ul
          style={{
            marginBottom: "16px",
            fontSize: "14px",
            paddingLeft: "20px",
          }}
        >
          <li>role="progressbar" for semantic meaning</li>
          <li>aria-valuenow for current value</li>
          <li>aria-valuemin and aria-valuemax for range</li>
          <li>aria-label for descriptive text</li>
        </ul>
        <Progress
          variant="linear"
          value={65}
          showValueLabel
          label="Download Progress"
          ariaLabel="Downloading file, 65 percent complete"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          Reduced Motion Support
        </h3>
        <p style={{ marginBottom: "16px", fontSize: "14px" }}>
          Animations respect the prefers-reduced-motion setting. Users who have
          reduced motion enabled will see minimal animation.
        </p>
        <Progress variant="linear" value={undefined} label="Processing..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Progress component follows WCAG 2.1 AA guidelines and includes comprehensive accessibility features.",
      },
    },
  },
};
