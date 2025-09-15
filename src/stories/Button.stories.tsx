import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
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
    },
    variant: {
      control: { type: "select" },
      options: [
        "solid",
        "faded",
        "bordered",
        "light",
        "flat",
        "shadow",
        "glowing",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "default",
    children: "Default Button",
  },
};

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button variant="solid" color="primary">
        Solid
      </Button>
      <Button variant="faded" color="primary">
        Faded
      </Button>
      <Button variant="bordered" color="primary">
        Bordered
      </Button>
      <Button variant="light" color="primary">
        Light
      </Button>
      <Button variant="flat" color="primary">
        Flat
      </Button>
      <Button variant="shadow" color="primary">
        Shadow
      </Button>
      <Button variant="glowing" color="primary">
        Glowing
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    color: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button size="xs" color="primary">
        XS
      </Button>
      <Button size="sm" color="primary">
        SM
      </Button>
      <Button size="md" color="primary">
        MD
      </Button>
      <Button size="lg" color="primary">
        LG
      </Button>
      <Button size="xl" color="primary">
        XL
      </Button>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button radius="none" color="primary">
        None
      </Button>
      <Button radius="sm" color="primary">
        SM
      </Button>
      <Button radius="md" color="primary">
        MD
      </Button>
      <Button radius="lg" color="primary">
        LG
      </Button>
      <Button radius="full" color="primary">
        Full
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = () => {
      setIsLoading(true);
    };

    const handleReset = () => {
      setIsLoading(false);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Button color="primary" isLoading={isLoading} onClick={handleClick}>
          {isLoading ? "Loading..." : "Start Loading"}
        </Button>
        <Button color="secondary" onClick={handleReset}>
          Reset Loading State
        </Button>
      </div>
    );
  },
};
