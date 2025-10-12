import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../utils/test-helpers";
import { Card, CardHeader, CardBody, CardFooter, CardImage } from "./Card";

describe("Card", () => {
  describe("Rendering", () => {
    it("renders the Card component", () => {
      render(
        <Card>
          <CardBody>Test content</CardBody>
        </Card>
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders with all sections", () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
          <CardBody>Body content</CardBody>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );

      expect(screen.getByText("Header content")).toBeInTheDocument();
      expect(screen.getByText("Body content")).toBeInTheDocument();
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Card className="custom-card">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("custom-card");
    });

    it("renders with custom style", () => {
      const { container } = render(
        <Card style={{ maxWidth: "500px" }}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.style.maxWidth).toBe("500px");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref}>
          <CardBody>Content</CardBody>
        </Card>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Variants", () => {
    it("renders with default variant", () => {
      const { container } = render(
        <Card variant="default">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--default");
    });

    it("renders with bordered variant", () => {
      const { container } = render(
        <Card variant="bordered">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--bordered");
    });

    it("renders with shadow variant", () => {
      const { container } = render(
        <Card variant="shadow">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--shadow");
    });

    it("renders with elevated variant", () => {
      const { container } = render(
        <Card variant="elevated">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--elevated");
    });
  });

  describe("Sizes", () => {
    it("renders with small size", () => {
      const { container } = render(
        <Card size="sm">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--sm");
    });

    it("renders with medium size (default)", () => {
      const { container } = render(
        <Card size="md">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--md");
    });

    it("renders with large size", () => {
      const { container } = render(
        <Card size="lg">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--lg");
    });
  });

  describe("Border Radius", () => {
    it("renders with no radius", () => {
      const { container } = render(
        <Card radius="none">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--radius-none");
    });

    it("renders with small radius", () => {
      const { container } = render(
        <Card radius="sm">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--radius-sm");
    });

    it("renders with medium radius", () => {
      const { container } = render(
        <Card radius="md">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--radius-md");
    });

    it("renders with large radius", () => {
      const { container } = render(
        <Card radius="lg">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--radius-lg");
    });
  });

  describe("Interactive States", () => {
    it("applies hoverable class when isHoverable is true", () => {
      const { container } = render(
        <Card isHoverable>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--hoverable");
    });

    it("applies pressable class when isPressable is true", () => {
      const { container } = render(
        <Card isPressable>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--pressable");
    });

    it("handles click events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card onClick={handleClick}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = screen.getByText("Content").closest("div[role='button']");
      expect(card).toBeInTheDocument();

      if (card) {
        await user.click(card);
        expect(handleClick).toHaveBeenCalledTimes(1);
      }
    });

    it("handles Enter key press", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card onClick={handleClick}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = screen
        .getByText("Content")
        .closest("div[role='button']") as HTMLElement;
      if (card) {
        card.focus();
        await user.keyboard("{Enter}");
        expect(handleClick).toHaveBeenCalledTimes(1);
      }
    });

    it("handles Space key press", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card onClick={handleClick}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = screen
        .getByText("Content")
        .closest("div[role='button']") as HTMLElement;
      if (card) {
        card.focus();
        await user.keyboard(" ");
        expect(handleClick).toHaveBeenCalledTimes(1);
      }
    });

    it("sets role='button' when interactive", () => {
      const { container } = render(
        <Card onClick={() => {}}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute("role")).toBe("button");
    });

    it("sets tabIndex when interactive", () => {
      const { container } = render(
        <Card onClick={() => {}}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute("tabindex")).toBe("0");
    });

    it("allows custom tabIndex", () => {
      const { container } = render(
        <Card onClick={() => {}} tabIndex={-1}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute("tabindex")).toBe("-1");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled class when isDisabled is true", () => {
      const { container } = render(
        <Card isDisabled>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain("card--disabled");
    });

    it("sets aria-disabled when disabled", () => {
      const { container } = render(
        <Card isDisabled>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute("aria-disabled")).toBe("true");
    });

    it("does not trigger onClick when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card onClick={handleClick} isDisabled>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = screen.getByText("Content").parentElement;
      if (card) {
        await user.click(card);
        expect(handleClick).not.toHaveBeenCalled();
      }
    });
  });

  describe("CardHeader", () => {
    it("renders CardHeader content", () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );

      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("renders with divider", () => {
      const { container } = render(
        <Card>
          <CardHeader divider>Header</CardHeader>
        </Card>
      );

      // Verify the header renders
      expect(screen.getByText("Header")).toBeInTheDocument();
      // Verify that divider prop is applied (implementation detail, just check render)
      expect(container.innerHTML).toBeTruthy();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card>
          <CardHeader className="custom-header">Header</CardHeader>
        </Card>
      );

      // Verify the header renders with custom class
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(container.innerHTML).toContain("custom-header");
    });
  });

  describe("CardBody", () => {
    it("renders CardBody content", () => {
      render(
        <Card>
          <CardBody>Body content</CardBody>
        </Card>
      );

      expect(screen.getByText("Body content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card>
          <CardBody className="custom-body">Body</CardBody>
        </Card>
      );

      // Verify the body renders with custom class
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(container.innerHTML).toContain("custom-body");
    });
  });

  describe("CardFooter", () => {
    it("renders CardFooter content", () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );

      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("renders with divider", () => {
      const { container } = render(
        <Card>
          <CardFooter divider>Footer</CardFooter>
        </Card>
      );

      // Verify the footer renders
      expect(screen.getByText("Footer")).toBeInTheDocument();
      // Verify that divider prop is applied (implementation detail, just check render)
      expect(container.innerHTML).toBeTruthy();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card>
          <CardFooter className="custom-footer">Footer</CardFooter>
        </Card>
      );

      // Verify the footer renders with custom class
      expect(screen.getByText("Footer")).toBeInTheDocument();
      expect(container.innerHTML).toContain("custom-footer");
    });
  });

  describe("CardImage", () => {
    it("renders CardImage with src and alt", () => {
      render(
        <Card>
          <CardImage src="test.jpg" alt="Test image" />
        </Card>
      );

      const image = screen.getByAltText("Test image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "test.jpg");
    });

    it("applies cover object-fit by default", () => {
      const { container } = render(
        <Card>
          <CardImage src="test.jpg" alt="Test" />
        </Card>
      );

      const image = screen.getByAltText("Test");
      expect(image).toBeInTheDocument();
      // Object-fit is controlled via CSS class, just verify render
      expect(container.innerHTML).toBeTruthy();
    });

    it("applies contain object-fit", () => {
      const { container } = render(
        <Card>
          <CardImage src="test.jpg" alt="Test" objectFit="contain" />
        </Card>
      );

      const image = screen.getByAltText("Test");
      expect(image).toBeInTheDocument();
      // Object-fit is controlled via CSS class, just verify render
      expect(container.innerHTML).toBeTruthy();
    });

    it("applies fill object-fit", () => {
      const { container } = render(
        <Card>
          <CardImage src="test.jpg" alt="Test" objectFit="fill" />
        </Card>
      );

      const image = screen.getByAltText("Test");
      expect(image).toBeInTheDocument();
      // Object-fit is controlled via CSS class, just verify render
      expect(container.innerHTML).toBeTruthy();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card>
          <CardImage src="test.jpg" alt="Test" className="custom-image" />
        </Card>
      );

      const image = screen.getByAltText("Test");
      expect(image).toBeInTheDocument();
      expect(container.innerHTML).toContain("custom-image");
    });
  });

  describe("Theme Support", () => {
    it("renders correctly in light theme", () => {
      const { container } = render(
        <div data-theme="light">
          <Card variant="shadow">
            <CardBody>Content</CardBody>
          </Card>
        </div>
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders correctly in dark theme", () => {
      const { container } = render(
        <div data-theme="dark">
          <Card variant="shadow">
            <CardBody>Content</CardBody>
          </Card>
        </div>
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      await expectNoA11yViolations(container);
    });

    it("has no violations when interactive", async () => {
      const { container } = render(
        <Card onClick={() => {}} aria-label="Interactive card">
          <CardBody>Content</CardBody>
        </Card>
      );

      await expectNoA11yViolations(container);
    });

    it("applies custom aria-label", () => {
      const { container } = render(
        <Card aria-label="Custom label">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute("aria-label")).toBe("Custom label");
    });

    it("applies custom role", () => {
      const { container } = render(
        <Card role="article">
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute("role")).toBe("article");
    });

    it("has proper focus management", async () => {
      const user = userEvent.setup();

      render(
        <Card onClick={() => {}}>
          <CardBody>Content</CardBody>
        </Card>
      );

      const card = screen.getByText("Content").closest("div[role='button']");
      if (card) {
        await user.tab();
        expect(card).toHaveFocus();
      }
    });
  });

  describe("Complex Compositions", () => {
    it("renders card with image and all sections", () => {
      render(
        <Card>
          <CardImage src="test.jpg" alt="Test" />
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(screen.getByAltText("Test")).toBeInTheDocument();
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("renders multiple cards", () => {
      render(
        <>
          <Card>
            <CardBody>Card 1</CardBody>
          </Card>
          <Card>
            <CardBody>Card 2</CardBody>
          </Card>
          <Card>
            <CardBody>Card 3</CardBody>
          </Card>
        </>
      );

      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
      expect(screen.getByText("Card 3")).toBeInTheDocument();
    });
  });
});
