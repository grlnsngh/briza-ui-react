import React from "react";
import styles from "./button.module.css";

export type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  color = "default",
  children,
  className = "",
  ...props
}) => {
  const buttonClass = `${styles.button} ${
    styles[`button--${color}`]
  } ${className}`.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
