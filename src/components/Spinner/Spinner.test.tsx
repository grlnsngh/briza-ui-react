import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./Spinner";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Spinner component", () => {
  /* ============================================ */
  /* Basic Rendering                             */
  /* ============================================ */

  describe("Basic Rendering", () => {
    it("renders spinner without errors", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-busy", "true");
      expect(spinner).toHaveAttribute("aria-live", "polite");
      expect(spinner).toHaveAttribute("aria-label", "Loading, please wait");
    });

    it("renders with label", () => {
      render(<Spinner label="Loading data..." />);
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });

    it("renders without label", () => {
      const { container } = render(<Spinner />);
      const label = container.querySelector(".spinnerLabel");
      expect(label).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<Spinner className="custom-class" />);
      const spinner = container.querySelector(".custom-class");
      expect(spinner).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  /* ============================================ */
  /* Variants                                    */
  /* ============================================ */

  describe("Variants", () => {
    const variants = [
      "default",
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
    ] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        const { container } = render(<Spinner variant={variant} />);
        // SVG or div with variant class
        const spinner = container.querySelector('svg, div[class*="spinner--"]');
        expect(spinner).toBeInTheDocument();
        const className = spinner?.getAttribute("class") || "";
        expect(className).toMatch(new RegExp(`spinner--${variant}`));
      });
    });
  });

  /* ============================================ */
  /* Sizes                                       */
  /* ============================================ */

  describe("Sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        const { container } = render(<Spinner size={size} />);
        const spinnerContainer = container.querySelector(
          '[class*="spinnerContainer"]'
        );
        expect(spinnerContainer).toBeInTheDocument();
        const containerClassName =
          spinnerContainer?.getAttribute("class") || "";
        expect(containerClassName).toMatch(
          new RegExp(`spinnerContainer--${size}`)
        );

        const spinner = container.querySelector('svg, div[class*="spinner--"]');
        expect(spinner).toBeInTheDocument();
        const spinnerClassName = spinner?.getAttribute("class") || "";
        expect(spinnerClassName).toMatch(new RegExp(`spinner--${size}`));
      });
    });
  });

  /* ============================================ */
  /* Animation Types                              */
  /* ============================================ */

  describe("Animation Types", () => {
    it("renders circular type", () => {
      const { container } = render(<Spinner type="circular" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      const className = svg?.getAttribute("class") || "";
      expect(className).toMatch(/spinner--circular/);
    });

    it("renders dots type", () => {
      const { container } = render(<Spinner type="dots" />);
      const spinner = container.querySelector('[class*="spinner--dots"]');
      expect(spinner).toBeInTheDocument();

      const dots = container.querySelectorAll('[class*="spinnerDot"]');
      expect(dots).toHaveLength(3);
    });

    it("renders pulse type", () => {
      const { container } = render(<Spinner type="pulse" />);
      const spinner = container.querySelector('[class*="spinner--pulse"]');
      expect(spinner).toBeInTheDocument();

      const pulse = container.querySelector('[class*="spinnerPulse"]');
      expect(pulse).toBeInTheDocument();
    });

    it("renders bars type", () => {
      const { container } = render(<Spinner type="bars" />);
      const spinner = container.querySelector('[class*="spinner--bars"]');
      expect(spinner).toBeInTheDocument();

      const bars = container.querySelectorAll('[class*="spinnerBar"]');
      expect(bars).toHaveLength(4);
    });
  });

  /* ============================================ */
  /* ARIA Attributes                             */
  /* ============================================ */

  describe("ARIA Attributes", () => {
    it("has correct role", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-busy attribute", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-busy", "true");
    });

    it("has default aria-live attribute", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "polite");
    });

    it("accepts custom aria-live value", () => {
      render(<Spinner ariaLive="assertive" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "assertive");
    });

    it("accepts off aria-live value", () => {
      render(<Spinner ariaLive="off" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "off");
    });

    it("has default aria-label", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading, please wait");
    });

    it("uses label as aria-label when provided", () => {
      render(<Spinner label="Loading data..." />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading data...");
    });

    it("custom aria-label overrides label", () => {
      render(
        <Spinner label="Loading data..." ariaLabel="Custom loading message" />
      );
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Custom loading message");
    });
  });

  /* ============================================ */
  /* Label Functionality                          */
  /* ============================================ */

  describe("Label Functionality", () => {
    it("renders label when provided", () => {
      render(<Spinner label="Loading..." />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      const { container } = render(<Spinner />);
      const label = container.querySelector(".spinnerLabel");
      expect(label).not.toBeInTheDocument();
    });

    it("label has correct class", () => {
      const { container } = render(<Spinner label="Loading..." />);
      const label = container.querySelector('[class*="spinnerLabel"]');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Loading...");
    });
  });

  /* ============================================ */
  /* Circular Spinner Elements                    */
  /* ============================================ */

  describe("Circular Spinner Elements", () => {
    it("renders SVG element", () => {
      const { container } = render(<Spinner type="circular" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 50 50");
    });

    it("renders background circle", () => {
      const { container } = render(<Spinner type="circular" />);
      const backgroundCircle = container.querySelector(
        '[class*="spinnerCircleBackground"]'
      );
      expect(backgroundCircle).toBeInTheDocument();
      expect(backgroundCircle).toHaveAttribute("cx", "25");
      expect(backgroundCircle).toHaveAttribute("cy", "25");
      expect(backgroundCircle).toHaveAttribute("r", "20");
    });

    it("renders foreground circle", () => {
      const { container } = render(<Spinner type="circular" />);
      const circle = container.querySelector('[class*="spinnerCircle"]');
      expect(circle).toBeInTheDocument();
      expect(circle).toHaveAttribute("cx", "25");
      expect(circle).toHaveAttribute("cy", "25");
      expect(circle).toHaveAttribute("r", "20");
    });
  });

  /* ============================================ */
  /* Dots Spinner Elements                        */
  /* ============================================ */

  describe("Dots Spinner Elements", () => {
    it("renders three dots", () => {
      const { container } = render(<Spinner type="dots" />);
      const dots = container.querySelectorAll('span[class*="spinnerDot"]');
      expect(dots).toHaveLength(3);
    });

    it("all dots have correct class", () => {
      const { container } = render(<Spinner type="dots" />);
      const dots = container.querySelectorAll(".spinnerDot");
      dots.forEach((dot) => {
        expect(dot).toBeInTheDocument();
      });
    });
  });

  /* ============================================ */
  /* Pulse Spinner Elements                       */
  /* ============================================ */

  describe("Pulse Spinner Elements", () => {
    it("renders pulse element", () => {
      const { container } = render(<Spinner type="pulse" />);
      const pulse = container.querySelector('[class*="spinnerPulse"]');
      expect(pulse).toBeInTheDocument();
    });
  });

  /* ============================================ */
  /* Bars Spinner Elements                        */
  /* ============================================ */

  describe("Bars Spinner Elements", () => {
    it("renders four bars", () => {
      const { container } = render(<Spinner type="bars" />);
      const bars = container.querySelectorAll('span[class*="spinnerBar"]');
      expect(bars).toHaveLength(4);
    });

    it("all bars have correct class", () => {
      const { container } = render(<Spinner type="bars" />);
      const bars = container.querySelectorAll(".spinnerBar");
      bars.forEach((bar) => {
        expect(bar).toBeInTheDocument();
      });
    });
  });

  /* ============================================ */
  /* Combination Tests                            */
  /* ============================================ */

  describe("Combination Tests", () => {
    it("renders with variant, size, and type together", () => {
      const { container } = render(
        <Spinner variant="success" size="lg" type="dots" />
      );
      const spinner = container.querySelector('[class*="spinner--"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner?.className).toContain("spinner--success");
      expect(spinner?.className).toContain("spinner--lg");
      expect(spinner?.className).toContain("spinner--dots");
    });

    it("renders all props together", () => {
      render(
        <Spinner
          variant="primary"
          size="md"
          type="circular"
          label="Loading..."
          ariaLive="assertive"
          ariaLabel="Custom loading"
          className="custom"
        />
      );

      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "assertive");
      expect(spinner).toHaveAttribute("aria-label", "Custom loading");
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  /* ============================================ */
  /* Container Structure                          */
  /* ============================================ */

  describe("Container Structure", () => {
    it("has correct container class", () => {
      const { container } = render(<Spinner />);
      const spinnerContainer = container.querySelector(
        '[class*="spinnerContainer"]'
      );
      expect(spinnerContainer).toBeInTheDocument();
    });

    it("container has correct size class", () => {
      const { container } = render(<Spinner size="lg" />);
      const spinnerContainer = container.querySelector(
        '[class*="spinnerContainer"]'
      );
      expect(spinnerContainer).toBeInTheDocument();
      expect(spinnerContainer?.className).toContain("spinnerContainer--lg");
    });
  });

  /* ============================================ */
  /* CSS Classes Application                      */
  /* ============================================ */

  describe("CSS Classes Application", () => {
    it("applies variant class", () => {
      const { container } = render(<Spinner variant="danger" />);
      const spinner = container.querySelector('svg, div[class*="spinner--"]');
      expect(spinner).toBeInTheDocument();
      const className = spinner?.getAttribute("class") || "";
      expect(className).toMatch(/spinner--danger/);
    });

    it("applies size class", () => {
      const { container } = render(<Spinner size="xl" />);
      const spinner = container.querySelector('svg, div[class*="spinner--"]');
      expect(spinner).toBeInTheDocument();
      const className = spinner?.getAttribute("class") || "";
      expect(className).toMatch(/spinner--xl/);
    });

    it("applies type class", () => {
      const { container } = render(<Spinner type="pulse" />);
      const spinner = container.querySelector('div[class*="spinner--pulse"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner?.className).toMatch(/spinner--pulse/);
    });

    it("applies multiple classes correctly", () => {
      const { container } = render(
        <Spinner variant="warning" size="sm" type="bars" />
      );
      const spinner = container.querySelector('div[class*="spinner--"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner?.className).toMatch(/spinner--warning/);
      expect(spinner?.className).toMatch(/spinner--sm/);
      expect(spinner?.className).toMatch(/spinner--bars/);
    });
  });

  /* ============================================ */
  /* Accessibility                                */
  /* ============================================ */

  describe("Accessibility", () => {
    it("should not have accessibility violations - default", async () => {
      const { container } = render(<Spinner />);
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations - with label", async () => {
      const { container } = render(<Spinner label="Loading..." />);
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations - all types", async () => {
      const types = ["circular", "dots", "pulse", "bars"] as const;
      for (const type of types) {
        const { container } = render(<Spinner type={type} />);
        await expectNoA11yViolations(container);
      }
    });

    it("should not have accessibility violations - all variants", async () => {
      const variants = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ] as const;
      for (const variant of variants) {
        const { container } = render(<Spinner variant={variant} />);
        await expectNoA11yViolations(container);
      }
    });
  });

  /* ============================================ */
  /* Edge Cases                                   */
  /* ============================================ */

  describe("Edge Cases", () => {
    it("handles empty string label", () => {
      const { container } = render(<Spinner label="" />);
      const label = container.querySelector(".spinnerLabel");
      expect(label).not.toBeInTheDocument();
    });

    it("handles multiple spaces in label", () => {
      render(<Spinner label="   Loading   " />);
      expect(screen.getByText("Loading", { exact: false })).toBeInTheDocument();
    });

    it("renders without crashing with all props undefined", () => {
      render(
        <Spinner
          variant={undefined}
          size={undefined}
          type={undefined}
          label={undefined}
        />
      );
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("handles very long label text", () => {
      const longLabel = "Loading ".repeat(50);
      render(<Spinner label={longLabel} />);
      // Use partial match since the text might be truncated or split
      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    });
  });
});
