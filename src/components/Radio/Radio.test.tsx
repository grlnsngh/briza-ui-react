import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio, RadioGroup } from "./Radio";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Radio", () => {
  /* ============================================ */
  /* Accessibility Tests                         */
  /* ============================================ */

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <Radio label="Test Radio" name="test" value="test" />
      );
      await expectNoA11yViolations(container);
    });

    it("should have proper ARIA attributes", () => {
      render(
        <Radio
          label="Test Radio"
          name="test"
          value="test"
          required
          description="Test description"
        />
      );

      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute("required");
      expect(radio).toHaveAttribute("aria-describedby");
    });

    it("should properly associate label with radio", () => {
      render(<Radio label="Test Label" name="test" value="test" />);

      const radio = screen.getByRole("radio", { name: "Test Label" });
      expect(radio).toBeInTheDocument();
    });

    it("should have unique id when multiple radios are rendered", () => {
      render(
        <>
          <Radio label="Radio 1" name="test" value="1" />
          <Radio label="Radio 2" name="test" value="2" />
          <Radio label="Radio 3" name="test" value="3" />
        </>
      );

      const radios = screen.getAllByRole("radio");
      const ids = radios.map((radio) => radio.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(radios.length);
    });

    it("should support custom aria-label", () => {
      render(<Radio aria-label="Custom label" name="test" value="test" />);

      const radio = screen.getByLabelText("Custom label");
      expect(radio).toBeInTheDocument();
    });

    it("should have keyboard support (Space key)", async () => {
      const user = userEvent.setup();
      render(<Radio label="Test Radio" name="test" value="test" />);

      const radio = screen.getByRole("radio");
      await user.tab();
      expect(radio).toHaveFocus();

      await user.keyboard(" ");
      expect(radio).toBeChecked();
    });

    it("should not be interactive when disabled", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Radio
          label="Disabled"
          disabled
          onChange={onChange}
          name="test"
          value="test"
        />
      );

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(onChange).not.toHaveBeenCalled();
      expect(radio).not.toBeChecked();
    });

    it("should announce validation messages to screen readers", () => {
      const { rerender } = render(
        <Radio
          label="Test"
          status="error"
          errorMessage="This field has an error"
          name="test"
          value="test"
        />
      );

      let radio = screen.getByRole("radio");
      const errorMessage = screen.getByText("This field has an error");
      expect(radio).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining(errorMessage.id)
      );

      rerender(
        <Radio
          label="Test"
          status="success"
          successMessage="This field is valid"
          name="test"
          value="test"
        />
      );

      radio = screen.getByRole("radio");
      const successMessage = screen.getByText("This field is valid");
      expect(radio).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining(successMessage.id)
      );
    });

    it("should combine description and validation message ids in aria-describedby", () => {
      render(
        <Radio
          label="Test"
          description="Description text"
          status="error"
          errorMessage="Error text"
          name="test"
          value="test"
        />
      );

      const radio = screen.getByRole("radio");
      const describedBy = radio.getAttribute("aria-describedby");

      expect(describedBy).toContain(screen.getByText("Description text").id);
      expect(describedBy).toContain(screen.getByText("Error text").id);
    });
  });

  /* ============================================ */
  /* Rendering Tests                             */
  /* ============================================ */

  describe("Rendering", () => {
    it("should render with label", () => {
      render(<Radio label="Test Label" name="test" value="test" />);
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("should render without label when only aria-label is provided", () => {
      render(<Radio aria-label="Hidden label" name="test" value="test" />);
      expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
      expect(screen.getByLabelText("Hidden label")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(
        <Radio
          label="Test"
          description="Description text"
          name="test"
          value="test"
        />
      );
      expect(screen.getByText("Description text")).toBeInTheDocument();
    });

    it("should render with helper text", () => {
      render(
        <Radio label="Test" helperText="Helper text" name="test" value="test" />
      );
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should render with error message when status is error", () => {
      render(
        <Radio
          label="Test"
          status="error"
          errorMessage="Error message"
          name="test"
          value="test"
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("should render with success message when status is success", () => {
      render(
        <Radio
          label="Test"
          status="success"
          successMessage="Success message"
          name="test"
          value="test"
        />
      );
      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    it("should display required indicator when required", () => {
      render(
        <Radio label="Required Field" required name="test" value="test" />
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  /* ============================================ */
  /* Size Variants                              */
  /* ============================================ */

  describe("Size Variants", () => {
    it.each(["sm", "md", "lg"] as const)(
      "should render with %s size",
      (size) => {
        render(<Radio label="Test" size={size} name="test" value="test" />);
        const radio = screen.getByRole("radio");
        expect(radio.className).toContain(`input--${size}`);
      }
    );

    it("should default to md size when not specified", () => {
      render(<Radio label="Test" name="test" value="test" />);
      const radio = screen.getByRole("radio");
      expect(radio.className).toContain("input--md");
    });
  });

  /* ============================================ */
  /* Status Variants                            */
  /* ============================================ */

  describe("Status Variants", () => {
    it.each(["default", "error", "success"] as const)(
      "should render with %s status",
      (status) => {
        const { container } = render(
          <Radio label="Test" status={status} name="test" value="test" />
        );
        const input = container.querySelector('input[type="radio"]');
        expect(input?.className).toContain(`input--${status}`);
      }
    );
  });

  /* ============================================ */
  /* Interaction Tests                          */
  /* ============================================ */

  describe("Interactions", () => {
    it("should call onChange when clicked", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Radio label="Test" onChange={onChange} name="test" value="test" />
      );

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(radio).toBeChecked();
    });

    it("should not call onChange when disabled", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Radio
          label="Test"
          disabled
          onChange={onChange}
          name="test"
          value="test"
        />
      );

      const radio = screen.getByRole("radio");
      await user.click(radio);

      expect(onChange).not.toHaveBeenCalled();
      expect(radio).not.toBeChecked();
    });

    it("should be checked when defaultChecked is true", () => {
      render(<Radio label="Test" defaultChecked name="test" value="test" />);
      const radio = screen.getByRole("radio");
      expect(radio).toBeChecked();
    });

    it("should respect checked prop in controlled mode", () => {
      const { rerender } = render(
        <Radio
          label="Test"
          checked={false}
          onChange={vi.fn()}
          name="test"
          value="test"
        />
      );
      let radio = screen.getByRole("radio");
      expect(radio).not.toBeChecked();

      rerender(
        <Radio
          label="Test"
          checked={true}
          onChange={vi.fn()}
          name="test"
          value="test"
        />
      );
      radio = screen.getByRole("radio");
      expect(radio).toBeChecked();
    });
  });

  /* ============================================ */
  /* Controlled vs Uncontrolled                 */
  /* ============================================ */

  describe("Controlled vs Uncontrolled", () => {
    it("should work as uncontrolled component", async () => {
      const user = userEvent.setup();
      render(<Radio label="Uncontrolled" name="test" value="test" />);

      const radio = screen.getByRole("radio");
      expect(radio).not.toBeChecked();

      await user.click(radio);
      expect(radio).toBeChecked();
    });

    it("should work as controlled component", async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Radio
          label="Controlled"
          checked={false}
          onChange={onChange}
          name="test"
          value="test"
        />
      );

      let radio = screen.getByRole("radio");
      expect(radio).not.toBeChecked();

      rerender(
        <Radio
          label="Controlled"
          checked={true}
          onChange={onChange}
          name="test"
          value="test"
        />
      );

      radio = screen.getByRole("radio");
      expect(radio).toBeChecked();
    });
  });

  /* ============================================ */
  /* Ref Forwarding                             */
  /* ============================================ */

  describe("Ref Forwarding", () => {
    it("should forward ref to input element", () => {
      const ref = vi.fn();
      render(<Radio label="Test" ref={ref} name="test" value="test" />);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it("should allow programmatic focus via ref", () => {
      const ref = { current: null as HTMLInputElement | null };

      render(<Radio label="Test" ref={ref} name="test" value="test" />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });
});

/* ============================================ */
/* RadioGroup Tests                           */
/* ============================================ */

describe("RadioGroup", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  /* ============================================ */
  /* Accessibility Tests                         */
  /* ============================================ */

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <RadioGroup label="Test Group" options={options} />
      );
      await expectNoA11yViolations(container);
    });

    it("should have radiogroup role", () => {
      render(<RadioGroup label="Test Group" options={options} />);
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("should have proper ARIA attributes", () => {
      render(
        <RadioGroup
          label="Test Group"
          options={options}
          required
          description="Group description"
        />
      );

      const group = screen.getByRole("radiogroup");
      expect(group).toHaveAttribute("aria-describedby");
      expect(group).toHaveAttribute("aria-required", "true");
    });

    it("should associate radios with group label", () => {
      render(<RadioGroup label="Test Group" options={options} />);

      const group = screen.getByRole("radiogroup", { name: "Test Group" });
      expect(group).toBeInTheDocument();

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("should support arrow key navigation", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup label="Test Group" options={options} defaultValue="1" />
      );

      const radios = screen.getAllByRole("radio");

      radios[0].focus();
      expect(radios[0]).toHaveFocus();

      // Arrow Down - should move to next option and select it
      await user.keyboard("{ArrowDown}");
      expect(radios[1]).toHaveFocus();
      expect(radios[1]).toBeChecked();

      // Arrow Down - should move to next option and select it
      await user.keyboard("{ArrowDown}");
      expect(radios[2]).toHaveFocus();
      expect(radios[2]).toBeChecked();

      // Arrow Down - should wrap to first option
      await user.keyboard("{ArrowDown}");
      expect(radios[0]).toHaveFocus();
      expect(radios[0]).toBeChecked();
    });

    it("should support arrow up navigation", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup label="Test Group" options={options} defaultValue="1" />
      );

      const radios = screen.getAllByRole("radio");

      radios[0].focus();
      expect(radios[0]).toHaveFocus();

      // Arrow Up - should wrap to last option
      await user.keyboard("{ArrowUp}");
      expect(radios[2]).toHaveFocus();
      expect(radios[2]).toBeChecked();

      // Arrow Up - should move to previous option
      await user.keyboard("{ArrowUp}");
      expect(radios[1]).toHaveFocus();
      expect(radios[1]).toBeChecked();
    });

    it("should support horizontal arrow key navigation", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup
          label="Test Group"
          options={options}
          defaultValue="1"
          orientation="horizontal"
        />
      );

      const radios = screen.getAllByRole("radio");

      radios[0].focus();
      expect(radios[0]).toHaveFocus();

      // Arrow Right - should move to next option
      await user.keyboard("{ArrowRight}");
      expect(radios[1]).toHaveFocus();
      expect(radios[1]).toBeChecked();

      // Arrow Left - should move to previous option
      await user.keyboard("{ArrowLeft}");
      expect(radios[0]).toHaveFocus();
      expect(radios[0]).toBeChecked();
    });

    it("should skip disabled options during keyboard navigation", async () => {
      const user = userEvent.setup();
      const optionsWithDisabled = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2", disabled: true },
        { value: "3", label: "Option 3" },
      ];

      render(
        <RadioGroup
          label="Test Group"
          options={optionsWithDisabled}
          defaultValue="1"
        />
      );

      const radios = screen.getAllByRole("radio");

      radios[0].focus();
      expect(radios[0]).toHaveFocus();

      // Arrow Down - should skip disabled option and go to option 3
      await user.keyboard("{ArrowDown}");
      expect(radios[2]).toHaveFocus();
      expect(radios[2]).toBeChecked();
    });

    it("should announce validation messages to screen readers", () => {
      render(
        <RadioGroup
          label="Test Group"
          options={options}
          status="error"
          errorMessage="Please select an option"
        />
      );

      const group = screen.getByRole("radiogroup");
      const errorMessage = screen.getByText("Please select an option");
      expect(group).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining(errorMessage.id)
      );
    });
  });

  /* ============================================ */
  /* Rendering Tests                             */
  /* ============================================ */

  describe("Rendering", () => {
    it("should render with label", () => {
      render(<RadioGroup label="Test Group" options={options} />);
      expect(screen.getByText("Test Group")).toBeInTheDocument();
    });

    it("should render all options", () => {
      render(<RadioGroup label="Test Group" options={options} />);
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("should render with description", () => {
      render(
        <RadioGroup
          label="Test Group"
          description="Group description"
          options={options}
        />
      );
      expect(screen.getByText("Group description")).toBeInTheDocument();
    });

    it("should render with helper text", () => {
      render(
        <RadioGroup
          label="Test Group"
          helperText="Helper text"
          options={options}
        />
      );
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should render with error message", () => {
      render(
        <RadioGroup
          label="Test Group"
          status="error"
          errorMessage="Error message"
          options={options}
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("should render with success message", () => {
      render(
        <RadioGroup
          label="Test Group"
          status="success"
          successMessage="Success message"
          options={options}
        />
      );
      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    it("should display required indicator", () => {
      render(<RadioGroup label="Required Group" required options={options} />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should render options with descriptions", () => {
      const optionsWithDesc = [
        { value: "1", label: "Option 1", description: "Description 1" },
        { value: "2", label: "Option 2", description: "Description 2" },
      ];

      render(<RadioGroup label="Test Group" options={optionsWithDesc} />);
      expect(screen.getByText("Description 1")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
    });

    it("should render in horizontal orientation", () => {
      const { container } = render(
        <RadioGroup
          label="Test Group"
          orientation="horizontal"
          options={options}
        />
      );
      const optionsContainer = container.querySelector(
        '[class*="groupOptions"]'
      );
      expect(optionsContainer?.className).toContain("groupOptions--horizontal");
    });

    it("should render in vertical orientation by default", () => {
      const { container } = render(
        <RadioGroup label="Test Group" options={options} />
      );
      const optionsContainer = container.querySelector(
        '[class*="groupOptions"]'
      );
      expect(optionsContainer?.className).toContain("groupOptions");
      expect(optionsContainer?.className).not.toContain(
        "groupOptions--horizontal"
      );
    });
  });

  /* ============================================ */
  /* Size Variants                              */
  /* ============================================ */

  describe("Size Variants", () => {
    it.each(["sm", "md", "lg"] as const)(
      "should pass %s size to all radios",
      (size) => {
        render(<RadioGroup label="Test Group" size={size} options={options} />);
        const radios = screen.getAllByRole("radio");
        radios.forEach((radio) => {
          expect(radio.className).toContain(`input--${size}`);
        });
      }
    );
  });

  /* ============================================ */
  /* Status Variants                            */
  /* ============================================ */

  describe("Status Variants", () => {
    it.each(["default", "error", "success"] as const)(
      "should pass %s status to all radios",
      (status) => {
        const { container } = render(
          <RadioGroup label="Test Group" status={status} options={options} />
        );
        const inputs = container.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
          expect(input.className).toContain(`input--${status}`);
        });
      }
    );
  });

  /* ============================================ */
  /* Interaction Tests                          */
  /* ============================================ */

  describe("Interactions", () => {
    it("should call onChange when option is selected", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup label="Test Group" onChange={onChange} options={options} />
      );

      const radios = screen.getAllByRole("radio");
      await user.click(radios[1]);

      expect(onChange).toHaveBeenCalledWith("2");
      expect(radios[1]).toBeChecked();
    });

    it("should only allow one option to be selected", async () => {
      const user = userEvent.setup();
      render(<RadioGroup label="Test Group" options={options} />);

      const radios = screen.getAllByRole("radio");

      await user.click(radios[0]);
      expect(radios[0]).toBeChecked();
      expect(radios[1]).not.toBeChecked();

      await user.click(radios[1]);
      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).toBeChecked();
    });

    it("should respect disabled options", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      const optionsWithDisabled = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2", disabled: true },
        { value: "3", label: "Option 3" },
      ];

      render(
        <RadioGroup
          label="Test Group"
          onChange={onChange}
          options={optionsWithDisabled}
        />
      );

      const radios = screen.getAllByRole("radio");
      await user.click(radios[1]);

      expect(onChange).not.toHaveBeenCalled();
      expect(radios[1]).not.toBeChecked();
    });

    it("should select option with defaultValue", () => {
      render(
        <RadioGroup label="Test Group" defaultValue="2" options={options} />
      );

      const radios = screen.getAllByRole("radio");
      expect(radios[1]).toBeChecked();
    });
  });

  /* ============================================ */
  /* Controlled vs Uncontrolled                 */
  /* ============================================ */

  describe("Controlled vs Uncontrolled", () => {
    it("should work as uncontrolled component with defaultValue", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup label="Test Group" defaultValue="1" options={options} />
      );

      const radios = screen.getAllByRole("radio");
      expect(radios[0]).toBeChecked();

      await user.click(radios[1]);
      expect(radios[1]).toBeChecked();
      expect(radios[0]).not.toBeChecked();
    });

    it("should work as controlled component", async () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <RadioGroup
          label="Test Group"
          value="1"
          onChange={onChange}
          options={options}
        />
      );

      let radios = screen.getAllByRole("radio");
      expect(radios[0]).toBeChecked();

      rerender(
        <RadioGroup
          label="Test Group"
          value="2"
          onChange={onChange}
          options={options}
        />
      );

      radios = screen.getAllByRole("radio");
      expect(radios[1]).toBeChecked();
    });
  });

  /* ============================================ */
  /* Name Generation                            */
  /* ============================================ */

  describe("Name Generation", () => {
    it("should use provided name for all radios", () => {
      render(
        <RadioGroup label="Test Group" name="custom-name" options={options} />
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      radios.forEach((radio) => {
        expect(radio.name).toBe("custom-name");
      });
    });

    it("should generate unique name when not provided", () => {
      render(<RadioGroup label="Test Group" options={options} />);

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      const firstName = radios[0].name;

      expect(firstName).toBeTruthy();
      radios.forEach((radio) => {
        expect(radio.name).toBe(firstName);
      });
    });

    it("should generate different names for different groups", () => {
      render(
        <>
          <RadioGroup label="Group 1" options={options} />
          <RadioGroup label="Group 2" options={options} />
        </>
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      const group1Name = radios[0].name;
      const group2Name = radios[3].name;

      expect(group1Name).not.toBe(group2Name);
    });
  });
});
