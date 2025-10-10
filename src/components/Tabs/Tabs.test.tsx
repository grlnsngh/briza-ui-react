import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabItem } from "./Tabs";
import { expectNoA11yViolations } from "../../utils/test-helpers";

const sampleItems: TabItem[] = [
  {
    key: "tab1",
    label: "Tab 1",
    content: <div>Content 1</div>,
  },
  {
    key: "tab2",
    label: "Tab 2",
    content: <div>Content 2</div>,
  },
  {
    key: "tab3",
    label: "Tab 3",
    content: <div>Content 3</div>,
  },
];

const itemsWithDisabled: TabItem[] = [
  {
    key: "tab1",
    label: "Tab 1",
    content: <div>Content 1</div>,
  },
  {
    key: "tab2",
    label: "Tab 2",
    content: <div>Content 2</div>,
    disabled: true,
  },
  {
    key: "tab3",
    label: "Tab 3",
    content: <div>Content 3</div>,
  },
];

describe("Tabs Component", () => {
  describe("Basic Rendering", () => {
    it("should render tabs with correct roles", () => {
      render(<Tabs items={sampleItems} />);

      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.getAllByRole("tab")).toHaveLength(3);
      expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
    });

    it("should render tab labels correctly", () => {
      render(<Tabs items={sampleItems} />);

      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
    });

    it("should render first tab as selected by default", () => {
      render(<Tabs items={sampleItems} />);

      const firstTab = screen.getByRole("tab", { name: "Tab 1" });
      expect(firstTab).toHaveAttribute("aria-selected", "true");
      expect(firstTab).toHaveAttribute("tabIndex", "0");
    });

    it("should show content of selected tab", () => {
      render(<Tabs items={sampleItems} />);

      expect(screen.getByText("Content 1")).toBeVisible();
      expect(screen.getByText("Content 2")).not.toBeVisible();
      expect(screen.getByText("Content 3")).not.toBeVisible();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Tabs items={sampleItems} className="custom-class" />
      );

      const tabsElement = container.querySelector(".custom-class");
      expect(tabsElement).toBeInTheDocument();
    });
  });

  describe("Tab Selection", () => {
    it("should select tab on click", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 2")).toBeVisible();
      expect(screen.getByText("Content 1")).not.toBeVisible();
    });

    it("should call onSelectionChange callback", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <Tabs items={sampleItems} onSelectionChange={onSelectionChange} />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(onSelectionChange).toHaveBeenCalledWith("tab2");
    });

    it("should not select disabled tab", async () => {
      const user = userEvent.setup();
      render(<Tabs items={itemsWithDisabled} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(tab2).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Controlled Mode", () => {
    it("should use controlled selectedKey prop", () => {
      render(<Tabs items={sampleItems} selectedKey="tab2" />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 2")).toBeVisible();
    });

    it("should update when controlled selectedKey changes", () => {
      const { rerender } = render(
        <Tabs items={sampleItems} selectedKey="tab1" />
      );

      expect(screen.getByText("Content 1")).toBeVisible();

      rerender(<Tabs items={sampleItems} selectedKey="tab3" />);

      expect(screen.getByText("Content 3")).toBeVisible();
    });

    it("should work with defaultSelectedKey", () => {
      render(<Tabs items={sampleItems} defaultSelectedKey="tab3" />);

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 3")).toBeVisible();
    });
  });

  describe("Keyboard Navigation - Horizontal", () => {
    it("should navigate to next tab with ArrowRight", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} orientation="horizontal" />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveFocus();
    });

    it("should navigate to previous tab with ArrowLeft", async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          items={sampleItems}
          orientation="horizontal"
          defaultSelectedKey="tab2"
        />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      tab2.focus();

      await user.keyboard("{ArrowLeft}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveFocus();
    });

    it("should wrap around to last tab when pressing ArrowLeft on first tab", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} orientation="horizontal" />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowLeft}");

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });

    it("should wrap around to first tab when pressing ArrowRight on last tab", async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          items={sampleItems}
          orientation="horizontal"
          defaultSelectedKey="tab3"
        />
      );

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      tab3.focus();

      await user.keyboard("{ArrowRight}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });

    it("should jump to first tab with Home key", async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          items={sampleItems}
          orientation="horizontal"
          defaultSelectedKey="tab3"
        />
      );

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      tab3.focus();

      await user.keyboard("{Home}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveFocus();
    });

    it("should jump to last tab with End key", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} orientation="horizontal" />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{End}");

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveAttribute("aria-selected", "true");
      expect(tab3).toHaveFocus();
    });

    it("should skip disabled tabs during navigation", async () => {
      const user = userEvent.setup();
      render(<Tabs items={itemsWithDisabled} orientation="horizontal" />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      // Should skip tab2 (disabled) and go to tab3
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Keyboard Navigation - Vertical", () => {
    it("should navigate to next tab with ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} orientation="vertical" />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowDown}");

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveFocus();
    });

    it("should navigate to previous tab with ArrowUp", async () => {
      const user = userEvent.setup();
      render(
        <Tabs
          items={sampleItems}
          orientation="vertical"
          defaultSelectedKey="tab2"
        />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      tab2.focus();

      await user.keyboard("{ArrowUp}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab1).toHaveFocus();
    });

    it("should not respond to ArrowLeft/Right in vertical mode", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} orientation="vertical" />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      // Should still be on tab1
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Keyboard Navigation - Disabled", () => {
    it("should not navigate when disableKeyboardNavigation is true", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} disableKeyboardNavigation />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      // Should still be on tab1
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Lazy Loading", () => {
    it("should only render visited tabs when isLazy is true", async () => {
      const user = userEvent.setup();
      render(<Tabs items={sampleItems} isLazy />);

      // Initially only first tab content is rendered
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Content 3")).not.toBeInTheDocument();

      // Click tab 2
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      // Now content 2 should be rendered
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      // Content 1 should still be in DOM but hidden
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      // Content 3 still not rendered
      expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
    });

    it("should render all panels when isLazy is false", () => {
      render(<Tabs items={sampleItems} isLazy={false} />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.getByText("Content 3")).toBeInTheDocument();
    });

    it("should keep all panels mounted when keepMounted is true", () => {
      render(<Tabs items={sampleItems} keepMounted />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.getByText("Content 3")).toBeInTheDocument();
    });
  });

  describe("Orientation", () => {
    it("should set correct aria-orientation for horizontal", () => {
      render(<Tabs items={sampleItems} orientation="horizontal" />);

      const tablist = screen.getByRole("tablist");
      expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("should set correct aria-orientation for vertical", () => {
      render(<Tabs items={sampleItems} orientation="vertical" />);

      const tablist = screen.getByRole("tablist");
      expect(tablist).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("ARIA Attributes", () => {
    it("should have proper aria-label on tablist", () => {
      render(<Tabs items={sampleItems} ariaLabel="Navigation tabs" />);

      const tablist = screen.getByRole("tablist");
      expect(tablist).toHaveAttribute("aria-label", "Navigation tabs");
    });

    it("should have proper aria-controls and aria-labelledby", () => {
      render(<Tabs items={sampleItems} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const panel1 = screen.getByRole("tabpanel", { name: "Tab 1" });

      const tabId = tab1.getAttribute("id");
      const panelId = panel1.getAttribute("id");

      expect(tab1).toHaveAttribute("aria-controls", panelId!);
      expect(panel1).toHaveAttribute("aria-labelledby", tabId!);
    });

    it("should have aria-selected on selected tab only", () => {
      render(<Tabs items={sampleItems} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");
      expect(tab3).toHaveAttribute("aria-selected", "false");
    });

    it("should have aria-disabled on disabled tabs", () => {
      render(<Tabs items={itemsWithDisabled} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-disabled", "true");
      expect(tab2).toBeDisabled();
    });

    it("should have correct tabIndex values", () => {
      render(<Tabs items={sampleItems} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });

      expect(tab1).toHaveAttribute("tabIndex", "0");
      expect(tab2).toHaveAttribute("tabIndex", "-1");
      expect(tab3).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(<Tabs items={sampleItems} />);
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with disabled tabs", async () => {
      const { container } = render(<Tabs items={itemsWithDisabled} />);
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations in vertical orientation", async () => {
      const { container } = render(
        <Tabs items={sampleItems} orientation="vertical" />
      );
      await expectNoA11yViolations(container);
    });

    it("should not have accessibility violations with different variants", async () => {
      const { container } = render(
        <Tabs items={sampleItems} variant="underlined" />
      );
      await expectNoA11yViolations(container);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty items array", () => {
      render(<Tabs items={[]} />);
      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.queryAllByRole("tab")).toHaveLength(0);
    });

    it("should handle single tab", () => {
      const singleItem: TabItem[] = [
        {
          key: "only",
          label: "Only Tab",
          content: <div>Only Content</div>,
        },
      ];

      render(<Tabs items={singleItem} />);

      const tab = screen.getByRole("tab", { name: "Only Tab" });
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Only Content")).toBeVisible();
    });

    it("should handle all tabs disabled", () => {
      const allDisabled: TabItem[] = [
        {
          key: "tab1",
          label: "Tab 1",
          content: <div>Content 1</div>,
          disabled: true,
        },
        {
          key: "tab2",
          label: "Tab 2",
          content: <div>Content 2</div>,
          disabled: true,
        },
      ];

      render(<Tabs items={allDisabled} />);

      const tabs = screen.getAllByRole("tab");
      tabs.forEach((tab) => {
        expect(tab).toHaveAttribute("aria-disabled", "true");
      });
    });

    it("should render tabs with icons", () => {
      const itemsWithIcons: TabItem[] = [
        {
          key: "home",
          label: "Home",
          icon: "🏠",
          content: <div>Home Content</div>,
        },
      ];

      render(<Tabs items={itemsWithIcons} />);
      expect(screen.getByText("🏠")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  describe("Variants and Sizes", () => {
    it("should render with solid variant", () => {
      const { container } = render(
        <Tabs items={sampleItems} variant="solid" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with underlined variant", () => {
      const { container } = render(
        <Tabs items={sampleItems} variant="underlined" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with bordered variant", () => {
      const { container } = render(
        <Tabs items={sampleItems} variant="bordered" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with light variant", () => {
      const { container } = render(
        <Tabs items={sampleItems} variant="light" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with different sizes", () => {
      const { container: smallContainer } = render(
        <Tabs items={sampleItems} size="sm" />
      );
      const { container: mediumContainer } = render(
        <Tabs items={sampleItems} size="md" />
      );
      const { container: largeContainer } = render(
        <Tabs items={sampleItems} size="lg" />
      );

      expect(smallContainer.firstChild).toBeInTheDocument();
      expect(mediumContainer.firstChild).toBeInTheDocument();
      expect(largeContainer.firstChild).toBeInTheDocument();
    });

    it("should render with different colors", () => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ] as const;

      colors.forEach((color) => {
        const { container } = render(
          <Tabs items={sampleItems} color={color} />
        );
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });

  describe("Full Width", () => {
    it("should render with fullWidth prop", () => {
      const { container } = render(<Tabs items={sampleItems} fullWidth />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
