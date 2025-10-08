import React from "react";
import styles from "./spinner.module.css";

export type SpinnerVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "inverse";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export type SpinnerType = "circular" | "dots" | "pulse" | "bars";

/**
 * Props for the Spinner component
 */
export interface SpinnerProps {
  /**
   * The color variant of the spinner
   * @default "primary"
   * @example
   * ```tsx
   * <Spinner variant="success" />
   * <Spinner variant="danger" />
   * ```
   */
  variant?: SpinnerVariant;
  /**
   * The size of the spinner
   * @default "md"
   * @example
   * ```tsx
   * <Spinner size="xs" />
   * <Spinner size="xl" />
   * ```
   */
  size?: SpinnerSize;
  /**
   * The animation type of the spinner
   * @default "circular"
   * @example
   * ```tsx
   * <Spinner type="circular" />
   * <Spinner type="dots" />
   * <Spinner type="pulse" />
   * <Spinner type="bars" />
   * ```
   */
  type?: SpinnerType;
  /**
   * Optional label text for accessibility
   * @example
   * ```tsx
   * <Spinner label="Loading data..." />
   * ```
   */
  label?: string;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * ARIA live region politeness setting
   * @default "polite"
   * @example
   * ```tsx
   * <Spinner ariaLive="assertive" label="Critical loading" />
   * ```
   */
  ariaLive?: "polite" | "assertive" | "off";
  /**
   * Custom ARIA label (overrides default)
   * @example
   * ```tsx
   * <Spinner ariaLabel="Loading user profile" />
   * ```
   */
  ariaLabel?: string;
}

/**
 * Loading Spinner Component
 *
 * A versatile loading spinner with multiple animation types, sizes, and color variants.
 * Includes accessibility features with ARIA live regions and labels.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // With label
 * <Spinner label="Loading..." />
 *
 * // Different variants
 * <Spinner variant="success" size="lg" />
 *
 * // Different animation types
 * <Spinner type="dots" />
 * <Spinner type="pulse" />
 * <Spinner type="bars" />
 * ```
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(props, ref) {
    const {
      variant = "primary",
      size = "md",
      type = "circular",
      label,
      className,
      ariaLive = "polite",
      ariaLabel,
    } = props;

    const containerClass = [
      styles.spinnerContainer,
      styles[`spinnerContainer--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const spinnerClass = [
      styles.spinner,
      styles[`spinner--${variant}`],
      styles[`spinner--${size}`],
      styles[`spinner--${type}`],
    ]
      .filter(Boolean)
      .join(" ");

    const defaultAriaLabel =
      ariaLabel || (label ? label : "Loading, please wait");

    // Render different spinner types
    const renderSpinner = () => {
      switch (type) {
        case "circular":
          return (
            <svg
              className={spinnerClass}
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={styles.spinnerCircleBackground}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
              <circle
                className={styles.spinnerCircle}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          );

        case "dots":
          return (
            <div className={spinnerClass}>
              <span className={styles.spinnerDot} />
              <span className={styles.spinnerDot} />
              <span className={styles.spinnerDot} />
            </div>
          );

        case "pulse":
          return (
            <div className={spinnerClass}>
              <span className={styles.spinnerPulse} />
            </div>
          );

        case "bars":
          return (
            <div className={spinnerClass}>
              <span className={styles.spinnerBar} />
              <span className={styles.spinnerBar} />
              <span className={styles.spinnerBar} />
              <span className={styles.spinnerBar} />
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={containerClass}
        role="status"
        aria-live={ariaLive}
        aria-busy="true"
        aria-label={defaultAriaLabel}
      >
        {renderSpinner()}
        {label && <span className={styles.spinnerLabel}>{label}</span>}
      </div>
    );
  }
);
