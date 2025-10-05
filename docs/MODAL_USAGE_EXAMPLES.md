# Modal Component - Usage Examples

This document provides practical examples for using the Modal component in real-world scenarios.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Size Variants](#size-variants)
3. [Placement Options](#placement-options)
4. [Header and Footer](#header-and-footer)
5. [Behavior Customization](#behavior-customization)
6. [Forms in Modals](#forms-in-modals)
7. [Confirmation Dialogs](#confirmation-dialogs)
8. [Advanced Patterns](#advanced-patterns)
9. [Accessibility Examples](#accessibility-examples)
10. [Common Patterns](#common-patterns)

---

## Basic Usage

### Simple Modal

```tsx
import { useState } from "react";
import { Modal } from "briza-ui-react";

function SimpleExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is a simple modal with just content.</p>
        <p>Press ESC or click outside to close.</p>
      </Modal>
    </>
  );
}
```

### With Header

```tsx
<Modal isOpen={isOpen} onClose={handleClose} header="Modal Title">
  <p>Modal content goes here.</p>
</Modal>
```

### With Header and Footer

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header="Confirm Action"
  footer={
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button onClick={handleClose} variant="outline">
        Cancel
      </Button>
      <Button onClick={handleConfirm} color="primary">
        Confirm
      </Button>
    </div>
  }
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

---

## Size Variants

### Small Modal (400px)

```tsx
<Modal isOpen={isOpen} onClose={handleClose} size="sm" header="Small Dialog">
  <p>Perfect for simple confirmations or alerts.</p>
</Modal>
```

### Medium Modal (600px) - Default

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="md" // or omit for default
  header="Standard Modal"
>
  <p>Good for most use cases like forms and content display.</p>
</Modal>
```

### Large Modal (800px)

```tsx
<Modal isOpen={isOpen} onClose={handleClose} size="lg" header="Large Content">
  <p>Suitable for detailed forms or rich content.</p>
</Modal>
```

### Extra Large Modal (1000px)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="xl"
  header="Extra Large Modal"
>
  <p>Great for complex interfaces or data tables.</p>
</Modal>
```

### Fullscreen Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="full"
  header="Fullscreen Experience"
>
  <p>Takes up almost the entire viewport.</p>
</Modal>
```

---

## Placement Options

### Center Placement (Default)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  placement="center" // or omit for default
>
  <p>Centered vertically and horizontally.</p>
</Modal>
```

### Top Placement

```tsx
<Modal isOpen={isOpen} onClose={handleClose} placement="top">
  <p>Aligned to the top of the viewport.</p>
</Modal>
```

---

## Header and Footer

### Custom Header with Icon

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header={
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <SuccessIcon />
      <span>Success!</span>
    </div>
  }
>
  <p>Your action was completed successfully.</p>
</Modal>
```

### Rich Footer with Multiple Actions

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header="Document Actions"
  footer={
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Button onClick={handleDelete} color="danger">
        Delete
      </Button>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button onClick={handleClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </div>
    </div>
  }
>
  <p>Edit your document here.</p>
</Modal>
```

### Without Close Button

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header="Custom Header"
  showCloseButton={false}
  footer={<Button onClick={handleClose}>Got it</Button>}
>
  <p>Modal without the X button in header.</p>
</Modal>
```

---

## Behavior Customization

### Prevent Backdrop Close

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  closeOnBackdropClick={false}
  header="Important Form"
>
  <p>User must use buttons to close.</p>
</Modal>
```

### Prevent ESC Close

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  closeOnEsc={false}
  header="Critical Action"
>
  <p>ESC key won't close this modal.</p>
</Modal>
```

### No Auto Close (Force Button Click)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  closeOnBackdropClick={false}
  closeOnEsc={false}
  showCloseButton={false}
  header="Confirm Payment"
  footer={
    <div>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handlePay} color="primary">
        Pay Now
      </Button>
    </div>
  }
>
  <p>You must click a button to continue.</p>
</Modal>
```

### Disable Scroll Lock

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  lockScroll={false}
  header="Background Scrollable"
>
  <p>Background can still scroll.</p>
</Modal>
```

### Disable Focus Trap

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  trapFocus={false}
  header="Free Focus"
>
  <p>Focus not trapped inside modal.</p>
</Modal>
```

### Disable Animations

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  disableAnimation={true}
  header="Instant Modal"
>
  <p>No fade/slide animations.</p>
</Modal>
```

---

## Forms in Modals

### Login Form

```tsx
function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Sign In"
      footer={
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" form="login-form" color="primary">
            Sign In
          </Button>
        </div>
      }
    >
      <form id="login-form" onSubmit={handleSubmit}>
        <FormField label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </FormField>
      </form>
    </Modal>
  );
}
```

### Multi-Step Form

```tsx
function MultiStepModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={`Step ${step} of 3`}
      closeOnBackdropClick={false}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button onClick={() => setStep(step - 1)} disabled={step === 1}>
            Previous
          </Button>
          <Button
            onClick={() => (step === 3 ? handleSubmit() : setStep(step + 1))}
            color="primary"
          >
            {step === 3 ? "Submit" : "Next"}
          </Button>
        </div>
      }
    >
      {step === 1 && <StepOne data={formData} onChange={setFormData} />}
      {step === 2 && <StepTwo data={formData} onChange={setFormData} />}
      {step === 3 && <StepThree data={formData} onChange={setFormData} />}
    </Modal>
  );
}
```

### Form with Validation

```tsx
function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Contact Us"
      footer={
        <Button type="submit" form="contact-form" color="primary">
          Send Message
        </Button>
      }
    >
      <form id="contact-form" onSubmit={handleSubmit}>
        <FormField
          label="Name"
          required
          status={errors.name ? "error" : undefined}
          errorMessage={errors.name}
        >
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormField>

        <FormField
          label="Email"
          required
          status={errors.email ? "error" : undefined}
          errorMessage={errors.email}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormField>

        <FormField
          label="Message"
          required
          status={errors.message ? "error" : undefined}
          errorMessage={errors.message}
        >
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={4}
          />
        </FormField>
      </form>
    </Modal>
  );
}
```

---

## Confirmation Dialogs

### Delete Confirmation

```tsx
function DeleteConfirmation({ isOpen, onClose, itemName, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      header="Delete Confirmation"
      footer={
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="danger">
            Delete
          </Button>
        </div>
      }
    >
      <p>Are you sure you want to delete "{itemName}"?</p>
      <p style={{ color: "red", fontWeight: 600 }}>
        This action cannot be undone.
      </p>
    </Modal>
  );
}
```

### Destructive Action Warning

```tsx
function DestructiveWarning({ isOpen, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const isValid = confirmText === "DELETE";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      header="⚠️ Warning"
      closeOnBackdropClick={false}
      footer={
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} color="danger" disabled={!isValid}>
            Confirm Delete
          </Button>
        </div>
      }
    >
      <p>This will permanently delete all data.</p>
      <p>
        Type <strong>DELETE</strong> to confirm:
      </p>
      <Input
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        placeholder="Type DELETE"
      />
    </Modal>
  );
}
```

### Success Notification

```tsx
function SuccessNotification({ isOpen, onClose, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      header={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "green",
          }}
        >
          <CheckCircleIcon />
          <span>Success!</span>
        </div>
      }
      footer={
        <Button onClick={onClose} color="success">
          OK
        </Button>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
```

---

## Advanced Patterns

### Modal with Scrollable Content

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header="Terms and Conditions"
  footer={
    <Button onClick={handleAccept} color="primary">
      I Agree
    </Button>
  }
>
  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
    {/* Long content here */}
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i}>Paragraph {i + 1}...</p>
    ))}
  </div>
</Modal>
```

### Nested Modals

```tsx
function NestedModalExample() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setFirstOpen(true)}>Open First Modal</Button>

      <Modal
        isOpen={firstOpen}
        onClose={() => setFirstOpen(false)}
        header="First Modal"
        footer={
          <Button onClick={() => setSecondOpen(true)} color="primary">
            Open Second Modal
          </Button>
        }
      >
        <p>This is the first modal.</p>
      </Modal>

      <Modal
        isOpen={secondOpen}
        onClose={() => setSecondOpen(false)}
        size="sm"
        header="Second Modal"
      >
        <p>This is a nested modal!</p>
      </Modal>
    </>
  );
}
```

### Modal with Tabs

```tsx
function TabbedModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" header="User Settings">
      <div>
        <div style={{ borderBottom: "1px solid #ddd", marginBottom: "1rem" }}>
          <button onClick={() => setActiveTab("profile")}>Profile</button>
          <button onClick={() => setActiveTab("account")}>Account</button>
          <button onClick={() => setActiveTab("notifications")}>
            Notifications
          </button>
        </div>

        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </Modal>
  );
}
```

### Modal with Loading State

```tsx
function DataModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchData().then((result) => {
        setData(result);
        setLoading(false);
      });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Data Viewer">
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {/* Display data */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Modal>
  );
}
```

### Image Lightbox

```tsx
function ImageLightbox({ isOpen, onClose, imageUrl, alt }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" showCloseButton={true}>
      <div style={{ textAlign: "center" }}>
        <img
          src={imageUrl}
          alt={alt}
          style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }}
        />
      </div>
    </Modal>
  );
}
```

---

## Accessibility Examples

### Screen Reader Optimized

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header="Accessible Modal"
  ariaLabel="Important notification"
  ariaDescribedBy="modal-description"
>
  <div id="modal-description">
    <p>This description will be announced by screen readers.</p>
  </div>
</Modal>
```

### Custom ARIA Labels

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  ariaLabel="Shopping cart summary"
  ariaLabelledBy="cart-title"
  ariaDescribedBy="cart-items"
>
  <h2 id="cart-title">Your Cart</h2>
  <div id="cart-items">
    <p>3 items in your cart</p>
  </div>
</Modal>
```

### Focus Management Example

```tsx
function FocusExample() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <>
      <button ref={triggerRef} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header="Focus Example"
      >
        <p>When this modal closes, focus returns to the trigger button.</p>
        <Input placeholder="First focusable element gets focus" />
      </Modal>
    </>
  );
}
```

---

## Common Patterns

### Alert Dialog

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="sm"
  header="Alert"
  closeOnBackdropClick={false}
  footer={
    <Button onClick={handleClose} color="primary">
      OK
    </Button>
  }
>
  <p>Your session will expire in 5 minutes.</p>
</Modal>
```

### Cookie Consent

```tsx
<Modal
  isOpen={showCookieConsent}
  onClose={() => {}}
  size="md"
  placement="bottom"
  closeOnBackdropClick={false}
  closeOnEsc={false}
  showCloseButton={false}
  header="Cookie Consent"
  footer={
    <div>
      <Button onClick={handleReject}>Reject</Button>
      <Button onClick={handleAccept} color="primary">
        Accept
      </Button>
    </div>
  }
>
  <p>We use cookies to improve your experience.</p>
</Modal>
```

### Share Dialog

```tsx
<Modal isOpen={isOpen} onClose={handleClose} size="sm" header="Share">
  <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
    <button onClick={() => shareOn("facebook")}>
      <FacebookIcon /> Facebook
    </button>
    <button onClick={() => shareOn("twitter")}>
      <TwitterIcon /> Twitter
    </button>
    <button onClick={() => shareOn("linkedin")}>
      <LinkedInIcon /> LinkedIn
    </button>
  </div>
</Modal>
```

### Feedback Form

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  header="Send Feedback"
  footer={
    <Button type="submit" form="feedback-form" color="primary">
      Submit
    </Button>
  }
>
  <form id="feedback-form" onSubmit={handleSubmit}>
    <FormField label="How was your experience?">
      <Select>
        <option>Great</option>
        <option>Good</option>
        <option>Okay</option>
        <option>Poor</option>
      </Select>
    </FormField>

    <FormField label="Comments">
      <textarea rows={4} placeholder="Tell us more..." />
    </FormField>
  </form>
</Modal>
```

---

## Tips and Best Practices

### DO's ✅

- ✅ Always provide a way to close the modal
- ✅ Use appropriate size for your content
- ✅ Include descriptive header text
- ✅ Keep modal content focused and concise
- ✅ Use footer for primary actions
- ✅ Test keyboard navigation
- ✅ Provide clear labels for screen readers

### DON'Ts ❌

- ❌ Don't nest more than 2 modals
- ❌ Don't use modals for non-critical information
- ❌ Don't make modals too large
- ❌ Don't disable all close methods
- ❌ Don't use modals for long-form content
- ❌ Don't forget focus management
- ❌ Don't skip accessibility testing

---

## Troubleshooting

### Modal not closing on backdrop click

```tsx
// Check closeOnBackdropClick prop
<Modal closeOnBackdropClick={true} {...props} />
```

### Focus not trapped

```tsx
// Ensure trapFocus is enabled
<Modal trapFocus={true} {...props} />
```

### Scroll not locked

```tsx
// Check lockScroll prop
<Modal lockScroll={true} {...props} />
```

### Animation not working

```tsx
// Ensure disableAnimation is false
<Modal disableAnimation={false} {...props} />
```

---

## Additional Resources

- [Modal API Documentation](./MODAL_IMPLEMENTATION.md)
- [Storybook Examples](http://localhost:6006/?path=/docs/components-modal--docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
