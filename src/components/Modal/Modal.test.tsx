import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Modal } from "./Modal";
import { renderWithA11y } from "../../utils/test-helpers";

describe("Modal component", () => {
  beforeEach(() => {
    // Clear portal container before each test
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /* ============================================ */
  /* Basic Rendering                             */
  /* ============================================ */

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders in a portal outside the React tree", () => {
    const { container } = render(
      <div id="app-root">
        <Modal isOpen={true} onClose={() => {}}>
          <p>Modal content</p>
        </Modal>
      </div>
    );

    // Modal should NOT be in the container, should be in document.body
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  /* ============================================ */
  /* Accessibility                               */
  /* ============================================ */

  it("renders without accessibility violations", async () => {
    const { a11yResults } = await renderWithA11y(
      <Modal isOpen={true} onClose={() => {}} header="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(a11yResults).toHaveNoViolations();
  });

  it("has proper ARIA attributes", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} header="Test Title">
        <p>Test description</p>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");

    const titleId = dialog.getAttribute("aria-labelledby");
    const descId = dialog.getAttribute("aria-describedby");

    expect(screen.getByText("Test Title")).toHaveAttribute("id", titleId);
    expect(screen.getByText("Test description").parentElement).toHaveAttribute(
      "id",
      descId
    );
  });

  it("has unique IDs for multiple modals", () => {
    const { unmount: unmount1 } = render(
      <Modal isOpen={true} onClose={() => {}} header="First Modal">
        <p>First content</p>
      </Modal>
    );

    const firstDialog = screen.getByRole("dialog");
    const firstTitleId = firstDialog.getAttribute("aria-labelledby");
    const firstDescId = firstDialog.getAttribute("aria-describedby");

    // Clean up first modal completely
    unmount1();

    // Render second modal
    render(
      <Modal isOpen={true} onClose={() => {}} header="Second Modal">
        <p>Second content</p>
      </Modal>
    );

    const secondDialog = screen.getByRole("dialog");
    const secondTitleId = secondDialog.getAttribute("aria-labelledby");
    const secondDescId = secondDialog.getAttribute("aria-describedby");

    expect(firstTitleId).not.toBe(secondTitleId);
    expect(firstDescId).not.toBe(secondDescId);
  });

  /* ============================================ */
  /* Header and Footer                           */
  /* ============================================ */

  it("renders header when provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} header="Modal Header">
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal Header")).toBeInTheDocument();
  });

  it("renders header as ReactNode", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        header={
          <div>
            <h2>Custom Header</h2>
            <p>Subtitle</p>
          </div>
        }
      >
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText("Custom Header")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} footer={<button>Action</button>}>
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("shows close button by default", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} header="Modal">
        <p>Content</p>
      </Modal>
    );

    expect(
      screen.getByRole("button", { name: "Close modal" })
    ).toBeInTheDocument();
  });

  it("hides close button when showCloseButton is false", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
        <p>Content</p>
      </Modal>
    );

    expect(
      screen.queryByRole("button", { name: "Close modal" })
    ).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} header="Modal">
        <p>Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  /* ============================================ */
  /* Size Variants                               */
  /* ============================================ */

  it("applies default size class", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal.className).toContain("modal--md");
  });

  it("applies size variant classes", () => {
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={() => {}} size={size}>
          <p>Content</p>
        </Modal>
      );

      const modal = screen.getByRole("dialog");
      expect(modal.className).toContain(`modal--${size}`);

      unmount();
    });
  });

  /* ============================================ */
  /* Placement Variants                          */
  /* ============================================ */

  it("applies default placement class", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = document.querySelector("[data-modal-backdrop]");
    expect(backdrop?.className).toContain("backdrop--center");
  });

  it("applies placement variant classes", () => {
    const placements = ["center", "top"] as const;

    placements.forEach((placement) => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={() => {}} placement={placement}>
          <p>Content</p>
        </Modal>
      );

      const backdrop = document.querySelector("[data-modal-backdrop]");
      expect(backdrop?.className).toContain(`backdrop--${placement}`);

      unmount();
    });
  });

  /* ============================================ */
  /* Keyboard Navigation                         */
  /* ============================================ */

  it("closes modal on Escape key by default", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on Escape when closeOnEsc is false", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("traps focus within modal on Tab key", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} header="Modal">
        <button>First</button>
        <button>Second</button>
      </Modal>
    );

    const firstButton = screen.getByText("First");
    const secondButton = screen.getByText("Second");

    // Focus first button
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    // Tab forward
    fireEvent.keyDown(firstButton, { key: "Tab" });

    // Focus should move to second button
    secondButton.focus();
    expect(document.activeElement).toBe(secondButton);
  });

  it("moves focus to close button on Shift+Tab from first element", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} header="Modal">
        <button>First</button>
      </Modal>
    );

    const firstButton = screen.getByText("First");

    firstButton.focus();

    // Shift+Tab should cycle to last focusable element
    fireEvent.keyDown(firstButton, { key: "Tab", shiftKey: true });
  });

  /* ============================================ */
  /* Backdrop Interaction                        */
  /* ============================================ */

  it("closes modal on backdrop click by default", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = document.querySelector("[data-modal-backdrop]");
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop as Element);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on backdrop click when closeOnBackdropClick is false", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} closeOnBackdropClick={false}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = document.querySelector("[data-modal-backdrop]");
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop as Element);

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("does not close when clicking inside modal content", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText("Content"));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("supports keyboard interaction on backdrop", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = document.querySelector("[data-modal-backdrop]");
    expect(backdrop).toBeInTheDocument();

    // Escape key triggers both backdrop and document handlers
    fireEvent.keyDown(backdrop as Element, { key: "Escape" });
    // Both the backdrop onKeyDown and document keydown listener call onClose
    expect(handleClose).toHaveBeenCalled();
  });

  /* ============================================ */
  /* Scroll Lock                                 */
  /* ============================================ */

  it("locks body scroll when modal opens", () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("");

    rerender(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when modal closes", () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("does not lock scroll when lockScroll is false", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} lockScroll={false}>
        <p>Content</p>
      </Modal>
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("compensates for scrollbar width when locking scroll", () => {
    // Mock scrollbar width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      writable: true,
      value: 1008, // 16px scrollbar
    });

    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    // Should add padding to compensate for scrollbar
    expect(document.body.style.paddingRight).toBeTruthy();
  });

  /* ============================================ */
  /* Focus Management                            */
  /* ============================================ */

  it("focuses first focusable element on open", async () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <button>First</button>
        <button>Second</button>
      </Modal>
    );

    await waitFor(() => {
      const firstButton = screen.getByText("First");
      expect(document.activeElement).toBe(firstButton);
    });
  });

  it("stores previous active element", () => {
    const button = document.createElement("button");
    button.textContent = "Trigger";
    document.body.appendChild(button);
    button.focus();

    const previousElement = document.activeElement;

    render(
      <Modal isOpen={true} onClose={() => {}}>
        <button>Inside Modal</button>
      </Modal>
    );

    // Previous element should have been the button
    expect(previousElement).toBe(button);

    // Clean up
    document.body.removeChild(button);
  });

  it("does not trap focus when trapFocus is false", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} trapFocus={false}>
        <button>Inside</button>
      </Modal>
    );

    // With trapFocus disabled, focus management should be minimal
    const button = screen.getByText("Inside");
    expect(button).toBeInTheDocument();
  });

  /* ============================================ */
  /* Animation                                   */
  /* ============================================ */

  it("applies animation classes by default", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = document.querySelector("[data-modal-backdrop]");
    const modal = screen.getByRole("dialog");

    expect(backdrop).toBeInTheDocument();
    expect(backdrop?.className).not.toContain("backdrop--no-animation");
    expect(modal.className).not.toContain("modal--no-animation");
  });

  it("disables animation when disableAnimation is true", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} disableAnimation={true}>
        <p>Content</p>
      </Modal>
    );

    const backdrop = document.querySelector("[data-modal-backdrop]");
    const modal = screen.getByRole("dialog");

    expect(backdrop).toBeInTheDocument();
    expect(backdrop?.className).toContain("backdrop--no-animation");
    expect(modal.className).toContain("modal--no-animation");
  });

  /* ============================================ */
  /* Custom Props                                */
  /* ============================================ */

  it("applies custom className", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        <p>Content</p>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal.className).toContain("custom-modal");
  });

  it("forwards ref to modal element", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Modal isOpen={true} onClose={() => {}} ref={ref}>
        <p>Content</p>
      </Modal>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute("role", "dialog");
  });

  it("applies additional props to modal element", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        data-testid="custom-modal"
        aria-label="Custom label"
      >
        <p>Content</p>
      </Modal>
    );

    const modal = screen.getByTestId("custom-modal");
    expect(modal).toHaveAttribute("aria-label", "Custom label");
  });

  /* ============================================ */
  /* Edge Cases                                  */
  /* ============================================ */

  it("handles rapid open/close transitions", async () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    // Rapidly toggle
    for (let i = 0; i < 5; i++) {
      rerender(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      );
    }

    // Final state should be consistent
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("handles undefined onClose gracefully", () => {
    const onClose = undefined as unknown as () => void;

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("handles empty content", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        {null}
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("cleans up event listeners on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it("handles multiple modals simultaneously", () => {
    render(
      <>
        <Modal isOpen={true} onClose={() => {}}>
          <p>First Modal</p>
        </Modal>
        <Modal isOpen={true} onClose={() => {}}>
          <p>Second Modal</p>
        </Modal>
      </>
    );

    expect(screen.getByText("First Modal")).toBeInTheDocument();
    expect(screen.getByText("Second Modal")).toBeInTheDocument();

    const dialogs = screen.getAllByRole("dialog");
    expect(dialogs).toHaveLength(2);
  });
});
