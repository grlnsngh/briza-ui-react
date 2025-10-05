import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxGroup } from "./Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable checkbox input with support for labels, descriptions, validation states, and indeterminate state. Can be used individually or as part of a CheckboxGroup.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox",
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
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ============================================ */
/* Basic Examples                              */
/* ============================================ */

export const Default: Story = {
  args: {
    label: "Remember me",
  },
};

export const Playground: Story = {
  args: {
    size: "md",
    status: "default",
    label: "Accept terms and conditions",
    description: "You must accept the terms to continue",
    disabled: false,
    required: false,
    indeterminate: false,
  },
};

/* ============================================ */
/* Common Patterns                             */
/* ============================================ */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox size="sm" label="Small checkbox" defaultChecked />
      <Checkbox size="md" label="Medium checkbox (default)" defaultChecked />
      <Checkbox size="lg" label="Large checkbox" defaultChecked />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox
        label="Default state"
        helperText="This is a helper text"
        defaultChecked
      />
      <Checkbox
        status="error"
        label="Error state"
        errorMessage="You must accept the terms"
      />
      <Checkbox
        status="success"
        label="Success state"
        successMessage="Terms accepted successfully"
        defaultChecked
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Disabled indeterminate" disabled indeterminate />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox
        label="Email notifications"
        description="Receive email updates about your account activity"
      />
      <Checkbox
        label="Marketing emails"
        description="Get the latest news, updates, and special offers"
      />
      <Checkbox
        label="SMS notifications"
        description="Receive text messages for important updates (carrier charges may apply)"
      />
    </div>
  ),
};

/* ============================================ */
/* Features                                    */
/* ============================================ */

export const Indeterminate: Story = {
  render: () => {
    const IndeterminateExample = () => {
      const [checkedItems, setCheckedItems] = useState({
        option1: false,
        option2: true,
        option3: false,
      });

      const allChecked = Object.values(checkedItems).every(Boolean);
      const someChecked = Object.values(checkedItems).some(Boolean);

      const handleParentChange = (checked: boolean) => {
        setCheckedItems({
          option1: checked,
          option2: checked,
          option3: checked,
        });
      };

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Select all"
            checked={allChecked}
            indeterminate={someChecked && !allChecked}
            onChange={(e) => handleParentChange(e.target.checked)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginLeft: "1.5rem",
            }}
          >
            <Checkbox
              label="Option 1"
              checked={checkedItems.option1}
              onChange={(e) =>
                setCheckedItems({ ...checkedItems, option1: e.target.checked })
              }
            />
            <Checkbox
              label="Option 2"
              checked={checkedItems.option2}
              onChange={(e) =>
                setCheckedItems({ ...checkedItems, option2: e.target.checked })
              }
            />
            <Checkbox
              label="Option 3"
              checked={checkedItems.option3}
              onChange={(e) =>
                setCheckedItems({ ...checkedItems, option3: e.target.checked })
              }
            />
          </div>
        </div>
      );
    };

    return <IndeterminateExample />;
  },
};

export const BasicCheckboxGroup: Story = {
  render: () => (
    <CheckboxGroup
      label="Select your interests"
      description="Choose all that apply"
      options={[
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
      ]}
      defaultValue={["react"]}
    />
  ),
};

export const CheckboxGroupWithDescriptions: Story = {
  render: () => (
    <CheckboxGroup
      label="Notification preferences"
      description="Choose how you want to be notified"
      size="md"
      options={[
        {
          value: "email",
          label: "Email",
          description: "Get notified via email",
        },
        {
          value: "sms",
          label: "SMS",
          description: "Receive text message notifications",
        },
        {
          value: "push",
          label: "Push notifications",
          description: "Receive push notifications on your device",
        },
      ]}
      defaultValue={["email", "push"]}
    />
  ),
};

export const CheckboxGroupHorizontal: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <CheckboxGroup
        label="Select days"
        orientation="horizontal"
        options={[
          { value: "mon", label: "Mon" },
          { value: "tue", label: "Tue" },
          { value: "wed", label: "Wed" },
          { value: "thu", label: "Thu" },
          { value: "fri", label: "Fri" },
          { value: "sat", label: "Sat" },
          { value: "sun", label: "Sun" },
        ]}
        defaultValue={["mon", "wed", "fri"]}
      />
    </div>
  ),
};

export const CheckboxGroupSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <CheckboxGroup
        label="Small size"
        size="sm"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue={["1"]}
      />
      <CheckboxGroup
        label="Medium size (default)"
        size="md"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue={["1"]}
      />
      <CheckboxGroup
        label="Large size"
        size="lg"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue={["1"]}
      />
    </div>
  ),
};

export const CheckboxGroupWithDisabled: Story = {
  render: () => (
    <CheckboxGroup
      label="Select features"
      description="Some features are not available in your plan"
      options={[
        { value: "basic", label: "Basic features" },
        { value: "advanced", label: "Advanced features", disabled: true },
        { value: "premium", label: "Premium features", disabled: true },
      ]}
      defaultValue={["basic"]}
    />
  ),
};

export const CheckboxGroupValidation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <CheckboxGroup
        label="Select at least one option"
        status="error"
        errorMessage="Please select at least one option"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
      />
      <CheckboxGroup
        label="Selection saved"
        status="success"
        successMessage="Your preferences have been saved"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        defaultValue={["1", "2"]}
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
      <Checkbox
        label={
          <span>
            I agree to the{" "}
            <a
              href="/terms"
              style={{ color: "var(--color-primary)", textDecoration: "none" }}
            >
              terms and conditions
            </a>
          </span>
        }
      />
      <Checkbox
        label={
          <span>
            Subscribe to newsletter{" "}
            <span style={{ color: "var(--color-text-secondary)" }}>
              (Optional)
            </span>
          </span>
        }
      />
      <Checkbox
        label={
          <div>
            <strong>Enable notifications</strong>
            <div style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Get real-time updates about your account
            </div>
          </div>
        }
      />
    </div>
  ),
};

export const InForms: Story = {
  render: () => {
    const FormExample = () => {
      const [formData, setFormData] = useState({
        terms: false,
        newsletter: false,
        notifications: true,
      });
      const [errors, setErrors] = useState({ terms: false });

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.terms) {
          setErrors({ terms: true });
          return;
        }
        alert("Form submitted: " + JSON.stringify(formData, null, 2));
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
          <Checkbox
            label="Accept terms and conditions"
            required
            checked={formData.terms}
            onChange={(e) => {
              setFormData({ ...formData, terms: e.target.checked });
              setErrors({ terms: false });
            }}
            status={errors.terms ? "error" : "default"}
            errorMessage={
              errors.terms ? "You must accept the terms" : undefined
            }
          />
          <Checkbox
            label="Subscribe to newsletter"
            checked={formData.newsletter}
            onChange={(e) =>
              setFormData({ ...formData, newsletter: e.target.checked })
            }
          />
          <Checkbox
            label="Enable email notifications"
            checked={formData.notifications}
            onChange={(e) =>
              setFormData({ ...formData, notifications: e.target.checked })
            }
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

/* ============================================ */
/* Controlled Examples                         */
/* ============================================ */

export const ControlledSingle: Story = {
  render: () => {
    const ControlledExample = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Controlled checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Current state: {checked ? "Checked" : "Unchecked"}
          </div>
          <button
            onClick={() => setChecked(!checked)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--border-radius-md)",
              cursor: "pointer",
            }}
          >
            Toggle
          </button>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

export const ControlledGroup: Story = {
  render: () => {
    const ControlledGroupExample = () => {
      const [selectedValues, setSelectedValues] = useState([
        "react",
        "typescript",
      ]);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <CheckboxGroup
            label="Select technologies"
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "angular", label: "Angular" },
              { value: "typescript", label: "TypeScript" },
              { value: "javascript", label: "JavaScript" },
            ]}
            value={selectedValues}
            onChange={setSelectedValues}
          />
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              marginTop: "1rem",
            }}
          >
            Selected: {selectedValues.join(", ") || "None"}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setSelectedValues([])}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--border-radius-md)",
                cursor: "pointer",
              }}
            >
              Clear All
            </button>
            <button
              onClick={() =>
                setSelectedValues([
                  "react",
                  "vue",
                  "angular",
                  "typescript",
                  "javascript",
                ])
              }
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--border-radius-md)",
                cursor: "pointer",
              }}
            >
              Select All
            </button>
          </div>
        </div>
      );
    };

    return <ControlledGroupExample />;
  },
};

export const ReactHookFormIntegration: Story = {
  render: () => {
    const ReactHookFormExample = () => {
      // Simulated React Hook Form integration
      const [formState, setFormState] = useState({
        acceptTerms: false,
        preferences: [] as string[],
      });
      const [errors, setErrors] = useState<Record<string, string>>({});

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formState.acceptTerms) {
          newErrors.acceptTerms = "You must accept the terms";
        }
        if (formState.preferences.length === 0) {
          newErrors.preferences = "Select at least one preference";
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
          <Checkbox
            label="I accept the terms and conditions"
            required
            checked={formState.acceptTerms}
            onChange={(e) => {
              setFormState({ ...formState, acceptTerms: e.target.checked });
              setErrors({ ...errors, acceptTerms: "" });
            }}
            status={errors.acceptTerms ? "error" : "default"}
            errorMessage={errors.acceptTerms}
          />

          <CheckboxGroup
            label="Notification preferences"
            description="Select how you want to be notified"
            required
            options={[
              { value: "email", label: "Email notifications" },
              { value: "sms", label: "SMS notifications" },
              { value: "push", label: "Push notifications" },
            ]}
            value={formState.preferences}
            onChange={(values) => {
              setFormState({ ...formState, preferences: values });
              setErrors({ ...errors, preferences: "" });
            }}
            status={errors.preferences ? "error" : "default"}
            errorMessage={errors.preferences}
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
