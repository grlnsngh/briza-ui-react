import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Progress", () => {
  // =============================================================================
  // Basic Rendering
  // =============================================================================

  describe("Rendering", () => {
    it("should render linear progress by default", () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toBeInTheDocument();
    });

    it("should render circular progress when specified", () => {
      const { container } = render(<Progress variant="circular" value={50} />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toBeInTheDocument();
      // Circular variant includes SVG
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should render with a label", () => {
      render(<Progress value={50} label="Loading..." />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render with value label when showValueLabel is true", () => {
      render(<Progress value={65} showValueLabel />);
      expect(screen.getByText("65%")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = render(
        <Progress value={50} className="custom-class" />
      );
      const progressContainer = container.firstChild;
      expect(progressContainer).toHaveClass("custom-class");
    });
  });

  // =============================================================================
  // Variant Tests
  // =============================================================================

  describe("Variants", () => {
    it("should render linear variant correctly", () => {
      const { container } = render(<Progress variant="linear" value={50} />);
      expect(
        container.querySelector("[class*='progressTrack']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[class*='progressBar']")
      ).toBeInTheDocument();
    });

    it("should render circular variant correctly", () => {
      const { container } = render(<Progress variant="circular" value={50} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      expect(container.querySelector("circle")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // Size Tests
  // =============================================================================

  describe("Sizes", () => {
    it.each([
      ["sm", "progressContainer--sm"],
      ["md", "progressContainer--md"],
      ["lg", "progressContainer--lg"],
    ] as const)(
      "should render %s size with correct class",
      (size, className) => {
        const { container } = render(<Progress size={size} value={50} />);
        const progressContainer = container.querySelector(
          "[class*='progressContainer']"
        );
        expect(progressContainer?.className).toContain(className);
      }
    );
  });

  // =============================================================================
  // Color Tests
  // =============================================================================

  describe("Colors", () => {
    it.each([
      "default",
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
    ] as const)("should apply correct color class for %s color", (color) => {
      const { container } = render(
        <Progress variant="linear" color={color} value={50} />
      );
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).toContain("progressBar--" + color);
    });

    it.each([
      "default",
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
    ] as const)(
      "should apply correct color class for circular %s color",
      (color) => {
        const { container } = render(
          <Progress variant="circular" color={color} value={50} />
        );
        // Color class is on the circle element, not the container
        const circles = container.querySelectorAll("circle");
        const progressCircle = circles[1]; // Second circle is the progress circle
        expect(
          progressCircle?.className.baseVal ||
            progressCircle?.getAttribute("class")
        ).toContain("progressCircle--" + color);
      }
    );
  });

  // =============================================================================
  // Value and Progress Calculation
  // =============================================================================

  describe("Value Calculation", () => {
    it("should display correct percentage for given value", () => {
      render(<Progress value={75} showValueLabel />);
      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("should calculate percentage with custom min/max values", () => {
      render(
        <Progress value={50} minValue={0} maxValue={200} showValueLabel />
      );
      // 50 out of 200 = 25%
      expect(screen.getByText("25%")).toBeInTheDocument();
    });

    it("should handle custom minValue correctly", () => {
      render(
        <Progress value={60} minValue={20} maxValue={120} showValueLabel />
      );
      // (60-20)/(120-20) = 40/100 = 40%
      expect(screen.getByText("40%")).toBeInTheDocument();
    });

    it("should clamp value to 100% maximum", () => {
      render(<Progress value={150} maxValue={100} showValueLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should clamp value to 0% minimum", () => {
      render(<Progress value={-10} showValueLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // Determinate vs Indeterminate
  // =============================================================================

  describe("Determinate and Indeterminate States", () => {
    it("should render determinate progress when value is provided", () => {
      const { container } = render(<Progress variant="linear" value={50} />);
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).not.toContain(
        "progressBar--indeterminate"
      );
    });

    it("should render indeterminate progress when value is undefined", () => {
      const { container } = render(<Progress variant="linear" />);
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).toContain("progressBar--indeterminate");
    });

    it("should render circular indeterminate progress", () => {
      const { container } = render(<Progress variant="circular" />);
      const circularContainer = container.querySelector(
        "[class*='progressCircular']"
      );
      expect(circularContainer?.className).toContain(
        "progressCircular--indeterminate"
      );
    });

    it("should not show value label in indeterminate state", () => {
      render(<Progress showValueLabel />);
      // Should not have any percentage text
      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    });
  });

  // =============================================================================
  // Custom Formatting
  // =============================================================================

  describe("Custom Value Formatting", () => {
    it("should use custom formatValueLabel function", () => {
      render(
        <Progress
          value={50}
          showValueLabel
          formatValueLabel={(value) => value + " of 100"}
        />
      );
      expect(screen.getByText("50 of 100")).toBeInTheDocument();
    });

    it("should use custom formatValueLabel with different units", () => {
      render(
        <Progress
          value={450}
          maxValue={1000}
          showValueLabel
          formatValueLabel={(value) => value + "MB"}
        />
      );
      expect(screen.getByText("450MB")).toBeInTheDocument();
    });
  });

  // =============================================================================
  // Striped and Animated
  // =============================================================================

  describe("Striped and Animated", () => {
    it("should apply striped class when isStriped is true", () => {
      const { container } = render(
        <Progress variant="linear" value={50} isStriped />
      );
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).toContain("progressBar--striped");
    });

    it("should apply animated class when both isStriped and isAnimated are true", () => {
      const { container } = render(
        <Progress variant="linear" value={50} isStriped isAnimated />
      );
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).toContain("progressBar--striped");
      expect(progressBar?.className).toContain("progressBar--animated");
    });

    it("should not apply animated class without striped", () => {
      const { container } = render(
        <Progress variant="linear" value={50} isAnimated />
      );
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).not.toContain("progressBar--animated");
    });
  });

  // =============================================================================
  // Animation Disabling
  // =============================================================================

  describe("Animation Control", () => {
    it("should apply no-animation class when disableAnimation is true for linear", () => {
      const { container } = render(
        <Progress variant="linear" value={50} disableAnimation />
      );
      const progressBar = container.querySelector("[class*='progressBar']");
      expect(progressBar?.className).toContain("progressBar--no-animation");
    });

    it("should apply no-animation class when disableAnimation is true for circular", () => {
      const { container } = render(
        <Progress variant="circular" value={50} disableAnimation />
      );
      const circularContainer = container.querySelector(
        "[class*='progressCircular']"
      );
      expect(circularContainer?.className).toContain(
        "progressCircular--no-animation"
      );
    });
  });

  // =============================================================================
  // ARIA Attributes
  // =============================================================================

  describe("ARIA Attributes", () => {
    it("should have correct role", () => {
      render(<Progress value={50} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should have aria-valuenow for determinate progress", () => {
      render(<Progress value={75} />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuenow", "75");
    });

    it("should have aria-valuemin", () => {
      render(<Progress value={50} minValue={0} />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuemin", "0");
    });

    it("should have aria-valuemax", () => {
      render(<Progress value={50} maxValue={100} />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuemax", "100");
    });

    it("should not have aria-valuenow for indeterminate progress", () => {
      render(<Progress />);
      const progress = screen.getByRole("progressbar");
      expect(progress).not.toHaveAttribute("aria-valuenow");
    });

    it("should use custom ariaLabel when provided", () => {
      render(<Progress value={50} ariaLabel="Custom loading progress" />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-label", "Custom loading progress");
    });

    it("should generate default aria-label for determinate progress", () => {
      render(<Progress value={65} />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-label", "65% complete");
    });

    it("should generate default aria-label for indeterminate progress", () => {
      render(<Progress />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-label", "Loading in progress");
    });
  });

  // =============================================================================
  // Circular Progress Specifics
  // =============================================================================

  describe("Circular Progress SVG", () => {
    it("should render SVG with correct viewBox for medium size", () => {
      const { container } = render(
        <Progress variant="circular" size="md" value={50} />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 50 50");
    });

    it("should render SVG with correct viewBox for small size", () => {
      const { container } = render(
        <Progress variant="circular" size="sm" value={50} />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 40 40");
    });

    it("should render SVG with correct viewBox for large size", () => {
      const { container } = render(
        <Progress variant="circular" size="lg" value={50} />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 70 70");
    });

    it("should render background and foreground circles", () => {
      const { container } = render(<Progress variant="circular" value={50} />);
      const circles = container.querySelectorAll("circle");
      expect(circles).toHaveLength(2);
    });

    it("should show value label in center of circular progress", () => {
      const { container } = render(
        <Progress variant="circular" value={75} showValueLabel />
      );
      const label = screen.getByText("75%");
      expect(label?.className).toContain("progressValueLabel");
      // Check it's positioned in the circular container
      const circularContainer = container.querySelector(
        "[class*='progressCircular']"
      );
      expect(circularContainer).toContainElement(label);
    });
  });

  // =============================================================================
  // Edge Cases
  // =============================================================================

  describe("Edge Cases", () => {
    it("should handle value of 0", () => {
      render(<Progress value={0} showValueLabel />);
      expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("should handle value of 100", () => {
      render(<Progress value={100} showValueLabel />);
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should handle very small decimal values", () => {
      render(<Progress value={0.5} showValueLabel />);
      expect(screen.getByText("1%")).toBeInTheDocument(); // Rounds to 1%
    });

    it("should handle negative maxValue gracefully", () => {
      // Should default to sensible behavior
      render(<Progress value={50} maxValue={-100} showValueLabel />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toBeInTheDocument();
    });

    it("should handle minValue equal to maxValue", () => {
      render(
        <Progress value={50} minValue={50} maxValue={50} showValueLabel />
      );
      const progress = screen.getByRole("progressbar");
      expect(progress).toBeInTheDocument();
    });
  });

  // =============================================================================
  // Ref Forwarding
  // =============================================================================

  describe("Ref Forwarding", () => {
    it("should forward ref to the root element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  // =============================================================================
  // Accessibility
  // =============================================================================

  describe("Accessibility", () => {
    it("should have no accessibility violations for linear determinate", async () => {
      const { container } = render(
        <Progress variant="linear" value={50} label="Loading" />
      );
      await expectNoA11yViolations(container);
    });

    it("should have no accessibility violations for linear indeterminate", async () => {
      const { container } = render(
        <Progress variant="linear" label="Loading" />
      );
      await expectNoA11yViolations(container);
    });

    it("should have no accessibility violations for circular determinate", async () => {
      const { container } = render(
        <Progress variant="circular" value={75} label="Progress" />
      );
      await expectNoA11yViolations(container);
    });

    it("should have no accessibility violations for circular indeterminate", async () => {
      const { container } = render(
        <Progress variant="circular" label="Loading" />
      );
      await expectNoA11yViolations(container);
    });

    it("should have no accessibility violations with value label", async () => {
      const { container } = render(
        <Progress value={65} showValueLabel label="Download Progress" />
      );
      await expectNoA11yViolations(container);
    });

    it("should have no accessibility violations with all colors", async () => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ] as const;

      for (const color of colors) {
        const { container } = render(
          <Progress value={50} color={color} label="Progress" />
        );
        await expectNoA11yViolations(container);
      }
    });

    it("should have no accessibility violations with striped progress", async () => {
      const { container } = render(
        <Progress value={50} isStriped isAnimated label="Upload" />
      );
      await expectNoA11yViolations(container);
    });
  });
});
