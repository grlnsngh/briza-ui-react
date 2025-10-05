import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox, CheckboxGroup } from "./Checkbox";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Checkbox", () => {
  /* ============================================ */
  /* Accessibility Tests                         */
  /* ============================================ */

  describe("Accessibility", () => {
    it("should not have any accessibility violations (basic)", async () => {
      const { container } = render(<Checkbox label="Accept terms" />);
      await expectNoA11yViolations(container);
    });

    it("should not have any accessibility violations (with description)", async () => {
      const { container } = render(
        <Checkbox
          label="Email notifications"
          description="Receive updates via email"
        />
      );
      await expectNoA11yViolations(container);
    });

    it("should not have any accessibility violations (error state)", async () => {
      const { container } = render(
        <Checkbox
          label="Accept terms"
          status="error"
          errorMessage="You must accept"
        />
      );
      await expectNoA11yViolations(container);
    });

    it("should have proper ARIA attributes", () => {
      render(
        <Checkbox
          label="Test"
          description="Description text"
          helperText="Helper text"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby");
      expect(checkbox).toHaveAttribute("aria-invalid", "false");
    });

    it("should have aria-invalid when status is error", () => {
      render(<Checkbox label="Test" status="error" errorMessage="Error" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("should have aria-describedby pointing to error message", () => {
      render(
        <Checkbox label="Test" status="error" errorMessage="Error message" />
      );

      const checkbox = screen.getByRole("checkbox");
      const errorMessage = screen.getByRole("alert");

      expect(checkbox.getAttribute("aria-describedby")).toContain(
        errorMessage.id
      );
    });

    it("should have aria-describedby pointing to success message", () => {
      render(
        <Checkbox
          label="Test"
          status="success"
          successMessage="Success message"
        />
      );

      const checkbox = screen.getByRole("checkbox");
      const successMessage = screen.getByRole("status");

      expect(checkbox.getAttribute("aria-describedby")).toContain(
        successMessage.id
      );
    });

    it("should associate label with checkbox via htmlFor", () => {
      render(<Checkbox label="Test Label" />);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Test Label");

      expect(label.closest("label")).toHaveAttribute("for", checkbox.id);
    });

    it("should mark checkbox as required when required prop is true", () => {
      render(<Checkbox label="Accept" required />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeRequired();
    });

    it("should have proper keyboard navigation", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Checkbox label="Test" onChange={onChange} />);

      const checkbox = screen.getByRole("checkbox");

      // Tab to focus
      await user.tab();
      expect(checkbox).toHaveFocus();

      // Space to toggle
      await user.keyboard(" ");
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(checkbox).toBeChecked();
    });
  });

  /* ============================================ */
  /* Rendering Tests                             */
  /* ============================================ */

  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<Checkbox label="Test" />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should render label text", () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("should render description text", () => {
      render(<Checkbox label="Test" description="This is a description" />);
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(<Checkbox label="Test" helperText="Helper text" />);
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should render error message when status is error", () => {
      render(
        <Checkbox label="Test" status="error" errorMessage="Error text" />
      );
      expect(screen.getByText("Error text")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("Error text");
    });

    it("should render success message when status is success", () => {
      render(
        <Checkbox label="Test" status="success" successMessage="Success text" />
      );
      expect(screen.getByText("Success text")).toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveTextContent("Success text");
    });

    it("should render required asterisk when required", () => {
      render(<Checkbox label="Test" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<Checkbox label="Test" className="custom-class" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("custom-class");
    });

    it("should apply wrapperClassName", () => {
      const { container } = render(
        <Checkbox label="Test" wrapperClassName="wrapper-class" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("wrapper-class");
    });
  });

  /* ============================================ */
  /* Size Variants                               */
  /* ============================================ */

  describe("Size Variants", () => {
    it("should apply small size class", () => {
      render(<Checkbox label="Test" size="sm" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("input--sm");
    });

    it("should apply medium size class by default", () => {
      render(<Checkbox label="Test" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("input--md");
    });

    it("should apply large size class", () => {
      render(<Checkbox label="Test" size="lg" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("input--lg");
    });
  });

  /* ============================================ */
  /* Status Variants                             */
  /* ============================================ */

  describe("Status Variants", () => {
    it("should apply default status class", () => {
      render(<Checkbox label="Test" status="default" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("input--default");
    });

    it("should apply error status class", () => {
      render(<Checkbox label="Test" status="error" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("input--error");
    });

    it("should apply success status class", () => {
      render(<Checkbox label="Test" status="success" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.className).toContain("input--success");
    });
  });

  /* ============================================ */
  /* Interaction Tests                           */
  /* ============================================ */

  describe("Interactions", () => {
    it("should toggle checked state on click", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Test" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("should call onChange handler when clicked", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Checkbox label="Test" onChange={onChange} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ checked: true }),
        })
      );
    });

    it("should not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Checkbox label="Test" disabled onChange={onChange} />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(checkbox).not.toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should toggle via label click", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click me" />);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Click me");

      await user.click(label);
      expect(checkbox).toBeChecked();
    });
  });

  /* ============================================ */
  /* Controlled Mode                             */
  /* ============================================ */

  describe("Controlled Mode", () => {
    it("should work in controlled mode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      const { rerender } = render(
        <Checkbox label="Test" checked={false} onChange={onChange} />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(onChange).toHaveBeenCalled();

      // Simulate parent updating the checked prop
      rerender(<Checkbox label="Test" checked={true} onChange={onChange} />);
      expect(checkbox).toBeChecked();
    });

    it("should respect controlled checked prop", () => {
      const { rerender } = render(<Checkbox label="Test" checked={false} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox label="Test" checked={true} />);
      expect(checkbox).toBeChecked();
    });
  });

  /* ============================================ */
  /* Uncontrolled Mode                           */
  /* ============================================ */

  describe("Uncontrolled Mode", () => {
    it("should work in uncontrolled mode with defaultChecked", () => {
      render(<Checkbox label="Test" defaultChecked />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });

    it("should maintain its own state in uncontrolled mode", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Test" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  /* ============================================ */
  /* Indeterminate State                         */
  /* ============================================ */

  describe("Indeterminate State", () => {
    it("should set indeterminate property on the DOM element", () => {
      render(<Checkbox label="Test" indeterminate />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it("should update indeterminate property when prop changes", () => {
      const { rerender } = render(
        <Checkbox label="Test" indeterminate={false} />
      );

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox label="Test" indeterminate={true} />);
      expect(checkbox.indeterminate).toBe(true);
    });

    it("should work with indeterminate and controlled checked", () => {
      render(<Checkbox label="Test" checked={false} indeterminate />);

      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  /* ============================================ */
  /* Form Integration                            */
  /* ============================================ */

  describe("Form Integration", () => {
    it("should submit with form data", () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        return formData.get("terms");
      });

      render(
        <form onSubmit={handleSubmit}>
          <Checkbox
            label="Accept"
            name="terms"
            value="accepted"
            defaultChecked
          />
          <button type="submit">Submit</button>
        </form>
      );

      const button = screen.getByRole("button");
      button.click();

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should have correct name and value attributes", () => {
      render(<Checkbox label="Test" name="myCheckbox" value="myValue" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "myCheckbox");
      expect(checkbox).toHaveAttribute("value", "myValue");
    });
  });

  /* ============================================ */
  /* Ref Forwarding                              */
  /* ============================================ */

  describe("Ref Forwarding", () => {
    it("should forward ref to input element", () => {
      const ref = { current: null as HTMLInputElement | null };

      render(<Checkbox ref={ref} label="Test" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe("checkbox");
    });
  });
});

/* ============================================ */
/* CheckboxGroup Tests                         */
/* ============================================ */

describe("CheckboxGroup", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  /* ============================================ */
  /* Accessibility Tests                         */
  /* ============================================ */

  describe("Accessibility", () => {
    it("should not have any accessibility violations", async () => {
      const { container } = render(
        <CheckboxGroup label="Select options" options={options} />
      );
      await expectNoA11yViolations(container);
    });

    it("should have proper group role", () => {
      const { container } = render(
        <CheckboxGroup label="Select options" options={options} />
      );

      const group = container.querySelector('[role="group"]');
      expect(group).toBeInTheDocument();
    });

    it("should associate label with group", () => {
      render(<CheckboxGroup label="Select options" options={options} />);

      const label = screen.getByText("Select options");
      expect(label).toBeInTheDocument();
    });

    it("should have aria-describedby for description", () => {
      const { container } = render(
        <CheckboxGroup
          label="Test"
          description="Test description"
          options={options}
        />
      );

      const group = container.querySelector('[role="group"]');
      const description = screen.getByText("Test description");

      expect(group?.getAttribute("aria-describedby")).toContain(description.id);
    });
  });

  /* ============================================ */
  /* Rendering Tests                             */
  /* ============================================ */

  describe("Rendering", () => {
    it("should render all options", () => {
      render(<CheckboxGroup label="Test" options={options} />);

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("should render group label", () => {
      render(<CheckboxGroup label="Select your options" options={options} />);
      expect(screen.getByText("Select your options")).toBeInTheDocument();
    });

    it("should render group description", () => {
      render(
        <CheckboxGroup
          label="Test"
          description="Choose all that apply"
          options={options}
        />
      );
      expect(screen.getByText("Choose all that apply")).toBeInTheDocument();
    });

    it("should render option descriptions", () => {
      const optionsWithDesc = [
        { value: "1", label: "Option 1", description: "Description 1" },
        { value: "2", label: "Option 2", description: "Description 2" },
      ];

      render(<CheckboxGroup label="Test" options={optionsWithDesc} />);

      expect(screen.getByText("Description 1")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <CheckboxGroup
          label="Test"
          options={options}
          helperText="Helper text"
        />
      );
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should render error message", () => {
      render(
        <CheckboxGroup
          label="Test"
          options={options}
          status="error"
          errorMessage="Error text"
        />
      );
      expect(screen.getByText("Error text")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("Error text");
    });

    it("should render success message", () => {
      render(
        <CheckboxGroup
          label="Test"
          options={options}
          status="success"
          successMessage="Success text"
        />
      );
      expect(screen.getByText("Success text")).toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveTextContent("Success text");
    });

    it("should render in horizontal orientation", () => {
      const { container } = render(
        <CheckboxGroup
          label="Test"
          options={options}
          orientation="horizontal"
        />
      );

      const group = container.querySelector('[role="group"]');
      expect(group?.className).toContain("group--horizontal");
    });
  });

  /* ============================================ */
  /* Interaction Tests                           */
  /* ============================================ */

  describe("Interactions", () => {
    it("should handle checkbox selection", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <CheckboxGroup label="Test" options={options} onChange={onChange} />
      );

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      await user.click(checkbox1);

      expect(onChange).toHaveBeenCalledWith(["1"]);
    });

    it("should handle multiple selections", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <CheckboxGroup label="Test" options={options} onChange={onChange} />
      );

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      const checkbox2 = screen.getByRole("checkbox", { name: /Option 2/i });

      await user.click(checkbox1);
      await user.click(checkbox2);

      expect(onChange).toHaveBeenLastCalledWith(["1", "2"]);
    });

    it("should handle deselection", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <CheckboxGroup
          label="Test"
          options={options}
          defaultValue={["1", "2"]}
          onChange={onChange}
        />
      );

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      await user.click(checkbox1);

      expect(onChange).toHaveBeenCalledWith(["2"]);
    });

    it("should disable all checkboxes when group is disabled", () => {
      render(<CheckboxGroup label="Test" options={options} disabled />);

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeDisabled();
      });
    });

    it("should disable individual options", () => {
      const optionsWithDisabled = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2", disabled: true },
        { value: "3", label: "Option 3" },
      ];

      render(<CheckboxGroup label="Test" options={optionsWithDisabled} />);

      const checkbox2 = screen.getByRole("checkbox", { name: /Option 2/i });
      expect(checkbox2).toBeDisabled();
    });
  });

  /* ============================================ */
  /* Controlled Mode                             */
  /* ============================================ */

  describe("Controlled Mode", () => {
    it("should work in controlled mode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      const { rerender } = render(
        <CheckboxGroup
          label="Test"
          options={options}
          value={[]}
          onChange={onChange}
        />
      );

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      expect(checkbox1).not.toBeChecked();

      await user.click(checkbox1);
      expect(onChange).toHaveBeenCalledWith(["1"]);

      // Simulate parent updating the value prop
      rerender(
        <CheckboxGroup
          label="Test"
          options={options}
          value={["1"]}
          onChange={onChange}
        />
      );

      expect(checkbox1).toBeChecked();
    });

    it("should respect controlled value prop", () => {
      const { rerender } = render(
        <CheckboxGroup label="Test" options={options} value={["1"]} />
      );

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      const checkbox2 = screen.getByRole("checkbox", { name: /Option 2/i });

      expect(checkbox1).toBeChecked();
      expect(checkbox2).not.toBeChecked();

      rerender(
        <CheckboxGroup label="Test" options={options} value={["1", "2"]} />
      );

      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
    });
  });

  /* ============================================ */
  /* Uncontrolled Mode                           */
  /* ============================================ */

  describe("Uncontrolled Mode", () => {
    it("should work in uncontrolled mode with defaultValue", () => {
      render(
        <CheckboxGroup
          label="Test"
          options={options}
          defaultValue={["1", "2"]}
        />
      );

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      const checkbox2 = screen.getByRole("checkbox", { name: /Option 2/i });
      const checkbox3 = screen.getByRole("checkbox", { name: /Option 3/i });

      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
      expect(checkbox3).not.toBeChecked();
    });

    it("should maintain its own state in uncontrolled mode", async () => {
      const user = userEvent.setup();

      render(<CheckboxGroup label="Test" options={options} />);

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      const checkbox2 = screen.getByRole("checkbox", { name: /Option 2/i });

      await user.click(checkbox1);
      expect(checkbox1).toBeChecked();

      await user.click(checkbox2);
      expect(checkbox1).toBeChecked();
      expect(checkbox2).toBeChecked();
    });
  });

  /* ============================================ */
  /* Size and Status Variants                    */
  /* ============================================ */

  describe("Size and Status Variants", () => {
    it("should apply size to all checkboxes", () => {
      render(<CheckboxGroup label="Test" options={options} size="lg" />);

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox.className).toContain("input--lg");
      });
    });

    it("should apply status to all checkboxes", () => {
      render(<CheckboxGroup label="Test" options={options} status="error" />);

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox.className).toContain("input--error");
      });
    });
  });

  /* ============================================ */
  /* Form Integration                            */
  /* ============================================ */

  describe("Form Integration", () => {
    it("should use same name for all checkboxes when name prop is provided", () => {
      render(
        <CheckboxGroup label="Test" options={options} name="preferences" />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute("name", "preferences");
      });
    });

    it("should have correct value attributes", () => {
      render(<CheckboxGroup label="Test" options={options} />);

      const checkbox1 = screen.getByRole("checkbox", { name: /Option 1/i });
      const checkbox2 = screen.getByRole("checkbox", { name: /Option 2/i });

      expect(checkbox1).toHaveAttribute("value", "1");
      expect(checkbox2).toHaveAttribute("value", "2");
    });
  });
});
