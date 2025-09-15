import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button", "button--primary", "button--md");
  });

  it("renders different variants", () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("button--secondary");

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole("button")).toHaveClass("button--destructive");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("button--sm");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("button--lg");
  });

  it("handles loading state", () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("button--loading");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("handles icon-only buttons", () => {
    render(
      <Button iconOnly aria-label="Search">
        🔍
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Search");
    expect(button).toHaveClass("button--icon-only");
  });

  it("handles toggle buttons", () => {
    render(
      <Button toggle pressed>
        Toggle
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveClass("button--toggle");
  });

  it("handles menu buttons", () => {
    render(
      <Button menuExpanded menuId="menu-1">
        Menu
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls", "menu-1");
  });

  it("handles pagination buttons", () => {
    render(<Button isCurrent>1</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-current", "page");
  });

  it("handles copy to clipboard", async () => {
    const mockClipboard = vi.fn();
    Object.assign(navigator, { clipboard: { writeText: mockClipboard } });

    render(<Button copyToClipboard="test text">Copy</Button>);
    const button = screen.getByRole("button");

    await userEvent.click(button);
    expect(mockClipboard).toHaveBeenCalledWith("test text");
  });

  it("handles async actions", async () => {
    const mockAction = vi.fn().mockResolvedValue(undefined);
    render(<Button asyncAction={mockAction}>Async</Button>);
    const button = screen.getByRole("button");

    await userEvent.click(button);
    expect(mockAction).toHaveBeenCalled();
  });

  it("handles keyboard interactions", async () => {
    const mockClick = vi.fn();
    render(<Button onClick={mockClick}>Button</Button>);
    const button = screen.getByRole("button");

    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(mockClick).toHaveBeenCalled();

    await userEvent.keyboard(" ");
    expect(mockClick).toHaveBeenCalledTimes(2);
  });

  it("prevents multiple clicks during loading", async () => {
    const mockClick = vi.fn();
    render(
      <Button loading onClick={mockClick}>
        Loading
      </Button>
    );
    const button = screen.getByRole("button");

    await userEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });
});
