import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Select, SelectOption } from "./Select";
import { expectNoA11yViolations } from "../../utils/test-helpers";

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

const fruitOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

const optionsWithDisabled: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive", disabled: true },
];

describe("Select Accessibility Tests", () => {
  describe("Basic Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <Select options={fruitOptions} placeholder="Select a fruit" />
      );
      await expectNoA11yViolations(container);
    });

    it("should render with proper combobox role", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should have accessible name from label", () => {
      render(
        <Select
          options={fruitOptions}
          label="Favorite Fruit"
          placeholder="Select a fruit"
        />
      );
      expect(
        screen.getByRole("combobox", { name: /favorite fruit/i })
      ).toBeInTheDocument();
    });

    it("should have proper aria-expanded attribute", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-expanded", "false");
    });

    it("should update aria-expanded when opened", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      expect(combobox).toHaveAttribute("aria-expanded", "true");
    });

    it("should have proper aria-disabled attribute", () => {
      render(
        <Select options={fruitOptions} disabled placeholder="Select a fruit" />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("should have proper aria-required attribute", () => {
      render(
        <Select options={fruitOptions} required placeholder="Select a fruit" />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-required",
        "true"
      );
    });

    it("should have proper aria-invalid attribute when error", () => {
      render(
        <Select
          options={fruitOptions}
          status="error"
          placeholder="Select a fruit"
        />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });
  });

  describe("Label and Description Accessibility", () => {
    it("should associate label with control", () => {
      render(
        <Select
          options={fruitOptions}
          label="Favorite Fruit"
          placeholder="Select a fruit"
        />
      );
      const combobox = screen.getByRole("combobox");
      const labelId = combobox.getAttribute("aria-labelledby");
      expect(labelId).toBeTruthy();
      expect(document.getElementById(labelId!)).toHaveTextContent(
        "Favorite Fruit"
      );
    });

    it("should show required indicator", () => {
      render(
        <Select
          options={fruitOptions}
          label="Favorite Fruit"
          required
          placeholder="Select a fruit"
        />
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Dropdown Accessibility", () => {
    it("should render listbox when opened", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("should render options with proper role", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4);
    });

    it("should mark selected option as aria-selected", () => {
      render(
        <Select
          options={fruitOptions}
          defaultValue="apple"
          placeholder="Select a fruit"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      const appleOption = screen.getByRole("option", { name: /apple/i });
      expect(appleOption).toHaveAttribute("aria-selected", "true");
    });

    it("should mark disabled options as aria-disabled", () => {
      render(
        <Select options={optionsWithDisabled} placeholder="Select status" />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      const inactiveOption = screen.getByRole("option", { name: /inactive/i });
      expect(inactiveOption).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Multi-select Accessibility", () => {
    it("should have aria-multiselectable for multi-select", () => {
      render(
        <Select options={fruitOptions} isMulti placeholder="Select fruits" />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    });
  });

  describe("Size Variants Accessibility", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      it(`should not have accessibility violations with ${size} size`, async () => {
        const { container } = render(
          <Select options={fruitOptions} size={size} placeholder="Select" />
        );
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Status Variants Accessibility", () => {
    it("should have alert role for error message", () => {
      render(
        <Select
          options={fruitOptions}
          status="error"
          errorMessage="Please select an option"
          placeholder="Select"
        />
      );
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Please select an option"
      );
    });
  });
});

describe("Select Functional Tests", () => {
  describe("Basic Rendering", () => {
    it("should render placeholder", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      expect(screen.getByText("Select a fruit")).toBeInTheDocument();
    });

    it("should render label", () => {
      render(
        <Select
          options={fruitOptions}
          label="Favorite Fruit"
          placeholder="Select"
        />
      );
      expect(screen.getByText("Favorite Fruit")).toBeInTheDocument();
    });

    it("should render description", () => {
      render(
        <Select
          options={fruitOptions}
          description="Pick your favorite"
          placeholder="Select"
        />
      );
      expect(screen.getByText("Pick your favorite")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <Select
          options={fruitOptions}
          helperText="Helper text here"
          placeholder="Select"
        />
      );
      expect(screen.getByText("Helper text here")).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(
        <Select
          options={fruitOptions}
          status="error"
          errorMessage="Error occurred"
          placeholder="Select"
        />
      );
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
    });

    it("should render success message", () => {
      render(
        <Select
          options={fruitOptions}
          status="success"
          successMessage="Looks good!"
          placeholder="Select"
        />
      );
      expect(screen.getByText("Looks good!")).toBeInTheDocument();
    });
  });

  describe("Single Selection", () => {
    it("should open dropdown on click", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("should select option on click", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const appleOption = screen.getByRole("option", { name: /apple/i });
      fireEvent.click(appleOption);

      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("should close dropdown after selection", () => {
      render(<Select options={fruitOptions} placeholder="Select a fruit" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const appleOption = screen.getByRole("option", { name: /apple/i });
      fireEvent.click(appleOption);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should call onChange with selected value", () => {
      const onChange = vi.fn();
      render(
        <Select
          options={fruitOptions}
          onChange={onChange}
          placeholder="Select"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const appleOption = screen.getByRole("option", { name: /apple/i });
      fireEvent.click(appleOption);

      expect(onChange).toHaveBeenCalledWith("apple");
    });

    it("should support default value", () => {
      render(
        <Select
          options={fruitOptions}
          defaultValue="banana"
          placeholder="Select"
        />
      );
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("should support controlled value", () => {
      const { rerender } = render(
        <Select options={fruitOptions} value="apple" placeholder="Select" />
      );
      expect(screen.getByText("Apple")).toBeInTheDocument();

      rerender(
        <Select options={fruitOptions} value="banana" placeholder="Select" />
      );
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });

  describe("Multi-Select", () => {
    it("should select multiple options", () => {
      render(
        <Select options={fruitOptions} isMulti placeholder="Select fruits" />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      fireEvent.click(screen.getByRole("option", { name: /apple/i }));
      fireEvent.click(screen.getByRole("option", { name: /banana/i }));

      // Check that both appear as selected tags
      const appleTags = screen.getAllByText("Apple");
      const bananaTags = screen.getAllByText("Banana");
      expect(appleTags.length).toBeGreaterThan(0);
      expect(bananaTags.length).toBeGreaterThan(0);
    });

    it("should deselect option on second click", () => {
      render(
        <Select options={fruitOptions} isMulti placeholder="Select fruits" />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const appleOption = screen.getByRole("option", { name: /apple/i });
      fireEvent.click(appleOption);
      fireEvent.click(appleOption);

      // Apple should be removed from selected values
      const tags = screen.queryAllByText("Apple");
      // Should only appear in the dropdown, not as a selected tag
      expect(tags.length).toBe(1);
    });

    it("should keep dropdown open after selection by default", () => {
      render(
        <Select options={fruitOptions} isMulti placeholder="Select fruits" />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      fireEvent.click(screen.getByRole("option", { name: /apple/i }));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("should close dropdown after selection when closeOnSelect is true", () => {
      render(
        <Select
          options={fruitOptions}
          isMulti
          closeOnSelect
          placeholder="Select fruits"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      fireEvent.click(screen.getByRole("option", { name: /apple/i }));

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should remove option using remove button", () => {
      render(
        <Select
          options={fruitOptions}
          isMulti
          defaultValue={["apple"]}
          placeholder="Select"
        />
      );

      const removeButton = screen.getByLabelText("Remove Apple");
      fireEvent.click(removeButton);

      // Apple should be removed
      expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should show search input when searchable", () => {
      render(
        <Select
          options={fruitOptions}
          isSearchable
          placeholder="Search fruits"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("should filter options based on search", async () => {
      render(
        <Select
          options={fruitOptions}
          isSearchable
          placeholder="Search fruits"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "app" } });

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.queryByText("Banana")).not.toBeInTheDocument();
      });
    });

    it("should call onSearchChange callback", () => {
      const onSearchChange = vi.fn();
      render(
        <Select
          options={fruitOptions}
          isSearchable
          onSearchChange={onSearchChange}
          placeholder="Search"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const searchInput = screen.getByPlaceholderText("Search...");
      fireEvent.change(searchInput, { target: { value: "app" } });

      expect(onSearchChange).toHaveBeenCalledWith("app");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should open dropdown on Enter key", () => {
      render(<Select options={fruitOptions} placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.keyDown(combobox, { key: "Enter" });

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("should open dropdown on Space key", () => {
      render(<Select options={fruitOptions} placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.keyDown(combobox, { key: " " });

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("should navigate down with ArrowDown", () => {
      render(<Select options={fruitOptions} placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      fireEvent.keyDown(combobox, { key: "ArrowDown" });

      // First option should be focused (check for CSS module class containing "focused")
      const options = screen.getAllByRole("option");
      expect(options[0].className).toContain("focused");
    });

    it("should close dropdown on Escape", () => {
      render(<Select options={fruitOptions} placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      fireEvent.keyDown(combobox, { key: "Escape" });

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should select focused option on Enter", () => {
      render(<Select options={fruitOptions} placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      fireEvent.keyDown(combobox, { key: "ArrowDown" });
      fireEvent.keyDown(combobox, { key: "Enter" });

      expect(screen.getByText("Apple")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("should not open when disabled", () => {
      render(<Select options={fruitOptions} disabled placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should not allow keyboard interaction when disabled", () => {
      render(<Select options={fruitOptions} disabled placeholder="Select" />);
      const combobox = screen.getByRole("combobox");

      fireEvent.keyDown(combobox, { key: "Enter" });

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should not select disabled options", () => {
      render(
        <Select options={optionsWithDisabled} placeholder="Select status" />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);
      const inactiveOption = screen.getByRole("option", { name: /inactive/i });
      fireEvent.click(inactiveOption);

      // Should still show placeholder, not "Inactive"
      expect(screen.getByText("Select status")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should show loading message", () => {
      render(
        <Select
          options={[]}
          isLoading
          loadingMessage="Loading..."
          placeholder="Select"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should show loading indicator", () => {
      render(<Select options={fruitOptions} isLoading placeholder="Select" />);

      // Loading spinner should be present (check for SVG with animation class)
      const spinner = document.querySelector('svg[class*="spinner"]');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show no options message", () => {
      render(
        <Select
          options={[]}
          noOptionsMessage="No fruits available"
          placeholder="Select"
        />
      );
      const combobox = screen.getByRole("combobox");

      fireEvent.click(combobox);

      expect(screen.getByText("No fruits available")).toBeInTheDocument();
    });
  });

  describe("Clear Functionality", () => {
    it("should show clear button when value is selected", () => {
      render(
        <Select
          options={fruitOptions}
          defaultValue="apple"
          placeholder="Select"
        />
      );

      expect(screen.getByLabelText("Clear selection")).toBeInTheDocument();
    });

    it("should clear value on clear button click", () => {
      render(
        <Select
          options={fruitOptions}
          defaultValue="apple"
          placeholder="Select a fruit"
        />
      );

      const clearButton = screen.getByLabelText("Clear selection");
      fireEvent.click(clearButton);

      expect(screen.getByText("Select a fruit")).toBeInTheDocument();
    });

    it("should not show clear button when disabled", () => {
      render(
        <Select
          options={fruitOptions}
          defaultValue="apple"
          disabled
          placeholder="Select"
        />
      );

      expect(
        screen.queryByLabelText("Clear selection")
      ).not.toBeInTheDocument();
    });
  });
});
