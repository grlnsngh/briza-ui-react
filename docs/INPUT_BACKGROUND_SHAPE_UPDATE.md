# Input Component - Background & Shape Enhancement

## Overview

Enhanced the Input component with subtle background colors for better visual hierarchy and added a flexible `shape` prop for different corner styles.

## Changes Made

### 1. Background Colors 🎨

#### Light Theme

- Added subtle gray background using `color-mix(in srgb, var(--color-default-100) 50%, var(--color-background))`
- Creates visual separation from white page background
- Transitions to pure white background on hover for better interaction feedback

#### Dark Theme

- Uses darker background: `color-mix(in srgb, var(--color-default-800) 60%, var(--color-background))`
- Maintains proper contrast with dark page backgrounds
- Ensures readability and visual hierarchy in dark mode

### 2. Shape Prop 🔲

Added new `shape` prop with two variants:

```typescript
export type InputShape = "rounded" | "square";
```

#### Rounded (Default)

- Modern, friendly appearance
- Uses `border-radius: var(--radius-md)` from design tokens
- Smooth, approachable aesthetic

#### Square

- Clean, technical look
- Uses `border-radius: 0` for sharp corners
- Precise, professional aesthetic

## API Changes

### New Type Export

```typescript
export type InputShape = "rounded" | "square";
```

### Updated InputProps Interface

````typescript
interface InputProps {
  // ... existing props
  /**
   * Shape of the input control
   * @default "rounded"
   * @example
   * ```tsx
   * <Input shape="rounded" label="Rounded corners" />
   * <Input shape="square" label="Sharp corners" />
   * ```
   */
  shape?: InputShape;
}
````

## Usage Examples

### Basic Usage

```tsx
// Default rounded shape with background
<Input label="Email" placeholder="you@example.com" />

// Square shape variant
<Input label="API Key" placeholder="Enter key" shape="square" />
```

### With Other Props

```tsx
<Input
  label="Password"
  type="password"
  shape="square"
  size="lg"
  status="success"
  successMessage="Strong password"
/>
```

## CSS Implementation

### Shape Classes

```css
.control--rounded {
  border-radius: var(--radius-md);
}

.control--square {
  border-radius: 0;
}
```

### Background Colors

```css
/* Light theme */
.control {
  background-color: color-mix(
    in srgb,
    var(--color-default-100) 50%,
    var(--color-background)
  );
}

.control:hover:not(.control--disabled) {
  background-color: var(--color-background);
}

/* Dark theme */
[data-theme="dark"] .control {
  background-color: color-mix(
    in srgb,
    var(--color-default-800) 60%,
    var(--color-background)
  );
}

[data-theme="dark"] .control:focus-within {
  background-color: var(--color-background);
}
```

## Storybook Updates

Added new `Shapes` story to showcase both variants:

```tsx
export const Shapes: Story = {
  render: () => (
    <div>
      <Input
        shape="rounded"
        label="Rounded (Default)"
        placeholder="Modern rounded corners"
      />
      <Input
        shape="square"
        label="Square"
        placeholder="Sharp, precise corners"
      />
    </div>
  ),
};
```

## Test Coverage

Added 2 new tests (15 total tests, all passing ✅):

1. **Default rounded shape**: Verifies rounded is applied by default
2. **Square shape prop**: Verifies square shape when explicitly set

```typescript
it("applies rounded shape by default", () => {
  const { container } = render(<Input label="Username" />);
  const control = container.querySelector('[class*="control"]');
  expect(control?.className).toContain("control--rounded");
});

it("applies square shape when specified", () => {
  const { container } = render(<Input label="Username" shape="square" />);
  const control = container.querySelector('[class*="control"]');
  expect(control?.className).toContain("control--square");
});
```

## Design Decisions

### Why Subtle Background?

- **Visual Hierarchy**: Distinguishes input fields from page background
- **Better UX**: Clearer affordance that the area is interactive
- **Modern Standard**: Follows patterns from Material Design, Chakra UI, Ant Design
- **Theme-Aware**: Uses design tokens for consistent theming

### Why Default to Rounded?

- **Modern Aesthetic**: Rounded corners are the current design standard
- **Friendly Appearance**: Softer, more approachable
- **Industry Standard**: Used by most modern UI libraries
- **Accessibility**: Easier to visually distinguish as an interactive element

### Why Add Square Option?

- **Flexibility**: Different brands have different design languages
- **Technical Contexts**: Some applications (dev tools, admin panels) prefer sharp edges
- **Design System Completeness**: Provides options without being overwhelming

## Browser Compatibility

- ✅ CSS `color-mix()` function supported in all modern browsers
- ✅ CSS custom properties widely supported
- ✅ No JavaScript required for theming

## Accessibility

- ✅ Shape is purely visual, doesn't affect screen readers
- ✅ Background colors maintain WCAG 2.1 AA contrast ratios
- ✅ All ARIA attributes remain unchanged
- ✅ Focus states clearly visible on both backgrounds

## Migration Guide

### No Breaking Changes

The `shape` prop is optional and defaults to `"rounded"`, which maintains the current visual appearance with the updated border-radius value.

### If You Want Square Inputs

Simply add `shape="square"` to your Input components:

```tsx
// Before
<Input label="Username" />

// After (for square shape)
<Input label="Username" shape="square" />
```

### Background Colors

Background colors are automatically applied and theme-aware. No code changes needed.

## Related Files

- `src/components/Input/Input.tsx` - Component logic and props
- `src/components/Input/input.module.css` - Styling and CSS classes
- `src/components/Input/Input.stories.tsx` - Storybook stories
- `src/components/Input/Input.test.tsx` - Test suite
- `src/components/Input/index.ts` - Public exports

## Future Enhancements

Potential additions based on this foundation:

- `shape="pill"` variant (fully rounded ends)
- Custom border-radius via CSS variable override
- Per-corner radius control for advanced designs
