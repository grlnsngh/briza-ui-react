# Briza UI React

[![Storybook](https://img.shields.io/badge/Storybook-Hosted%20on%20GitHub%20Pages-blue)](https://grlnsngh.github.io/briza-ui-react/)

A modern, lightweight React UI component library built with TypeScript and Vite.

## Installation

```bash
npm install briza-ui-react
```

## Usage

```tsx
import { Button, Header, Page } from "briza-ui-react";

function App() {
  return (
    <div>
      <Button primary label="Click me!" onClick={() => alert("Hello!")} />
      <Header user={{ name: "John Doe" }} />
    </div>
  );
}
```

## Components

### Button

A customizable button component with multiple variants.

```tsx
<Button primary label="Primary Button" />
<Button label="Secondary Button" />
<Button size="large" label="Large Button" />
```

### Header

A responsive header component with user authentication features.

```tsx
<Header
  user={{ name: "John Doe" }}
  onLogin={() => console.log("Login")}
  onLogout={() => console.log("Logout")}
/>
```

### Page

A page layout component for structuring your application.

```tsx
<Page>
  <h1>Welcome to Briza UI</h1>
  <p>Your content here</p>
</Page>
```

## Features

- 🚀 Built with modern React and TypeScript
- 🎨 Customizable components with CSS variables
- 📦 Tree-shakable for optimal bundle size
- 🧪 Tested with Vitest and Playwright
- 📖 Full TypeScript support
- 🎯 Accessible components following WCAG guidelines

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build

# Run tests
npm run test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Gurleen Singh](https://github.com/grlnsngh)

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },

},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
