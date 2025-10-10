import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Pagination Accessibility Tests", () => {
  describe("Basic Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} />
      );
      await expectNoA11yViolations(container);
    });

    it("should render with proper navigation role", () => {
      render(<Pagination totalPages={10} currentPage={1} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should have accessible navigation label", () => {
      render(<Pagination totalPages={10} currentPage={1} />);
      expect(
        screen.getByRole("navigation", { name: "Pagination" })
      ).toBeInTheDocument();
    });

    it("should support custom aria-label", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          ariaLabel="Product list pagination"
        />
      );
      expect(
        screen.getByRole("navigation", { name: "Product list pagination" })
      ).toBeInTheDocument();
    });

    it("should have proper button roles and labels", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          showFirstLast
          showPrevNext
        />
      );

      expect(
        screen.getByRole("button", { name: "Go to first page" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to previous page" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to next page" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to last page" })
      ).toBeInTheDocument();
    });

    it("should mark current page with aria-current", () => {
      render(<Pagination totalPages={10} currentPage={5} />);
      const currentPageButton = screen.getByRole("button", {
        name: "Go to page 5",
      });
      expect(currentPageButton).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Size Variants Accessibility", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      it(`should not have accessibility violations with ${size} size`, async () => {
        const { container } = render(
          <Pagination size={size} totalPages={10} currentPage={1} />
        );
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Variant Accessibility", () => {
    const variants = ["default", "bordered", "light"] as const;

    variants.forEach((variant) => {
      it(`should not have accessibility violations with ${variant} variant`, async () => {
        const { container } = render(
          <Pagination variant={variant} totalPages={10} currentPage={1} />
        );
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Disabled State Accessibility", () => {
    it("should not have accessibility violations when disabled", async () => {
      const { container } = render(
        <Pagination disabled totalPages={10} currentPage={5} />
      );
      await expectNoA11yViolations(container);
    });

    it("should disable all navigation buttons when disabled", () => {
      render(
        <Pagination
          disabled
          totalPages={10}
          currentPage={5}
          showFirstLast
          showPrevNext
        />
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe("Items Per Page Accessibility", () => {
    it("should not have accessibility violations with items per page selector", async () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={1}
          showItemsPerPage
          itemsPerPage={10}
          totalItems={100}
        />
      );
      await expectNoA11yViolations(container);
    });

    it("should have proper label for items per page select", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          showItemsPerPage
          itemsPerPage={10}
          totalItems={100}
        />
      );

      const select = screen.getByLabelText("Items per page:");
      expect(select).toBeInTheDocument();
      expect(select).toHaveAttribute("aria-label", "Items per page");
    });
  });

  describe("Jump to Page Accessibility", () => {
    it("should not have accessibility violations with jump to page", async () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} showJumpToPage />
      );
      await expectNoA11yViolations(container);
    });

    it("should have proper labels for jump to page input", () => {
      render(<Pagination totalPages={10} currentPage={1} showJumpToPage />);

      const input = screen.getByLabelText("Go to page:");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-label", "Jump to page number");
    });

    it("should have proper label for jump button", () => {
      render(<Pagination totalPages={10} currentPage={1} showJumpToPage />);

      const button = screen.getByRole("button", { name: "Jump to page" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should navigate to previous page with ArrowLeft", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const pageButton = screen.getByRole("button", { name: "Go to page 5" });
      pageButton.focus();
      fireEvent.keyDown(pageButton, { key: "ArrowLeft" });

      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("should navigate to next page with ArrowRight", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const pageButton = screen.getByRole("button", { name: "Go to page 5" });
      pageButton.focus();
      fireEvent.keyDown(pageButton, { key: "ArrowRight" });

      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it("should navigate to first page with Home key", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const pageButton = screen.getByRole("button", { name: "Go to page 5" });
      pageButton.focus();
      fireEvent.keyDown(pageButton, { key: "Home" });

      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("should navigate to last page with End key", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const pageButton = screen.getByRole("button", { name: "Go to page 5" });
      pageButton.focus();
      fireEvent.keyDown(pageButton, { key: "End" });

      expect(onPageChange).toHaveBeenCalledWith(10);
    });

    it("should not navigate when disabled", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
          disabled
        />
      );

      const pageButton = screen.getByRole("button", { name: "Go to page 5" });
      pageButton.focus();
      fireEvent.keyDown(pageButton, { key: "ArrowRight" });

      expect(onPageChange).not.toHaveBeenCalled();
    });
  });
});

describe("Pagination Functionality Tests", () => {
  describe("Basic Navigation", () => {
    it("should call onPageChange when page button is clicked", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          onPageChange={onPageChange}
        />
      );

      const page2Button = screen.getByRole("button", { name: "Go to page 2" });
      fireEvent.click(page2Button);

      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("should call onPageChange when previous button is clicked", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const prevButton = screen.getByRole("button", {
        name: "Go to previous page",
      });
      fireEvent.click(prevButton);

      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("should call onPageChange when next button is clicked", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const nextButton = screen.getByRole("button", {
        name: "Go to next page",
      });
      fireEvent.click(nextButton);

      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it("should call onPageChange when first button is clicked", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
          showFirstLast
        />
      );

      const firstButton = screen.getByRole("button", {
        name: "Go to first page",
      });
      fireEvent.click(firstButton);

      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("should call onPageChange when last button is clicked", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
          showFirstLast
        />
      );

      const lastButton = screen.getByRole("button", {
        name: "Go to last page",
      });
      fireEvent.click(lastButton);

      expect(onPageChange).toHaveBeenCalledWith(10);
    });

    it("should disable previous button on first page", () => {
      render(<Pagination totalPages={10} currentPage={1} />);

      const prevButton = screen.getByRole("button", {
        name: "Go to previous page",
      });
      expect(prevButton).toBeDisabled();
    });

    it("should disable next button on last page", () => {
      render(<Pagination totalPages={10} currentPage={10} />);

      const nextButton = screen.getByRole("button", {
        name: "Go to next page",
      });
      expect(nextButton).toBeDisabled();
    });

    it("should disable first button on first page", () => {
      render(<Pagination totalPages={10} currentPage={1} showFirstLast />);

      const firstButton = screen.getByRole("button", {
        name: "Go to first page",
      });
      expect(firstButton).toBeDisabled();
    });

    it("should disable last button on last page", () => {
      render(<Pagination totalPages={10} currentPage={10} showFirstLast />);

      const lastButton = screen.getByRole("button", {
        name: "Go to last page",
      });
      expect(lastButton).toBeDisabled();
    });

    it("should not call onPageChange when clicking current page", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={onPageChange}
        />
      );

      const currentPageButton = screen.getByRole("button", {
        name: "Go to page 5",
      });
      fireEvent.click(currentPageButton);

      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("Page Range Generation", () => {
    it("should show all pages when total is small", () => {
      render(<Pagination totalPages={5} currentPage={3} />);

      for (let i = 1; i <= 5; i++) {
        expect(
          screen.getByRole("button", { name: `Go to page ${i}` })
        ).toBeInTheDocument();
      }
    });

    it("should show ellipsis for large page counts", () => {
      render(<Pagination totalPages={20} currentPage={10} />);

      const ellipsis = screen.getAllByText("...");
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it("should respect siblings prop", () => {
      render(<Pagination totalPages={20} currentPage={10} siblings={2} />);

      // Should show pages 8, 9, 10, 11, 12 (current ± 2 siblings)
      for (let i = 8; i <= 12; i++) {
        expect(
          screen.getByRole("button", { name: `Go to page ${i}` })
        ).toBeInTheDocument();
      }
    });

    it("should respect boundaries prop", () => {
      render(<Pagination totalPages={20} currentPage={10} boundaries={2} />);

      // Should show pages 1, 2 and 19, 20 (2 boundaries on each side)
      expect(
        screen.getByRole("button", { name: "Go to page 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to page 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to page 19" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to page 20" })
      ).toBeInTheDocument();
    });
  });

  describe("Items Per Page", () => {
    it("should display items range when totalItems and itemsPerPage are provided", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={2}
          totalItems={100}
          itemsPerPage={10}
        />
      );

      expect(screen.getByText("11-20 of 100")).toBeInTheDocument();
    });

    it("should call onItemsPerPageChange when select changes", async () => {
      const onItemsPerPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          totalItems={100}
          itemsPerPage={10}
          showItemsPerPage
          itemsPerPageOptions={[10, 20, 50]}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      );

      const select = screen.getByLabelText("Items per page:");
      fireEvent.change(select, { target: { value: "20" } });

      expect(onItemsPerPageChange).toHaveBeenCalledWith(20);
    });

    it("should render correct options in items per page select", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          totalItems={100}
          itemsPerPage={10}
          showItemsPerPage
          itemsPerPageOptions={[10, 20, 50, 100]}
        />
      );

      const select = screen.getByLabelText("Items per page:");
      const options = select.querySelectorAll("option");

      expect(options).toHaveLength(4);
      expect(options[0]).toHaveValue("10");
      expect(options[1]).toHaveValue("20");
      expect(options[2]).toHaveValue("50");
      expect(options[3]).toHaveValue("100");
    });
  });

  describe("Jump to Page", () => {
    it("should navigate to specified page when form is submitted", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={100}
          currentPage={1}
          onPageChange={onPageChange}
          showJumpToPage
        />
      );

      const input = screen.getByLabelText("Go to page:");
      const button = screen.getByRole("button", { name: "Jump to page" });

      fireEvent.change(input, { target: { value: "50" } });
      fireEvent.click(button);

      expect(onPageChange).toHaveBeenCalledWith(50);
    });

    it("should clear input after successful jump", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={100}
          currentPage={1}
          onPageChange={onPageChange}
          showJumpToPage
        />
      );

      const input = screen.getByLabelText("Go to page:") as HTMLInputElement;
      const button = screen.getByRole("button", { name: "Jump to page" });

      fireEvent.change(input, { target: { value: "50" } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });

    it("should not navigate if page number is out of range", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          onPageChange={onPageChange}
          showJumpToPage
        />
      );

      const input = screen.getByLabelText("Go to page:");
      const button = screen.getByRole("button", { name: "Jump to page" });

      fireEvent.change(input, { target: { value: "20" } });
      fireEvent.click(button);

      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("should not navigate if input is not a valid number", async () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          totalPages={10}
          currentPage={1}
          onPageChange={onPageChange}
          showJumpToPage
        />
      );

      const input = screen.getByLabelText("Go to page:");
      const button = screen.getByRole("button", { name: "Jump to page" });

      fireEvent.change(input, { target: { value: "abc" } });
      fireEvent.click(button);

      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("should disable jump button when input is empty", () => {
      render(<Pagination totalPages={10} currentPage={1} showJumpToPage />);

      const button = screen.getByRole("button", { name: "Jump to page" });
      expect(button).toBeDisabled();
    });
  });

  describe("Custom Labels", () => {
    it("should render custom previous label", () => {
      render(
        <Pagination totalPages={10} currentPage={5} previousLabel="Prev" />
      );

      const prevButton = screen.getByRole("button", {
        name: "Go to previous page",
      });
      expect(prevButton).toHaveTextContent("Prev");
    });

    it("should render custom next label", () => {
      render(<Pagination totalPages={10} currentPage={5} nextLabel="Next" />);

      const nextButton = screen.getByRole("button", {
        name: "Go to next page",
      });
      expect(nextButton).toHaveTextContent("Next");
    });

    it("should render custom first label", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          showFirstLast
          firstLabel="First"
        />
      );

      const firstButton = screen.getByRole("button", {
        name: "Go to first page",
      });
      expect(firstButton).toHaveTextContent("First");
    });

    it("should render custom last label", () => {
      render(
        <Pagination
          totalPages={10}
          currentPage={5}
          showFirstLast
          lastLabel="Last"
        />
      );

      const lastButton = screen.getByRole("button", {
        name: "Go to last page",
      });
      expect(lastButton).toHaveTextContent("Last");
    });
  });

  describe("Edge Cases", () => {
    it("should handle single page", () => {
      render(<Pagination totalPages={1} currentPage={1} />);

      const prevButton = screen.getByRole("button", {
        name: "Go to previous page",
      });
      const nextButton = screen.getByRole("button", {
        name: "Go to next page",
      });

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });

    it("should handle totalPages equal to currentPage", () => {
      render(<Pagination totalPages={5} currentPage={5} />);

      const nextButton = screen.getByRole("button", {
        name: "Go to next page",
      });
      expect(nextButton).toBeDisabled();
    });

    it("should not render prev/next buttons when showPrevNext is false", () => {
      render(
        <Pagination totalPages={10} currentPage={5} showPrevNext={false} />
      );

      expect(
        screen.queryByRole("button", { name: "Go to previous page" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Go to next page" })
      ).not.toBeInTheDocument();
    });

    it("should not render first/last buttons by default", () => {
      render(<Pagination totalPages={10} currentPage={5} />);

      expect(
        screen.queryByRole("button", { name: "Go to first page" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Go to last page" })
      ).not.toBeInTheDocument();
    });
  });

  describe("Visual Variants", () => {
    it("should render with default variant class", () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} variant="default" />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("pagination--default");
    });

    it("should render with bordered variant class", () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} variant="bordered" />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("pagination--bordered");
    });

    it("should render with light variant class", () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} variant="light" />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("pagination--light");
    });
  });

  describe("Size Variants", () => {
    it("should render with small size class", () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} size="sm" />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("pagination--sm");
    });

    it("should render with medium size class", () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} size="md" />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("pagination--md");
    });

    it("should render with large size class", () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} size="lg" />
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("pagination--lg");
    });
  });
});
