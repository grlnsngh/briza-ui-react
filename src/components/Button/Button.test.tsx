import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import {
  renderWithA11y,
  expectNoA11yViolations,
} from "../../utils/test-helpers";

describe("Button Accessibility Tests", () => {
  describe("Basic Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Button>Click me</Button>);
      await expectNoA11yViolations(container);
    });

    it("should render with proper button role", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should have accessible name from children", () => {
      render(<Button>Submit Form</Button>);
      expect(
        screen.getByRole("button", { name: "Submit Form" })
      ).toBeInTheDocument();
    });
  });

  describe("Color Variants Accessibility", () => {
    const colors = [
      "default",
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
    ] as const;

    colors.forEach((color) => {
      it(`should not have accessibility violations with ${color} color`, async () => {
        const { container } = render(<Button color={color}>Button</Button>);
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Variant Accessibility", () => {
    const variants = [
      "solid",
      "faded",
      "bordered",
      "light",
      "shadow",
      "glowing",
    ] as const;

    variants.forEach((variant) => {
      it(`should not have accessibility violations with ${variant} variant`, async () => {
        const { container } = render(<Button variant={variant}>Button</Button>);
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Size Accessibility", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    sizes.forEach((size) => {
      it(`should not have accessibility violations with ${size} size`, async () => {
        const { container } = render(<Button size={size}>Button</Button>);
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Disabled State Accessibility", () => {
    it("should not have accessibility violations when disabled", async () => {
      const { container } = render(<Button disabled>Disabled Button</Button>);
      await expectNoA11yViolations(container);
    });

    it("should have proper disabled attribute", () => {
      render(<Button disabled>Disabled Button</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should be properly announced to screen readers when disabled", () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("disabled");
    });
  });

  describe("Loading State Accessibility", () => {
    it("should not have accessibility violations when loading", async () => {
      const { container } = render(<Button isLoading>Loading Button</Button>);
      await expectNoA11yViolations(container);
    });

    it("should be disabled when loading", () => {
      render(<Button isLoading>Loading Button</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should maintain accessible name when loading", () => {
      render(<Button isLoading>Submit</Button>);
      expect(
        screen.getByRole("button", { name: /submit/i })
      ).toBeInTheDocument();
    });
  });

  describe("Icon-Only Button Accessibility", () => {
    it("should not have accessibility violations for icon-only button", async () => {
      const { container } = render(
        <Button isIconOnly aria-label="Close dialog">
          <span>×</span>
        </Button>
      );
      await expectNoA11yViolations(container);
    });

    it("should require aria-label for icon-only buttons", () => {
      render(
        <Button isIconOnly aria-label="Delete item">
          <span>🗑️</span>
        </Button>
      );
      expect(
        screen.getByRole("button", { name: "Delete item" })
      ).toBeInTheDocument();
    });
  });

  describe("Polymorphic Button Accessibility", () => {
    it("should not have accessibility violations when rendered as a link", async () => {
      const { container } = render(
        <Button as="a" href="#test">
          Link Button
        </Button>
      );
      await expectNoA11yViolations(container);
    });

    it("should maintain proper semantics when rendered as link", () => {
      render(
        <Button as="a" href="#test">
          Link Button
        </Button>
      );
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("should have proper aria-disabled when disabled as non-button element", () => {
      render(
        <Button as="div" disabled>
          Div Button
        </Button>
      );
      const element = screen.getByText("Div Button");
      expect(element).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Content Accessibility", () => {
    it("should not have accessibility violations with start content", async () => {
      const { container } = render(
        <Button startContent={<span>👍</span>}>Like</Button>
      );
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with end content", async () => {
      const { container } = render(
        <Button endContent={<span>→</span>}>Next</Button>
      );
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with both start and end content", async () => {
      const { container } = render(
        <Button startContent={<span>📧</span>} endContent={<span>→</span>}>
          Send Email
        </Button>
      );
      await expectNoA11yViolations(container);
    });
  });

  describe("Comprehensive Accessibility Test", () => {
    it("should not have accessibility violations with complex configuration", async () => {
      const { a11yResults } = await renderWithA11y(
        <div>
          <Button
            color="primary"
            variant="solid"
            size="lg"
            startContent={<span>📝</span>}
            onClick={() => {}}
          >
            Create New Document
          </Button>
          <Button disabled color="danger" variant="bordered" className="ml-2">
            Delete
          </Button>
          <Button isLoading color="success" endContent={<span>✓</span>}>
            Save Changes
          </Button>
          <Button as="a" href="#help" color="secondary" variant="light">
            Help
          </Button>
        </div>
      );

      expect(a11yResults).toHaveNoViolations();
    });
  });

  describe("Focus Management", () => {
    it("should be focusable when not disabled", () => {
      render(<Button>Focusable Button</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should not be focusable when disabled", () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });
});

describe("Button Theme Integration Tests", () => {
  describe("Theme Context Integration", () => {
    it("should work correctly within ThemeProvider", () => {
      render(
        <div data-theme="light">
          <Button color="primary">Themed Button</Button>
        </div>
      );

      const button = screen.getByRole("button", { name: "Themed Button" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("button--primary");
    });

    it("should not have accessibility violations in dark theme", async () => {
      const { container } = render(
        <div data-theme="dark">
          <Button color="primary">Dark Theme Button</Button>
        </div>
      );

      await expectNoA11yViolations(container);
    });

    it("should work with all color variants in light theme", async () => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ] as const;

      const { container } = render(
        <div data-theme="light">
          {colors.map((color) => (
            <Button key={color} color={color}>
              {color} button
            </Button>
          ))}
        </div>
      );

      await expectNoA11yViolations(container);

      colors.forEach((color) => {
        expect(
          screen.getByRole("button", { name: `${color} button` })
        ).toBeInTheDocument();
      });
    });

    it("should work with all color variants in dark theme", async () => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ] as const;

      const { container } = render(
        <div data-theme="dark">
          {colors.map((color) => (
            <Button key={color} color={color}>
              {color} button
            </Button>
          ))}
        </div>
      );

      await expectNoA11yViolations(container);

      colors.forEach((color) => {
        expect(
          screen.getByRole("button", { name: `${color} button` })
        ).toBeInTheDocument();
      });
    });
  });

  describe("Design Token Integration", () => {
    it("should apply design token classes for size variants", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      sizes.forEach((size) => {
        const { rerender } = render(<Button size={size}>Size {size}</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`button--${size}`);
        rerender(<></>);
      });
    });

    it("should apply design token classes for radius variants", () => {
      const radiusOptions = ["none", "sm", "md", "lg", "full"] as const;

      radiusOptions.forEach((radius) => {
        const { rerender } = render(
          <Button radius={radius}>Radius {radius}</Button>
        );
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`button--radius-${radius}`);
        rerender(<></>);
      });
    });

    it("should work with faded and light variants in dark theme", async () => {
      const { container } = render(
        <div data-theme="dark">
          <Button variant="faded" color="primary">
            Faded Button
          </Button>
          <Button variant="light" color="secondary">
            Light Button
          </Button>
        </div>
      );

      await expectNoA11yViolations(container);

      expect(screen.getByRole("button", { name: "Faded Button" })).toHaveClass(
        "button--faded"
      );
      expect(screen.getByRole("button", { name: "Light Button" })).toHaveClass(
        "button--light"
      );
    });
  });

  describe("Cross-Theme Consistency", () => {
    it("should maintain semantic meaning across themes", async () => {
      // Test that danger buttons are always accessible regardless of theme
      const lightContainer = render(
        <div data-theme="light">
          <Button color="danger">Delete (Light)</Button>
        </div>
      ).container;

      const darkContainer = render(
        <div data-theme="dark">
          <Button color="danger">Delete (Dark)</Button>
        </div>
      ).container;

      await expectNoA11yViolations(lightContainer);
      await expectNoA11yViolations(darkContainer);
    });

    it("should have consistent interaction states across themes", () => {
      // Test disabled state
      render(
        <div data-theme="light">
          <Button disabled color="primary">
            Light Disabled
          </Button>
        </div>
      );

      render(
        <div data-theme="dark">
          <Button disabled color="primary">
            Dark Disabled
          </Button>
        </div>
      );

      const lightButton = screen.getByRole("button", {
        name: "Light Disabled",
      });
      const darkButton = screen.getByRole("button", { name: "Dark Disabled" });

      expect(lightButton).toBeDisabled();
      expect(darkButton).toBeDisabled();
    });
  });
});
