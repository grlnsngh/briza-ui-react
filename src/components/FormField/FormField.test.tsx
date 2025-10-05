import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormField } from "./FormField";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("FormField", () => {
  /* ============================================ */
  /* Accessibility Tests                         */
  /* ============================================ */

  describe("Accessibility", () => {
    it("should not have any accessibility violations (basic)", async () => {
      const { container } = render(
        <FormField label="Username">
          <input type="text" />
        </FormField>
      );
      await expectNoA11yViolations(container);
    });

    it("should not have any accessibility violations (with description)", async () => {
      const { container } = render(
        <FormField label="Email" description="We'll never share your email">
          <input type="email" />
        </FormField>
      );
      await expectNoA11yViolations(container);
    });

    it("should not have any accessibility violations (error state)", async () => {
      const { container } = render(
        <FormField
          label="Password"
          status="error"
          errorMessage="Password is too short"
        >
          <input type="password" />
        </FormField>
      );
      await expectNoA11yViolations(container);
    });

    it("should not have any accessibility violations (success state)", async () => {
      const { container } = render(
        <FormField
          label="Email"
          status="success"
          successMessage="Email is valid"
        >
          <input type="email" />
        </FormField>
      );
      await expectNoA11yViolations(container);
    });

    it("should have proper ARIA label association", () => {
      render(
        <FormField label="Test Label">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-labelledby");

      const labelId = input.getAttribute("aria-labelledby");
      const label = document.getElementById(labelId!);
      expect(label).toHaveTextContent("Test Label");
    });

    it("should have aria-describedby for description", () => {
      render(
        <FormField label="Test" description="This is a description">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();

      const descriptionId = describedBy!.split(" ")[0];
      const description = document.getElementById(descriptionId);
      expect(description).toHaveTextContent("This is a description");
    });

    it("should have aria-describedby for helper text", () => {
      render(
        <FormField label="Test" helperText="Helper text">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();

      const description = screen.getByText("Helper text");
      expect(describedBy).toContain(description.id);
    });

    it("should have aria-invalid when status is error", () => {
      render(
        <FormField label="Test" status="error" errorMessage="Error">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("should have aria-describedby pointing to error message", () => {
      render(
        <FormField label="Test" status="error" errorMessage="Error message">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      const errorMessage = screen.getByRole("alert");

      expect(input.getAttribute("aria-describedby")).toContain(errorMessage.id);
    });

    it("should have aria-describedby pointing to success message", () => {
      render(
        <FormField label="Test" status="success" successMessage="Success">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      const successMessage = screen.getByRole("status");

      expect(input.getAttribute("aria-describedby")).toContain(
        successMessage.id
      );
    });

    it("should set aria-required when isRequired is true", () => {
      render(
        <FormField label="Test" isRequired>
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-required", "true");
    });

    it("should combine multiple aria-describedby values", () => {
      render(
        <FormField
          label="Test"
          description="Description"
          helperText="Helper"
          status="error"
          errorMessage="Error"
        >
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby");

      expect(describedBy).toContain(screen.getByText("Description").id);
      expect(describedBy).toContain(screen.getByRole("alert").id);
    });

    it("should have proper label association via htmlFor", () => {
      render(
        <FormField label="Test Label">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      const labelElement = screen.getByText("Test Label").closest("label");

      expect(labelElement).toHaveAttribute("for", input.id);
    });
  });

  /* ============================================ */
  /* Rendering Tests                             */
  /* ============================================ */

  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(
        <FormField label="Test">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render label text", () => {
      render(
        <FormField label="Email Address">
          <input type="email" />
        </FormField>
      );
      expect(screen.getByText("Email Address")).toBeInTheDocument();
    });

    it("should render description text", () => {
      render(
        <FormField label="Test" description="This is a description">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should render helper text", () => {
      render(
        <FormField label="Test" helperText="Helper text">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should render error message when status is error", () => {
      render(
        <FormField label="Test" status="error" errorMessage="Error text">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText("Error text")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("Error text");
    });

    it("should render success message when status is success", () => {
      render(
        <FormField label="Test" status="success" successMessage="Success text">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText("Success text")).toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveTextContent("Success text");
    });

    it("should render required asterisk when isRequired", () => {
      render(
        <FormField label="Test" isRequired>
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should not render helper text when error message is shown", () => {
      render(
        <FormField
          label="Test"
          helperText="Helper"
          status="error"
          errorMessage="Error"
        >
          <input type="text" />
        </FormField>
      );

      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("should not render helper text when success message is shown", () => {
      render(
        <FormField
          label="Test"
          helperText="Helper"
          status="success"
          successMessage="Success"
        >
          <input type="text" />
        </FormField>
      );

      expect(screen.queryByText("Helper")).not.toBeInTheDocument();
      expect(screen.getByText("Success")).toBeInTheDocument();
    });

    it("should apply custom wrapperClassName", () => {
      const { container } = render(
        <FormField label="Test" wrapperClassName="custom-wrapper">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("custom-wrapper");
    });

    it("should apply custom contentClassName", () => {
      const { container } = render(
        <FormField label="Test" contentClassName="custom-content">
          <input type="text" />
        </FormField>
      );

      const content = container.querySelector(".custom-content");
      expect(content).toBeInTheDocument();
    });

    it("should use provided id", () => {
      render(
        <FormField label="Test" id="custom-id">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "custom-id");
    });

    it("should generate unique id when not provided", () => {
      render(
        <>
          <FormField label="Test 1">
            <input type="text" />
          </FormField>
          <FormField label="Test 2">
            <input type="text" />
          </FormField>
        </>
      );

      const inputs = screen.getAllByRole("textbox");
      expect(inputs[0].id).not.toBe(inputs[1].id);
    });
  });

  /* ============================================ */
  /* Size Variants                               */
  /* ============================================ */

  describe("Size Variants", () => {
    it("should apply small size class", () => {
      const { container } = render(
        <FormField label="Test" size="sm">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("wrapper--sm");
    });

    it("should apply medium size class by default", () => {
      const { container } = render(
        <FormField label="Test">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("wrapper--md");
    });

    it("should apply large size class", () => {
      const { container } = render(
        <FormField label="Test" size="lg">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("wrapper--lg");
    });

    it("should have data-size attribute", () => {
      const { container } = render(
        <FormField label="Test" size="lg">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute("data-size", "lg");
    });
  });

  /* ============================================ */
  /* Status Variants                             */
  /* ============================================ */

  describe("Status Variants", () => {
    it("should have default status by default", () => {
      const { container } = render(
        <FormField label="Test">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute("data-status", "default");
    });

    it("should have error status when status is error", () => {
      const { container } = render(
        <FormField label="Test" status="error" errorMessage="Error">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute("data-status", "error");
    });

    it("should have success status when status is success", () => {
      const { container } = render(
        <FormField label="Test" status="success" successMessage="Success">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute("data-status", "success");
    });
  });

  /* ============================================ */
  /* Disabled State                              */
  /* ============================================ */

  describe("Disabled State", () => {
    it("should apply disabled attribute to child input", () => {
      render(
        <FormField label="Test" disabled>
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("should have data-disabled attribute", () => {
      const { container } = render(
        <FormField label="Test" disabled>
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute("data-disabled", "true");
    });

    it("should not have data-disabled when not disabled", () => {
      const { container } = render(
        <FormField label="Test">
          <input type="text" />
        </FormField>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute("data-disabled", "false");
    });
  });

  /* ============================================ */
  /* Children Enhancement                        */
  /* ============================================ */

  describe("Children Enhancement", () => {
    it("should inject id into child", () => {
      render(
        <FormField label="Test" id="custom-id">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "custom-id");
    });

    it("should inject ARIA attributes into child", () => {
      render(
        <FormField label="Test" description="Description">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-labelledby");
      expect(input).toHaveAttribute("aria-describedby");
    });

    it("should work with different input types", () => {
      const { rerender } = render(
        <FormField label="Text">
          <input type="text" />
        </FormField>
      );

      expect(screen.getByRole("textbox")).toBeInTheDocument();

      rerender(
        <FormField label="Checkbox">
          <input type="checkbox" />
        </FormField>
      );

      expect(screen.getByRole("checkbox")).toBeInTheDocument();

      rerender(
        <FormField label="Select">
          <select>
            <option>Option</option>
          </select>
        </FormField>
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should work with textarea", () => {
      render(
        <FormField label="Bio">
          <textarea />
        </FormField>
      );

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  /* ============================================ */
  /* Callback Tests                              */
  /* ============================================ */

  describe("Callbacks", () => {
    it("should call onAriaIdsChange with correct IDs", () => {
      const onAriaIdsChange = vi.fn();

      render(
        <FormField
          label="Test"
          description="Description"
          helperText="Helper"
          onAriaIdsChange={onAriaIdsChange}
        >
          <input type="text" />
        </FormField>
      );

      expect(onAriaIdsChange).toHaveBeenCalledWith(
        expect.objectContaining({
          labelId: expect.any(String),
          descriptionId: expect.any(String),
          helperId: expect.any(String),
          fieldId: expect.any(String),
        })
      );
    });

    it("should call onAriaIdsChange with error and success IDs", () => {
      const onAriaIdsChange = vi.fn();

      const { rerender } = render(
        <FormField
          label="Test"
          status="error"
          errorMessage="Error"
          onAriaIdsChange={onAriaIdsChange}
        >
          <input type="text" />
        </FormField>
      );

      expect(onAriaIdsChange).toHaveBeenCalledWith(
        expect.objectContaining({
          errorId: expect.any(String),
        })
      );

      onAriaIdsChange.mockClear();

      rerender(
        <FormField
          label="Test"
          status="success"
          successMessage="Success"
          onAriaIdsChange={onAriaIdsChange}
        >
          <input type="text" />
        </FormField>
      );

      expect(onAriaIdsChange).toHaveBeenCalledWith(
        expect.objectContaining({
          successId: expect.any(String),
        })
      );
    });
  });

  /* ============================================ */
  /* Integration Tests                           */
  /* ============================================ */

  describe("Integration", () => {
    it("should work with controlled input", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      const ControlledInput = () => {
        const [value, setValue] = React.useState("");
        return (
          <FormField label="Test">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
            />
          </FormField>
        );
      };

      render(<ControlledInput />);

      const input = screen.getByRole("textbox");
      await user.type(input, "Hello");

      expect(onChange).toHaveBeenLastCalledWith("Hello");
    });

    it("should maintain focus on input", async () => {
      const user = userEvent.setup();

      render(
        <FormField label="Test">
          <input type="text" />
        </FormField>
      );

      const input = screen.getByRole("textbox");

      await user.click(input);
      expect(input).toHaveFocus();

      await user.tab();
      expect(input).not.toHaveFocus();
    });

    it("should work with multiple fields in a form", () => {
      render(
        <form>
          <FormField label="Field 1">
            <input type="text" name="field1" />
          </FormField>
          <FormField label="Field 2">
            <input type="text" name="field2" />
          </FormField>
          <FormField label="Field 3">
            <input type="text" name="field3" />
          </FormField>
        </form>
      );

      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(3);

      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute("name", `field${index + 1}`);
      });
    });

    it("should support rich label content", () => {
      render(
        <FormField
          label={
            <span>
              Username <strong>(required)</strong>
            </span>
          }
        >
          <input type="text" />
        </FormField>
      );

      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("(required)")).toBeInTheDocument();
    });

    it("should support rich description content", () => {
      render(
        <FormField
          label="Test"
          description={
            <span>
              Read our <a href="/terms">terms and conditions</a>
            </span>
          }
        >
          <input type="text" />
        </FormField>
      );

      expect(screen.getByText("Read our")).toBeInTheDocument();
      expect(screen.getByText("terms and conditions")).toBeInTheDocument();
    });
  });
});
