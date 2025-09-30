import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Input } from "./Input";
import {
  expectNoA11yViolations,
  renderWithA11y,
} from "../../utils/test-helpers";

describe("Input component", () => {
  it("renders with label and helper text without accessibility violations", async () => {
    const { container } = render(
      <Input
        label="Email address"
        placeholder="you@example.com"
        helperText="We'll never share your email."
      />
    );

    const input = screen.getByLabelText("Email address");
    const helper = screen.getByText("We'll never share your email.");

    expect(input).toBeInTheDocument();
    expect(helper).toBeInTheDocument();
    expect(helper.id).toBeTruthy();

    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toContain(helper.id);

    await expectNoA11yViolations(container);
  });

  it("announces error and success states with aria attributes", () => {
    const { rerender } = render(
      <Input
        label="Username"
        status="error"
        errorMessage="Username is already taken"
      />
    );

    let input = screen.getByLabelText("Username");
    const errorMessage = screen.getByText("Username is already taken");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(errorMessage).toHaveAttribute("role", "alert");
    expect(input.getAttribute("aria-describedby")).toContain(errorMessage.id);

    rerender(
      <Input
        label="Confirmation code"
        status="success"
        successMessage="Code accepted"
      />
    );

    input = screen.getByLabelText("Confirmation code");
    const successMessage = screen.getByText("Code accepted");

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(successMessage).toHaveAttribute("role", "status");
    expect(input.getAttribute("aria-describedby")).toContain(successMessage.id);
  });

  it("supports prefix and suffix adornments without impacting accessibility", async () => {
    const { a11yResults } = await renderWithA11y(
      <Input
        label="Search"
        prefix={<span data-testid="prefix-icon">🔍</span>}
        suffix={<span data-testid="suffix-icon">⏎</span>}
        placeholder="Find components"
      />
    );

    expect(screen.getByTestId("prefix-icon")).toBeInTheDocument();
    expect(screen.getByTestId("suffix-icon")).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(a11yResults).toHaveNoViolations();
  });

  it("toggles password visibility when requested", () => {
    render(<Input label="Password" type="password" />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    expect(input.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(input.type).toBe("text");
    expect(toggleButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(toggleButton);

    expect(input.type).toBe("password");
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");
  });

  it("honors custom password toggle labels", () => {
    render(
      <Input
        label="Secret"
        type="password"
        passwordToggleLabels={{ show: "Reveal", hide: "Mask" }}
      />
    );

    const toggleButton = screen.getByRole("button", { name: /reveal/i });
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAccessibleName("Mask");
  });

  it("fires onValueChange with the latest value", () => {
    const handleValueChange = vi.fn();

    render(
      <Input
        label="First name"
        onValueChange={handleValueChange}
        placeholder="Enter name"
      />
    );

    const input = screen.getByLabelText("First name");
    fireEvent.change(input, { target: { value: "Ada" } });

    expect(handleValueChange).toHaveBeenCalledWith("Ada", expect.any(Object));
  });

  it("supports disabled state", () => {
    render(<Input label="API token" disabled value="123" />);

    const input = screen.getByLabelText("API token");
    expect(input).toBeDisabled();
  });

  it("can be required and reflects aria-required", () => {
    render(<Input label="Email" required />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("supports number values with generics", () => {
    const handleValueChange = vi.fn();

    render(
      <Input<number>
        label="Age"
        type="number"
        onValueChange={handleValueChange}
      />
    );

    const input = screen.getByLabelText("Age");
    fireEvent.change(input, { target: { value: "42" } });

    expect(handleValueChange).toHaveBeenCalledWith(42, expect.any(Object));
  });
});
