import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../utils/test-helpers";
import { Accordion, AccordionItemProps } from "./Accordion";

const basicItems: AccordionItemProps[] = [
  {
    key: "1",
    title: "Item 1",
    content: "Content 1",
  },
  {
    key: "2",
    title: "Item 2",
    content: "Content 2",
  },
  {
    key: "3",
    title: "Item 3",
    content: "Content 3",
  },
];

describe("Accordion", () => {
  describe("Rendering", () => {
    it("renders the Accordion component", () => {
      render(<Accordion items={basicItems} />);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(
        <Accordion items={basicItems} className="custom-accordion" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("custom-accordion");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Accordion items={basicItems} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders items with subtitles", () => {
      const itemsWithSubtitles: AccordionItemProps[] = [
        {
          key: "1",
          title: "Title 1",
          subtitle: "Subtitle 1",
          content: "Content 1",
        },
      ];

      render(<Accordion items={itemsWithSubtitles} />);

      expect(screen.getByText("Title 1")).toBeInTheDocument();
      expect(screen.getByText("Subtitle 1")).toBeInTheDocument();
    });

    it("renders items with icons", () => {
      const itemsWithIcons: AccordionItemProps[] = [
        {
          key: "1",
          title: "Title 1",
          icon: <span data-testid="custom-icon">★</span>,
          content: "Content 1",
        },
      ];

      render(<Accordion items={itemsWithIcons} />);

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders with default variant", () => {
      const { container } = render(
        <Accordion items={basicItems} variant="default" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--default");
    });

    it("renders with bordered variant", () => {
      const { container } = render(
        <Accordion items={basicItems} variant="bordered" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--bordered");
    });

    it("renders with shadow variant", () => {
      const { container } = render(
        <Accordion items={basicItems} variant="shadow" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--shadow");
    });

    it("renders with splitted variant", () => {
      const { container } = render(
        <Accordion items={basicItems} variant="splitted" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--splitted");
    });
  });

  describe("Sizes", () => {
    it("renders with small size", () => {
      const { container } = render(<Accordion items={basicItems} size="sm" />);

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--sm");
    });

    it("renders with medium size", () => {
      const { container } = render(<Accordion items={basicItems} size="md" />);

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--md");
    });

    it("renders with large size", () => {
      const { container } = render(<Accordion items={basicItems} size="lg" />);

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--lg");
    });
  });

  describe("Colors", () => {
    it("renders with default color", () => {
      const { container } = render(
        <Accordion items={basicItems} color="default" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--default");
    });

    it("renders with primary color", () => {
      const { container } = render(
        <Accordion items={basicItems} color="primary" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--primary");
    });

    it("renders with secondary color", () => {
      const { container } = render(
        <Accordion items={basicItems} color="secondary" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--secondary");
    });

    it("renders with success color", () => {
      const { container } = render(
        <Accordion items={basicItems} color="success" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--success");
    });

    it("renders with warning color", () => {
      const { container } = render(
        <Accordion items={basicItems} color="warning" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--warning");
    });

    it("renders with danger color", () => {
      const { container } = render(
        <Accordion items={basicItems} color="danger" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--danger");
    });
  });

  describe("Single Expansion Mode", () => {
    it("allows only one item to be expanded at a time", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} selectionMode="single" />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      // Expand first item
      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 1")).toBeInTheDocument();

      // Expand second item (should close first)
      await user.click(button2);
      expect(button1).toHaveAttribute("aria-expanded", "false");
      expect(button2).toHaveAttribute("aria-expanded", "true");
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("can collapse the expanded item", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} selectionMode="single" />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });

      // Expand item
      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "true");

      // Collapse item
      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "false");
    });

    it("respects defaultExpandedKeys in single mode", () => {
      render(
        <Accordion
          items={basicItems}
          selectionMode="single"
          defaultExpandedKeys="2"
        />
      );

      const button2 = screen.getByRole("button", { name: /Item 2/i });
      expect(button2).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });

  describe("Multiple Expansion Mode", () => {
    it("allows multiple items to be expanded at once", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} selectionMode="multiple" />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      // Expand first item
      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 1")).toBeInTheDocument();

      // Expand second item (first should remain open)
      await user.click(button2);
      expect(button1).toHaveAttribute("aria-expanded", "true");
      expect(button2).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("can collapse individual items", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} selectionMode="multiple" />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      // Expand both items
      await user.click(button1);
      await user.click(button2);

      // Collapse first item (second should remain open)
      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "false");
      expect(button2).toHaveAttribute("aria-expanded", "true");
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("respects defaultExpandedKeys in multiple mode", () => {
      render(
        <Accordion
          items={basicItems}
          selectionMode="multiple"
          defaultExpandedKeys={["1", "2"]}
        />
      );

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      expect(button1).toHaveAttribute("aria-expanded", "true");
      expect(button2).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("works in controlled single expansion mode", async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();

      render(
        <Accordion
          items={basicItems}
          selectionMode="single"
          expandedKeys="1"
          onExpandedChange={onExpandedChange}
        />
      );

      const button2 = screen.getByRole("button", { name: /Item 2/i });
      await user.click(button2);

      expect(onExpandedChange).toHaveBeenCalledWith("2");
    });

    it("works in controlled multiple expansion mode", async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();

      render(
        <Accordion
          items={basicItems}
          selectionMode="multiple"
          expandedKeys={["1"]}
          onExpandedChange={onExpandedChange}
        />
      );

      const button2 = screen.getByRole("button", { name: /Item 2/i });
      await user.click(button2);

      expect(onExpandedChange).toHaveBeenCalledWith(["1", "2"]);
    });

    it("collapses item in controlled single mode", async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();

      render(
        <Accordion
          items={basicItems}
          selectionMode="single"
          expandedKeys="1"
          onExpandedChange={onExpandedChange}
        />
      );

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      await user.click(button1);

      expect(onExpandedChange).toHaveBeenCalledWith("");
    });

    it("collapses item in controlled multiple mode", async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();

      render(
        <Accordion
          items={basicItems}
          selectionMode="multiple"
          expandedKeys={["1", "2"]}
          onExpandedChange={onExpandedChange}
        />
      );

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      await user.click(button1);

      expect(onExpandedChange).toHaveBeenCalledWith(["2"]);
    });
  });

  describe("Disabled Items", () => {
    const itemsWithDisabled: AccordionItemProps[] = [
      { key: "1", title: "Item 1", content: "Content 1" },
      { key: "2", title: "Item 2", content: "Content 2", disabled: true },
      { key: "3", title: "Item 3", content: "Content 3" },
    ];

    it("renders disabled items correctly", () => {
      render(<Accordion items={itemsWithDisabled} />);

      const button2 = screen.getByRole("button", { name: /Item 2/i });
      expect(button2).toBeDisabled();
      expect(button2).toHaveAttribute("aria-disabled", "true");
    });

    it("does not expand disabled items when clicked", async () => {
      const user = userEvent.setup();
      render(<Accordion items={itemsWithDisabled} />);

      const button2 = screen.getByRole("button", { name: /Item 2/i });

      // Try to click disabled item
      await user.click(button2);

      expect(button2).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates to next item with Arrow Down", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      button1.focus();
      await user.keyboard("{ArrowDown}");

      expect(button2).toHaveFocus();
    });

    it("navigates to previous item with Arrow Up", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      button2.focus();
      await user.keyboard("{ArrowUp}");

      expect(button1).toHaveFocus();
    });

    it("wraps to first item when Arrow Down at last item", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button3 = screen.getByRole("button", { name: /Item 3/i });

      button3.focus();
      await user.keyboard("{ArrowDown}");

      expect(button1).toHaveFocus();
    });

    it("wraps to last item when Arrow Up at first item", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button3 = screen.getByRole("button", { name: /Item 3/i });

      button1.focus();
      await user.keyboard("{ArrowUp}");

      expect(button3).toHaveFocus();
    });

    it("navigates to first item with Home key", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button3 = screen.getByRole("button", { name: /Item 3/i });

      button3.focus();
      await user.keyboard("{Home}");

      expect(button1).toHaveFocus();
    });

    it("navigates to last item with End key", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button3 = screen.getByRole("button", { name: /Item 3/i });

      button1.focus();
      await user.keyboard("{End}");

      expect(button3).toHaveFocus();
    });

    it("skips disabled items during navigation", async () => {
      const user = userEvent.setup();
      const itemsWithDisabled: AccordionItemProps[] = [
        { key: "1", title: "Item 1", content: "Content 1" },
        { key: "2", title: "Item 2", content: "Content 2", disabled: true },
        { key: "3", title: "Item 3", content: "Content 3" },
      ];

      render(<Accordion items={itemsWithDisabled} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button3 = screen.getByRole("button", { name: /Item 3/i });

      button1.focus();
      await user.keyboard("{ArrowDown}");

      expect(button3).toHaveFocus();
    });

    it("respects disableKeyboardNavigation prop", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} disableKeyboardNavigation={true} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      const button2 = screen.getByRole("button", { name: /Item 2/i });

      button1.focus();
      await user.keyboard("{ArrowDown}");

      // Button 2 should not have focus
      expect(button2).not.toHaveFocus();
    });
  });

  describe("Custom Icons", () => {
    it("renders custom expand icon", () => {
      const expandIcon = <span data-testid="expand-icon">+</span>;

      render(<Accordion items={basicItems} expandIcon={expandIcon} />);

      expect(screen.getAllByTestId("expand-icon")).toHaveLength(3);
    });

    it("renders custom collapse icon when expanded", async () => {
      const user = userEvent.setup();
      const collapseIcon = <span data-testid="collapse-icon">-</span>;

      render(<Accordion items={basicItems} collapseIcon={collapseIcon} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      await user.click(button1);

      expect(screen.getByTestId("collapse-icon")).toBeInTheDocument();
    });
  });

  describe("Keep Mounted", () => {
    it("keeps content in DOM when collapsed with keepMounted", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} keepMounted={true} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });

      // Content should be in DOM but hidden
      const content = screen.getByText("Content 1").closest("[role='region']");
      expect(content).toHaveAttribute("hidden");

      // Expand item
      await user.click(button1);
      expect(content).not.toHaveAttribute("hidden");
    });

    it("removes content from DOM when collapsed without keepMounted", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} keepMounted={false} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });

      // Content should not be in DOM
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();

      // Expand item
      await user.click(button1);
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });
  });

  describe("ARIA Attributes", () => {
    it("has proper ARIA attributes on buttons", () => {
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });

      expect(button1).toHaveAttribute("aria-expanded", "false");
      expect(button1).toHaveAttribute("aria-controls");
    });

    it("has proper ARIA attributes on panels", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      await user.click(button1);

      const panel = screen.getByText("Content 1").closest("[role='region']");
      expect(panel).toHaveAttribute("role", "region");
      expect(panel).toHaveAttribute("aria-labelledby");
    });

    it("updates aria-expanded when toggled", async () => {
      const user = userEvent.setup();
      render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });

      expect(button1).toHaveAttribute("aria-expanded", "false");

      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "true");

      await user.click(button1);
      expect(button1).toHaveAttribute("aria-expanded", "false");
    });

    it("applies aria-label to accordion", () => {
      const { container } = render(
        <Accordion items={basicItems} ariaLabel="FAQ Section" />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion).toHaveAttribute("aria-label", "FAQ Section");
    });
  });

  describe("Show Divider", () => {
    it("applies no-divider class when showDivider is false", () => {
      const { container } = render(
        <Accordion items={basicItems} showDivider={false} />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("accordion--no-divider");
    });

    it("does not apply no-divider class when showDivider is true", () => {
      const { container } = render(
        <Accordion items={basicItems} showDivider={true} />
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).not.toContain("accordion--no-divider");
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Accordion items={basicItems} />);
      await expectNoA11yViolations(container);
    });

    it("has no accessibility violations when expanded", async () => {
      const user = userEvent.setup();
      const { container } = render(<Accordion items={basicItems} />);

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      await user.click(button1);

      await expectNoA11yViolations(container);
    });

    it("has no accessibility violations with disabled items", async () => {
      const itemsWithDisabled: AccordionItemProps[] = [
        { key: "1", title: "Item 1", content: "Content 1" },
        { key: "2", title: "Item 2", content: "Content 2", disabled: true },
      ];

      const { container } = render(<Accordion items={itemsWithDisabled} />);
      await expectNoA11yViolations(container);
    });
  });

  describe("Custom Class Names", () => {
    it("applies custom header className", () => {
      render(
        <Accordion
          items={basicItems}
          itemHeaderClassName="custom-header-class"
        />
      );

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      expect(button1.className).toContain("custom-header-class");
    });

    it("applies custom content className", async () => {
      const user = userEvent.setup();
      render(
        <Accordion
          items={basicItems}
          itemContentClassName="custom-content-class"
        />
      );

      const button1 = screen.getByRole("button", { name: /Item 1/i });
      await user.click(button1);

      const content = screen.getByText("Content 1").closest("[role='region']");
      expect(content?.className).toContain("custom-content-class");
    });
  });
});
