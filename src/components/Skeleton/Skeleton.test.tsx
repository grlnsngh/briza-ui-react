import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../utils/test-helpers";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  describe("Rendering", () => {
    it("renders the Skeleton component", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
      expect(skeleton.tagName).toBe("DIV");
    });

    it("renders with custom className", () => {
      const { container } = render(<Skeleton className="custom-skeleton" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).toContain("custom-skeleton");
    });

    it("renders with custom style", () => {
      const { container } = render(
        <Skeleton style={{ backgroundColor: "red" }} />
      );
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.backgroundColor).toBe("red");
    });

    it("forwards ref correctly", () => {
      const ref = { current: null };
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("applies ARIA label for accessibility", () => {
      render(<Skeleton />);
      const skeleton = screen.getByLabelText("Loading...");
      expect(skeleton).toBeInTheDocument();
    });

    it("sets aria-busy to true", () => {
      render(<Skeleton />);
      const skeleton = screen.getByLabelText("Loading...");
      expect(skeleton).toHaveAttribute("aria-busy", "true");
    });
  });

  describe("Variants", () => {
    it("renders with text variant by default", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).toContain("skeleton--text");
    });

    it("renders with text variant", () => {
      const { container } = render(<Skeleton variant="text" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).toContain("skeleton--text");
    });

    it("renders with circular variant", () => {
      const { container } = render(<Skeleton variant="circular" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).toContain("skeleton--circular");
    });

    it("renders with rectangular variant", () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).toContain("skeleton--rectangular");
    });
  });

  describe("Dimensions", () => {
    it("applies custom width", () => {
      const { container } = render(<Skeleton width="200px" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("200px");
    });

    it("applies custom height", () => {
      const { container } = render(<Skeleton height="50px" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("50px");
    });

    it("applies custom width as number (converted to px)", () => {
      const { container } = render(<Skeleton width={300} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("300px");
    });

    it("applies custom height as number (converted to px)", () => {
      const { container } = render(<Skeleton height={100} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.height).toBe("100px");
    });

    it("applies percentage width", () => {
      const { container } = render(<Skeleton width="100%" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.style.width).toBe("100%");
    });
  });

  describe("Animation", () => {
    it("has animation enabled by default", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).not.toContain("skeleton--no-animation");
    });

    it("disables animation when animation is false", () => {
      const { container } = render(<Skeleton animation={false} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).toContain("skeleton--no-animation");
    });

    it("enables animation when animation is true", () => {
      const { container } = render(<Skeleton animation />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton.className).not.toContain("skeleton--no-animation");
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Skeleton />);
      await expectNoA11yViolations(container);
    });

    it("has no violations with circular variant", async () => {
      const { container } = render(<Skeleton variant="circular" />);
      await expectNoA11yViolations(container);
    });

    it("has no violations with rectangular variant", async () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      await expectNoA11yViolations(container);
    });

    it("has no violations with animation disabled", async () => {
      const { container } = render(<Skeleton animation={false} />);
      await expectNoA11yViolations(container);
    });
  });

  describe("Multiple Skeletons", () => {
    it("renders multiple skeletons independently", () => {
      render(
        <>
          <Skeleton variant="text" data-testid="skeleton-1" />
          <Skeleton variant="circular" data-testid="skeleton-2" />
          <Skeleton variant="rectangular" data-testid="skeleton-3" />
        </>
      );

      expect(screen.getByTestId("skeleton-1")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton-2")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton-3")).toBeInTheDocument();
    });
  });
});
