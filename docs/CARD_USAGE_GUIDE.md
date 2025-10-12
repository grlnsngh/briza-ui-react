# Card Component Usage Guide

## Overview

The Card component is a flexible container with support for headers, body content, footers, images, and various interactive states.

## Basic Usage

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "briza-ui-react";

function MyCard() {
  return (
    <Card variant="shadow">
      <CardHeader>
        <h3>Card Title</h3>
      </CardHeader>
      <CardBody>
        <p>Card content goes here</p>
      </CardBody>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

## Interactive States

### isHoverable vs isPressable

These are two different interaction patterns for different use cases:

#### `isHoverable` - Hover Effect

- **Visual**: Card lifts slightly and shadow enhances on hover
- **Use for**:
  - Cards that navigate to detail pages
  - Cards that reveal more information
  - Content that expands on interaction
- **Example**:
  ```tsx
  <Card isHoverable onClick={() => navigate("/details")}>
    <CardBody>Click to view details</CardBody>
  </Card>
  ```

#### `isPressable` - Press Effect

- **Visual**: Card scales down slightly when clicked (button-like)
- **Use for**:
  - Selectable cards (e.g., choosing options)
  - Cards that perform an immediate action
  - Button-like interactions
- **Example**:
  ```tsx
  <Card isPressable onClick={() => selectOption(id)}>
    <CardBody>Select this option</CardBody>
  </Card>
  ```

### When to Use Each

| Use Case            | Recommended State |
| ------------------- | ----------------- |
| Navigate to details | `isHoverable`     |
| Select from options | `isPressable`     |
| Open modal/dialog   | `isHoverable`     |
| Toggle selection    | `isPressable`     |
| Show more info      | `isHoverable`     |
| Submit action       | `isPressable`     |

## Loading State with Skeleton

Use the Skeleton component to show loading placeholders for individual elements within cards. This provides a better user experience than full-card overlays.

### Why Skeleton Pattern?

1. **Element-Level Control**: Show loading state for specific elements (title, image, text)
2. **Better Layout Stability**: Maintains exact layout during loading
3. **Progressive Loading**: Can load different elements at different times
4. **Modern UX Pattern**: Used by Facebook, LinkedIn, Medium, and other modern apps

### Basic Usage

```tsx
import { Card, CardHeader, CardBody, Skeleton } from "briza-ui-react";

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
    </Card>
  );
}
```

### Conditional Loading

Show Skeleton when loading, real content when loaded:

```tsx
function ProductCard({ isLoading, product }) {
  return (
    <Card variant="shadow">
      <CardHeader>
        {isLoading ? (
          <Skeleton variant="text" width="60%" height={24} />
        ) : (
          <h3>{product.title}</h3>
        )}
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              style={{ marginBottom: "1rem" }}
            />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </>
        ) : (
          <>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
          </>
        )}
      </CardBody>
    </Card>
  );
}
```

### Skeleton Variants

- **text**: For text content (includes scale transform for emphasis)
- **circular**: For avatars and circular images (border-radius: 50%)
- **rectangular**: For images and rectangular content

### The Shimmer Effect

- **Light Theme**: White shimmer with 60% opacity sweep
- **Dark Theme**: White shimmer with 10% opacity sweep
- **Animation**: 1.5s infinite loop, translating from left to right
- **Accessibility**: Respects `prefers-reduced-motion` setting
- **Customizable**: Use `animation={false}` to disable

## Variants

```tsx
<Card variant="default">   {/* Basic border */}
<Card variant="bordered">  {/* Thicker border */}
<Card variant="shadow">    {/* Subtle shadow */}
<Card variant="elevated">  {/* Prominent elevation */}
```

## Sizes

```tsx
<Card size="sm">  {/* Compact padding */}
<Card size="md">  {/* Standard padding (default) */}
<Card size="lg">  {/* Generous padding */}
```

## With Images

```tsx
<Card>
  <CardImage
    src="image.jpg"
    alt="Description"
    objectFit="cover" // or "contain" or "fill"
  />
  <CardBody>Content below image</CardBody>
</Card>
```

## Common Patterns

### Product Card

```tsx
<Card variant="shadow" isHoverable>
  <CardImage src={product.image} alt={product.name} />
  <CardHeader>
    <h3>{product.name}</h3>
    <span>${product.price}</span>
  </CardHeader>
  <CardBody>
    <p>{product.description}</p>
  </CardBody>
  <CardFooter>
    <Button variant="light">Add to Wishlist</Button>
    <Button color="primary">Add to Cart</Button>
  </CardFooter>
</Card>
```

### Selection Card

```tsx
<Card variant="bordered" isPressable onClick={() => setSelected(id)}>
  <CardBody>
    <h4>{option.title}</h4>
    <p>{option.description}</p>
  </CardBody>
</Card>
```

### User Profile Card

```tsx
<Card variant="elevated">
  <CardImage src={user.avatar} alt={user.name} />
  <CardHeader>
    <div>
      <h3>{user.name}</h3>
      <p>{user.role}</p>
    </div>
  </CardHeader>
  <CardBody>
    <div>
      <div>
        <strong>234</strong> Posts
      </div>
      <div>
        <strong>2.5K</strong> Followers
      </div>
    </div>
  </CardBody>
  <CardFooter>
    <Button variant="bordered">Message</Button>
    <Button color="primary">Follow</Button>
  </CardFooter>
</Card>
```

## Accessibility

The Card component includes:

- Proper ARIA attributes when interactive
- Keyboard navigation support (Enter/Space keys)
- Focus management
- Reduced motion support for animations
- Proper color contrast in both themes

## Theme Support

All Card styles automatically adapt to light and dark themes:

- Border colors adjust for proper contrast
- Shadow colors change based on theme
- Background colors maintain readability

When using Skeleton components, the shimmer animation also adapts to the theme automatically.
