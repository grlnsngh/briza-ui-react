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
