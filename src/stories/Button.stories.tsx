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
