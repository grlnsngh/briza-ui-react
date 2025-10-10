import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A navigation component that displays the current page's location within a hierarchy.

## Features
- 🎨 **Full theme integration** - Supports light/dark modes and system preference
- ♿ **Accessibility first** - Semantic HTML with proper ARIA attributes
- 🎯 **Custom separators** - Use text, icons, or custom React elements
- 📦 **Overflow handling** - Collapse, ellipsis, or scroll strategies for long paths
- 🔗 **Flexible navigation** - Clickable or non-clickable items
- 🎨 **Size variants** - Small, medium, and large sizes
- 🏠 **Icon support** - Add icons to breadcrumb items

## Theme Integration
The breadcrumb automatically adapts to the current theme mode (light/dark/system) and uses design tokens for consistent styling.

## Semantic HTML
Uses proper \`<nav>\`, \`<ol>\`, and \`<li>\` elements with ARIA attributes for screen readers.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Size of the breadcrumb",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    overflow: {
      control: { type: "radio" },
      options: ["collapse", "ellipsis", "scroll"],
      description: "Overflow handling strategy",
      table: {
        defaultValue: { summary: "collapse" },
      },
    },
    maxItems: {
      control: { type: "number", min: 2, max: 10 },
      description: "Maximum items before collapsing (collapse mode)",
      table: {
        defaultValue: { summary: "4" },
      },
    },
    isClickable: {
      control: { type: "boolean" },
      description: "Whether items are clickable",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    separator: {
      control: { type: "text" },
      description: "Custom separator between items",
      table: {
        defaultValue: { summary: '/"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample breadcrumb items
const basicItems: BreadcrumbItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "electronics", label: "Electronics", href: "/products/electronics" },
  { key: "details", label: "Product Details", isCurrent: true },
];

const longPathItems: BreadcrumbItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "docs", label: "Documentation", href: "/docs" },
  { key: "guides", label: "Guides", href: "/docs/guides" },
  { key: "components", label: "Components", href: "/docs/guides/components" },
  {
    key: "navigation",
    label: "Navigation",
    href: "/docs/guides/components/navigation",
  },
  {
    key: "breadcrumb",
    label: "Breadcrumb",
    href: "/docs/guides/components/navigation/breadcrumb",
  },
  { key: "examples", label: "Examples", isCurrent: true },
];

const itemsWithIcons: BreadcrumbItem[] = [
  { key: "home", label: "Home", icon: "🏠", href: "/" },
  { key: "dashboard", label: "Dashboard", icon: "📊", href: "/dashboard" },
  {
    key: "analytics",
    label: "Analytics",
    icon: "📈",
    href: "/dashboard/analytics",
  },
  { key: "reports", label: "Reports", icon: "📄", isCurrent: true },
];

export const Playground: Story = {
  args: {
    items: basicItems,
    size: "md",
    overflow: "collapse",
    maxItems: 4,
    isClickable: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Small</h3>
        <Breadcrumb size="sm" items={basicItems} />
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Medium (Default)</h3>
        <Breadcrumb size="md" items={basicItems} />
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Large</h3>
        <Breadcrumb size="lg" items={basicItems} />
      </div>
    </div>
  ),
};

export const CustomSeparators: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Default (/)</h4>
        <Breadcrumb items={basicItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Greater Than {"(>)"}</h4>
        <Breadcrumb separator=">" items={basicItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Arrow (→)</h4>
        <Breadcrumb separator="→" items={basicItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Chevron (›)</h4>
        <Breadcrumb separator="›" items={basicItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Custom Element</h4>
        <Breadcrumb
          separator={<span style={{ color: "var(--color-primary)" }}>•</span>}
          items={basicItems}
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>With Emoji Icons</h4>
        <Breadcrumb items={itemsWithIcons} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Large with Icons</h4>
        <Breadcrumb size="lg" items={itemsWithIcons} />
      </div>
    </div>
  ),
};

export const OverflowStrategies: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>
          Collapse (Default) - Click "..." to expand
        </h4>
        <Breadcrumb overflow="collapse" maxItems={4} items={longPathItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>
          Ellipsis - Items truncate with ...
        </h4>
        <div style={{ maxWidth: "500px" }}>
          <Breadcrumb overflow="ellipsis" items={longPathItems} />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>
          Scroll - Horizontal scrolling
        </h4>
        <div style={{ maxWidth: "400px" }}>
          <Breadcrumb overflow="scroll" items={longPathItems} />
        </div>
      </div>
    </div>
  ),
};

export const CollapseWithDifferentMaxItems: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Max 3 Items</h4>
        <Breadcrumb overflow="collapse" maxItems={3} items={longPathItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Max 4 Items (Default)</h4>
        <Breadcrumb overflow="collapse" maxItems={4} items={longPathItems} />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Max 5 Items</h4>
        <Breadcrumb overflow="collapse" maxItems={5} items={longPathItems} />
      </div>
    </div>
  ),
};

export const ClickableVsNonClickable: Story = {
  render: () => {
    const handleClick = (item: BreadcrumbItem, event: React.MouseEvent) => {
      event.preventDefault();
      alert(`Clicked: ${item.label}`);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Clickable (Default)</h4>
          <Breadcrumb items={basicItems} onItemClick={handleClick} />
        </div>
        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Non-Clickable</h4>
          <Breadcrumb isClickable={false} items={basicItems} />
        </div>
      </div>
    );
  },
};

export const CurrentPage: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <p style={{ marginBottom: "0.5rem" }}>
          The last item is marked as current page with{" "}
          <code>aria-current="page"</code>
        </p>
        <Breadcrumb items={basicItems} />
      </div>
      <div>
        <p style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Current page items are styled differently and not clickable
        </p>
        <Breadcrumb
          items={[
            { key: "home", label: "Home", href: "/" },
            { key: "products", label: "Products", href: "/products" },
            {
              key: "electronics",
              label: "Electronics (Current)",
              isCurrent: true,
            },
          ]}
        />
      </div>
    </div>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "0.5rem" }}>
        Disabled items are not clickable and appear dimmed
      </p>
      <Breadcrumb
        items={[
          { key: "home", label: "Home", href: "/" },
          {
            key: "restricted",
            label: "Restricted Section",
            isDisabled: true,
          },
          { key: "products", label: "Products", href: "/products" },
          { key: "details", label: "Details", isCurrent: true },
        ]}
      />
    </div>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "0.5rem" }}>
        Works correctly with just one item
      </p>
      <Breadcrumb items={[{ key: "home", label: "Home", isCurrent: true }]} />
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--color-success-50)",
          borderRadius: "var(--radius-md)",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ marginTop: 0 }}>Accessibility Features:</h4>
        <ul style={{ marginBottom: 0 }}>
          <li>
            <strong>Semantic HTML:</strong> Uses <code>&lt;nav&gt;</code>,{" "}
            <code>&lt;ol&gt;</code>, and <code>&lt;li&gt;</code>
          </li>
          <li>
            <strong>ARIA Labels:</strong> aria-label="Breadcrumb" on nav element
          </li>
          <li>
            <strong>Current Page:</strong> aria-current="page" on current item
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> All items are keyboard
            accessible
          </li>
          <li>
            <strong>Focus Indicators:</strong> Clear focus outlines for keyboard
            users
          </li>
          <li>
            <strong>Screen Readers:</strong> Properly announced navigation
            structure
          </li>
          <li>
            <strong>Separators:</strong> Hidden from screen readers with
            aria-hidden
          </li>
        </ul>
      </div>
      <Breadcrumb items={basicItems} ariaLabel="Page navigation breadcrumb" />
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div>
      <p style={{ marginBottom: "0.5rem" }}>
        Resize the window to see different overflow behaviors
      </p>
      <div
        style={{
          border: "1px dashed var(--color-default-300)",
          padding: "1rem",
        }}
      >
        <h4>Collapse Strategy (Recommended for mobile)</h4>
        <Breadcrumb overflow="collapse" maxItems={3} items={longPathItems} />
      </div>
      <div
        style={{
          border: "1px dashed var(--color-default-300)",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <h4>Scroll Strategy</h4>
        <Breadcrumb overflow="scroll" items={longPathItems} />
      </div>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => {
    const handleItemClick = (item: BreadcrumbItem, event: React.MouseEvent) => {
      event.preventDefault();
      console.log("Navigating to:", item);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h3>E-commerce Product Page</h3>
          <Breadcrumb
            items={[
              { key: "home", label: "Home", icon: "🏠", href: "/" },
              { key: "shop", label: "Shop", icon: "🛍️", href: "/shop" },
              {
                key: "electronics",
                label: "Electronics",
                icon: "💻",
                href: "/shop/electronics",
              },
              {
                key: "laptops",
                label: "Laptops",
                icon: "💼",
                href: "/shop/electronics/laptops",
              },
              {
                key: "product",
                label: "MacBook Pro 16-inch",
                icon: "📱",
                isCurrent: true,
              },
            ]}
            size="lg"
            separator="›"
            onItemClick={handleItemClick}
          />
        </div>

        <div>
          <h3>Documentation Site</h3>
          <Breadcrumb
            items={[
              { key: "docs", label: "Docs", href: "/docs" },
              { key: "api", label: "API Reference", href: "/docs/api" },
              {
                key: "components",
                label: "Components",
                href: "/docs/api/components",
              },
              {
                key: "breadcrumb",
                label: "Breadcrumb Component",
                isCurrent: true,
              },
            ]}
            separator="/"
            overflow="collapse"
            maxItems={4}
          />
        </div>

        <div>
          <h3>File System Navigation</h3>
          <Breadcrumb
            items={[
              { key: "root", label: "~", href: "/" },
              { key: "projects", label: "Projects", href: "/projects" },
              { key: "myapp", label: "my-app", href: "/projects/my-app" },
              { key: "src", label: "src", href: "/projects/my-app/src" },
              {
                key: "components",
                label: "components",
                href: "/projects/my-app/src/components",
              },
              { key: "file", label: "Button.tsx", isCurrent: true },
            ]}
            size="sm"
            separator="/"
            overflow="collapse"
            maxItems={4}
          />
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div>
      <Breadcrumb
        items={basicItems}
        className="custom-breadcrumb"
        itemClassName="custom-item"
        separatorClassName="custom-separator"
      />
      <style>{`
        .custom-breadcrumb {
          padding: 0.5rem;
          background: var(--color-primary-50);
          border-radius: var(--radius-md);
        }
      `}</style>
    </div>
  ),
};
