import React from "react";
import type { Preview } from "@storybook/react-vite";
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
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", right: "☀️", title: "Light" },
          { value: "dark", right: "🌙", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      // Apply theme attribute to document
      document.documentElement.setAttribute("data-theme", theme);

      // Apply theme-appropriate background to body
      if (theme === "dark") {
        document.body.style.backgroundColor = "#111827";
        document.body.style.color = "#f9fafb";
      } else {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#111827";
      }

      return React.createElement(Story);
    },
  ],
};

export default preview;
