# Skeleton Component Usage Guide

## Overview

The Skeleton component provides shimmer loading placeholders for content that is being loaded. Use it to show element-level loading states instead of full-component overlays.

## Installation

```tsx
import { Skeleton } from "briza-ui-react";
```

## Basic Usage

```tsx
function LoadingExample() {
  return (
    <div>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="80%" height={16} />
    </div>
  );
}
```

## Variants

### Text Skeleton

For text content like headings, paragraphs, and labels.

```tsx
// Page title
<Skeleton variant="text" width="40%" height={32} />

// Paragraph line
<Skeleton variant="text" width="100%" height={16} />

// Short label
<Skeleton variant="text" width="80px" height={14} />
```

**Visual**: Includes a subtle scale transform (scaleY: 0.6) for text-like appearance.

### Circular Skeleton

For avatars, profile pictures, and circular images.

```tsx
// User avatar
<Skeleton variant="circular" width={40} height={40} />

// Large profile picture
<Skeleton variant="circular" width={120} height={120} />

// Small icon
<Skeleton variant="circular" width={24} height={24} />
```

**Visual**: Perfect circle with border-radius: 50%.

### Rectangular Skeleton

For images, videos, and rectangular content blocks.

```tsx
// Banner image
<Skeleton variant="rectangular" width="100%" height={200} />

// Thumbnail
<Skeleton variant="rectangular" width={150} height={100} />

// Video player
<Skeleton variant="rectangular" width="100%" height={400} />
```

**Visual**: Rounded corners for modern appearance.

## Props

| Prop        | Type                                        | Default  | Description                        |
| ----------- | ------------------------------------------- | -------- | ---------------------------------- |
| `variant`   | `"text"` \| `"circular"` \| `"rectangular"` | `"text"` | Type of skeleton to display        |
| `width`     | `string` \| `number`                        | -        | Width (e.g., "100%", 200, "50px")  |
| `height`    | `string` \| `number`                        | -        | Height (e.g., "100%", 200, "50px") |
| `animation` | `boolean`                                   | `true`   | Whether to show shimmer animation  |
| `className` | `string`                                    | -        | Additional CSS class               |
| `style`     | `React.CSSProperties`                       | -        | Inline styles                      |

## Dimensions

Numbers are converted to pixels automatically:

```tsx
// These are equivalent:
<Skeleton width={200} height={100} />
<Skeleton width="200px" height="100px" />

// Percentages work too:
<Skeleton width="100%" height={50} />

// Mix and match:
<Skeleton width="50%" height={200} />
```

## Animation Control

Disable animation for testing or performance:

```tsx
<Skeleton animation={false} variant="text" width="100%" />
```

## Common Patterns

### Product Card Loading

```tsx
function ProductCardLoading() {
  return (
    <Card variant="shadow">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <CardHeader>
        <Skeleton variant="text" width="70%" height={24} />
      </CardHeader>
      <CardBody>
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton variant="text" width="60%" height={16} />
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={80} height={24} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </div>
      </CardBody>
    </Card>
  );
}
```

### User Profile Loading

```tsx
function UserProfileLoading() {
  return (
    <Card variant="elevated">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Skeleton variant="circular" width={60} height={60} />
        <div style={{ flex: 1 }}>
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton variant="text" width="30%" height={14} />
        </div>
      </div>
    </Card>
  );
}
```

### Blog Post Loading

```tsx
function BlogPostLoading() {
  return (
    <div>
      {/* Header */}
      <Skeleton
        variant="text"
        width="80%"
        height={36}
        style={{ marginBottom: "1rem" }}
      />

      {/* Author info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={120} height={14} />
      </div>

      {/* Featured image */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={400}
        style={{ marginBottom: "1.5rem" }}
      />

      {/* Content paragraphs */}
      <Skeleton
        variant="text"
        width="100%"
        height={16}
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={16}
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={16}
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton
        variant="text"
        width="90%"
        height={16}
        style={{ marginBottom: "1.5rem" }}
      />

      <Skeleton
        variant="text"
        width="100%"
        height={16}
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={16}
        style={{ marginBottom: "0.5rem" }}
      />
      <Skeleton variant="text" width="85%" height={16} />
    </div>
  );
}
```

### List Loading

```tsx
function ListLoading({ count = 5 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Skeleton variant="circular" width={48} height={48} />
          <div style={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="60%"
              height={18}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Grid Loading

```tsx
function GridLoading() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} variant="shadow">
          <Skeleton variant="rectangular" width="100%" height={180} />
          <CardBody>
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={14}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton variant="text" width="60%" height={14} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
```

## Conditional Rendering

Show skeleton when loading, real content when loaded:

```tsx
function DataDisplay({ isLoading, data }) {
  if (isLoading) {
    return (
      <div>
        <Skeleton
          variant="text"
          width="40%"
          height={28}
          style={{ marginBottom: "1rem" }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton variant="text" width="80%" height={16} />
      </div>
    );
  }

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
}
```

## Using with Cards

The Skeleton component is designed to work seamlessly with Card components:

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "briza-ui-react";

function LoadingCard() {
  return (
    <Card variant="shadow">
      <CardHeader>
        <Skeleton variant="text" width="60%" height={24} />
      </CardHeader>
      <CardBody>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          style={{ marginBottom: "1rem" }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton variant="text" width="70%" height={16} />
      </CardBody>
      <CardFooter>
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </CardFooter>
    </Card>
  );
}
```

## Accessibility

The Skeleton component includes built-in accessibility features:

- `role="status"` - Indicates a loading region
- `aria-busy="true"` - Marks content as busy/loading
- `aria-live="polite"` - Announces to screen readers (politely)
- `aria-label="Loading..."` - Provides context to screen readers

### Reduced Motion Support

Respects `prefers-reduced-motion` user preference:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animation is toned down automatically */
}
```

You can also disable animation manually:

```tsx
<Skeleton animation={false} variant="text" width="100%" />
```

## Theme Support

Skeleton automatically adapts to light and dark themes:

- **Light Theme**: Gray background with white shimmer (60% opacity)
- **Dark Theme**: Dark gray background with white shimmer (10% opacity)
- **Animation**: Smooth 1.5s shimmer sweep from left to right

## Styling

### Custom Styles

```tsx
<Skeleton
  variant="rectangular"
  width="100%"
  height={200}
  style={{
    borderRadius: "16px",
    marginBottom: "2rem",
  }}
/>
```

### Custom Class

```tsx
<Skeleton variant="text" className="my-custom-skeleton" width="100%" />
```

## Best Practices

1. **Match Layout**: Skeleton dimensions should match the actual content dimensions
2. **Respect Hierarchy**: Use appropriate heights for headings vs body text
3. **Show Structure**: Use multiple skeletons to show content structure
4. **Progressive Loading**: Load critical content first, use skeleton for less critical
5. **Consistent Spacing**: Maintain the same spacing as loaded content
6. **Avoid Full-Page**: Use skeleton for individual sections, not entire pages
7. **Limit Count**: Don't show too many skeleton items (5-10 max for lists)

## Performance Considerations

- Skeleton components are lightweight (pure CSS animation)
- No JavaScript animation overhead
- GPU-accelerated transforms
- Respects `prefers-reduced-motion` for accessibility
- Can disable animation for testing/performance

## Examples in Storybook

Check out the Skeleton stories for interactive examples:

- Basic variants (text, circular, rectangular)
- Loading card examples
- Product card loading
- User profile loading
- Blog post loading
- List and grid loading
- Custom styling examples

## Migration from Card `isLoading`

If you previously used `isLoading` on Card:

**Before:**

```tsx
<Card isLoading>
  <CardBody>Content</CardBody>
</Card>
```

**After:**

```tsx
{
  isLoading ? (
    <Card variant="shadow">
      <CardBody>
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
      </CardBody>
    </Card>
  ) : (
    <Card variant="shadow">
      <CardBody>Content</CardBody>
    </Card>
  );
}
```

Or with conditional rendering inside:

```tsx
<Card variant="shadow">
  <CardBody>
    {isLoading ? (
      <>
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
      </>
    ) : (
      <p>Content</p>
    )}
  </CardBody>
</Card>
```

**Benefits:**

- Element-level control
- Progressive loading support
- Better layout preservation
- More flexible composition
