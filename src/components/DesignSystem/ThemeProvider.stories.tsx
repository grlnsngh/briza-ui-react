import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ThemeProvider,
  useTheme,
  colors,
  spacing,
  radius,
  type ThemeMode,
} from "../../theme";
import { Button } from "../Button";

const meta: Meta<typeof ThemeProvider> = {
  title: "Design System/Theme Provider",
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component: `
# ThemeProvider

The ThemeProvider component provides theme context to your entire application, enabling:

- **Light/Dark Mode**: Seamless switching between light and dark themes
- **System Preference**: Automatic detection of user's OS theme preference  
- **localStorage Persistence**: Remembers user's theme choice across sessions
- **CSS Variable Injection**: Automatically injects CSS custom properties
- **Custom Themes**: Support for theme overrides and customization

## Basic Usage

\`\`\`tsx
import { ThemeProvider, useTheme } from 'briza-ui-react';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function YourComponent() {
  const { mode, setMode, isDark, toggleMode } = useTheme();
  
  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
\`\`\`

## Features

- 🌓 **Theme Modes**: light, dark, system
- 💾 **Persistence**: Automatic localStorage support
- 🎨 **CSS Variables**: Dynamic CSS custom properties
- 🔧 **Customizable**: Custom theme overrides
- ♿ **Accessible**: Respects system preferences
        `,
      },
    },
  },
  argTypes: {
    defaultMode: {
      control: { type: "select" },
      options: ["light", "dark", "system"],
      description: "Default theme mode",
    },
    enablePersistence: {
      control: { type: "boolean" },
      description: "Enable localStorage persistence",
    },
    enableCSSVariables: {
      control: { type: "boolean" },
      description: "Enable CSS variable injection",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Theme demo component
const ThemeDemo: React.FC = () => {
  const { mode, resolvedMode, setMode, toggleMode, isDark, isSystem } =
    useTheme();

  return (
    <div
      style={{
        padding: spacing[6],
        backgroundColor: isDark ? colors.default[900] : colors.background,
        color: isDark ? colors.default[50] : colors.foreground,
        borderRadius: radius.lg,
        border: `1px solid ${
          isDark ? colors.default[700] : colors.default[200]
        }`,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: "all 0.2s ease",
      }}
    >
      <h2
        style={{
          margin: `0 0 ${spacing[4]} 0`,
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        🎨 Theme Demo
      </h2>

      <div
        style={{ display: "grid", gap: spacing[4], marginBottom: spacing[6] }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: spacing[4],
          }}
        >
          <div>
            <h3
              style={{
                margin: `0 0 ${spacing[2]} 0`,
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Current State
            </h3>
            <ul style={{ margin: 0, paddingLeft: spacing[4], lineHeight: 1.6 }}>
              <li>
                <strong>Mode:</strong> {mode}
              </li>
              <li>
                <strong>Resolved:</strong> {resolvedMode}
              </li>
              <li>
                <strong>Is Dark:</strong> {isDark ? "Yes" : "No"}
              </li>
              <li>
                <strong>Is System:</strong> {isSystem ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                margin: `0 0 ${spacing[2]} 0`,
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Theme Colors
            </h3>
            <div style={{ display: "flex", gap: spacing[2], flexWrap: "wrap" }}>
              {Object.entries({
                Primary: colors.primary.DEFAULT,
                Secondary: colors.secondary.DEFAULT,
                Success: colors.success.DEFAULT,
                Warning: colors.warning.DEFAULT,
                Danger: colors.danger.DEFAULT,
              }).map(([name, color]) => (
                <div
                  key={name}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: color,
                    borderRadius: radius.md,
                    border: `2px solid ${
                      isDark ? colors.default[600] : colors.default[300]
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  }}
                  title={`${name}: ${color}`}
                >
                  {name[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: spacing[3],
          flexWrap: "wrap",
          marginBottom: spacing[6],
        }}
      >
        <Button variant="solid" color="primary" onClick={toggleMode}>
          Toggle Theme
        </Button>

        <Button
          variant="bordered"
          color="secondary"
          onClick={() => setMode("light")}
        >
          Light Mode
        </Button>

        <Button
          variant="bordered"
          color="secondary"
          onClick={() => setMode("dark")}
        >
          Dark Mode
        </Button>

        <Button
          variant="bordered"
          color="default"
          onClick={() => setMode("system")}
        >
          System Mode
        </Button>
      </div>

      <div
        style={{
          padding: spacing[4],
          backgroundColor: isDark ? colors.default[800] : colors.default[100],
          borderRadius: radius.md,
          fontSize: "0.875rem",
          lineHeight: 1.5,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>💡 Try this:</strong> Change your system theme preference (in
          your OS settings) while "System Mode" is selected to see automatic
          theme detection in action!
        </p>
      </div>
    </div>
  );
};

export const Basic: Story = {
  args: {
    defaultMode: "system",
    enablePersistence: true,
    enableCSSVariables: true,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const LightMode: Story = {
  args: {
    defaultMode: "light",
    enablePersistence: false,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  args: {
    defaultMode: "dark",
    enablePersistence: false,
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
};

export const WithCustomTheme: Story = {
  args: {
    defaultMode: "light",
    // Note: Custom themes would need proper type extensions
    // This is just for demonstration
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div style={{ padding: spacing[4] }}>
        <p style={{ color: colors.primary.DEFAULT }}>Custom themed component</p>
        <ThemeDemo />
      </div>
    </ThemeProvider>
  ),
};

// Interactive playground
const ThemePlayground: React.FC = () => {
  const [mode, setLocalMode] = useState<ThemeMode>("system");
  const [persistence, setPersistence] = useState(true);
  const [cssVars, setCssVars] = useState(true);

  return (
    <div style={{ padding: spacing[4] }}>
      <div
        style={{
          marginBottom: spacing[6],
          padding: spacing[4],
          backgroundColor: colors.default[50],
          borderRadius: radius.lg,
          border: `1px solid ${colors.default[200]}`,
        }}
      >
        <h3 style={{ margin: `0 0 ${spacing[4]} 0` }}>Theme Configuration</h3>

        <div style={{ display: "grid", gap: spacing[4] }}>
          <div>
            <label
              htmlFor="mode-select"
              style={{
                display: "block",
                marginBottom: spacing[2],
                fontWeight: "500",
              }}
            >
              Default Mode:
            </label>
            <select
              id="mode-select"
              value={mode}
              onChange={(e) => setLocalMode(e.target.value as ThemeMode)}
              style={{
                padding: `${spacing[2]} ${spacing[3]}`,
                borderRadius: radius.md,
                border: `1px solid ${colors.default[300]}`,
                backgroundColor: colors.background,
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: spacing[4] }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: spacing[2] }}
            >
              <input
                type="checkbox"
                checked={persistence}
                onChange={(e) => setPersistence(e.target.checked)}
              />
              Enable Persistence
            </label>

            <label
              style={{ display: "flex", alignItems: "center", gap: spacing[2] }}
            >
              <input
                type="checkbox"
                checked={cssVars}
                onChange={(e) => setCssVars(e.target.checked)}
              />
              Enable CSS Variables
            </label>
          </div>
        </div>
      </div>

      <ThemeProvider
        key={`${mode}-${persistence}-${cssVars}`} // Force re-mount on config change
        defaultMode={mode}
        enablePersistence={persistence}
        enableCSSVariables={cssVars}
      >
        <ThemeDemo />
      </ThemeProvider>
    </div>
  );
};

export const Playground: Story = {
  render: () => <ThemePlayground />,
};
