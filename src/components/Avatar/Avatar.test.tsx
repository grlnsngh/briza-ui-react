import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Avatar Component", () => {
  describe("Accessibility Tests", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Avatar name="John Doe" />);
      await expectNoA11yViolations(container);
    });

    it("should have proper img role when not decorative", () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should have accessible name from name prop", () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByRole("img", { name: "John Doe" })).toBeInTheDocument();
    });

    it("should have accessible name from alt prop", () => {
      render(<Avatar src="/test.jpg" alt="Test User" name="John Doe" />);
      const images = screen.getAllByRole("img", { name: "Test User" });
      expect(images.length).toBeGreaterThan(0);
      // Check the img element specifically has the alt text
      const img = screen.getByAltText("Test User");
      expect(img).toBeInTheDocument();
    });

    it("should be hidden when decorative", () => {
      const { container } = render(<Avatar name="John Doe" isDecorative />);
      const avatar = container.querySelector('[role="presentation"]');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("aria-hidden", "true");
    });

    it("should indicate loading state with aria-busy", () => {
      const { container } = render(<Avatar isLoading />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveAttribute("aria-busy", "true");
    });
  });

  describe("Rendering Tests", () => {
    it("should render with default props", () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render initials from name", () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should render single initial from single name", () => {
      render(<Avatar name="John" />);
      expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should render custom initials when provided", () => {
      render(<Avatar name="John Doe" initials="AB" />);
      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("should render image when src is provided", () => {
      render(<Avatar src="/test.jpg" alt="Test User" name="John Doe" />);
      const img = screen.getByAltText("Test User");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/test.jpg");
    });

    it("should render placeholder icon when no data is provided", () => {
      const { container } = render(<Avatar />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should render custom icon when provided", () => {
      const customIcon = <div data-testid="custom-icon">Icon</div>;
      render(<Avatar icon={customIcon} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should render loading spinner when isLoading is true", () => {
      const { container } = render(<Avatar isLoading />);
      const spinner = container.querySelector("svg");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    sizes.forEach((size) => {
      it(`should not have accessibility violations with ${size} size`, async () => {
        const { container } = render(<Avatar name="Test User" size={size} />);
        await expectNoA11yViolations(container);
      });

      it(`should apply ${size} size class`, () => {
        const { container } = render(<Avatar name="Test User" size={size} />);
        const avatar = container.firstChild as HTMLElement;
        expect(avatar.className).toContain(`avatar--${size}`);
      });
    });
  });

  describe("Radius Variants", () => {
    const radii = ["none", "sm", "md", "lg", "full"] as const;

    radii.forEach((radius) => {
      it(`should not have accessibility violations with ${radius} radius`, async () => {
        const { container } = render(
          <Avatar name="Test User" radius={radius} />
        );
        await expectNoA11yViolations(container);
      });

      it(`should apply ${radius} radius class`, () => {
        const { container } = render(
          <Avatar name="Test User" radius={radius} />
        );
        const avatar = container.firstChild as HTMLElement;
        expect(avatar.className).toContain(`avatar--radius-${radius}`);
      });
    });
  });

  describe("Color Variants", () => {
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
        const { container } = render(<Avatar name="Test User" color={color} />);
        await expectNoA11yViolations(container);
      });

      it(`should apply ${color} color class`, () => {
        const { container } = render(<Avatar name="Test User" color={color} />);
        const avatar = container.firstChild as HTMLElement;
        expect(avatar.className).toContain(`avatar--${color}`);
      });
    });
  });

  describe("Status Indicators", () => {
    const statuses = ["online", "offline", "away", "busy"] as const;

    statuses.forEach((status) => {
      it(`should not have accessibility violations with ${status} status`, async () => {
        const { container } = render(
          <Avatar name="Test User" status={status} />
        );
        await expectNoA11yViolations(container);
      });

      it(`should render ${status} status indicator`, () => {
        const { container } = render(
          <Avatar name="Test User" status={status} />
        );
        const statusIndicator = container.querySelector(
          `[aria-label="Status: ${status}"]`
        );
        expect(statusIndicator).toBeInTheDocument();
      });

      it(`should have accessible label for ${status} status`, () => {
        const { container } = render(
          <Avatar name="Test User" status={status} />
        );
        const statusIndicator = container.querySelector(
          `[aria-label="Status: ${status}"]`
        );
        expect(statusIndicator).toHaveAttribute(
          "aria-label",
          `Status: ${status}`
        );
      });
    });
  });

  describe("State Variants", () => {
    it("should apply disabled class when isDisabled is true", () => {
      const { container } = render(<Avatar name="Test User" isDisabled />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar.className).toContain("avatar--disabled");
    });

    it("should not have accessibility violations when disabled", async () => {
      const { container } = render(<Avatar name="Test User" isDisabled />);
      await expectNoA11yViolations(container);
    });

    it("should apply loading class when isLoading is true", () => {
      const { container } = render(<Avatar isLoading />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar.className).toContain("avatar--loading");
    });

    it("should not have accessibility violations when loading", async () => {
      const { container } = render(<Avatar isLoading />);
      await expectNoA11yViolations(container);
    });

    it("should apply bordered class when isBordered is true", () => {
      const { container } = render(<Avatar name="Test User" isBordered />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar.className).toContain("avatar--bordered");
    });

    it("should not have accessibility violations when bordered", async () => {
      const { container } = render(<Avatar name="Test User" isBordered />);
      await expectNoA11yViolations(container);
    });
  });

  describe("Image Loading and Error Handling", () => {
    it("should fall back to initials when image fails to load", async () => {
      render(<Avatar src="/invalid.jpg" name="John Doe" />);

      const img = screen.getByAltText("John Doe");

      // Simulate image error
      const event = new Event("error", { bubbles: true });
      img.dispatchEvent(event);

      await waitFor(() => {
        expect(screen.getByText("JD")).toBeInTheDocument();
      });
    });

    it("should call onError callback when image fails", () => {
      const onError = vi.fn();
      render(<Avatar src="/invalid.jpg" name="John Doe" onError={onError} />);

      const img = screen.getByAltText("John Doe");
      const event = new Event("error", { bubbles: true });
      img.dispatchEvent(event);

      expect(onError).toHaveBeenCalledTimes(1);
    });

    it("should have lazy loading attribute on images", () => {
      render(<Avatar src="/test.jpg" alt="Test User" name="John Doe" />);
      const img = screen.getByAltText("Test User");
      expect(img).toHaveAttribute("loading", "lazy");
    });

    it("should provide default alt text when not provided", () => {
      render(<Avatar src="/test.jpg" />);
      const img = screen.getByAltText("Avatar");
      expect(img).toBeInTheDocument();
    });

    it("should use empty alt text when decorative", () => {
      const { container } = render(<Avatar src="/test.jpg" isDecorative />);
      const img = container.querySelector("img");
      expect(img).toHaveAttribute("alt", "");
    });
  });

  describe("Custom ClassName", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Avatar name="Test User" className="custom-class" />
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar.className).toContain("custom-class");
    });
  });

  describe("Initials Generation", () => {
    it("should generate initials from first and last name", () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should generate initials from first name only", () => {
      render(<Avatar name="John" />);
      expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should handle names with multiple spaces", () => {
      render(<Avatar name="  John   Doe  " />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should generate initials from first and last of multiple names", () => {
      render(<Avatar name="John Michael Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should uppercase initials", () => {
      render(<Avatar name="john doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });
});

describe("AvatarGroup Component", () => {
  describe("Accessibility Tests", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );
      await expectNoA11yViolations(container);
    });

    it("should have group role", () => {
      render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );
      expect(screen.getByRole("group")).toBeInTheDocument();
    });
  });

  describe("Rendering Tests", () => {
    it("should render all avatars when count is below max", () => {
      render(
        <AvatarGroup max={5}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );

      expect(screen.getByText("U1")).toBeInTheDocument();
      expect(screen.getByText("U2")).toBeInTheDocument();
      expect(screen.getByText("U3")).toBeInTheDocument();
    });

    it("should limit displayed avatars to max value", () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
        </AvatarGroup>
      );

      expect(screen.getByText("U1")).toBeInTheDocument();
      expect(screen.getByText("U2")).toBeInTheDocument();
      expect(screen.queryByText("U3")).not.toBeInTheDocument();
      expect(screen.queryByText("U4")).not.toBeInTheDocument();
    });

    it("should display remaining count when exceeding max", () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
        </AvatarGroup>
      );

      expect(screen.getByText("+3")).toBeInTheDocument();
    });

    it("should not display count when renderCount is false", () => {
      render(
        <AvatarGroup max={2} renderCount={false}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );

      expect(screen.queryByText("+1")).not.toBeInTheDocument();
    });

    it("should not display count when not exceeding max", () => {
      render(
        <AvatarGroup max={5}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );

      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    sizes.forEach((size) => {
      it(`should not have accessibility violations with ${size} size`, async () => {
        const { container } = render(
          <AvatarGroup size={size}>
            <Avatar name="User 1" />
            <Avatar name="User 2" />
          </AvatarGroup>
        );
        await expectNoA11yViolations(container);
      });

      it(`should apply ${size} size class`, () => {
        const { container } = render(
          <AvatarGroup size={size}>
            <Avatar name="User 1" />
            <Avatar name="User 2" />
          </AvatarGroup>
        );
        const group = container.firstChild as HTMLElement;
        expect(group.className).toContain(`avatar-group--${size}`);
      });
    });
  });

  describe("Custom ClassName", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <AvatarGroup className="custom-group-class">
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );
      const group = container.firstChild as HTMLElement;
      expect(group.className).toContain("custom-group-class");
    });
  });

  describe("Max Count Behavior", () => {
    it("should use default max of 5 when not specified", () => {
      render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
          <Avatar name="User 6" />
        </AvatarGroup>
      );

      expect(screen.getByText("+1")).toBeInTheDocument();
    });

    it("should handle max of 1 correctly", () => {
      render(
        <AvatarGroup max={1}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );

      expect(screen.getByText("U1")).toBeInTheDocument();
      expect(screen.getByText("+2")).toBeInTheDocument();
    });
  });
});
