import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible avatar component with image support, initials fallback, various sizes, status indicators, and full theme integration.

## Features
- 🎨 **Full theme integration** - Supports light/dark modes
- 🖼️ **Image support** - Display user profile images with loading states
- 🔤 **Initials fallback** - Automatically generate initials from names
- 📊 **Status indicators** - Show online, offline, away, or busy status
- ♿ **Accessibility first** - WCAG compliant with proper ARIA attributes
- 🎯 **Design tokens** - Uses systematic spacing, colors, and typography
- 👥 **Avatar groups** - Display multiple avatars with overlapping layout

## Use Cases
- User profiles
- Comment sections
- Team member displays
- Chat applications
- User lists
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the avatar",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the avatar",
      table: {
        defaultValue: { summary: "full" },
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
      description: "The color variant (used with initials)",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    status: {
      control: { type: "select" },
      options: ["online", "offline", "away", "busy"],
      description: "Status indicator",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Whether the avatar is in a loading state",
    },
    isDisabled: {
      control: { type: "boolean" },
      description: "Whether the avatar is disabled",
    },
    isBordered: {
      control: { type: "boolean" },
      description: "Whether to show a border",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample image URLs for demos
const sampleImages = {
  male: "https://i.pravatar.cc/150?img=12",
  female: "https://i.pravatar.cc/150?img=47",
  male2: "https://i.pravatar.cc/150?img=33",
  female2: "https://i.pravatar.cc/150?img=44",
};

export const Default: Story = {
  args: {
    name: "John Doe",
  },
};

export const WithImage: Story = {
  args: {
    src: sampleImages.male,
    alt: "John Doe",
    name: "John Doe",
  },
};

export const WithInitials: Story = {
  args: {
    name: "Jane Smith",
    color: "primary",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar name="John Doe" size="xs" />
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
      <Avatar name="John Doe" size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar name="Default User" color="default" />
      <Avatar name="Primary User" color="primary" />
      <Avatar name="Secondary User" color="secondary" />
      <Avatar name="Success User" color="success" />
      <Avatar name="Warning User" color="warning" />
      <Avatar name="Danger User" color="danger" />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar name="John Doe" radius="none" />
      <Avatar name="John Doe" radius="sm" />
      <Avatar name="John Doe" radius="md" />
      <Avatar name="John Doe" radius="lg" />
      <Avatar name="John Doe" radius="full" />
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Avatar
          src={sampleImages.male}
          alt="Online User"
          name="Online User"
          status="online"
        />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>Online</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src={sampleImages.female}
          alt="Offline User"
          name="Offline User"
          status="offline"
        />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>Offline</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src={sampleImages.male2}
          alt="Away User"
          name="Away User"
          status="away"
        />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>Away</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src={sampleImages.female2}
          alt="Busy User"
          name="Busy User"
          status="busy"
        />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>Busy</div>
      </div>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar
        src={sampleImages.male}
        alt="Bordered Avatar"
        name="Bordered Avatar"
        isBordered
      />
      <Avatar name="John Doe" color="primary" isBordered />
      <Avatar
        src={sampleImages.female}
        alt="Bordered with Status"
        name="Bordered with Status"
        isBordered
        status="online"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar isLoading size="xs" />
      <Avatar isLoading size="sm" />
      <Avatar isLoading size="md" />
      <Avatar isLoading size="lg" />
      <Avatar isLoading size="xl" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar
        src={sampleImages.male}
        alt="Disabled Avatar"
        name="Disabled Avatar"
        isDisabled
      />
      <Avatar name="Disabled User" color="primary" isDisabled />
      <Avatar name="Disabled User" color="secondary" isDisabled />
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Avatar
        icon={
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
        color="primary"
      />
      <Avatar
        icon={
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        color="secondary"
        size="lg"
      />
    </div>
  ),
};

export const FallbackBehavior: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://invalid-url.com/image.jpg"
          name="Failed Image"
          color="primary"
        />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          Image Error → Initials
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar name="John Doe" />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          Name → Initials
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar />
        <div style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          No Data → Placeholder
        </div>
      </div>
    </div>
  ),
};

export const AvatarGroupBasic: Story = {
  render: () => (
    <AvatarGroup max={5}>
      <Avatar src={sampleImages.male} alt="User 1" name="User 1" />
      <Avatar src={sampleImages.female} alt="User 2" name="User 2" />
      <Avatar src={sampleImages.male2} alt="User 3" name="User 3" />
      <Avatar src={sampleImages.female2} alt="User 4" name="User 4" />
      <Avatar name="User 5" color="primary" />
      <Avatar name="User 6" color="secondary" />
      <Avatar name="User 7" color="success" />
    </AvatarGroup>
  ),
};

export const AvatarGroupSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      <div>
        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Extra Small (xs)
        </div>
        <AvatarGroup size="xs" max={4}>
          <Avatar src={sampleImages.male} alt="User 1" name="User 1" />
          <Avatar src={sampleImages.female} alt="User 2" name="User 2" />
          <Avatar name="User 3" color="primary" />
          <Avatar name="User 4" color="secondary" />
          <Avatar name="User 5" color="success" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Small (sm)
        </div>
        <AvatarGroup size="sm" max={4}>
          <Avatar src={sampleImages.male} alt="User 1" name="User 1" />
          <Avatar src={sampleImages.female} alt="User 2" name="User 2" />
          <Avatar name="User 3" color="primary" />
          <Avatar name="User 4" color="secondary" />
          <Avatar name="User 5" color="success" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Medium (md)
        </div>
        <AvatarGroup size="md" max={4}>
          <Avatar src={sampleImages.male} alt="User 1" name="User 1" />
          <Avatar src={sampleImages.female} alt="User 2" name="User 2" />
          <Avatar name="User 3" color="primary" />
          <Avatar name="User 4" color="secondary" />
          <Avatar name="User 5" color="success" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Large (lg)
        </div>
        <AvatarGroup size="lg" max={4}>
          <Avatar src={sampleImages.male} alt="User 1" name="User 1" />
          <Avatar src={sampleImages.female} alt="User 2" name="User 2" />
          <Avatar name="User 3" color="primary" />
          <Avatar name="User 4" color="secondary" />
          <Avatar name="User 5" color="success" />
        </AvatarGroup>
      </div>
      <div>
        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Extra Large (xl)
        </div>
        <AvatarGroup size="xl" max={4}>
          <Avatar src={sampleImages.male} alt="User 1" name="User 1" />
          <Avatar src={sampleImages.female} alt="User 2" name="User 2" />
          <Avatar name="User 3" color="primary" />
          <Avatar name="User 4" color="secondary" />
          <Avatar name="User 5" color="success" />
        </AvatarGroup>
      </div>
    </div>
  ),
};

export const AvatarGroupWithStatus: Story = {
  render: () => (
    <AvatarGroup max={5}>
      <Avatar
        src={sampleImages.male}
        alt="User 1"
        name="User 1"
        status="online"
      />
      <Avatar
        src={sampleImages.female}
        alt="User 2"
        name="User 2"
        status="away"
      />
      <Avatar
        src={sampleImages.male2}
        alt="User 3"
        name="User 3"
        status="busy"
      />
      <Avatar
        src={sampleImages.female2}
        alt="User 4"
        name="User 4"
        status="offline"
      />
      <Avatar name="User 5" color="primary" status="online" />
      <Avatar name="User 6" color="secondary" status="online" />
    </AvatarGroup>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: "600px",
        padding: "1.5rem",
        border: "1px solid var(--color-default-300)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--color-background)",
      }}
    >
      <h3
        style={{
          margin: "0 0 1rem 0",
          fontSize: "1.125rem",
          fontWeight: 600,
        }}
      >
        Project Team
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <AvatarGroup max={4}>
          <Avatar
            src={sampleImages.male}
            alt="John Doe"
            name="John Doe"
            status="online"
            isBordered
          />
          <Avatar
            src={sampleImages.female}
            alt="Jane Smith"
            name="Jane Smith"
            status="online"
            isBordered
          />
          <Avatar name="Bob Johnson" color="primary" status="away" isBordered />
          <Avatar
            name="Alice Brown"
            color="secondary"
            status="offline"
            isBordered
          />
          <Avatar name="Charlie Wilson" color="success" isBordered />
          <Avatar name="Diana Prince" color="warning" isBordered />
        </AvatarGroup>
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Add Member
        </button>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "var(--color-default-600)",
        }}
      >
        6 team members • 2 online • 1 away
      </p>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    name: "John Doe",
    size: "md",
    radius: "full",
    color: "primary",
    status: "online",
    isBordered: false,
    isDisabled: false,
    isLoading: false,
  },
};
