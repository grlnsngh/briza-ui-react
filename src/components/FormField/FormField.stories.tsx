import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
    docs: {
      description: {
        component: `
A flexible form field wrapper component that provides consistent label management, error/success messaging, help text support, required field indicators, and proper ARIA associations.

## Features
- 📏 Three size variants (\`sm\`, \`md\`, \`lg\`)
- 🎨 Visual states (default, error, success, disabled)
- 🏷️ Automatic label and ARIA associations
- ♿ WCAG 2.1 AA compliant with proper ARIA attributes
- 🎯 Works with any form control (input, select, textarea, custom components)
- 🎨 Full design token integration for theming

Use the interactive **Playground** story below to explore all available props and see the component in action.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Controls the typography and spacing of the field",
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    status: {
      control: { type: "select" },
      options: ["default", "error", "success"],
      description:
        "Visual validation state. Automatically applies appropriate colors and ARIA attributes",
      table: {
        defaultValue: { summary: "default" },
        type: { summary: '"default" | "error" | "success"' },
      },
    },
    label: {
      control: { type: "text" },
      description:
        "Label text displayed above the field. Can be ReactNode for rich content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description:
        "Additional context shown between label and field. Properly linked via aria-describedby",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text shown below the field",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    errorMessage: {
      control: { type: "text" },
      description:
        "Error message shown when status is 'error'. Announced to screen readers",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    successMessage: {
      control: { type: "text" },
      description: "Success message shown when status is 'success'",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the field and reduces visual emphasis",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isRequired: {
      control: { type: "boolean" },
      description: "Shows asterisk indicator and sets aria-required",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

/* ============================================ */
/* Playground                                   */
/* ============================================ */

export const Playground: Story = {
  args: {
    size: "md",
    status: "default",
    label: "Email Address",
    description: "We'll never share your email with anyone",
    helperText: "Use your work email for business accounts",
    isRequired: false,
    disabled: false,
  },
  render: (args) => (
    <FormField {...args}>
      <input
        type="email"
        placeholder="you@example.com"
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
        }}
      />
    </FormField>
  ),
};

/* ============================================ */
/* Basic Examples                              */
/* ============================================ */

export const Default: Story = {
  render: () => (
    <FormField label="Username">
      <input
        type="text"
        placeholder="Enter your username"
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
        }}
      />
    </FormField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FormField
      label="API Key"
      description="You can find this in your account settings under 'Developer'"
    >
      <input
        type="password"
        placeholder="sk-..."
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
          fontFamily: "monospace",
        }}
      />
    </FormField>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <FormField
      label="Password"
      helperText="Must be at least 8 characters with one uppercase letter and one number"
    >
      <input
        type="password"
        placeholder="Enter password"
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
        }}
      />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField label="Email Address" isRequired>
      <input
        type="email"
        placeholder="you@example.com"
        required
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
        }}
      />
    </FormField>
  ),
};

/* ============================================ */
/* Size Variants                               */
/* ============================================ */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <FormField
        size="sm"
        label="Small field"
        helperText="This is a small sized field"
      >
        <input
          type="text"
          placeholder="Small input"
          style={{
            width: "100%",
            padding: "0.375rem 0.5rem",
            fontSize: "0.75rem",
            border: "1.5px solid #d1d5db",
            borderRadius: "0.25rem",
            outline: "none",
          }}
        />
      </FormField>

      <FormField
        size="md"
        label="Medium field (default)"
        helperText="This is a medium sized field"
      >
        <input
          type="text"
          placeholder="Medium input"
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            border: "1.5px solid #d1d5db",
            borderRadius: "0.375rem",
            outline: "none",
          }}
        />
      </FormField>

      <FormField
        size="lg"
        label="Large field"
        helperText="This is a large sized field"
      >
        <input
          type="text"
          placeholder="Large input"
          style={{
            width: "100%",
            padding: "0.625rem 1rem",
            fontSize: "1rem",
            border: "1.5px solid #d1d5db",
            borderRadius: "0.5rem",
            outline: "none",
          }}
        />
      </FormField>
    </div>
  ),
};

/* ============================================ */
/* Validation States                           */
/* ============================================ */

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <FormField
        label="Default state"
        helperText="Enter a valid email address"
        status="default"
      >
        <input
          type="email"
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            border: "1.5px solid #d1d5db",
            borderRadius: "0.375rem",
            outline: "none",
          }}
        />
      </FormField>

      <FormField
        label="Error state"
        status="error"
        errorMessage="Please enter a valid email address"
      >
        <input
          type="email"
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            border: "1.5px solid #ef4444",
            borderRadius: "0.375rem",
            outline: "none",
          }}
        />
      </FormField>

      <FormField
        label="Success state"
        status="success"
        successMessage="Email address is valid"
      >
        <input
          type="email"
          value="john@example.com"
          readOnly
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            border: "1.5px solid #22c55e",
            borderRadius: "0.375rem",
            outline: "none",
          }}
        />
      </FormField>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <FormField
      label="Disabled field"
      description="This field is disabled"
      disabled
    >
      <input
        type="text"
        placeholder="Cannot edit"
        disabled
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
          backgroundColor: "#f3f4f6",
          cursor: "not-allowed",
        }}
      />
    </FormField>
  ),
};

/* ============================================ */
/* Integration with Form Controls             */
/* ============================================ */

export const WithTextarea: Story = {
  render: () => (
    <FormField
      label="Bio"
      description="Tell us about yourself"
      helperText="Maximum 500 characters"
    >
      <textarea
        placeholder="I am a..."
        rows={4}
        maxLength={500}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
    </FormField>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <FormField
      label="Country"
      description="Select your country of residence"
      isRequired
    >
      <select
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1.5px solid #d1d5db",
          borderRadius: "0.375rem",
          outline: "none",
          backgroundColor: "white",
        }}
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </select>
    </FormField>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <FormField
      label="Newsletter subscription"
      description="Stay updated with our latest news"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input type="checkbox" id="newsletter" />
        <label htmlFor="newsletter" style={{ fontSize: "0.875rem" }}>
          I want to receive the newsletter
        </label>
      </div>
    </FormField>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <FormField
      label="Subscription plan"
      description="Choose your preferred plan"
      isRequired
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="radio" name="plan" id="free" value="free" />
          <label htmlFor="free" style={{ fontSize: "0.875rem" }}>
            Free - $0/month
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="radio" name="plan" id="pro" value="pro" />
          <label htmlFor="pro" style={{ fontSize: "0.875rem" }}>
            Pro - $9/month
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="radio" name="plan" id="enterprise" value="enterprise" />
          <label htmlFor="enterprise" style={{ fontSize: "0.875rem" }}>
            Enterprise - $29/month
          </label>
        </div>
      </div>
    </FormField>
  ),
};

/* ============================================ */
/* Real-world Form Examples                    */
/* ============================================ */

export const LoginForm: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
      {}
    );

    const validateEmail = (value: string) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email format";
      return undefined;
    };

    const validatePassword = (value: string) => {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      return undefined;
    };

    const handleEmailBlur = () => {
      const error = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: error }));
    };

    const handlePasswordBlur = () => {
      const error = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: error }));
    };

    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Sign In</h2>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <FormField
            label="Email"
            isRequired
            status={errors.email ? "error" : "default"}
            errorMessage={errors.email}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                border: `1.5px solid ${errors.email ? "#ef4444" : "#d1d5db"}`,
                borderRadius: "0.375rem",
                outline: "none",
              }}
            />
          </FormField>

          <FormField
            label="Password"
            isRequired
            status={errors.password ? "error" : "default"}
            errorMessage={errors.password}
            helperText="Must be at least 8 characters"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                border: `1.5px solid ${
                  errors.password ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "0.375rem",
                outline: "none",
              }}
            />
          </FormField>

          <button
            type="submit"
            style={{
              padding: "0.625rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "white",
              backgroundColor: "#3b82f6",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  },
};

export const RegistrationForm: Story = {
  render: () => (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2
        style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 600 }}
      >
        Create Account
      </h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <FormField label="First name" isRequired>
            <input
              type="text"
              placeholder="John"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                border: "1.5px solid #d1d5db",
                borderRadius: "0.375rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </FormField>

          <FormField label="Last name" isRequired>
            <input
              type="text"
              placeholder="Doe"
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                border: "1.5px solid #d1d5db",
                borderRadius: "0.375rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </FormField>
        </div>

        <FormField
          label="Email"
          description="We'll send a verification email"
          isRequired
        >
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              fontSize: "0.875rem",
              border: "1.5px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </FormField>

        <FormField
          label="Password"
          helperText="Must include uppercase, lowercase, and number"
          isRequired
        >
          <input
            type="password"
            placeholder="Create password"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              fontSize: "0.875rem",
              border: "1.5px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </FormField>

        <FormField label="Company" description="Optional">
          <input
            type="text"
            placeholder="Acme Inc."
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              fontSize: "0.875rem",
              border: "1.5px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </FormField>

        <FormField label="Terms and conditions" isRequired>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms" style={{ fontSize: "0.875rem" }}>
              I agree to the terms and conditions
            </label>
          </div>
        </FormField>

        <button
          type="submit"
          style={{
            padding: "0.625rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "white",
            backgroundColor: "#3b82f6",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  ),
};
