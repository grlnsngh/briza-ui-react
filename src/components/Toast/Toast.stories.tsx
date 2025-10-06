import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";
import type { ToastPosition } from "./Toast";

// Theme-aware button styles for stories
const storyButtonStyles = {
  base: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    transition: "all 0.15s ease",
    border: "none",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
  },
  primary: {
    fontWeight: 600,
    color: "var(--color-primary-foreground)",
    backgroundColor: "var(--color-primary)",
  },
  success: {
    fontWeight: 600,
    color: "var(--color-success-foreground)",
    backgroundColor: "var(--color-success)",
  },
  warning: {
    fontWeight: 600,
    color: "var(--color-warning-foreground)",
    backgroundColor: "var(--color-warning)",
  },
  danger: {
    fontWeight: 600,
    color: "var(--color-danger-foreground)",
    backgroundColor: "var(--color-danger)",
  },
  secondary: {
    fontWeight: 600,
    color: "var(--color-foreground)",
    backgroundColor: "var(--color-default-100)",
    border: "1px solid var(--color-default-300)",
  },
};

const meta: Meta<typeof ToastProvider> = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A comprehensive Toast notification system with React Context provider for global toast management.

## Features
- 🎯 **Multiple Positions** - 6 position options (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- 🎨 **5 Variants** - default, success, info, warning, danger
- ⏱️ **Auto-Dismiss** - Configurable duration with pause on hover
- 🎬 **Smooth Animations** - Slide in/out with position-aware animations
- 🔘 **Action Buttons** - Add custom action buttons to toasts
- 📚 **Toast Stacking** - Automatic stacking and queue management
- 🌙 **Dark Theme Support** - Automatic theme adaptation
- ♿ **WCAG 2.1 AA Compliant** - Full ARIA support
- 🎭 **Portal Rendering** - Renders outside React tree
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🔌 **Programmatic API** - toast.success(), toast.error(), etc.

## Usage

Wrap your app with \`ToastProvider\` and use the \`useToast\` hook:

\`\`\`tsx
import { ToastProvider, useToast } from 'briza-ui-react';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

function YourComponent() {
  const toast = useToast();

  return (
    <button onClick={() => toast.success('Operation successful!')}>
      Show Toast
    </button>
  );
}
\`\`\`

Use the interactive **Playground** story below to explore all available options.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================ */
/* Demo Component                               */
/* ============================================ */

const ToastDemo: React.FC<{ position?: ToastPosition }> = ({ position }) => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <button
        onClick={() =>
          toast.success("Operation completed successfully!", {
            position,
            title: "Success",
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.success }}
      >
        Success Toast
      </button>

      <button
        onClick={() =>
          toast.info("Here's some information you should know.", {
            position,
            title: "Information",
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Info Toast
      </button>

      <button
        onClick={() =>
          toast.warning("Please review your changes before proceeding.", {
            position,
            title: "Warning",
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.warning }}
      >
        Warning Toast
      </button>

      <button
        onClick={() =>
          toast.error("An error occurred while processing your request.", {
            position,
            title: "Error",
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.danger }}
      >
        Error Toast
      </button>

      <button
        onClick={() =>
          toast.show("This is a default notification.", {
            position,
            title: "Notification",
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.secondary }}
      >
        Default Toast
      </button>
    </div>
  );
};

/* ============================================ */
/* Playground                                   */
/* ============================================ */

export const Playground: Story = {
  render: () => {
    return (
      <ToastProvider>
        <div style={{ padding: "2rem" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Toast Variants
          </h3>
          <ToastDemo />
        </div>
      </ToastProvider>
    );
  },
};

/* ============================================ */
/* Positions                                    */
/* ============================================ */

export const Positions: Story = {
  render: () => {
    return (
      <ToastProvider>
        <div style={{ padding: "2rem", minWidth: "800px" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Toast Positions
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <div>
              <h4
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              >
                Top Left
              </h4>
              <ToastDemo position="top-left" />
            </div>
            <div>
              <h4
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              >
                Top Center
              </h4>
              <ToastDemo position="top-center" />
            </div>
            <div>
              <h4
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              >
                Top Right
              </h4>
              <ToastDemo position="top-right" />
            </div>
            <div>
              <h4
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              >
                Bottom Left
              </h4>
              <ToastDemo position="bottom-left" />
            </div>
            <div>
              <h4
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              >
                Bottom Center
              </h4>
              <ToastDemo position="bottom-center" />
            </div>
            <div>
              <h4
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--color-foreground)",
                }}
              >
                Bottom Right
              </h4>
              <ToastDemo position="bottom-right" />
            </div>
          </div>
        </div>
      </ToastProvider>
    );
  },
};

/* ============================================ */
/* With Actions                                 */
/* ============================================ */

const ToastWithActionsDemo: React.FC = () => {
  const toast = useToast();
  const [undoCount, setUndoCount] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        onClick={() =>
          toast.show("File deleted successfully", {
            title: "File Deleted",
            action: {
              label: "Undo",
              onClick: () => {
                setUndoCount((c) => c + 1);
                toast.success("File restored!");
              },
            },
            duration: 8000,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Show Toast with Undo Action
      </button>

      <button
        onClick={() =>
          toast.warning("Your session is about to expire", {
            title: "Session Timeout",
            action: {
              label: "Extend",
              onClick: () => {
                toast.success("Session extended by 30 minutes");
              },
            },
            duration: 0, // Never auto-dismiss
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.warning }}
      >
        Show Toast with Extend Action
      </button>

      {undoCount > 0 && (
        <p style={{ marginTop: "1rem", color: "var(--color-foreground)" }}>
          Undo clicked {undoCount} time{undoCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export const WithActions: Story = {
  render: () => {
    return (
      <ToastProvider>
        <div style={{ padding: "2rem" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Toast with Action Buttons
          </h3>
          <ToastWithActionsDemo />
        </div>
      </ToastProvider>
    );
  },
};

/* ============================================ */
/* Auto-Dismiss & Duration                      */
/* ============================================ */

const AutoDismissDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        onClick={() =>
          toast.info("This will dismiss after 2 seconds", {
            title: "Quick Toast",
            duration: 2000,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        2 Second Toast
      </button>

      <button
        onClick={() =>
          toast.info("This will dismiss after 5 seconds (default)", {
            title: "Normal Toast",
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        5 Second Toast (Default)
      </button>

      <button
        onClick={() =>
          toast.warning("This will never auto-dismiss", {
            title: "Persistent Toast",
            duration: 0,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.warning }}
      >
        Persistent Toast
      </button>

      <button
        onClick={() =>
          toast.info("Hover over me to pause the timer!", {
            title: "Pause on Hover",
            duration: 5000,
            pauseOnHover: true,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Pause on Hover
      </button>
    </div>
  );
};

export const AutoDismiss: Story = {
  render: () => {
    return (
      <ToastProvider>
        <div style={{ padding: "2rem" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Auto-Dismiss & Duration
          </h3>
          <AutoDismissDemo />
        </div>
      </ToastProvider>
    );
  },
};

/* ============================================ */
/* Custom Content                               */
/* ============================================ */

const CustomContentDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        onClick={() =>
          toast.custom(
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                Custom HTML Content
              </h4>
              <p style={{ fontSize: "0.875rem" }}>
                You can render any custom React elements here!
              </p>
              <ul style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </div>,
            {
              showIcon: false,
              duration: 10000,
            }
          )
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Custom HTML Content
      </button>

      <button
        onClick={() =>
          toast.success(
            <div>
              <strong>Payment Successful!</strong>
              <br />
              <small>Your order has been confirmed</small>
            </div>,
            {
              duration: 6000,
            }
          )
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.success }}
      >
        Rich Content
      </button>

      <button
        onClick={() =>
          toast.custom(
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                JD
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>John Doe</div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-default-600)",
                  }}
                >
                  Sent you a message
                </div>
              </div>
            </div>,
            {
              showIcon: false,
              showCloseButton: true,
            }
          )
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Message Notification
      </button>
    </div>
  );
};

export const CustomContent: Story = {
  render: () => {
    return (
      <ToastProvider>
        <div style={{ padding: "2rem" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Custom Content
          </h3>
          <CustomContentDemo />
        </div>
      </ToastProvider>
    );
  },
};

/* ============================================ */
/* Stacking & Queue Management                  */
/* ============================================ */

const StackingDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        onClick={() => {
          for (let i = 1; i <= 5; i++) {
            setTimeout(() => {
              toast.info(`Toast ${i} of 5`, {
                title: `Notification ${i}`,
                duration: 5000,
              });
            }, i * 300);
          }
        }}
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Show 5 Toasts in Sequence
      </button>

      <button
        onClick={() => {
          toast.success("First toast", { title: "1" });
          toast.info("Second toast", { title: "2" });
          toast.warning("Third toast", { title: "3" });
          toast.error("Fourth toast", { title: "4" });
        }}
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Show 4 Different Variants
      </button>

      <button
        onClick={() => {
          toast.dismissAll();
        }}
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.danger }}
      >
        Dismiss All Toasts
      </button>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.875rem",
          color: "var(--color-default-600)",
        }}
      >
        Maximum 5 toasts can be shown at once. Oldest will be dismissed
        automatically.
      </p>
    </div>
  );
};

export const Stacking: Story = {
  render: () => {
    return (
      <ToastProvider maxToasts={5}>
        <div style={{ padding: "2rem" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Toast Stacking & Queue
          </h3>
          <StackingDemo />
        </div>
      </ToastProvider>
    );
  },
};

/* ============================================ */
/* Without Icons                                */
/* ============================================ */

const NoIconDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <button
        onClick={() =>
          toast.success("Operation completed successfully!", {
            title: "Success",
            showIcon: false,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.success }}
      >
        Success (No Icon)
      </button>

      <button
        onClick={() =>
          toast.error("An error occurred", {
            title: "Error",
            showIcon: false,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.danger }}
      >
        Error (No Icon)
      </button>

      <button
        onClick={() =>
          toast.info("Just a simple message", {
            showIcon: false,
          })
        }
        style={{ ...storyButtonStyles.base, ...storyButtonStyles.primary }}
      >
        Simple Message
      </button>
    </div>
  );
};

export const WithoutIcons: Story = {
  render: () => {
    return (
      <ToastProvider>
        <div style={{ padding: "2rem" }}>
          <h3
            style={{ marginBottom: "1rem", color: "var(--color-foreground)" }}
          >
            Toasts Without Icons
          </h3>
          <NoIconDemo />
        </div>
      </ToastProvider>
    );
  },
};
