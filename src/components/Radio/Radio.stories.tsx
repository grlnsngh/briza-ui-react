import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./Radio";
import { useState } from "react";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable radio button input with support for labels, descriptions, validation states. Should be used within a RadioGroup for proper keyboard navigation with arrow keys.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the radio button",
    },
    status: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Visual status for validation",
    },
    label: {
      control: "text",
      description: "Label text or element",
    },
    description: {
      control: "text",
      description: "Additional descriptive text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the radio is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/* ============================================ */
/* Basic Examples                              */
/* ============================================ */

export const Default: Story = {
  args: {
    label: "Option 1",
    name: "default-example",
    value: "option1",
  },
};

export const Playground: Story = {
  args: {
    size: "md",
    status: "default",
    label: "Select this option",
    description: "This is a radio button option",
    disabled: false,
    required: false,
    name: "playground",
    value: "option1",
  },
};

/* ============================================ */
/* Common Patterns                             */
/* ============================================ */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Radio
        size="sm"
        label="Small radio"
        name="sizes"
        value="sm"
        defaultChecked
      />
      <Radio size="md" label="Medium radio (default)" name="sizes" value="md" />
      <Radio size="lg" label="Large radio" name="sizes" value="lg" />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Radio
        label="Default state"
        helperText="This is a helper text"
        name="validation"
        value="default"
        defaultChecked
      />
      <Radio
        status="error"
        label="Error state"
        errorMessage="This option is not available"
        name="validation"
        value="error"
      />
      <Radio
        status="success"
        label="Success state"
        successMessage="This is the recommended option"
        name="validation"
        value="success"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Radio
        label="Disabled unchecked"
        disabled
        name="disabled"
        value="unchecked"
      />
      <Radio
        label="Disabled checked"
        disabled
        defaultChecked
        name="disabled"
        value="checked"
      />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Radio
        label="Basic Plan"
        description="Perfect for individuals and small projects"
        name="plan"
        value="basic"
        defaultChecked
      />
      <Radio
        label="Pro Plan"
        description="Best for growing teams and businesses"
        name="plan"
        value="pro"
      />
      <Radio
        label="Enterprise Plan"
        description="Advanced features for large organizations"
        name="plan"
        value="enterprise"
      />
    </div>
  ),
};

/* ============================================ */
/* Features                                    */
/* ============================================ */

export const BasicRadioGroup: Story = {
  render: () => (
    <RadioGroup
      label="Select your plan"
      description="Choose the plan that best fits your needs"
      options={[
        { value: "basic", label: "Basic Plan" },
        { value: "pro", label: "Pro Plan" },
        { value: "enterprise", label: "Enterprise Plan" },
      ]}
      defaultValue="basic"
    />
  ),
};

export const RadioGroupWithDescriptions: Story = {
  render: () => (
    <RadioGroup
      label="Choose your plan"
      description="All plans include 14-day free trial"
      size="md"
      options={[
        {
          value: "basic",
          label: "Basic",
          description: "$9/month - Perfect for individuals",
        },
        {
          value: "pro",
          label: "Pro",
          description: "$29/month - Best for small teams",
        },
        {
          value: "enterprise",
          label: "Enterprise",
          description: "$99/month - For large organizations",
        },
      ]}
      defaultValue="pro"
    />
  ),
};

export const RadioGroupHorizontal: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <RadioGroup
        label="Select size"
        orientation="horizontal"
        options={[
          { value: "xs", label: "XS" },
          { value: "s", label: "S" },
          { value: "m", label: "M" },
          { value: "l", label: "L" },
          { value: "xl", label: "XL" },
        ]}
        defaultValue="m"
      />
    </div>
  ),
};

export const RadioGroupSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <RadioGroup
        label="Small size"
        size="sm"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue="1"
      />
      <RadioGroup
        label="Medium size (default)"
        size="md"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue="1"
      />
      <RadioGroup
        label="Large size"
        size="lg"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue="1"
      />
    </div>
  ),
};

export const RadioGroupWithDisabled: Story = {
  render: () => (
    <RadioGroup
      label="Select shipping method"
      description="Some shipping methods are not available"
      options={[
        { value: "standard", label: "Standard Shipping" },
        { value: "express", label: "Express Shipping", disabled: true },
        { value: "overnight", label: "Overnight Shipping", disabled: true },
      ]}
      defaultValue="standard"
    />
  ),
};

export const RadioGroupValidation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <RadioGroup
        label="Select an option"
        status="error"
        errorMessage="Please select an option"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
      />
      <RadioGroup
        label="Selection confirmed"
        status="success"
        successMessage="Your preference has been saved"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue="1"
      />
    </div>
  ),
};

/* ============================================ */
/* Advanced Examples                           */
/* ============================================ */

export const WithCustomLabels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Radio
        label={
          <span>
            <strong>Premium</strong> - Recommended
          </span>
        }
        description="Access to all features"
        name="custom"
        value="premium"
        defaultChecked
      />
      <Radio
        label={
          <div>
            <strong style={{ color: "var(--color-primary)" }}>Standard</strong>
            <div style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Most popular choice
            </div>
          </div>
        }
        name="custom"
        value="standard"
      />
    </div>
  ),
};

export const InForms: Story = {
  render: () => {
    const FormExample = () => {
      const [selected, setSelected] = useState("");
      const [error, setError] = useState(false);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) {
          setError(true);
          return;
        }
        alert("Form submitted with: " + selected);
      };

      return (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "400px",
          }}
        >
          <RadioGroup
            label="Select your preference"
            required
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            value={selected}
            onChange={(value) => {
              setSelected(value);
              setError(false);
            }}
            status={error ? "error" : "default"}
            errorMessage={error ? "Please select an option" : undefined}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--border-radius-md)",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      );
    };

    return <FormExample />;
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ maxWidth: "500px" }}>
      <RadioGroup
        label="Try keyboard navigation"
        description="Use arrow keys (↑↓ or ←→) to navigate between options"
        options={[
          { value: "1", label: "First Option" },
          { value: "2", label: "Second Option" },
          { value: "3", label: "Third Option" },
          { value: "4", label: "Fourth Option" },
          { value: "5", label: "Fifth Option" },
        ]}
        defaultValue="1"
      />
    </div>
  ),
};

/* ============================================ */
/* Controlled Examples                         */
/* ============================================ */

export const ControlledSingle: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("option1");

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <RadioGroup
            label="Controlled radio group"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ]}
            value={value}
            onChange={setValue}
          />
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Current selection: {value}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setValue("option1")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--border-radius-md)",
                cursor: "pointer",
              }}
            >
              Select Option 1
            </button>
            <button
              onClick={() => setValue("option2")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--border-radius-md)",
                cursor: "pointer",
              }}
            >
              Select Option 2
            </button>
          </div>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

export const ReactHookFormIntegration: Story = {
  render: () => {
    const ReactHookFormExample = () => {
      const [formState, setFormState] = useState({
        plan: "",
        notifications: "",
      });
      const [errors, setErrors] = useState<Record<string, string>>({});

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formState.plan) {
          newErrors.plan = "Please select a plan";
        }
        if (!formState.notifications) {
          newErrors.notifications = "Please select a notification preference";
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }

        alert("Form submitted successfully!");
        setErrors({});
      };

      return (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "500px",
          }}
        >
          <RadioGroup
            label="Select your plan"
            description="Choose the plan that fits your needs"
            required
            options={[
              { value: "basic", label: "Basic Plan", description: "$9/month" },
              { value: "pro", label: "Pro Plan", description: "$29/month" },
              {
                value: "enterprise",
                label: "Enterprise Plan",
                description: "$99/month",
              },
            ]}
            value={formState.plan}
            onChange={(value) => {
              setFormState({ ...formState, plan: value });
              setErrors({ ...errors, plan: "" });
            }}
            status={errors.plan ? "error" : "default"}
            errorMessage={errors.plan}
          />

          <RadioGroup
            label="Notification preferences"
            description="How would you like to receive updates?"
            required
            options={[
              { value: "email", label: "Email only" },
              { value: "sms", label: "SMS only" },
              { value: "both", label: "Both Email and SMS" },
            ]}
            value={formState.notifications}
            onChange={(value) => {
              setFormState({ ...formState, notifications: value });
              setErrors({ ...errors, notifications: "" });
            }}
            status={errors.notifications ? "error" : "default"}
            errorMessage={errors.notifications}
          />

          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--border-radius-md)",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Submit Form
          </button>
        </form>
      );
    };

    return <ReactHookFormExample />;
  },
};
