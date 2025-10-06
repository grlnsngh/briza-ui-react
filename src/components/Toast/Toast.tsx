import React, { useEffect, useRef, useCallback } from "react";
import styles from "./toast.module.css";

export type ToastVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastAction {
  /**
   * Label for the action button
   */
  label: string;
  /**
   * Callback fired when action is clicked
   */
  onClick: () => void;
}

export interface ToastProps {
  /**
   * Unique identifier for the toast
   * @internal
   */
  id?: string;
  /**
   * Visual variant of the toast
   * @default "default"
   * @example
   * ```tsx
   * <Toast variant="success">Operation successful</Toast>
   * <Toast variant="danger">Error occurred</Toast>
   * ```
   */
  variant?: ToastVariant;
  /**
   * Title of the toast
   * @example
   * ```tsx
   * <Toast title="Success">Operation completed</Toast>
   * ```
   */
  title?: React.ReactNode;
  /**
   * Description/message content
   * @example
   * ```tsx
   * <Toast description="Your changes have been saved successfully" />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Custom content (overrides title/description)
   * @example
   * ```tsx
   * <Toast>
   *   <div>Custom content here</div>
   * </Toast>
   * ```
   */
  children?: React.ReactNode;
  /**
   * Icon to display (defaults based on variant)
   * @example
   * ```tsx
   * <Toast icon={<CustomIcon />}>Message</Toast>
   * ```
   */
  icon?: React.ReactNode;
  /**
   * Whether to show default icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Action button(s) to display
   * @example
   * ```tsx
   * <Toast action={{ label: "Undo", onClick: handleUndo }}>
   *   File deleted
   * </Toast>
   * ```
   */
  action?: ToastAction;
  /**
   * Whether to show close button
   * @default true
   * @example
   * ```tsx
   * <Toast showCloseButton={false}>Cannot dismiss</Toast>
   * ```
   */
  showCloseButton?: boolean;
  /**
   * Duration in milliseconds before auto-dismiss (0 = no auto-dismiss)
   * @default 5000
   * @example
   * ```tsx
   * <Toast duration={3000}>Dismisses after 3 seconds</Toast>
   * <Toast duration={0}>Never auto-dismisses</Toast>
   * ```
   */
  duration?: number;
  /**
   * Callback fired when toast is closed
   * @example
   * ```tsx
   * <Toast onClose={() => console.log("Toast closed")}>Message</Toast>
   * ```
   */
  onClose?: () => void;
  /**
   * Whether toast is in exiting animation
   * @internal
   */
  isExiting?: boolean;
  /**
   * Custom className for the toast container
   * @example
   * ```tsx
   * <Toast className="custom-toast">Message</Toast>
   * ```
   */
  className?: string;
  /**
   * ARIA role for the toast
   * @default "status" (or "alert" for danger variant)
   * @example
   * ```tsx
   * <Toast role="alert">Important message</Toast>
   * ```
   */
  role?: "status" | "alert";
  /**
   * Whether toast should pause auto-dismiss on hover
   * @default true
   * @example
   * ```tsx
   * <Toast pauseOnHover={false}>Won't pause on hover</Toast>
   * ```
   */
  pauseOnHover?: boolean;
}

// Default icons for each variant
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DangerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 18L18 6M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getDefaultIcon = (variant: ToastVariant): React.ReactNode => {
  switch (variant) {
    case "success":
      return <CheckIcon />;
    case "warning":
      return <WarningIcon />;
    case "danger":
      return <DangerIcon />;
    case "info":
      return <InfoIcon />;
    default:
      return <DefaultIcon />;
  }
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  function Toast(props, ref) {
    const {
      variant = "default",
      title,
      description,
      children,
      icon,
      showIcon = true,
      action,
      showCloseButton = true,
      duration = 5000,
      onClose,
      isExiting = false,
      className,
      role,
      pauseOnHover = true,
    } = props;

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const remainingTimeRef = useRef<number>(duration);
    const startTimeRef = useRef<number>(Date.now());
    const isPausedRef = useRef<boolean>(false);

    const clearTimer = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }, []);

    const startTimer = useCallback(() => {
      if (duration > 0 && onClose && !isPausedRef.current) {
        clearTimer();
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
          onClose();
        }, remainingTimeRef.current);
      }
    }, [duration, onClose, clearTimer]);

    const pauseTimer = useCallback(() => {
      if (!pauseOnHover || duration === 0) return;

      clearTimer();
      isPausedRef.current = true;
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(
        0,
        remainingTimeRef.current - elapsed
      );
    }, [clearTimer, duration, pauseOnHover]);

    const resumeTimer = useCallback(() => {
      if (!pauseOnHover || duration === 0) return;

      isPausedRef.current = false;
      startTimer();
    }, [startTimer, duration, pauseOnHover]);

    useEffect(() => {
      startTimer();
      return () => {
        clearTimer();
      };
    }, [startTimer, clearTimer]);

    const handleClose = useCallback(() => {
      if (onClose) {
        onClose();
      }
    }, [onClose]);

    const toastClass = [
      styles.toast,
      styles[`toast--${variant}`],
      isExiting && styles["toast--exiting"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const defaultRole = variant === "danger" ? "alert" : "status";
    const displayIcon = showIcon ? icon || getDefaultIcon(variant) : null;

    return (
      <div
        ref={ref}
        className={toastClass}
        role={role || defaultRole}
        aria-live={variant === "danger" ? "assertive" : "polite"}
        aria-atomic="true"
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
      >
        {displayIcon && <div className={styles.toast__icon}>{displayIcon}</div>}

        <div className={styles.toast__content}>
          {children ? (
            <div className={styles.toast__children}>{children}</div>
          ) : (
            <>
              {title && <div className={styles.toast__title}>{title}</div>}
              {description && (
                <div className={styles.toast__description}>{description}</div>
              )}
            </>
          )}
        </div>

        <div className={styles.toast__actions}>
          {action && (
            <button
              type="button"
              className={styles.toast__action}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
            >
              {action.label}
            </button>
          )}

          {showCloseButton && (
            <button
              type="button"
              className={styles.toast__close}
              onClick={handleClose}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);
