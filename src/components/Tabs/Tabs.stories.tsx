import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabItem } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A versatile tabs component with comprehensive design token integration and theme support.

## Features
- 🎨 **Full theme integration** - Supports light/dark modes and system preference
- ♿ **Accessibility first** - WCAG compliant with proper ARIA tabpanel implementation
- ⌨️ **Keyboard navigation** - Arrow keys, Home, End key support
- 🔄 **Controlled/Uncontrolled** - Flexible state management
- 🚀 **Lazy loading** - Optimize performance with lazy tab content
- 📱 **Responsive** - Horizontal and vertical orientations
- 🎯 **Design tokens** - Uses systematic spacing, colors, and typography

## Theme Integration
The tabs automatically adapt to the current theme mode (light/dark/system) and use design tokens for consistent styling across your application.

## Keyboard Navigation
- **Arrow Left/Right** (horizontal) or **Arrow Up/Down** (vertical): Navigate between tabs
- **Home**: Jump to first tab
- **End**: Jump to last tab
- **Tab**: Move focus in/out of tabs
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Orientation of the tabs",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Size of the tabs",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["solid", "underlined", "bordered", "light"],
      description: "Visual variant of the tabs",
      table: {
        defaultValue: { summary: "solid" },
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
      description: "Color theme of the tabs",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    isLazy: {
      control: { type: "boolean" },
      description: "Enable lazy loading of tab content",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Tabs take full width",
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
type Story = StoryObj<typeof meta>;

// Sample tab items for stories
const sampleItems: TabItem[] = [
  {
    key: "photos",
    label: "Photos",
    content: (
      <div>
        <h3>Photos Gallery</h3>
        <p>View all your photos here. This is the photos tab content.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    ),
  },
  {
    key: "music",
    label: "Music",
    content: (
      <div>
        <h3>Music Library</h3>
        <p>Browse your music collection. This is the music tab content.</p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    ),
  },
  {
    key: "videos",
    label: "Videos",
    content: (
      <div>
        <h3>Videos Collection</h3>
        <p>Watch your favorite videos. This is the videos tab content.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </div>
    ),
  },
];

const itemsWithIcons: TabItem[] = [
  {
    key: "home",
    label: "Home",
    icon: "🏠",
    content: (
      <div>
        <h3>Welcome Home</h3>
        <p>This is your home dashboard with an overview of everything.</p>
      </div>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    icon: "👤",
    content: (
      <div>
        <h3>User Profile</h3>
        <p>View and edit your profile information here.</p>
      </div>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: "⚙️",
    content: (
      <div>
        <h3>Settings</h3>
        <p>Configure your application settings and preferences.</p>
      </div>
    ),
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: "🔔",
    content: (
      <div>
        <h3>Notifications</h3>
        <p>View all your recent notifications and alerts.</p>
      </div>
    ),
    disabled: true,
  },
];

export const Playground: Story = {
  args: {
    items: sampleItems,
    orientation: "horizontal",
    size: "md",
    variant: "solid",
    color: "primary",
  },
};

export const Orientations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Horizontal (Default)</h3>
        <Tabs items={sampleItems} orientation="horizontal" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Vertical</h3>
        <Tabs items={sampleItems} orientation="vertical" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Solid (Default)</h3>
        <Tabs items={sampleItems} variant="solid" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Underlined</h3>
        <Tabs items={sampleItems} variant="underlined" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Bordered</h3>
        <Tabs items={sampleItems} variant="bordered" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Light</h3>
        <Tabs items={sampleItems} variant="light" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Small</h3>
        <Tabs items={sampleItems} size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Medium (Default)</h3>
        <Tabs items={sampleItems} size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Large</h3>
        <Tabs items={sampleItems} size="lg" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Default</h4>
        <Tabs items={sampleItems} color="default" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Primary</h4>
        <Tabs items={sampleItems} color="primary" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Secondary</h4>
        <Tabs items={sampleItems} color="secondary" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Success</h4>
        <Tabs items={sampleItems} color="success" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Warning</h4>
        <Tabs items={sampleItems} color="warning" />
      </div>
      <div>
        <h4 style={{ marginBottom: "0.5rem" }}>Danger</h4>
        <Tabs items={sampleItems} color="danger" />
      </div>
    </div>
  ),
};

export const ControlledMode: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState("music");

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Selected Tab:</strong> {selectedKey}
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => setSelectedKey("photos")}>
              Select Photos
            </button>
            <button onClick={() => setSelectedKey("music")}>
              Select Music
            </button>
            <button onClick={() => setSelectedKey("videos")}>
              Select Videos
            </button>
          </div>
        </div>
        <Tabs
          items={sampleItems}
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const DisabledTabs: Story = {
  args: {
    items: itemsWithIcons,
  },
  parameters: {
    docs: {
      description: {
        story: "The Notifications tab is disabled and cannot be selected.",
      },
    },
  },
};

export const LazyLoading: Story = {
  render: () => {
    const heavyItems: TabItem[] = [
      {
        key: "tab1",
        label: "Tab 1",
        content: (
          <div>
            <h3>Tab 1 Content (Loaded)</h3>
            <p>This content was lazy loaded when you first clicked this tab.</p>
            <p>It will remain mounted even if you switch tabs.</p>
          </div>
        ),
      },
      {
        key: "tab2",
        label: "Tab 2",
        content: (
          <div>
            <h3>Tab 2 Content (Loaded)</h3>
            <p>This content was lazy loaded when you first clicked this tab.</p>
            <p>
              Heavy components or API calls would only run when this tab is
              first accessed.
            </p>
          </div>
        ),
      },
      {
        key: "tab3",
        label: "Tab 3",
        content: (
          <div>
            <h3>Tab 3 Content (Loaded)</h3>
            <p>This content was lazy loaded when you first clicked this tab.</p>
            <p>Perfect for optimizing initial render performance.</p>
          </div>
        ),
      },
    ];

    return (
      <div>
        <p style={{ marginBottom: "1rem" }}>
          <strong>Lazy Loading Enabled:</strong> Tab content is only rendered
          when first accessed.
        </p>
        <Tabs items={heavyItems} isLazy />
      </div>
    );
  },
};

export const FullWidth: Story = {
  args: {
    items: sampleItems,
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Tabs stretch to fill the full width of the container.",
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--color-primary-50)",
          borderRadius: "var(--radius-md)",
          marginBottom: "1rem",
        }}
      >
        <h4 style={{ marginTop: 0 }}>Keyboard Navigation Guide:</h4>
        <ul style={{ marginBottom: 0 }}>
          <li>
            <strong>Arrow Left/Right:</strong> Navigate between tabs
            (horizontal)
          </li>
          <li>
            <strong>Arrow Up/Down:</strong> Navigate between tabs (vertical)
          </li>
          <li>
            <strong>Home:</strong> Jump to first tab
          </li>
          <li>
            <strong>End:</strong> Jump to last tab
          </li>
          <li>
            <strong>Tab:</strong> Move focus in/out of tabs
          </li>
        </ul>
      </div>
      <Tabs items={itemsWithIcons} ariaLabel="Keyboard navigation demo" />
    </div>
  ),
};

export const VerticalWithVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Vertical Solid</h3>
        <Tabs items={sampleItems} orientation="vertical" variant="solid" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Vertical Underlined</h3>
        <Tabs items={sampleItems} orientation="vertical" variant="underlined" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Vertical Light</h3>
        <Tabs items={sampleItems} orientation="vertical" variant="light" />
      </div>
    </div>
  ),
};

export const ManyTabs: Story = {
  render: () => {
    const manyItems: TabItem[] = Array.from({ length: 10 }, (_, i) => ({
      key: `tab-${i + 1}`,
      label: `Tab ${i + 1}`,
      content: (
        <div>
          <h3>Tab {i + 1} Content</h3>
          <p>This is the content for tab number {i + 1}.</p>
        </div>
      ),
    }));

    return (
      <div>
        <p style={{ marginBottom: "1rem" }}>
          <strong>Scrollable Tabs:</strong> When there are many tabs, the tab
          list becomes scrollable.
        </p>
        <Tabs items={manyItems} />
      </div>
    );
  },
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
            <strong>ARIA Roles:</strong> Proper tablist, tab, and tabpanel roles
          </li>
          <li>
            <strong>ARIA States:</strong> aria-selected, aria-controls,
            aria-labelledby
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Full keyboard support
          </li>
          <li>
            <strong>Focus Management:</strong> Proper focus indicators and focus
            movement
          </li>
          <li>
            <strong>Screen Readers:</strong> Proper announcements of tab
            selection
          </li>
          <li>
            <strong>Disabled State:</strong> Proper aria-disabled attribute
          </li>
        </ul>
      </div>
      <Tabs items={itemsWithIcons} ariaLabel="Accessible tabs example" />
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div>
      <Tabs
        items={sampleItems}
        className="custom-tabs"
        tabListClassName="custom-tab-list"
        tabClassName="custom-tab"
        tabPanelClassName="custom-panel"
        variant="solid"
        color="secondary"
        size="lg"
      />
      <style>{`
        .custom-tabs {
          border: 2px dashed var(--color-secondary-200);
          padding: 1rem;
          border-radius: var(--radius-lg);
        }
      `}</style>
    </div>
  ),
};
