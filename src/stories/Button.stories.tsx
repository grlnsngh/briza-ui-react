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
        flexDirection: "column",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Solid:</span>
        <Button variant="solid" color="primary">
          Solid
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Faded:</span>
        <Button variant="faded" color="primary">
          Faded
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Bordered:</span>
        <Button variant="bordered" color="primary">
          Bordered
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Light:</span>
        <Button variant="light" color="primary">
          Light
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Flat:</span>
        <Button variant="flat" color="primary">
          Flat
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Shadow:</span>
        <Button variant="shadow" color="primary">
          Shadow
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ minWidth: "80px", fontWeight: "bold" }}>Glowing:</span>
        <Button variant="glowing" color="primary">
          Glowing
        </Button>
      </div>
    </div>
  ),
};
