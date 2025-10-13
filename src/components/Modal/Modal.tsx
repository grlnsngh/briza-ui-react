import React, { useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type ModalPlacement = "center" | "top";

export interface ModalProps {
  /**
   * Whether the modal is open
   * @example
   * ```tsx
   * const [isOpen, setIsOpen] = useState(false);
   * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
   *   Content
   * </Modal>
   * ```
   */
  isOpen: boolean;
  /**
   * Callback fired when the modal requests to be closed
   * @example
   * ```tsx
   * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
   *   Content
   * </Modal>
   * ```
   */
  onClose: () => void;
  /**
   * Size of the modal
   * @default "md"
   * @example
   * ```tsx
   * <Modal size="sm" isOpen={isOpen} onClose={onClose}>Small Modal</Modal>
   * <Modal size="lg" isOpen={isOpen} onClose={onClose}>Large Modal</Modal>
   * ```
   */
  size?: ModalSize;
  /**
   * Vertical placement of the modal
   * @default "center"
   * @example
   * ```tsx
   * <Modal placement="top" isOpen={isOpen} onClose={onClose}>
   *   Top positioned modal
   * </Modal>
   * ```
   */
  placement?: ModalPlacement;
  /**
   * Modal header content
   * @example
   * ```tsx
   * <Modal header="User Settings" isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  header?: React.ReactNode;
  /**
   * Modal body content
   * @example
   * ```tsx
   * <Modal isOpen={isOpen} onClose={onClose}>
   *   <p>This is the modal body</p>
   * </Modal>
   * ```
   */
  children: React.ReactNode;
  /**
   * Modal footer content
   * @example
   * ```tsx
   * <Modal
   *   footer={
   *     <>
   *       <Button onClick={onClose}>Cancel</Button>
   *       <Button color="primary">Save</Button>
   *     </>
   *   }
   * >
   *   Content
   * </Modal>
   * ```
   */
  footer?: React.ReactNode;
  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   * @example
   * ```tsx
   * <Modal closeOnBackdropClick={false} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether pressing Escape closes the modal
   * @default true
   * @example
   * ```tsx
   * <Modal closeOnEsc={false} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  closeOnEsc?: boolean;
  /**
   * Whether to show the close button
   * @default true
   * @example
   * ```tsx
   * <Modal showCloseButton={false} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  showCloseButton?: boolean;
  /**
   * Whether to lock body scroll when modal is open
   * @default true
   * @example
   * ```tsx
   * <Modal lockScroll={false} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  lockScroll?: boolean;
  /**
   * Whether to trap focus within the modal
   * @default true
   * @example
   * ```tsx
   * <Modal trapFocus={false} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  trapFocus?: boolean;
  /**
   * Custom className for the modal container
   * @example
   * ```tsx
   * <Modal className="custom-modal" isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  className?: string;
  /**
   * Custom className for the backdrop
   * @example
   * ```tsx
   * <Modal backdropClassName="custom-backdrop" isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  backdropClassName?: string;
  /**
   * ARIA label for the modal
   * @example
   * ```tsx
   * <Modal ariaLabel="User settings dialog" isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  ariaLabel?: string;
  /**
   * ID of element that labels the modal
   * @example
   * ```tsx
   * <Modal ariaLabelledBy="modal-title" isOpen={isOpen} onClose={onClose}>
   *   <h2 id="modal-title">Title</h2>
   * </Modal>
   * ```
   */
  ariaLabelledBy?: string;
  /**
   * ID of element that describes the modal
   * @example
   * ```tsx
   * <Modal ariaDescribedBy="modal-description" isOpen={isOpen} onClose={onClose}>
   *   <p id="modal-description">Description</p>
   * </Modal>
   * ```
   */
  ariaDescribedBy?: string;
  /**
   * Portal container element or selector
   * @default document.body
   * @example
   * ```tsx
   * <Modal portalContainer="#modal-root" isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  portalContainer?: HTMLElement | string;
  /**
   * Callback fired after modal opens
   * @example
   * ```tsx
   * <Modal onOpen={() => console.log('Opened')} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  onOpen?: () => void;
  /**
   * Callback fired after modal closes
   * @example
   * ```tsx
   * <Modal onClosed={() => console.log('Closed')} isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  onClosed?: () => void;
  /**
   * Disable animations
   * @default false
   * @example
   * ```tsx
   * <Modal disableAnimation isOpen={isOpen} onClose={onClose}>
   *   Content
   * </Modal>
   * ```
   */
  disableAnimation?: boolean;
}

const ModalComponent = React.forwardRef<HTMLDivElement, ModalProps>(
  function Modal(props, ref) {
    const {
      isOpen,
      onClose,
      size = "md",
      placement = "center",
      header,
      children,
      footer,
      closeOnBackdropClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      lockScroll = true,
      trapFocus = true,
      className,
      backdropClassName,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      portalContainer,
      onOpen,
      onClosed,
      disableAnimation = false,
      ...rest
    } = props;

    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const generatedId = useId();
    const headerId = header ? `${generatedId}-header` : ariaLabelledBy;
    const bodyId = `${generatedId}-body`;

    // Get portal container
    const getPortalContainer = useCallback((): HTMLElement => {
      if (!portalContainer) return document.body;
      if (typeof portalContainer === "string") {
        const element = document.querySelector(portalContainer);
        return (element as HTMLElement) || document.body;
      }
      return portalContainer;
    }, [portalContainer]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEsc, onClose]);

    // Handle body scroll lock
    useEffect(() => {
      if (!isOpen || !lockScroll) return;

      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock scroll
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }, [isOpen, lockScroll]);

    // Handle focus trap
    useEffect(() => {
      if (!isOpen || !trapFocus) return;

      const modal = modalRef.current;
      if (!modal) return;

      // Store previous active element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Get all focusable elements
      const getFocusableElements = (): HTMLElement[] => {
        if (!modal) return [];
        const selectors = [
          "a[href]",
          "button:not([disabled])",
          "textarea:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ];
        return Array.from(modal.querySelectorAll(selectors.join(",")));
      };

      // Focus first element in body (skip close button if possible)
      const focusableElements = getFocusableElements();
      const bodyElement = modal.querySelector('[class*="body"]');
      const bodyFocusable = bodyElement
        ? Array.from(
            bodyElement.querySelectorAll(
              'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

      if (bodyFocusable.length > 0) {
        (bodyFocusable[0] as HTMLElement)?.focus();
      } else if (focusableElements.length > 0) {
        focusableElements[0]?.focus();
      } else {
        modal.focus();
      }

      // Trap focus within modal
      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);

      return () => {
        document.removeEventListener("keydown", handleTabKey);
        // Restore focus
        previousActiveElement.current?.focus();
      };
    }, [isOpen, trapFocus]);

    // Handle open/close callbacks
    useEffect(() => {
      if (isOpen) {
        onOpen?.();
      } else {
        onClosed?.();
      }
    }, [isOpen, onOpen, onClosed]);

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    // Handle close button click
    const handleCloseButtonClick = useCallback(() => {
      onClose();
    }, [onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={`${styles.backdrop} ${styles[`backdrop--${placement}`]} ${
          disableAnimation ? styles["backdrop--no-animation"] : ""
        } ${backdropClassName || ""}`}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === "Escape" && closeOnEsc) {
            onClose();
          }
        }}
        role="presentation"
        data-modal-backdrop
      >
        <div
          ref={ref || modalRef}
          className={`${styles.modal} ${styles[`modal--${size}`]} ${
            className || ""
          } ${disableAnimation ? styles["modal--no-animation"] : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={header ? headerId : undefined}
          aria-describedby={ariaDescribedBy || bodyId}
          tabIndex={-1}
          data-modal
          {...rest}
        >
          {/* Header */}
          {(header || showCloseButton) && (
            <div className={styles.header}>
              {header && (
                <div className={styles.header__content} id={headerId}>
                  {header}
                </div>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className={styles.close}
                  onClick={handleCloseButtonClick}
                  aria-label="Close modal"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L5 15M5 5l10 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={styles.body} id={bodyId}>
            {children}
          </div>

          {/* Footer */}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );

    return createPortal(modalContent, getPortalContainer());
  }
);

ModalComponent.displayName = "Modal";

export const Modal = React.memo(ModalComponent);
