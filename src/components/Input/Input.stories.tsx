import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
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
A flexible, accessible text input field with comprehensive design token support and rich validation states.

## Features
- 📏 Three size variants (\`sm\`, \`md\`, \`lg\`)
- 🎨 Visual states (default, error, success, disabled)
- 🔐 Password visibility toggle with eye icons
- 🔢 Character counter with smart color feedback
- ♿ WCAG 2.1 AA compliant with proper ARIA bindings
- 🎯 Type-safe with TypeScript generics
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
      description: "Controls the overall height and typography of the input",
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    shape: {
      control: { type: "select" },
      options: ["rounded", "square"],
      description: "Controls the border radius style of the input",
      table: {
        defaultValue: { summary: "rounded" },
        type: { summary: '"rounded" | "square"' },
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
        "Label text displayed above the input. Can be ReactNode for rich content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description:
        "Additional context shown between label and input. Properly linked via aria-describedby",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text shown below the input",
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
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text shown when input is empty",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the input and reduces visual emphasis",
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
    maxLength: {
      control: { type: "number" },
      description:
        "Maximum character length. Use with showCharacterCount for counter display",
      table: {
        type: { summary: "number" },
      },
    },
    showCharacterCount: {
      control: { type: "boolean" },
      description:
        "Display character counter when maxLength is set. Changes color at 80% and 100%",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    passwordToggle: {
      control: { type: "boolean" },
      description:
        "Enable or disable the password visibility toggle (eye icons)",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Native HTML input type",
      table: {
        defaultValue: { summary: "text" },
        type: { summary: "string" },
      },
    },
    onValueChange: {
      action: "value changed",
      description: "Callback fired with parsed value. Type-safe with generics",
      table: {
        type: { summary: "(value: TValue, event: ChangeEvent) => void" },
      },
    },
    // Hide complex/internal props from controls
    wrapperClassName: {
      control: false,
      description: "Custom class for wrapper element",
    },
    inputClassName: {
      control: false,
      description: "Custom class for input element",
    },
    valueParser: {
      control: false,
      description: "Custom parser function for transforming input value",
    },
    characterCountFormatter: {
      control: false,
      description: "Custom formatter for character count display",
    },
    prefix: {
      control: false,
      description: "Content before input (usually icons)",
    },
    suffix: {
      control: false,
      description: "Content after input (usually icons)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    helperText: "We'll never share your email.",
    type: "email",
  },
};

export const Playground: Story = {
  args: {
    label: "Interactive Input",
    placeholder: "Try me out...",
    helperText: "Use the controls below to customize this input",
    size: "md",
    status: "default",
    type: "text",
    disabled: false,
    isRequired: false,
    showCharacterCount: false,
    maxLength: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Experiment with all props using the controls panel below. Try changing size, status, and enabling features like character counter or password toggle.",
      },
    },
  },
};

// ============================================================================
// Common Patterns
// ============================================================================

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
  parameters: {
    docs: {
      description: {
        story:
          "Three size variants to match your design hierarchy: `sm`, `md` (default), and `lg`.",
      },
    },
  },
};

export const Shapes: Story = {
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
        shape="rounded"
        label="Rounded (Default)"
        placeholder="Modern rounded corners"
        helperText="Smooth, friendly appearance"
      />
      <Input
        shape="square"
        label="Square"
        placeholder="Sharp, precise corners"
        helperText="Clean, technical look"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Choose between `rounded` (default, modern look) and `square` (precise, technical aesthetic) shapes.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          'Visual feedback for different states. Error and success states include screen reader announcements via `role="alert"` and `role="status"`.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Add icons or interactive elements before (`prefix`) or after (`suffix`) the input. Commonly used for search icons, validation indicators, or action buttons.",
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "400px",
      }}
    >
      <Input
        label="Username"
        placeholder="johndoe"
        description="Choose a unique username that will be visible to other users. You can change it later in settings."
        helperText="3-20 characters, letters and numbers only"
      />

      <Input
        label="API Key"
        type="password"
        placeholder="sk_live_..."
        description={
          <span>
            Find your API key in the{" "}
            <button
              type="button"
              onClick={() => alert("Navigate to dashboard")}
              style={{
                color: "#3b82f6",
                background: "none",
                border: "none",
                padding: 0,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              developer dashboard
            </button>
            . Keep it secret!
          </span>
        }
        status="success"
        successMessage="API key is valid"
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@company.com"
        description="We'll send a verification link to this address."
        status="error"
        errorMessage="This email is already registered"
        isRequired
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `description` prop adds explanatory text between the label and input, automatically linked via `aria-describedby` for screen readers. Supports rich React nodes.",
      },
    },
  },
};

// ============================================================================
// Advanced Features
// ============================================================================

export const PasswordField: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    helperText: "Use at least 8 characters, one number, and one symbol.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Password inputs automatically show an eye icon toggle to reveal/hide the password. Fully accessible with proper `aria-label` and `aria-pressed` attributes.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Customize the password toggle button labels for different languages or contexts using `passwordToggleLabels`.",
      },
    },
  },
};

// ============================================================================
// Form Patterns
// ============================================================================

export const ControlledInput: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div style={{ maxWidth: "360px" }}>
        <Input
          label="Controlled Input"
          placeholder="Type something..."
          value={value}
          onValueChange={(newValue) => setValue(newValue)}
          helperText={`Current value: "${value}" (${value.length} characters)`}
        />
        <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
          <button
            onClick={() => setValue("Hello World")}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Set Value
          </button>
          <button
            onClick={() => setValue("")}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Controlled pattern**: Value managed by React state. Use when you need real-time validation, transformation, or external control of the input value.",
      },
    },
  },
};

export const UncontrolledInput: Story = {
  render: () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [submittedValue, setSubmittedValue] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputRef.current) {
        setSubmittedValue(inputRef.current.value);
      }
    };

    return (
      <div style={{ maxWidth: "360px" }}>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            label="Uncontrolled Input"
            placeholder="Type and submit..."
            defaultValue="Initial value"
            helperText="This input manages its own state internally"
          />
          <button
            type="submit"
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
        {submittedValue && (
          <p style={{ marginTop: "16px", color: "#22c55e" }}>
            Submitted value: "{submittedValue}"
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Uncontrolled pattern**: Input manages its own state internally. Access via ref when needed (e.g., form submission). More performant for simple forms without real-time validation.",
      },
    },
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [tweet, setTweet] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [customFormat, setCustomFormat] = React.useState("");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <Input
          label="Tweet"
          placeholder="What's happening?"
          value={tweet}
          onValueChange={setTweet}
          maxLength={280}
          showCharacterCount
          helperText="Share your thoughts with the world"
        />

        <Input
          label="Bio"
          placeholder="Tell us about yourself"
          value={bio}
          onValueChange={setBio}
          maxLength={160}
          showCharacterCount
          description="This will appear on your public profile"
          status={bio.length >= 160 ? "error" : "default"}
          errorMessage={
            bio.length >= 160 ? "Bio has reached maximum length" : undefined
          }
        />

        <Input
          label="Custom Format"
          placeholder="Type something..."
          value={customFormat}
          onValueChange={setCustomFormat}
          maxLength={50}
          showCharacterCount
          characterCountFormatter={(current, max) =>
            `${max! - current} characters remaining`
          }
          helperText="Shows remaining characters instead of used"
        />

        <div
          style={{
            padding: "16px",
            background: "#f3f4f6",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <strong>Character Count Features:</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>Shows current/max by default</li>
            <li>Turns orange at 80% capacity (warning)</li>
            <li>Turns red at 100% (limit reached)</li>
            <li>Custom formatter supported</li>
            <li>Accessible via aria-live regions</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Enable `showCharacterCount` with `maxLength` to display a live character counter. The counter color changes at 80% (orange warning) and 100% (red limit). Customize formatting with `characterCountFormatter`.",
      },
    },
  },
};

export const NumberInput: Story = {
  render: () => {
    const [value, setValue] = React.useState<number>(0);
    const [currency, setCurrency] = React.useState<number>(0);

    // Custom parser that only allows positive integers
    const parsePositiveInteger = (rawValue: string): number => {
      const parsed = parseInt(rawValue, 10);
      return isNaN(parsed) ? 0 : Math.max(0, parsed);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "360px",
        }}
      >
        <Input<number>
          label="Age"
          type="number"
          placeholder="Enter your age"
          value={value}
          onValueChange={setValue}
          helperText={`You are ${value} years old`}
          min={0}
          max={120}
        />

        <Input<number>
          label="Quantity (Positive Only)"
          type="number"
          placeholder="0"
          value={currency}
          onValueChange={setCurrency}
          valueParser={parsePositiveInteger}
          helperText="Custom parser ensures only positive integers"
          prefix={<span style={{ color: "#6b7280" }}>#</span>}
        />

        <div
          style={{
            padding: "12px",
            background: "#f3f4f6",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <strong>Type-safe values:</strong>
          <br />
          Age: {value} (type: {typeof value})
          <br />
          Quantity: {currency} (type: {typeof currency})
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Type-safe number inputs using TypeScript generics (`Input<number>`). The `valueParser` prop enables custom validation and transformation logic.",
      },
    },
  },
};

export const RequiredFields: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      phone: "",
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            isRequired
            value={formData.name}
            onValueChange={(value) => setFormData({ ...formData, name: value })}
            status={errors.name ? "error" : "default"}
            errorMessage={errors.name}
            helperText="First and last name"
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            isRequired
            value={formData.email}
            onValueChange={(value) =>
              setFormData({ ...formData, email: value })
            }
            status={errors.email ? "error" : "default"}
            errorMessage={errors.email}
            prefix={<span>📧</span>}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            required // using native HTML required attribute
            value={formData.phone}
            onValueChange={(value) =>
              setFormData({ ...formData, phone: value })
            }
            status={errors.phone ? "error" : "default"}
            errorMessage={errors.phone}
            description="Include country code"
          />

          <button
            type="submit"
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#3b82f6",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Submit Form
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete form example with validation. Required fields show an asterisk (*) and set `aria-required` for screen readers. Try submitting the empty form to see error states.",
      },
    },
  },
};
