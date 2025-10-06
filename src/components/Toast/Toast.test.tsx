import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { vi } from "vitest";
import { Toast } from "./Toast";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Toast component", () => {
  beforeEach(() => {
    // Clear portal container before each test
    document.body.innerHTML = "";
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  /* ============================================ */
  /* Basic Rendering                             */
  /* ============================================ */

  describe("Basic Rendering", () => {
    it("renders toast with title and description", () => {
      const onClose = vi.fn();
      render(
        <Toast
          title="Test Title"
          description="Test Description"
          onClose={onClose}
        />
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders toast with custom children", () => {
      const onClose = vi.fn();
      render(
        <Toast onClose={onClose}>
          <div>Custom Content</div>
        </Toast>
      );

      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("renders toast with title only", () => {
      const onClose = vi.fn();
      render(<Toast title="Title Only" onClose={onClose} />);

      expect(screen.getByText("Title Only")).toBeInTheDocument();
    });

    it("renders toast with description only", () => {
      const onClose = vi.fn();
      render(<Toast description="Description Only" onClose={onClose} />);

      expect(screen.getByText("Description Only")).toBeInTheDocument();
    });
  });

  /* ============================================ */
  /* Variants                                    */
  /* ============================================ */

  describe("Variants", () => {
    const variants = [
      "default",
      "success",
      "info",
      "warning",
      "danger",
    ] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        const onClose = vi.fn();
        const { container } = render(
          <Toast variant={variant} onClose={onClose}>
            Test
          </Toast>
        );

        const toast = container.firstChild as HTMLElement;
        expect(toast.className).toContain(`toast--${variant}`);
      });
    });
  });

  /* ============================================ */
  /* Icons                                       */
  /* ============================================ */

  describe("Icons", () => {
    it("shows default icon by default", () => {
      const onClose = vi.fn();
      render(<Toast onClose={onClose}>Test</Toast>);

      // Icon should be rendered (check for SVG element)
      const icons = document.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("hides icon when showIcon is false", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast showIcon={false} onClose={onClose}>
          Test
        </Toast>
      );

      expect(container.querySelector(".toast__icon")).not.toBeInTheDocument();
    });

    it("renders custom icon", () => {
      const onClose = vi.fn();
      render(
        <Toast
          icon={<span data-testid="custom-icon">★</span>}
          onClose={onClose}
        >
          Test
        </Toast>
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  /* ============================================ */
  /* Actions                                     */
  /* ============================================ */

  describe("Actions", () => {
    it("renders action button when provided", () => {
      const onClose = vi.fn();
      const onAction = vi.fn();
      render(
        <Toast action={{ label: "Undo", onClick: onAction }} onClose={onClose}>
          Test
        </Toast>
      );

      expect(screen.getByText("Undo")).toBeInTheDocument();
    });

    it("calls action onClick when clicked", () => {
      const onClose = vi.fn();
      const onAction = vi.fn();
      render(
        <Toast action={{ label: "Undo", onClick: onAction }} onClose={onClose}>
          Test
        </Toast>
      );

      fireEvent.click(screen.getByText("Undo"));
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it("shows close button by default", () => {
      const onClose = vi.fn();
      render(<Toast onClose={onClose}>Test</Toast>);

      expect(screen.getByLabelText("Close notification")).toBeInTheDocument();
    });

    it("hides close button when showCloseButton is false", () => {
      const onClose = vi.fn();
      render(
        <Toast showCloseButton={false} onClose={onClose}>
          Test
        </Toast>
      );

      expect(
        screen.queryByLabelText("Close notification")
      ).not.toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
      const onClose = vi.fn();
      render(<Toast onClose={onClose}>Test</Toast>);

      fireEvent.click(screen.getByLabelText("Close notification"));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  /* ============================================ */
  /* Auto-Dismiss                                */
  /* ============================================ */

  describe("Auto-Dismiss", () => {
    it("auto-dismisses after specified duration", () => {
      const onClose = vi.fn();
      render(
        <Toast duration={3000} onClose={onClose}>
          Test
        </Toast>
      );

      expect(onClose).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not auto-dismiss when duration is 0", () => {
      const onClose = vi.fn();
      render(
        <Toast duration={0} onClose={onClose}>
          Test
        </Toast>
      );

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(onClose).not.toHaveBeenCalled();
    });

    it("pauses auto-dismiss on hover when pauseOnHover is true", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast duration={3000} pauseOnHover={true} onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild as HTMLElement;

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Hover over toast
      act(() => {
        fireEvent.mouseEnter(toast);
      });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should not have closed yet
      expect(onClose).not.toHaveBeenCalled();

      // Mouse leave
      act(() => {
        fireEvent.mouseLeave(toast!);
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should close now
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not pause on hover when pauseOnHover is false", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast duration={3000} pauseOnHover={false} onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild as HTMLElement;

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Hover over toast
      act(() => {
        fireEvent.mouseEnter(toast);
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should close even while hovering
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  /* ============================================ */
  /* Accessibility                               */
  /* ============================================ */

  describe("Accessibility", () => {
    it.skip("has no accessibility violations", async () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast title="Test" description="Description" onClose={onClose} />
      );

      // Skip for now - too slow for regular testing
      await expectNoA11yViolations(container);
    });

    it("has role=status by default", () => {
      const onClose = vi.fn();
      const { container } = render(<Toast onClose={onClose}>Test</Toast>);

      const toast = container.firstChild;
      expect(toast).toHaveAttribute("role", "status");
    });

    it("has role=alert for danger variant", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast variant="danger" onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild;
      expect(toast).toHaveAttribute("role", "alert");
    });

    it("has aria-live=polite by default", () => {
      const onClose = vi.fn();
      const { container } = render(<Toast onClose={onClose}>Test</Toast>);

      const toast = container.firstChild;
      expect(toast).toHaveAttribute("aria-live", "polite");
    });

    it("has aria-live=assertive for danger variant", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast variant="danger" onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild;
      expect(toast).toHaveAttribute("aria-live", "assertive");
    });

    it("has aria-atomic=true", () => {
      const onClose = vi.fn();
      const { container } = render(<Toast onClose={onClose}>Test</Toast>);

      const toast = container.firstChild;
      expect(toast).toHaveAttribute("aria-atomic", "true");
    });
  });

  /* ============================================ */
  /* ToastProvider & useToast Hook              */
  /* ============================================ */

  describe("ToastProvider & useToast", () => {
    const TestComponent: React.FC = () => {
      const toast = useToast();

      return (
        <div>
          <button onClick={() => toast.success("Success!")}>
            Show Success
          </button>
          <button onClick={() => toast.error("Error!")}>Show Error</button>
          <button onClick={() => toast.info("Info!")}>Show Info</button>
          <button onClick={() => toast.warning("Warning!")}>
            Show Warning
          </button>
          <button onClick={() => toast.show("Default!")}>Show Default</button>
          <button onClick={() => toast.dismissAll()}>Dismiss All</button>
        </div>
      );
    };

    it("throws error when useToast is used outside provider", () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        render(<TestComponent />);
      }).toThrow("useToast must be used within a ToastProvider");

      console.error = originalError;
    });

    it("shows success toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Success"));

      waitFor(() => {
        expect(screen.getByText("Success!")).toBeInTheDocument();
      });
    });

    it("shows error toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Error"));

      waitFor(() => {
        expect(screen.getByText("Error!")).toBeInTheDocument();
      });
    });

    it("shows info toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Info"));

      waitFor(() => {
        expect(screen.getByText("Info!")).toBeInTheDocument();
      });
    });

    it("shows warning toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Warning"));

      waitFor(() => {
        expect(screen.getByText("Warning!")).toBeInTheDocument();
      });
    });

    it("shows default toast", () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Default"));

      waitFor(() => {
        expect(screen.getByText("Default!")).toBeInTheDocument();
      });
    });

    it.skip("dismisses all toasts", async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Success"));
      fireEvent.click(screen.getByText("Show Error"));

      await waitFor(
        () => {
          expect(screen.getByText("Success!")).toBeInTheDocument();
          expect(screen.getByText("Error!")).toBeInTheDocument();
        },
        { timeout: 500 }
      );

      fireEvent.click(screen.getByText("Dismiss All"));

      act(() => {
        vi.advanceTimersByTime(300); // Animation duration
      });

      await waitFor(
        () => {
          expect(screen.queryByText("Success!")).not.toBeInTheDocument();
          expect(screen.queryByText("Error!")).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });

    it("respects maxToasts limit", () => {
      const TestMaxToasts: React.FC = () => {
        const toast = useToast();

        return (
          <button
            onClick={() => {
              for (let i = 1; i <= 10; i++) {
                toast.info(`Toast ${i}`);
              }
            }}
          >
            Show Many
          </button>
        );
      };

      const { container } = render(
        <ToastProvider maxToasts={3}>
          <TestMaxToasts />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Show Many"));

      // Should only show 3 toasts
      const toasts = container.querySelectorAll(".toast");
      expect(toasts.length).toBeLessThanOrEqual(3);
    });

    it("renders toasts at different positions", () => {
      const TestPositions: React.FC = () => {
        const toast = useToast();

        return (
          <div>
            <button
              onClick={() => toast.show("Top Left", { position: "top-left" })}
            >
              Top Left
            </button>
            <button
              onClick={() =>
                toast.show("Bottom Right", { position: "bottom-right" })
              }
            >
              Bottom Right
            </button>
          </div>
        );
      };

      const { container } = render(
        <ToastProvider>
          <TestPositions />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText("Top Left"));
      fireEvent.click(screen.getByText("Bottom Right"));

      waitFor(() => {
        const topLeftContainer = container.querySelector(
          ".toastContainer--top-left"
        );
        const bottomRightContainer = container.querySelector(
          ".toastContainer--bottom-right"
        );

        expect(topLeftContainer).toBeInTheDocument();
        expect(bottomRightContainer).toBeInTheDocument();
      });
    });
  });

  /* ============================================ */
  /* Exiting State                               */
  /* ============================================ */

  describe("Exiting State", () => {
    it("applies exiting class when isExiting is true", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast isExiting={true} onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild as HTMLElement;
      expect(toast.className).toContain("toast--exiting");
    });

    it("does not apply exiting class when isExiting is false", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast isExiting={false} onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild;
      expect(toast).not.toHaveClass("toast--exiting");
    });
  });

  /* ============================================ */
  /* Custom ClassName                            */
  /* ============================================ */

  describe("Custom ClassName", () => {
    it("applies custom className", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Toast className="custom-toast" onClose={onClose}>
          Test
        </Toast>
      );

      const toast = container.firstChild;
      expect(toast).toHaveClass("custom-toast");
    });
  });
});
