# Briza UI React

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://grlnsngh.github.io/briza-ui-react/)
[![npm](https://img.shields.io/npm/v/briza-ui-react.svg)](https://www.npmjs.com/package/briza-ui-react)

A modern, lightweight React UI component library built with TypeScript and Vite. Features a comprehensive design system with theme support, accessible components, and extensive customization options.

## Installation

```bash
npm install briza-ui-react
```

## Quick Start

```tsx
import { ThemeProvider, Button } from "briza-ui-react";

function App() {
  return (
    <ThemeProvider>
      <Button color="primary">Primary Button</Button>
      <Button color="secondary" variant="faded">
        Faded Button
      </Button>
    </ThemeProvider>
  );
}
```

## Theme System

Briza UI includes a comprehensive theme system with support for light/dark modes, system preference detection, and custom themes.

### ThemeProvider

Wrap your application with `ThemeProvider` to enable theme support:

```tsx
import { ThemeProvider, useTheme } from "briza-ui-react";

function App() {
  return (
    <ThemeProvider
      defaultMode="system" // "light" | "dark" | "system"
      enablePersistence={true} // Save theme preference
      enableCSSVariables={true} // Inject CSS variables
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### useTheme Hook

Use the `useTheme` hook to access and control the theme:

```tsx
function ThemeToggle() {
  const { mode, setMode, toggleMode, isDark } = useTheme();

  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
      <button onClick={() => setMode("system")}>Use System Preference</button>
    </div>
  );
}
```

### Design Tokens

Access design tokens directly for custom styling:

```tsx
import { colors, spacing, typography, radius } from "briza-ui-react";

const customStyles = {
  backgroundColor: colors.primary.DEFAULT,
  color: colors.primary.foreground,
  padding: `${spacing[2]} ${spacing[4]}`,
  borderRadius: radius.md,
  fontSize: typography.fontSize.base,
};
```

## Components

### Button

A highly customizable button component with multiple variants, sizes, colors, and states.

#### Basic Usage

```tsx
<Button>Default Button</Button>
<Button color="primary">Primary Button</Button>
<Button color="secondary">Secondary Button</Button>
<Button color="success">Success Button</Button>
<Button color="warning">Warning Button</Button>
<Button color="danger">Danger Button</Button>
```

#### Variants

```tsx
<Button variant="solid">Solid (default)</Button>
<Button variant="faded">Faded</Button>
<Button variant="bordered">Bordered</Button>
<Button variant="light">Light</Button>
<Button variant="shadow">Shadow</Button>
<Button variant="glowing">Glowing</Button>
```

#### Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

#### Border Radius

```tsx
<Button radius="none">No Radius</Button>
<Button radius="sm">Small Radius</Button>
<Button radius="md">Medium Radius (default)</Button>
<Button radius="lg">Large Radius</Button>
<Button radius="full">Full Radius</Button>
```

#### Loading State

```tsx
<Button isLoading>Loading Button</Button>
<Button isLoading color="primary">Loading Primary</Button>
```

#### With Icons

```tsx
// Start content (left side)
<Button startContent={<StarIcon />}>Star Button</Button>

// End content (right side)
<Button endContent={<ArrowIcon />}>Next Button</Button>

// Both
<Button startContent={<StarIcon />} endContent={<ArrowIcon />}>
  Complete Button
</Button>
```

#### Icon Only Buttons

```tsx
<Button isIconOnly color="primary">
  <HeartIcon />
</Button>
<Button isIconOnly color="secondary" size="sm">
  <SearchIcon />
</Button>
```

#### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
<Button disabled color="primary">Disabled Primary</Button>
```

#### All Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?: "solid" | "faded" | "bordered" | "light" | "shadow" | "glowing";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isIconOnly?: boolean;
  children: React.ReactNode;
}
```

## Features

- 🚀 Built with modern React 18+ and TypeScript
- 🎨 **Theme System**: Complete light/dark mode support with system preference detection
- 🌓 **ThemeProvider**: Context-based theme management with localStorage persistence
- 🎯 **Design Tokens**: Comprehensive design system with colors, typography, spacing, and more
- 📦 Tree-shakable for optimal bundle size
- 🧪 Tested with Vitest and Playwright
- 📖 Full TypeScript support with comprehensive type definitions
- ♿ Accessible components following WCAG guidelines
- 🎨 CSS Variables for dynamic theming
- ⚡ Zero dependencies (only React and React DOM as peers)
- 📱 Responsive and mobile-friendly
- 🎭 Storybook documentation with interactive examples

## Development

```bash
# Install dependencies
npm install

# Run Storybook for development and documentation
npm run storybook

# Build for production
npm run build

# Run tests
npm run test

# Publish beta version
npm run publish-beta

# Publish latest version
npm run publish-latest
```

## Project Structure

```
src/
├── components/
│   └── Button/              # Component with co-located files
│       ├── Button.tsx       # Main component logic
│       ├── Button.stories.tsx # Storybook stories
│       ├── button.module.css # Component styles
│       └── index.ts         # Component exports
├── hooks/                   # Custom hooks (ready for expansion)
├── utils/                   # Utility functions (ready for expansion)
├── types/                   # Shared TypeScript types (ready for expansion)
├── theme/                   # Theme configuration (ready for expansion)
├── index.css                # Global styles and CSS variables
├── index.ts                 # Main library exports
├── test-setup.ts            # Test configuration
└── vite-env.d.ts            # TypeScript declarations
```

## Theming

The library uses CSS variables for easy customization. You can override these variables to match your design system:

```css
:root {
  --color-primary: #your-primary-color;
  --color-primary-hover: #your-primary-hover-color;
  --color-primary-foreground: #your-primary-text-color;
  /* ... other variables */
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. The project follows a component-co-location pattern where each component lives in its own directory with all related files (component, styles, stories, tests).

## Roadmap

- [x] **Theme System** - Complete dark/light mode support ✅
- [x] **ThemeProvider** - Context-based theme management ✅
- [x] **Design Tokens** - Comprehensive design system ✅
- [ ] Additional components (Input, Modal, Dropdown, etc.)
- [ ] Animation system with theme-aware transitions
- [ ] More comprehensive testing coverage
- [ ] Component composition patterns
- [ ] Advanced theme customization

## License

MIT © [Gurleen Singh](https://github.com/grlnsngh)
