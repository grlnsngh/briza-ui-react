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
      "flat",
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
