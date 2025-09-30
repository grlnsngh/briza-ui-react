import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
          A flexible text input field built for accessibility and rich design token support.

          ## Key Features
          - 📏 **Size variants**: \`sm\`, \`md\`, \`lg\` for consistent sizing
          - 🧠 **State awareness**: communicates focus, error, success, and disabled states
          - 🔐 **Password ready**: built-in show/hide toggle with accessible labels
          - 🎨 **Adornments**: optional prefix and suffix slots for icons or actions
          - ♿ **Accessible first**: automatic aria bindings for descriptions and validation
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Controls the overall height and typography of the input",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    status: {
      control: { type: "select" },
      options: ["default", "error", "success"],
      description: "Visual validation state",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    passwordToggle: {
      control: { type: "boolean" },
      description: "Enable or disable the password visibility toggle",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    onValueChange: {
      action: "value changed",
      description: "Emits the updated input value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    helperText: "We'll never share your email.",
    type: "email",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "320px",
      }}
    >
      <Input label="Small" placeholder="Small" size="sm" />
      <Input label="Medium" placeholder="Medium" size="md" />
      <Input label="Large" placeholder="Large" size="lg" />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Input
        label="Default"
        placeholder="Search"
        helperText="Try searching for a keyword"
      />
      <Input
        label="Error"
        placeholder="Enter username"
        status="error"
        errorMessage="Username is already taken"
      />
      <Input
        label="Success"
        placeholder="Enter code"
        status="success"
        successMessage="Code accepted"
      />
      <Input label="Disabled" placeholder="Can't type here" disabled />
    </div>
  ),
};

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.71.71l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 16.17l-3.88-3.88L4 13.41l5 5 12-12-1.41-1.41z" />
  </svg>
);

export const WithAdornments: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Input label="Search" placeholder="Search" prefix={<SearchIcon />} />
      <Input
        label="With suffix"
        placeholder="Paste your token"
        suffix={<CheckIcon />}
        helperText="Suffix can be an icon or action"
      />
      <Input
        label="Both prefix & suffix"
        placeholder="Search documentation"
        prefix={<SearchIcon />}
        suffix={<CheckIcon />}
      />
    </div>
  ),
};

export const PasswordField: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    helperText: "Use at least 8 characters, one number, and one symbol.",
  },
};

export const CustomToggleLabels: Story = {
  args: {
    label: "Secret code",
    type: "password",
    placeholder: "Enter your code",
    passwordToggleLabels: {
      show: "View",
      hide: "Hide",
    },
  },
};
