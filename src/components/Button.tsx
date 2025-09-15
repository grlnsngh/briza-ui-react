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
  | "flat"
  | "shadow"
  | "glowing";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  color = "default",
  variant = "solid",
  size = "md",
  radius = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${color}`]} ${
    styles[`button--${variant}`]
  } ${styles[`button--${size}`]} ${styles[`button--radius-${radius}`]} ${
    isLoading ? styles["button--loading"] : ""
  } ${className}`.trim();

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

  return (
    <button className={buttonClass} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <span className={styles["button__loading-icon"]}>
          {defaultLoadingIcon}
        </span>
      )}
      {children}
    </button>
  );
};
