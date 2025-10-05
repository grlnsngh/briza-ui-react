# FormField Usage Examples

This document provides practical examples of using the FormField component with various form controls in the briza-ui-react library.

## Basic Usage

### Simple Input Field

```tsx
import { FormField } from "briza-ui-react";

function MyForm() {
  return (
    <FormField label="Username" isRequired>
      <input type="text" placeholder="Enter username" />
    </FormField>
  );
}
```

### With Description and Helper Text

```tsx
<FormField
  label="API Key"
  description="Found in your account settings"
  helperText="Keep this secret and never share it"
  isRequired
>
  <input type="password" placeholder="sk-..." />
</FormField>
```

## Validation States

### Error State

```tsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const validateEmail = (value: string) => {
  if (!value.includes("@")) {
    setError("Please enter a valid email");
  } else {
    setError("");
  }
};

return (
  <FormField
    label="Email"
    isRequired
    status={error ? "error" : "default"}
    errorMessage={error}
  >
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => validateEmail(email)}
    />
  </FormField>
);
```

### Success State

```tsx
<FormField
  label="Username"
  status="success"
  successMessage="Username is available!"
>
  <input type="text" value="john_doe" readOnly />
</FormField>
```

## Size Variants

```tsx
// Small
<FormField size="sm" label="Small field">
  <input type="text" />
</FormField>

// Medium (default)
<FormField size="md" label="Medium field">
  <input type="text" />
</FormField>

// Large
<FormField size="lg" label="Large field">
  <input type="text" />
</FormField>
```

## Integration with Different Form Controls

### Textarea

```tsx
<FormField
  label="Bio"
  description="Tell us about yourself"
  helperText="Maximum 500 characters"
>
  <textarea rows={4} maxLength={500} placeholder="I am a..." />
</FormField>
```

### Select Dropdown

```tsx
<FormField
  label="Country"
  isRequired
  description="Select your country of residence"
>
  <select>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </select>
</FormField>
```

### Checkbox

```tsx
<FormField
  label="Newsletter subscription"
  description="Stay updated with our latest news"
>
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <input type="checkbox" id="newsletter" />
    <label htmlFor="newsletter">I want to receive the newsletter</label>
  </div>
</FormField>
```

### Radio Group

```tsx
<FormField
  label="Subscription plan"
  description="Choose your preferred plan"
  isRequired
>
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <label>
      <input type="radio" name="plan" value="free" />
      Free - $0/month
    </label>
    <label>
      <input type="radio" name="plan" value="pro" />
      Pro - $9/month
    </label>
    <label>
      <input type="radio" name="plan" value="enterprise" />
      Enterprise - $29/month
    </label>
  </div>
</FormField>
```

## Integration with briza-ui-react Components

### With Input Component

```tsx
import { FormField, Input } from "briza-ui-react";

// Note: Input already has built-in label/error handling,
// but FormField can provide an additional wrapper if needed
<FormField label="Email" description="Your primary email">
  <Input placeholder="you@example.com" />
</FormField>;
```

### With Select Component

```tsx
import { FormField, Select } from "briza-ui-react";

<FormField label="Category" isRequired>
  <Select
    options={[
      { value: "1", label: "Category 1" },
      { value: "2", label: "Category 2" },
    ]}
  />
</FormField>;
```

### With Checkbox Component

```tsx
import { FormField, Checkbox } from "briza-ui-react";

<FormField description="Please review and accept">
  <Checkbox label="I accept the terms and conditions" />
</FormField>;
```

## Complete Form Examples

### Login Form

```tsx
import { FormField } from "briza-ui-react";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log("Login:", { email, password });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          placeholder="you@example.com"
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
          placeholder="Enter password"
        />
      </FormField>

      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Registration Form

```tsx
function RegistrationForm() {
  return (
    <form>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <FormField label="First name" isRequired>
          <input type="text" placeholder="John" />
        </FormField>

        <FormField label="Last name" isRequired>
          <input type="text" placeholder="Doe" />
        </FormField>
      </div>

      <FormField
        label="Email"
        description="We'll send a verification email"
        isRequired
      >
        <input type="email" placeholder="you@example.com" />
      </FormField>

      <FormField
        label="Password"
        helperText="Must include uppercase, lowercase, and number"
        isRequired
      >
        <input type="password" placeholder="Create password" />
      </FormField>

      <FormField label="Company" description="Optional">
        <input type="text" placeholder="Acme Inc." />
      </FormField>

      <FormField label="Terms and conditions" isRequired>
        <div>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
      </FormField>

      <button type="submit">Create Account</button>
    </form>
  );
}
```

### Contact Form

```tsx
function ContactForm() {
  return (
    <form>
      <FormField label="Name" isRequired>
        <input type="text" placeholder="Your name" />
      </FormField>

      <FormField label="Email" isRequired>
        <input type="email" placeholder="your@email.com" />
      </FormField>

      <FormField
        label="Subject"
        description="What is this regarding?"
        isRequired
      >
        <select>
          <option value="">Select a subject</option>
          <option value="support">Technical Support</option>
          <option value="sales">Sales Inquiry</option>
          <option value="feedback">Feedback</option>
        </select>
      </FormField>

      <FormField
        label="Message"
        helperText="Maximum 1000 characters"
        isRequired
      >
        <textarea rows={6} maxLength={1000} placeholder="Your message..." />
      </FormField>

      <button type="submit">Send Message</button>
    </form>
  );
}
```

## Advanced Usage

### Custom ID Management

```tsx
<FormField id="custom-field-id" label="Custom ID Field">
  <input type="text" />
</FormField>
```

### ARIA IDs Callback

```tsx
<FormField
  label="Advanced Field"
  onAriaIdsChange={(ids) => {
    console.log("Field ID:", ids.fieldId);
    console.log("Label ID:", ids.labelId);
    console.log("Description ID:", ids.descriptionId);
    // Use these IDs for custom ARIA management
  }}
>
  <input type="text" />
</FormField>
```

### Custom Styling

```tsx
<FormField
  label="Styled Field"
  wrapperClassName="my-custom-wrapper"
  contentClassName="my-custom-content"
>
  <input type="text" />
</FormField>
```

### Disabled State

```tsx
<FormField
  label="Disabled Field"
  description="This field is currently disabled"
  disabled
>
  <input type="text" disabled />
</FormField>
```

## Best Practices

1. **Always provide a label** for accessibility
2. **Use isRequired** instead of just the asterisk for proper ARIA
3. **Provide helpful error messages** that guide the user
4. **Use description** for additional context that doesn't fit in the label
5. **Use helperText** for format hints or requirements
6. **Match status with errorMessage/successMessage** for consistency
7. **Keep labels concise** - use description for longer explanations
8. **Use appropriate size** based on the importance and context

## Accessibility Tips

- FormField automatically handles ARIA associations
- Error messages are announced as alerts to screen readers
- Success messages are announced as status updates
- All form controls are properly labeled
- Required fields are marked with aria-required
- Invalid fields are marked with aria-invalid
- Descriptions are linked via aria-describedby

## Common Patterns

### Inline Validation

```tsx
const [value, setValue] = useState("");
const [status, setStatus] = useState<"default" | "error" | "success">(
  "default"
);
const [message, setMessage] = useState("");

const validate = (val: string) => {
  if (!val) {
    setStatus("error");
    setMessage("This field is required");
  } else if (val.length < 3) {
    setStatus("error");
    setMessage("Must be at least 3 characters");
  } else {
    setStatus("success");
    setMessage("Looks good!");
  }
};

return (
  <FormField
    label="Username"
    status={status}
    errorMessage={status === "error" ? message : undefined}
    successMessage={status === "success" ? message : undefined}
  >
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => validate(value)}
    />
  </FormField>
);
```

### Conditional Fields

```tsx
const [showAdvanced, setShowAdvanced] = useState(false);

return (
  <>
    <FormField label="Basic field">
      <input type="text" />
    </FormField>

    <button onClick={() => setShowAdvanced(!showAdvanced)}>
      {showAdvanced ? "Hide" : "Show"} Advanced Options
    </button>

    {showAdvanced && (
      <FormField
        label="Advanced field"
        description="This field has additional options"
      >
        <input type="text" />
      </FormField>
    )}
  </>
);
```

## Migration from Built-in Form Components

If you're using the built-in label/error handling of Input, Checkbox, etc., you can:

1. **Keep using the built-in features** - they work great!
2. **Use FormField as an additional wrapper** for extra context
3. **Avoid duplicating label/error props** - use one or the other

```tsx
// Option 1: Use Input's built-in features
<Input
  label="Email"
  errorMessage="Invalid email"
  helperText="Use your work email"
/>

// Option 2: Use FormField wrapper
<FormField
  label="Email"
  description="Additional context"
>
  <Input placeholder="you@example.com" />
</FormField>

// Option 3: Combine both (careful not to duplicate)
<FormField description="Extra context from FormField">
  <Input
    label="Email"
    errorMessage="Error from Input"
  />
</FormField>
```
