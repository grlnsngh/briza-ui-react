import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { expectNoA11yViolations } from "../../utils/test-helpers";

const basicItems: BreadcrumbItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "details", label: "Details", isCurrent: true },
];

const itemsWithIcons: BreadcrumbItem[] = [
  { key: "home", label: "Home", icon: "🏠", href: "/" },
  { key: "products", label: "Products", icon: "📦", href: "/products" },
  { key: "details", label: "Details", isCurrent: true },
];

const longPathItems: BreadcrumbItem[] = [
  { key: "1", label: "Level 1", href: "/1" },
  { key: "2", label: "Level 2", href: "/1/2" },
  { key: "3", label: "Level 3", href: "/1/2/3" },
  { key: "4", label: "Level 4", href: "/1/2/3/4" },
  { key: "5", label: "Level 5", href: "/1/2/3/4/5" },
  { key: "6", label: "Level 6", isCurrent: true },
];

describe("Breadcrumb Component", () => {
  describe("Basic Rendering", () => {
    it("should render breadcrumb with correct structure", () => {
      render(<Breadcrumb items={basicItems} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("aria-label", "Breadcrumb");

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("should render all items", () => {
      render(<Breadcrumb items={basicItems} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("should render items as links when href is provided", () => {
      render(<Breadcrumb items={basicItems} />);

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).toHaveAttribute("href", "/");

      const productsLink = screen.getByRole("link", { name: "Products" });
      expect(productsLink).toHaveAttribute("href", "/products");
    });

    it("should render current item without link", () => {
      render(<Breadcrumb items={basicItems} />);

      const detailsElement = screen.getByText("Details");
      expect(detailsElement).not.toHaveAttribute("href");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Breadcrumb items={basicItems} className="custom-class" />
      );

      const breadcrumb = container.querySelector(".custom-class");
      expect(breadcrumb).toBeInTheDocument();
    });
  });

  describe("Separators", () => {
    it("should render default separator", () => {
      const { container } = render(<Breadcrumb items={basicItems} />);

      const separators = container.querySelectorAll('[aria-hidden="true"]');
      // Should have 2 separators for 3 items (no separator after last item)
      expect(separators.length).toBeGreaterThanOrEqual(2);
    });

    it("should render custom text separator", () => {
      render(<Breadcrumb items={basicItems} separator=">" />);

      const separator = screen.getAllByText(">")[0];
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("should render custom React element separator", () => {
      render(
        <Breadcrumb
          items={basicItems}
          separator={<span data-testid="custom-sep">→</span>}
        />
      );

      const customSeparators = screen.getAllByTestId("custom-sep");
      expect(customSeparators.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Item Click", () => {
    it("should call onItemClick when item is clicked", async () => {
      const user = userEvent.setup();
      const onItemClick = vi.fn();
      render(<Breadcrumb items={basicItems} onItemClick={onItemClick} />);

      const homeLink = screen.getByRole("link", { name: "Home" });
      await user.click(homeLink);

      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(onItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ key: "home" }),
        expect.any(Object)
      );
    });

    it("should not call onItemClick for current item", async () => {
      const user = userEvent.setup();
      const onItemClick = vi.fn();
      render(<Breadcrumb items={basicItems} onItemClick={onItemClick} />);

      const detailsElement = screen.getByText("Details");
      await user.click(detailsElement);

      expect(onItemClick).not.toHaveBeenCalled();
    });

    it("should not call onItemClick for disabled item", async () => {
      const user = userEvent.setup();
      const onItemClick = vi.fn();
      const itemsWithDisabled: BreadcrumbItem[] = [
        { key: "home", label: "Home", href: "/" },
        {
          key: "disabled",
          label: "Disabled",
          href: "/disabled",
          isDisabled: true,
        },
        { key: "details", label: "Details", isCurrent: true },
      ];

      render(
        <Breadcrumb items={itemsWithDisabled} onItemClick={onItemClick} />
      );

      const disabledElement = screen.getByText("Disabled");
      await user.click(disabledElement);

      expect(onItemClick).not.toHaveBeenCalled();
    });
  });

  describe("Clickable Prop", () => {
    it("should render items as spans when isClickable is false", async () => {
      const user = userEvent.setup();
      const onItemClick = vi.fn();
      render(
        <Breadcrumb
          items={basicItems}
          isClickable={false}
          onItemClick={onItemClick}
        />
      );

      // Should not find any links
      expect(screen.queryByRole("link")).not.toBeInTheDocument();

      // Items should still be clickable spans
      const homeElement = screen.getByText("Home").parentElement;
      await user.click(homeElement!);

      // onItemClick should still be called
      expect(onItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ key: "home" }),
        expect.any(Object)
      );
    });
  });

  describe("Icons", () => {
    it("should render icons when provided", () => {
      render(<Breadcrumb items={itemsWithIcons} />);

      expect(screen.getByText("🏠")).toBeInTheDocument();
      expect(screen.getByText("📦")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render with small size", () => {
      const { container } = render(<Breadcrumb items={basicItems} size="sm" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with medium size", () => {
      const { container } = render(<Breadcrumb items={basicItems} size="md" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with large size", () => {
      const { container } = render(<Breadcrumb items={basicItems} size="lg" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Overflow Handling - Collapse", () => {
    it("should show all items when count is within maxItems", () => {
      render(
        <Breadcrumb items={basicItems} overflow="collapse" maxItems={4} />
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("should collapse items when count exceeds maxItems", () => {
      render(
        <Breadcrumb items={longPathItems} overflow="collapse" maxItems={4} />
      );

      // Should show first item
      expect(screen.getByText("Level 1")).toBeInTheDocument();

      // Should show collapse button
      const collapseButton = screen.getByLabelText("Show hidden breadcrumbs");
      expect(collapseButton).toBeInTheDocument();
      expect(collapseButton).toHaveTextContent("...");

      // Should show last two items
      expect(screen.getByText("Level 5")).toBeInTheDocument();
      expect(screen.getByText("Level 6")).toBeInTheDocument();
    });

    it("should show collapsed menu when button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Breadcrumb items={longPathItems} overflow="collapse" maxItems={4} />
      );

      const collapseButton = screen.getByLabelText("Show hidden breadcrumbs");
      await user.click(collapseButton);

      // Menu should be visible with collapsed items
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getByText("Level 2")).toBeInTheDocument();
      expect(screen.getByText("Level 3")).toBeInTheDocument();
      expect(screen.getByText("Level 4")).toBeInTheDocument();
    });

    it("should have aria-expanded attribute on collapse button", async () => {
      const user = userEvent.setup();
      render(
        <Breadcrumb items={longPathItems} overflow="collapse" maxItems={4} />
      );

      const collapseButton = screen.getByLabelText("Show hidden breadcrumbs");
      expect(collapseButton).toHaveAttribute("aria-expanded", "false");

      await user.click(collapseButton);
      expect(collapseButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Overflow Handling - Other Strategies", () => {
    it("should render with ellipsis overflow", () => {
      const { container } = render(
        <Breadcrumb items={longPathItems} overflow="ellipsis" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with scroll overflow", () => {
      const { container } = render(
        <Breadcrumb items={longPathItems} overflow="scroll" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes", () => {
    it("should have custom aria-label", () => {
      render(<Breadcrumb items={basicItems} ariaLabel="Page navigation" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Page navigation");
    });

    it("should have aria-current on current page", () => {
      render(<Breadcrumb items={basicItems} />);

      const currentItem = screen.getByText("Details").parentElement;
      expect(currentItem).toHaveAttribute("aria-current", "page");
    });

    it("should have aria-disabled on disabled items", () => {
      const itemsWithDisabled: BreadcrumbItem[] = [
        { key: "home", label: "Home", href: "/" },
        {
          key: "disabled",
          label: "Disabled",
          href: "/disabled",
          isDisabled: true,
        },
        { key: "details", label: "Details", isCurrent: true },
      ];

      render(<Breadcrumb items={itemsWithDisabled} />);

      const disabledItem = screen.getByText("Disabled").parentElement;
      expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    });

    it("should hide separators from screen readers", () => {
      const { container } = render(
        <Breadcrumb items={basicItems} separator="/" />
      );

      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
      separators.forEach((sep) => {
        expect(sep).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Breadcrumb items={basicItems} />);
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with icons", async () => {
      const { container } = render(<Breadcrumb items={itemsWithIcons} />);
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with collapsed items", async () => {
      const { container } = render(
        <Breadcrumb items={longPathItems} overflow="collapse" maxItems={3} />
      );
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with custom separator", async () => {
      const { container } = render(
        <Breadcrumb items={basicItems} separator=">" />
      );
      await expectNoA11yViolations(container);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty items array", () => {
      render(<Breadcrumb items={[]} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("should handle single item", () => {
      const singleItem: BreadcrumbItem[] = [
        { key: "home", label: "Home", isCurrent: true },
      ];

      render(<Breadcrumb items={singleItem} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Home").parentElement).toHaveAttribute(
        "aria-current",
        "page"
      );
    });

    it("should handle items without href", () => {
      const itemsWithoutHref: BreadcrumbItem[] = [
        { key: "home", label: "Home" },
        { key: "products", label: "Products" },
        { key: "details", label: "Details", isCurrent: true },
      ];

      render(<Breadcrumb items={itemsWithoutHref} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("should handle all disabled items", () => {
      const allDisabledItems: BreadcrumbItem[] = [
        { key: "home", label: "Home", isDisabled: true },
        { key: "products", label: "Products", isDisabled: true },
        { key: "details", label: "Details", isDisabled: true },
      ];

      render(<Breadcrumb items={allDisabledItems} />);

      expect(screen.getByText("Home").parentElement).toHaveAttribute(
        "aria-disabled",
        "true"
      );
      expect(screen.getByText("Products").parentElement).toHaveAttribute(
        "aria-disabled",
        "true"
      );
      expect(screen.getByText("Details").parentElement).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("should handle very long item labels", () => {
      const longLabelItems: BreadcrumbItem[] = [
        { key: "1", label: "This is a very long breadcrumb label", href: "/" },
        {
          key: "2",
          label: "Another extremely long breadcrumb label for testing",
          isCurrent: true,
        },
      ];

      render(<Breadcrumb items={longLabelItems} />);

      expect(
        screen.getByText("This is a very long breadcrumb label")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Another extremely long breadcrumb label for testing")
      ).toBeInTheDocument();
    });
  });

  describe("Custom Class Names", () => {
    it("should apply custom item className", () => {
      const { container } = render(
        <Breadcrumb items={basicItems} itemClassName="custom-item" />
      );

      const customItems = container.querySelectorAll(".custom-item");
      expect(customItems.length).toBeGreaterThan(0);
    });

    it("should apply custom separator className", () => {
      const { container } = render(
        <Breadcrumb items={basicItems} separatorClassName="custom-separator" />
      );

      const customSeparators = container.querySelectorAll(".custom-separator");
      expect(customSeparators.length).toBeGreaterThan(0);
    });
  });
});
