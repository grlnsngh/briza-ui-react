import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

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

export const WithIcons: Story = {
  render: () => {
    const startIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );

    const endIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button color="primary" startContent={startIcon}>
          Star Button
        </Button>
        <Button color="secondary" endContent={endIcon}>
          Next Button
        </Button>
        <Button color="success" startContent={startIcon} endContent={endIcon}>
          Complete Button
        </Button>
      </div>
    );
  },
};

export const IconOnly: Story = {
  render: () => {
    const CameraIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </svg>
    );

    const HeartIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );

    const SearchIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button isIconOnly color="warning" variant="faded">
          <CameraIcon />
        </Button>
        <Button isIconOnly color="danger" variant="solid" size="sm">
          <HeartIcon />
        </Button>
        <Button isIconOnly color="primary" variant="light" size="lg">
          <SearchIcon />
        </Button>
        <Button isIconOnly color="success" variant="bordered" disabled>
          <CameraIcon />
        </Button>
      </div>
    );
  },
};

export const WithLongText: Story = {
  render: () => {
    return (
      <div
        style={{
          maxWidth: "300px",
        }}
      >
        <Button color="primary" style={{ maxWidth: "250px" }}>
          Long text wraps after it hits the max width of the component
        </Button>
      </div>
    );
  },
};

export const PolymorphicExamples: StoryObj<typeof Button> = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3>Default Button (renders as &lt;button&gt;)</h3>
          <Button color="primary" onClick={() => alert("Button clicked!")}>
            Standard Button
          </Button>
        </div>

        <div>
          <h3>Link Button (renders as &lt;a&gt;)</h3>
          <Button as="a" href="#home" color="secondary">
            Navigation Link
          </Button>
        </div>

        <div>
          <h3>Div Button (renders as &lt;div&gt;)</h3>
          <Button
            as="div"
            color="success"
            onClick={() => alert("Div clicked!")}
          >
            Custom Div Element
          </Button>
        </div>

        <div>
          <h3>Span Button (renders as &lt;span&gt;)</h3>
          <Button as="span" color="warning" size="sm">
            Inline Span Element
          </Button>
        </div>

        <div>
          <h3>External Link (renders as &lt;a&gt; with target="_blank")</h3>
          <Button
            as="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            color="danger"
            variant="bordered"
          >
            Open GitHub
          </Button>
        </div>
      </div>
    );
  },
};
