import React from "react";
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
    // Apply dark theme to entire Storybook UI (HeroUI style)
    (Story, context) => {
      const theme = context.globals.theme || "light";
      const isDark = theme === "dark";

      React.useEffect(() => {
        // Apply to document root
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.colorScheme = theme;

        // Apply dark theme to entire Storybook interface (HeroUI gradient style)
        if (isDark) {
          // Modern gradient background like HeroUI
          const gradientBg =
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent), #0a0a0a";

          // Main body
          document.body.style.background = gradientBg;
          document.body.style.backgroundColor = "#0a0a0a";
          document.body.style.color = "#f0f0f0";

          // Story canvas background
          const canvas = document.querySelector("#storybook-root");
          if (canvas?.parentElement) {
            canvas.parentElement.style.background = gradientBg;
            canvas.parentElement.style.backgroundColor = "#0a0a0a";
          }

          // Docs page - multiple selectors to ensure coverage
          const docsRoot = document.querySelector("#storybook-docs");
          if (docsRoot) {
            (docsRoot as HTMLElement).style.background = gradientBg;
            (docsRoot as HTMLElement).style.backgroundColor = "#0a0a0a";
            (docsRoot as HTMLElement).style.color = "#f0f0f0";
          }

          // Docs story wrapper
          const docsStory = document.querySelector(".docs-story");
          if (docsStory) {
            (docsStory as HTMLElement).style.background = gradientBg;
            (docsStory as HTMLElement).style.backgroundColor = "#0a0a0a";
          }

          // Main docs container
          const sbMainPaddedWrapper = document.querySelector(".sb-main-padded");
          if (sbMainPaddedWrapper) {
            (sbMainPaddedWrapper as HTMLElement).style.background = gradientBg;
            (sbMainPaddedWrapper as HTMLElement).style.backgroundColor =
              "#0a0a0a";
            (sbMainPaddedWrapper as HTMLElement).style.color = "#f0f0f0";
          }

          // Docs content wrapper
          const sbDocsWrapper = document.querySelector(".sbdocs");
          if (sbDocsWrapper) {
            (sbDocsWrapper as HTMLElement).style.background = gradientBg;
            (sbDocsWrapper as HTMLElement).style.backgroundColor = "#0a0a0a";
            (sbDocsWrapper as HTMLElement).style.color = "#f0f0f0";
          }

          // Individual story blocks in docs
          document.querySelectorAll(".sb-story").forEach((story) => {
            (story as HTMLElement).style.background = gradientBg;
            (story as HTMLElement).style.backgroundColor = "#0a0a0a";
          });
        } else {
          // Light theme - reset to white
          document.body.style.backgroundColor = "#ffffff";
          document.body.style.color = "#111827";

          const canvas = document.querySelector("#storybook-root");
          if (canvas?.parentElement) {
            canvas.parentElement.style.backgroundColor = "#ffffff";
          }

          const docsRoot = document.querySelector("#storybook-docs");
          if (docsRoot) {
            (docsRoot as HTMLElement).style.backgroundColor = "#ffffff";
            (docsRoot as HTMLElement).style.color = "#111827";
          }

          const docsStory = document.querySelector(".docs-story");
          if (docsStory) {
            (docsStory as HTMLElement).style.backgroundColor = "#ffffff";
          }

          const sbMainPaddedWrapper = document.querySelector(".sb-main-padded");
          if (sbMainPaddedWrapper) {
            (sbMainPaddedWrapper as HTMLElement).style.backgroundColor =
              "#ffffff";
            (sbMainPaddedWrapper as HTMLElement).style.color = "#111827";
          }

          const sbDocsWrapper = document.querySelector(".sbdocs");
          if (sbDocsWrapper) {
            (sbDocsWrapper as HTMLElement).style.backgroundColor = "#ffffff";
            (sbDocsWrapper as HTMLElement).style.color = "#111827";
          }

          document.querySelectorAll(".sb-story").forEach((story) => {
            (story as HTMLElement).style.backgroundColor = "#ffffff";
          });
        }
      }, [theme, isDark]);

      return React.createElement(Story);
    },
  ],
};

export default preview;
