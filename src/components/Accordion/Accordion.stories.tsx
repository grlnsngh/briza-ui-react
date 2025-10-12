import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItemProps } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A versatile accordion component with comprehensive design token integration and theme support.

## Features
- 🎨 **Full theme integration** - Supports light/dark modes and system preference
- ♿ **Accessibility first** - WCAG compliant with proper ARIA disclosure semantics
- ⌨️ **Keyboard navigation** - Arrow keys, Home, End key support
- 🔄 **Controlled/Uncontrolled** - Flexible state management
- 🎯 **Single/Multiple expansion** - Support for both expansion modes
- 📦 **Custom icons** - Use your own expand/collapse icons
- 🎨 **Multiple variants** - Default, bordered, shadow, and splitted
- 🎯 **Design tokens** - Uses systematic spacing, colors, and typography

## Theme Integration
The accordion automatically adapts to the current theme mode (light/dark/system) and uses design tokens for consistent styling across your application.

## Keyboard Navigation
- **Arrow Down**: Navigate to next accordion item
- **Arrow Up**: Navigate to previous accordion item
- **Home**: Jump to first accordion item
- **End**: Jump to last accordion item
- **Enter** or **Space**: Toggle current accordion item
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "bordered", "shadow", "splitted"],
      description: "Visual variant of the accordion",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Size of the accordion items",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
      description: "Color theme of the accordion",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    selectionMode: {
      control: { type: "radio" },
      options: ["single", "multiple"],
      description: "Expansion mode",
      table: {
        defaultValue: { summary: "single" },
      },
    },
    showDivider: {
      control: { type: "boolean" },
      description: "Show dividers between items",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    keepMounted: {
      control: { type: "boolean" },
      description: "Keep content mounted when collapsed",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disableKeyboardNavigation: {
      control: { type: "boolean" },
      description: "Disable keyboard navigation",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Sample data
const basicItems: AccordionItemProps[] = [
  {
    key: "1",
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
  },
  {
    key: "2",
    title: "What is TypeScript?",
    content:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language, making it easier to catch errors early and write more maintainable code.",
  },
  {
    key: "3",
    title: "What is Vite?",
    content:
      "Vite is a build tool that provides a faster and leaner development experience for modern web projects. It leverages native ES modules and provides lightning-fast hot module replacement (HMR).",
  },
];

const faqItems: AccordionItemProps[] = [
  {
    key: "shipping",
    title: "Shipping & Delivery",
    subtitle: "Information about shipping times and costs",
    content: (
      <div>
        <p>
          We offer free standard shipping on orders over $50. Standard shipping
          typically takes 5-7 business days.
        </p>
        <p>
          Express shipping is available for $15 and arrives in 2-3 business
          days.
        </p>
        <ul>
          <li>Orders are processed within 24 hours</li>
          <li>Tracking information provided</li>
          <li>International shipping available</li>
        </ul>
      </div>
    ),
  },
  {
    key: "returns",
    title: "Returns & Refunds",
    subtitle: "Our 30-day return policy",
    content: (
      <div>
        <p>
          We offer a 30-day return policy on all items. Products must be in
          original condition with tags attached.
        </p>
        <p>
          Refunds are processed within 5-10 business days of receiving your
          return.
        </p>
      </div>
    ),
  },
  {
    key: "payment",
    title: "Payment Methods",
    subtitle: "Accepted payment options",
    content: (
      <div>
        <p>We accept the following payment methods:</p>
        <ul>
          <li>Credit Cards (Visa, MasterCard, American Express)</li>
          <li>PayPal</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
        </ul>
      </div>
    ),
  },
  {
    key: "support",
    title: "Customer Support",
    subtitle: "How to reach us",
    content: (
      <div>
        <p>Our support team is available 24/7 to help you:</p>
        <ul>
          <li>Email: support@example.com</li>
          <li>Phone: 1-800-123-4567</li>
          <li>Live Chat: Available on our website</li>
        </ul>
      </div>
    ),
  },
];

const disabledItems: AccordionItemProps[] = [
  {
    key: "1",
    title: "Active Item",
    content: "This item is active and can be expanded.",
  },
  {
    key: "2",
    title: "Disabled Item",
    content: "This content is not accessible.",
    disabled: true,
  },
  {
    key: "3",
    title: "Another Active Item",
    content: "This item is also active.",
  },
  {
    key: "4",
    title: "Another Disabled Item",
    content: "This content is also not accessible.",
    disabled: true,
  },
];

const iconItems: AccordionItemProps[] = [
  {
    key: "profile",
    title: "Profile Settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
      </svg>
    ),
    content: "Manage your profile information, avatar, and preferences.",
  },
  {
    key: "notifications",
    title: "Notifications",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    ),
    content: "Configure email, push, and in-app notification preferences.",
  },
  {
    key: "security",
    title: "Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    content:
      "Update your password, enable two-factor authentication, and manage security settings.",
  },
];

// Stories
export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const SingleExpansion: Story = {
  args: {
    items: basicItems,
    selectionMode: "single",
    defaultExpandedKeys: "1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "In single expansion mode, only one accordion item can be expanded at a time. Opening a new item automatically closes the previously opened one.",
      },
    },
  },
};

export const MultipleExpansion: Story = {
  args: {
    items: basicItems,
    selectionMode: "multiple",
    defaultExpandedKeys: ["1", "2"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "In multiple expansion mode, multiple accordion items can be expanded simultaneously.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Default</h3>
        <Accordion items={basicItems} variant="default" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Bordered</h3>
        <Accordion items={basicItems} variant="bordered" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Shadow</h3>
        <Accordion items={basicItems} variant="shadow" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Splitted</h3>
        <Accordion items={basicItems} variant="splitted" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The accordion supports different visual variants: default, bordered, shadow, and splitted.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Small</h3>
        <Accordion items={basicItems} size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Medium</h3>
        <Accordion items={basicItems} size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Large</h3>
        <Accordion items={basicItems} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The accordion is available in three sizes: small, medium, and large.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Default</h3>
        <Accordion items={basicItems} color="default" variant="splitted" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Primary</h3>
        <Accordion items={basicItems} color="primary" variant="splitted" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Secondary</h3>
        <Accordion items={basicItems} color="secondary" variant="splitted" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Success</h3>
        <Accordion items={basicItems} color="success" variant="splitted" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Warning</h3>
        <Accordion items={basicItems} color="warning" variant="splitted" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Danger</h3>
        <Accordion items={basicItems} color="danger" variant="splitted" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The accordion supports multiple color themes that affect the indicator and focus states.",
      },
    },
  },
};

export const WithSubtitles: Story = {
  args: {
    items: faqItems,
    variant: "splitted",
    selectionMode: "multiple",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Accordion items can include subtitles for additional context. This is useful for FAQ sections or complex content.",
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    items: iconItems,
    variant: "bordered",
    color: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Add custom icons to accordion items for better visual organization and recognition.",
      },
    },
  },
};

export const DisabledItems: Story = {
  args: {
    items: disabledItems,
    variant: "shadow",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Individual accordion items can be disabled, preventing user interaction while maintaining visual consistency.",
      },
    },
  },
};

export const CustomIcons: Story = {
  args: {
    items: basicItems,
    variant: "bordered",
    color: "primary",
    expandIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 4l4 4H4l4-4z" />
      </svg>
    ),
    collapseIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 12l-4-4h8l-4 4z" />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Customize the expand and collapse icons to match your design system or branding.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<string>("1");

    const handleChange = (keys: string | string[]) => {
      setExpandedKeys(typeof keys === "string" ? keys : keys[0] || "");
    };

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <p>Current expanded: {expandedKeys || "None"}</p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button onClick={() => setExpandedKeys("1")}>Expand Item 1</button>
            <button onClick={() => setExpandedKeys("2")}>Expand Item 2</button>
            <button onClick={() => setExpandedKeys("3")}>Expand Item 3</button>
            <button onClick={() => setExpandedKeys("")}>Collapse All</button>
          </div>
        </div>
        <Accordion
          items={basicItems}
          expandedKeys={expandedKeys}
          onExpandedChange={handleChange}
          variant="shadow"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The accordion can be fully controlled via the `expandedKeys` and `onExpandedChange` props for single expansion mode.",
      },
    },
  },
};

export const ControlledMultiple: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>(["1"]);

    const handleToggle = (key: string) => {
      setExpandedKeys((current) =>
        current.includes(key)
          ? current.filter((k) => k !== key)
          : [...current, key]
      );
    };

    const handleChange = (keys: string | string[]) => {
      setExpandedKeys(Array.isArray(keys) ? keys : [keys]);
    };

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <p>Currently expanded: {expandedKeys.join(", ") || "None"}</p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button onClick={() => handleToggle("1")}>Toggle Item 1</button>
            <button onClick={() => handleToggle("2")}>Toggle Item 2</button>
            <button onClick={() => handleToggle("3")}>Toggle Item 3</button>
            <button onClick={() => setExpandedKeys(["1", "2", "3"])}>
              Expand All
            </button>
            <button onClick={() => setExpandedKeys([])}>Collapse All</button>
          </div>
        </div>
        <Accordion
          items={basicItems}
          selectionMode="multiple"
          expandedKeys={expandedKeys}
          onExpandedChange={handleChange}
          variant="splitted"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The accordion can be fully controlled in multiple expansion mode using an array of keys.",
      },
    },
  },
};

export const NoDivider: Story = {
  args: {
    items: basicItems,
    showDivider: false,
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "Remove dividers between accordion items for a cleaner look.",
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    items: [
      {
        key: "1",
        title: "Product Features",
        subtitle: "Comprehensive list of features",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ),
        content: (
          <div>
            <h4>Core Features</h4>
            <ul>
              <li>Real-time collaboration</li>
              <li>Cloud storage integration</li>
              <li>Advanced analytics dashboard</li>
              <li>Custom workflows</li>
            </ul>
            <h4>Security</h4>
            <ul>
              <li>End-to-end encryption</li>
              <li>Two-factor authentication</li>
              <li>Role-based access control</li>
            </ul>
          </div>
        ),
      },
      {
        key: "2",
        title: "Pricing Plans",
        subtitle: "Choose the right plan for you",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        ),
        content: (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div
              style={{
                flex: "1",
                minWidth: "150px",
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            >
              <h4>Basic</h4>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>$9</p>
              <p>per month</p>
              <ul style={{ fontSize: "0.875rem" }}>
                <li>5 Users</li>
                <li>10GB Storage</li>
                <li>Basic Support</li>
              </ul>
            </div>
            <div
              style={{
                flex: "1",
                minWidth: "150px",
                padding: "1rem",
                border: "1px solid #3b82f6",
                borderRadius: "0.5rem",
                background: "#eff6ff",
              }}
            >
              <h4>Pro</h4>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>$29</p>
              <p>per month</p>
              <ul style={{ fontSize: "0.875rem" }}>
                <li>25 Users</li>
                <li>100GB Storage</li>
                <li>Priority Support</li>
              </ul>
            </div>
            <div
              style={{
                flex: "1",
                minWidth: "150px",
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            >
              <h4>Enterprise</h4>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>$99</p>
              <p>per month</p>
              <ul style={{ fontSize: "0.875rem" }}>
                <li>Unlimited Users</li>
                <li>Unlimited Storage</li>
                <li>24/7 Support</li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
    variant: "shadow",
    color: "primary",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Accordion items can contain rich, complex content including nested elements, grids, and custom layouts.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    items: faqItems,
    variant: "default",
    size: "md",
    color: "primary",
    selectionMode: "single",
    showDivider: true,
    keepMounted: false,
    disableKeyboardNavigation: false,
  },
};
