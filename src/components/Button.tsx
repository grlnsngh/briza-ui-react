import React from "react";

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

const colorStyles: Record<ButtonColor, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--color-muted)",
    color: "var(--color-foreground)",
  },
  primary: {
    backgroundColor: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
  },
  secondary: { backgroundColor: "#8b5cf6", color: "white" }, // purple
  success: {
    backgroundColor: "var(--color-success)",
    color: "var(--color-success-foreground)",
  },
  warning: { backgroundColor: "#eab308", color: "black" }, // yellow
  danger: {
    backgroundColor: "var(--color-destructive)",
    color: "var(--color-destructive-foreground)",
  },
};

export const Button: React.FC<ButtonProps> = ({
  color = "default",
  children,
  style = {},
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const combinedStyle = { ...baseStyles, ...colorStyles[color], ...style };

  return (
    <button style={combinedStyle} {...props}>
      {children}
    </button>
  );
};
