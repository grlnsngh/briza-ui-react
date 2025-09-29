import React from "react";
import styles from "./button.module.css";

export type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export type ButtonVariant =
  | "solid"
  | "faded"
  | "bordered"
  | "light"
  | "shadow"
  | "glowing";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

/**
 * Base props for the Button component
 */
interface ButtonOwnProps {
  /**
   * The color variant of the button
   * @default "default"
   */
  color?: ButtonColor;
  /**
   * The visual variant of the button
   * @default "solid"
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * The border radius of the button
   * @default "md"
   */
  radius?: ButtonRadius;
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Content to display at the start of the button
   */
  startContent?: React.ReactNode;
  /**
   * Content to display at the end of the button
   */
  endContent?: React.ReactNode;
  /**
   * Whether the button only contains an icon
   * @default false
   */
  isIconOnly?: boolean;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

/**
 * Polymorphic Button props - allows rendering as different HTML elements
 */
export interface ButtonProps extends ButtonOwnProps {
  /**
   * The element type to render the button as
   * @default "button"
   */
  as?: React.ElementType;
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  function Button(props, ref) {
    const {
      as = "button",
      color = "default",
      variant = "solid",
      size = "md",
      radius = "md",
      isLoading = false,
      startContent,
      endContent,
      isIconOnly = false,
      children,
      className,
      disabled,
      ...rest
    } = props;

    const Component = as as React.ElementType;
    const buttonClass = [
      styles.button,
      styles[`button--${color}`],
      styles[`button--${variant}`],
      styles[`button--${size}`],
      styles[`button--radius-${radius}`],
      isLoading && styles["button--loading"],
      isIconOnly && styles["button--icon-only"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const defaultLoadingIcon = (
      <svg
        className={styles.spinner}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.3"
        />
        <path
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );

    // Handle disabled state properly for different element types
    const isDisabled = disabled || isLoading;
    const componentProps: Record<string, unknown> = {
      className: buttonClass,
      ref,
      ...rest,
    };

    // Only add disabled prop for button and input elements
    if (Component === "button" || Component === "input") {
      componentProps.disabled = isDisabled;
    } else if (isDisabled) {
      // Add aria-disabled for non-button elements when disabled
      componentProps["aria-disabled"] = true;
    }

    return (
      <Component {...componentProps}>
        {isLoading && (
          <span className={styles["button__loading-icon"]}>
            {defaultLoadingIcon}
          </span>
        )}
        {isIconOnly ? (
          children
        ) : (
          <>
            {startContent && (
              <span className={styles["button__start-content"]}>
                {startContent as React.ReactNode}
              </span>
            )}
            {children}
            {endContent && (
              <span className={styles["button__end-content"]}>
                {endContent as React.ReactNode}
              </span>
            )}
          </>
        )}
      </Component>
    );
  }
);
