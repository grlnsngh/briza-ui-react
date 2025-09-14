import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the button with the correct label", () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("applies primary class when primary is true", () => {
    render(<Button primary label="Primary" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("primary");
  });
});
