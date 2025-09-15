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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  color = "default",
  variant = "solid",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${color}`]} ${
    styles[`button--${variant}`]
  } ${styles[`button--${size}`]} ${className}`.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
