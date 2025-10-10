# Briza UI React

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://grlnsngh.github.io/briza-ui-react/)
[![npm](https://img.shields.io/npm/v/briza-ui-react.svg)](https://www.npmjs.com/package/briza-ui-react)

A modern, lightweight React UI component library built with TypeScript and Vite. Features a comprehensive design system with theme support, accessible form components (Button, Input, Select, Checkbox, Radio), and extensive customization options.

## Installation

```bash
npm install briza-ui-react
```

## Quick Start

```tsx
import {
  ThemeProvider,
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
} from "briza-ui-react";

function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <Button color="primary">Primary Button</Button>

        <Input label="Email" placeholder="Enter your email" />

        <Select
          label="Choose an option"
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
        />

        <Checkbox label="I agree to the terms" />

        <Radio name="choice" label="Option A" value="a" />
        <Radio name="choice" label="Option B" value="b" />
      </div>
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

```tsx
<Button>Default Button</Button>
<Button color="primary">Primary Button</Button>
<Button variant="faded" color="secondary">Faded Button</Button>
```

### Input

```tsx
<Input label="Email" placeholder="Enter your email" />
<Input label="Password" type="password" placeholder="Enter password" />
```

### Select

```tsx
<Select
  label="Choose an option"
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]}
/>
```

### Checkbox

```tsx
<Checkbox label="I agree to the terms" />
<Checkbox label="Subscribe to newsletter" defaultChecked />
```

### Radio

```tsx
<Radio name="choice" label="Option A" value="a" />
<Radio name="choice" label="Option B" value="b" />
```

### Pagination

```tsx
<Pagination
  totalPages={10}
  currentPage={page}
  onPageChange={setPage}
  showFirstLast
  showItemsPerPage
  totalItems={100}
  itemsPerPage={10}
/>
```

## Features

- 🚀 Built with modern React 18+ and TypeScript
- 🎨 **Theme System**: Complete light/dark mode support with system preference detection
- 🌓 **ThemeProvider**: Context-based theme management with localStorage persistence
- 🎯 **Design Tokens**: Comprehensive design system with colors, typography, spacing, and more
- 📦 Tree-shakable for optimal bundle size
- 🧪 Tested with Vitest and Playwright
- 📖 Full TypeScript support with comprehensive type definitions
- ♿ Accessible components following WCAG 2.1 AA guidelines
- 🎨 CSS Variables for dynamic theming
- ⚡ Zero dependencies (only React and React DOM as peers)
- 📱 Responsive and mobile-friendly
- 🎭 Storybook documentation with interactive examples
- 🧩 **Form Components**: Button, Input, Select, Checkbox, Radio with validation states
- 📄 **Navigation Components**: Pagination, Breadcrumb, Tabs with keyboard support
- 🔧 **Highly Customizable**: Multiple variants, sizes, colors, and states for all components

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
│   ├── Button/              # Button component with variants, sizes, loading states
│   │   ├── Button.tsx       # Main component logic
│   │   ├── Button.stories.tsx # Storybook stories
│   │   ├── Button.test.tsx  # Unit tests
│   │   ├── button.module.css # Component styles
│   │   └── index.ts         # Component exports
│   ├── Input/               # Input component with validation and password toggle
│   │   ├── Input.tsx        # Main component logic
│   │   ├── Input.stories.tsx # Storybook stories
│   │   ├── Input.test.tsx   # Unit tests
│   │   ├── input.module.css # Component styles
│   │   ├── icons.tsx        # Icon components for password toggle
│   │   └── index.ts         # Component exports
│   ├── Select/              # Select dropdown with search and validation
│   │   ├── Select.tsx       # Main component logic
│   │   ├── Select.stories.tsx # Storybook stories
│   │   ├── Select.test.tsx  # Unit tests
│   │   ├── select.module.css # Component styles
│   │   └── index.ts         # Component exports
│   ├── Checkbox/            # Checkbox component with group support
│   │   ├── Checkbox.tsx     # Main component logic
│   │   ├── Checkbox.stories.tsx # Storybook stories
│   │   ├── Checkbox.test.tsx # Unit tests
│   │   ├── checkbox.module.css # Component styles
│   │   └── index.ts         # Component exports
│   ├── Radio/               # Radio component with group support
│   │   ├── Radio.tsx        # Main component logic
│   │   ├── Radio.stories.tsx # Storybook stories
│   │   ├── Radio.test.tsx   # Unit tests
│   │   ├── radio.module.css # Component styles
│   │   └── index.ts         # Component exports
│   ├── DesignSystem/        # Design system documentation and examples
│   │   ├── *.stories.tsx    # Storybook stories for design tokens
│   │   └── shared/          # Shared utilities for design system
│   └── index.ts             # Main components export
├── hooks/                   # Custom hooks
├── theme/                   # Theme system with provider and tokens
│   ├── ThemeProvider.tsx    # Theme context provider
│   ├── useTheme.ts          # Theme hook
│   ├── tokens.ts            # Design tokens (colors, spacing, etc.)
│   ├── types.ts             # Theme type definitions
│   ├── utils.ts             # Theme utilities
│   ├── variables.css        # CSS variables for theming
│   └── index.ts             # Theme exports
├── types/                   # Shared TypeScript types
├── utils/                   # Utility functions and test helpers
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
- [x] **Form Components** - Input, Select, Checkbox, Radio with validation ✅
- [x] **Button Component** - Multiple variants, sizes, and states ✅
- [x] **Pagination Component** - Full-featured with keyboard navigation ✅
- [x] **Modal Component** - Accessible dialog with portal rendering ✅
- [x] **Toast/Notification System** - Toast notifications with queue management ✅
- [x] **Data Table Component** - Sortable, selectable table with pagination ✅
- [x] **Breadcrumb Component** - Navigation breadcrumbs with overflow handling ✅
- [x] **Tabs Component** - Tabbed interface with multiple orientations ✅
- [x] **Progress Component** - Progress bars and circular indicators ✅
- [x] **Spinner Component** - Loading spinners with various styles ✅
- [ ] DatePicker/Calendar component
- [ ] Dropdown/Menu component
- [ ] Tooltip component
- [ ] Accordion component
- [ ] Animation system with theme-aware transitions
- [ ] Advanced theme customization tools

## License

MIT © [Gurleen Singh](https://github.com/grlnsngh)
