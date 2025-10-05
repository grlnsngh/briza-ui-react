import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";

// Theme-aware button styles for stories
const storyButtonStyles = {
  base: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  primary: {
    fontWeight: 600,
    color: "var(--color-primary-foreground)",
    backgroundColor: "var(--color-primary)",
    border: "none",
  },
  secondary: {
    color: "var(--color-foreground)",
    backgroundColor: "var(--color-default-100)",
    border: "1px solid var(--color-default-300)",
  },
};

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A comprehensive Modal dialog component with focus management, scroll lock, and full accessibility support.

## Features
- 🎯 **Focus Trap** - Keeps focus within the modal
- 🔒 **Scroll Lock** - Prevents body scroll when open
- ⌨️ **Keyboard Navigation** - Escape to close, Tab to cycle focus
- 📱 **Mobile Responsive** - Full-screen on mobile devices
- 🎨 **5 Size Variants** - sm, md, lg, xl, full
- 🌙 **Dark Theme Support** - Automatic theme adaptation
- ♿ **WCAG 2.1 AA Compliant** - Full ARIA support
- 🎭 **Portal Rendering** - Renders outside React tree
- ✨ **Smooth Animations** - Fade in/out with slide effect

Use the interactive **Playground** story below to explore all available props and see the component in action.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Controls whether the modal is visible",
      table: {
        type: { summary: "boolean" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Size of the modal dialog",
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg" | "xl" | "full"' },
      },
    },
    placement: {
      control: { type: "select" },
      options: ["center", "top"],
      description: "Vertical placement of the modal",
      table: {
        defaultValue: { summary: "center" },
        type: { summary: '"center" | "top"' },
      },
    },
    closeOnBackdropClick: {
      control: { type: "boolean" },
      description: "Allow closing modal by clicking backdrop",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    closeOnEsc: {
      control: { type: "boolean" },
      description: "Allow closing modal with Escape key",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    showCloseButton: {
      control: { type: "boolean" },
      description: "Show close button in header",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    lockScroll: {
      control: { type: "boolean" },
      description: "Lock body scroll when modal is open",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    trapFocus: {
      control: { type: "boolean" },
      description: "Trap focus within modal",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    disableAnimation: {
      control: { type: "boolean" },
      description: "Disable entrance/exit animations",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/* ============================================ */
/* Playground                                   */
/* ============================================ */

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
        >
          Open Modal
        </button>

        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is the modal content. You can put anything here!</p>
          <p>Try pressing ESC or clicking outside to close.</p>
        </Modal>
      </>
    );
  },
  args: {
    size: "md",
    placement: "center",
    header: "Modal Title",
    footer: (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          style={{ ...storyButtonStyles.base, ...storyButtonStyles.secondary }}
        >
          Cancel
        </button>
        <button
          style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
        >
          Confirm
        </button>
      </div>
    ),
    closeOnBackdropClick: true,
    closeOnEsc: true,
    showCloseButton: true,
    lockScroll: true,
    trapFocus: true,
    disableAnimation: false,
  },
};

/* ============================================ */
/* Basic Examples                              */
/* ============================================ */

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
        >
          Open Modal
        </button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is a simple modal with no header or footer.</p>
          <p>Press ESC or click outside to close.</p>
        </Modal>
      </>
    );
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
        >
          Open Modal
        </button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Confirm Action"
          footer={
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  ...storyButtonStyles.base,
                  ...storyButtonStyles.secondary,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Action confirmed!");
                  setIsOpen(false);
                }}
                style={{
                  ...storyButtonStyles.base,
                  ...storyButtonStyles.primary,
                }}
              >
                Confirm
              </button>
            </div>
          }
        >
          <p>Are you sure you want to perform this action?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

/* ============================================ */
/* Size Variants                               */
/* ============================================ */

export const Sizes: Story = {
  render: () => {
    const [activeSize, setActiveSize] = useState<
      "sm" | "md" | "lg" | "xl" | "full" | null
    >(null);

    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
          <button
            key={size}
            onClick={() => setActiveSize(size)}
            style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
          >
            {size.toUpperCase()} Modal
          </button>
        ))}

        {activeSize && (
          <Modal
            isOpen={!!activeSize}
            onClose={() => setActiveSize(null)}
            size={activeSize}
            header={`${activeSize.toUpperCase()} Modal`}
          >
            <p>This is a {activeSize} sized modal.</p>
            <p>
              Try resizing your browser window to see how it responds on
              different screen sizes.
            </p>
          </Modal>
        )}
      </div>
    );
  },
};
