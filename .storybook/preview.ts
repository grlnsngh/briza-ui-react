import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/theme/variables.css"; // Design tokens must load first
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          "Design System",
          [
            "Getting Started",
            "Overview",
            "Theme Provider",
            "Colors",
            "Typography",
            "Spacing",
            "Radius & Shadows",
          ],
          "Components",
          ["Button"],
        ],
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
