import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states.

## Variants
- **Primary**: Main call-to-action buttons
- **Secondary**: Alternative actions
- **Destructive**: Dangerous or destructive actions (use sparingly)
- **Outline**: Subtle actions that need less visual weight
- **Ghost**: Minimal styling for flexible layouts

## Sizes
- **sm**: Compact buttons for tight spaces
- **md**: Default size for most use cases
- **lg**: Prominent buttons for important actions

## States
- **Loading**: Shows spinner and prevents interaction
- **Disabled**: Prevents interaction
- **Pressed**: For toggle buttons
- **Current**: For pagination and navigation

## Accessibility
- Proper ARIA attributes for all states
- Keyboard navigation support
- Focus management
- Screen reader announcements

## Theming
Supports light, dark, and high-contrast themes with CSS custom properties.
        `,
      },
    },
  },
  tags: ["autodocs", "stable"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "destructive", "outline", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: { type: "select" },
      options: ["rectangle", "pill", "circle"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
  tags: ["variants"],
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
  tags: ["variants"],
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete Item",
  },
  tags: ["variants", "a11y-test"],
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
  tags: ["variants"],
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
  tags: ["variants"],
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
  tags: ["sizes"],
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
  tags: ["sizes"],
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
  tags: ["sizes"],
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
  tags: ["states"],
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    "aria-label": "Search",
    children: "🔍",
  },
  tags: ["accessibility", "a11y-test"],
};

// export const PolymorphicLink: Story = {
//   args: {
//     as: 'a',
//     children: 'Link Button',
//   },
//   tags: ['variants'],
// };

export const Toggle: Story = {
  args: {
    toggle: true,
    pressed: false,
    children: "Toggle Me",
  },
  tags: ["states", "accessibility"],
};

export const MenuButton: Story = {
  args: {
    menuExpanded: false,
    menuId: "menu-1",
    children: "Open Menu",
  },
  tags: ["menus", "accessibility"],
};

export const CopyToClipboard: Story = {
  args: {
    copyToClipboard: "Hello World!",
    children: "Copy Text",
  },
  tags: ["interaction"],
};

export const AsyncAction: Story = {
  args: {
    asyncAction: () => new Promise((resolve) => setTimeout(resolve, 1000)),
    children: "Async Action",
  },
  tags: ["interaction"],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  tags: ["states", "accessibility"],
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  tags: ["sizes"],
  parameters: {
    layout: "padded",
  },
};

export const Pagination: Story = {
  args: {
    isCurrent: true,
    children: "1",
  },
  tags: ["accessibility"],
};

export const RectangleShape: Story = {
  args: {
    shape: "rectangle",
    children: "Rectangle Button",
  },
  tags: ["shapes"],
};

export const PillShape: Story = {
  args: {
    shape: "pill",
    children: "Pill Button",
  },
  tags: ["shapes"],
};

export const CircleShape: Story = {
  args: {
    shape: "circle",
    iconOnly: true,
    "aria-label": "Close",
    children: "✕",
  },
  tags: ["shapes", "accessibility"],
};

export const RTL: Story = {
  args: {
    children: "زر الكتروني",
  },
  tags: ["RTL", "i18n"],
  parameters: {
    direction: "rtl",
  },
};

export const LongLabel: Story = {
  args: {
    children:
      "This is a very long button label that should demonstrate how the button handles text truncation and wrapping appropriately",
  },
  tags: ["i18n"],
};

export const ReducedMotion: Story = {
  args: {
    loading: true,
    children: "Loading with reduced motion",
  },
  tags: ["motion"],
  parameters: {
    prefersReducedMotion: true,
  },
};

// Recipes and Examples
export const ConfirmDialog: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button variant="destructive">Delete Account</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  ),
  tags: ["recipes"],
  parameters: {
    docs: {
      description: {
        story: `
## Confirm/Danger Pattern

When presenting destructive actions, always provide:
- Clear destructive styling (red variant)
- A safe cancel option
- Consider adding confirmation dialogs for critical actions
        `,
      },
    },
  },
};

export const SplitButton: Story = {
  render: () => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Button>Save</Button>
      <Button
        iconOnly
        aria-label="More options"
        style={{
          marginLeft: "-1px",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        ▼
      </Button>
    </div>
  ),
  tags: ["recipes", "menus"],
  parameters: {
    docs: {
      description: {
        story: `
## Split Button Pattern

Combines a primary action with a menu trigger:
- Primary button performs main action
- Secondary button opens menu with additional options
- Use aria-expanded and aria-controls for accessibility
        `,
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button loading>Submitting...</Button>
      <Button loading variant="outline">
        Saving...
      </Button>
      <Button loading variant="ghost">
        Processing...
      </Button>
    </div>
  ),
  tags: ["states"],
  parameters: {
    docs: {
      description: {
        story: `
## Loading States

Use loading state to:
- Prevent duplicate submissions
- Provide visual feedback
- Disable interaction during async operations
        `,
      },
    },
  },
};

export const ThemingTokens: Story = {
  render: () => (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      <h3>Current Theme Tokens</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
                textAlign: "left",
              }}
            >
              Token
            </th>
            <th
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
                textAlign: "left",
              }}
            >
              Value
            </th>
            <th
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
                textAlign: "left",
              }}
            >
              Usage
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
              }}
            >
              --color-primary
            </td>
            <td
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
              }}
            >
              hsl(221, 83%, 53%)
            </td>
            <td
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
              }}
            >
              Primary button background
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
              }}
            >
              --color-focus-ring
            </td>
            <td
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
              }}
            >
              hsl(221, 83%, 53%)
            </td>
            <td
              style={{
                border: "1px solid var(--color-border)",
                padding: "0.5rem",
              }}
            >
              Focus indicator color
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  ),
  tags: ["theming"],
  parameters: {
    docs: {
      description: {
        story: `
## Theming with CSS Custom Properties

The button component uses CSS custom properties for theming:

### Light Theme (default)
- Primary: Blue tones
- Secondary: Gray tones
- Destructive: Red tones

### Dark Theme ([data-theme="dark"])
- Adjusted HSL values for dark backgrounds
- Maintained contrast ratios

### High Contrast ([data-theme="high-contrast"])
- Pure black and white
- Maximum contrast for accessibility

### Focus Indicators
- --color-focus-ring: Used for focus-visible outlines
- Meets WCAG AA contrast requirements
        `,
      },
    },
  },
};
