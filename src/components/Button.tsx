import React, { forwardRef, useMemo, useState, useCallback } from "react";
import "./Button.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "rectangle" | "pill" | "circle";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  iconOnly?: boolean;
  as?: React.ElementType;
  toggle?: boolean;
  pressed?: boolean;
  fullWidth?: boolean;
  menuExpanded?: boolean;
  menuId?: string;
  copyToClipboard?: string;
  upload?: boolean;
  asyncAction?: () => Promise<void>;
  isCTA?: boolean;
  isCurrent?: boolean;
  mobileFullWidth?: boolean;
  onAsyncSuccess?: () => void;
  onAsyncError?: (error: Error) => void;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "rectangle",
      loading: externalLoading = false,
      iconOnly = false,
      as: Component = "button",
      toggle = false,
      pressed,
      fullWidth = false,
      menuExpanded,
      menuId,
      copyToClipboard,
      upload = false,
      asyncAction,
      isCTA = false,
      isCurrent = false,
      mobileFullWidth = false,
      onAsyncSuccess,
      onAsyncError,
      onClick,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [asyncState, setAsyncState] = useState<
      "idle" | "loading" | "success" | "error"
    >("idle");

    const isLoading = externalLoading || asyncState === "loading";
    const isSuccess = asyncState === "success";
    const isError = asyncState === "error";

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (copyToClipboard) {
          try {
            await navigator.clipboard.writeText(copyToClipboard);
            setAsyncState("success");
            setTimeout(() => setAsyncState("idle"), 2000);
          } catch {
            setAsyncState("error");
            setTimeout(() => setAsyncState("idle"), 2000);
          }
        } else if (asyncAction) {
          setAsyncState("loading");
          try {
            await asyncAction();
            setAsyncState("success");
            onAsyncSuccess?.();
            setTimeout(() => setAsyncState("idle"), 2000);
          } catch (error) {
            setAsyncState("error");
            onAsyncError?.(error as Error);
            setTimeout(() => setAsyncState("idle"), 2000);
          }
        }

        onClick?.(event);
      },
      [copyToClipboard, asyncAction, onClick, onAsyncSuccess, onAsyncError]
    );
    const classes = useMemo(() => {
      const baseClasses = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        `button--${shape}`,
      ];
      if (isLoading) baseClasses.push("button--loading");
      if (isSuccess) baseClasses.push("button--success");
      if (isError) baseClasses.push("button--error");
      if (iconOnly) baseClasses.push("button--icon-only");
      if (toggle) baseClasses.push("button--toggle");
      if (pressed) baseClasses.push("button--pressed");
      if (fullWidth || mobileFullWidth) baseClasses.push("button--full-width");
      if (isCTA) baseClasses.push("button--cta");
      if (isCurrent) baseClasses.push("button--current");
      if (upload) baseClasses.push("button--upload");
      if (className) baseClasses.push(className);
      return baseClasses.join(" ");
    }, [
      variant,
      size,
      shape,
      isLoading,
      isSuccess,
      isError,
      iconOnly,
      toggle,
      pressed,
      fullWidth,
      mobileFullWidth,
      isCTA,
      isCurrent,
      upload,
      className,
    ]);

    const isDisabled = disabled || isLoading;

    const componentProps = {
      ...props,
      ref,
      className: classes,
      disabled: isDisabled,
      "aria-busy": isLoading,
      ...(toggle && { "aria-pressed": pressed }),
      ...(menuExpanded !== undefined && { "aria-expanded": menuExpanded }),
      ...(menuId && { "aria-controls": menuId }),
      ...(isCurrent && { "aria-current": "page" }),
      ...(Component === "button" && { onClick: handleClick }),
    };

    // Runtime check for iconOnly requiring aria-label
    if (iconOnly && !props["aria-label"]) {
      console.warn("Button: aria-label is required when iconOnly is true");
    }

    return (
      <Component {...componentProps}>
        {isLoading && <span className="button__spinner" aria-hidden="true" />}
        <span className="button__content">{children}</span>
      </Component>
    );
  }
);

Button.displayName = "Button";

export default React.memo(Button);
