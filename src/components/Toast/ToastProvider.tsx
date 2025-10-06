/**
 * Toast Provider Component for Briza UI React
 *
 * Provides toast context to all child components with support for:
 * - Multiple toast positions
 * - Toast stacking and queue management
 * - Programmatic toast creation API
 * - Auto-dismiss with pause on hover
 * - Custom animations
 */

import React, { useState, useCallback, useMemo, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Toast, type ToastProps, type ToastPosition } from "./Toast";
import {
  ToastContext,
  type ToastContextValue,
  type ToastOptions,
} from "./ToastContext";
import styles from "./toast.module.css";

// =============================================================================
// TYPES
// =============================================================================

export interface ToastItem extends Omit<ToastProps, "onClose" | "isExiting"> {
  id: string;
  position?: ToastPosition;
}

// Re-export types for convenience
export type { ToastContextValue, ToastOptions };

// =============================================================================
// PROVIDER PROPS
// =============================================================================

export interface ToastProviderProps {
  /**
   * Child components
   */
  children: ReactNode;
  /**
   * Default position for toasts
   * @default "top-right"
   */
  defaultPosition?: ToastPosition;
  /**
   * Default duration for toasts
   * @default 5000
   */
  defaultDuration?: number;
  /**
   * Maximum number of toasts to show at once
   * @default 5
   */
  maxToasts?: number;
  /**
   * Portal container element or selector
   * @default document.body
   */
  portalContainer?: HTMLElement | string;
}

// =============================================================================
// UTILITIES
// =============================================================================

let toastCounter = 0;
const generateToastId = (): string => {
  toastCounter += 1;
  return `toast-${toastCounter}-${Date.now()}`;
};

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = "top-right",
  defaultDuration = 5000,
  maxToasts = 5,
  portalContainer,
}) => {
  const [toasts, setToasts] = useState<Map<string, ToastItem>>(new Map());
  const [exitingToasts, setExitingToasts] = useState<Set<string>>(new Set());

  // Get portal container
  const getPortalContainer = useCallback((): HTMLElement => {
    if (!portalContainer) {
      return document.body;
    }
    if (typeof portalContainer === "string") {
      const element = document.querySelector(portalContainer);
      return (element as HTMLElement) || document.body;
    }
    return portalContainer;
  }, [portalContainer]);

  // Dismiss a toast with exit animation
  const dismiss = useCallback((id: string) => {
    setExitingToasts((prev) => new Set(prev).add(id));

    // Remove after animation completes
    setTimeout(() => {
      setToasts((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
      setExitingToasts((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300); // Match animation duration
  }, []);

  // Show a toast
  const show = useCallback(
    (message: React.ReactNode, options: ToastOptions = {}): string => {
      const id = generateToastId();
      const position = options.position || defaultPosition;
      const duration = options.duration ?? defaultDuration;

      const toastItem: ToastItem = {
        id,
        position,
        variant: options.variant || "default",
        title: options.title,
        description: typeof message === "string" ? message : undefined,
        children: typeof message !== "string" ? message : undefined,
        duration,
        icon: options.icon,
        showIcon: options.showIcon,
        action: options.action,
        showCloseButton: options.showCloseButton,
        className: options.className,
        pauseOnHover: options.pauseOnHover,
      };

      setToasts((prev) => {
        const next = new Map(prev);

        // Remove oldest toast if max limit reached
        if (next.size >= maxToasts) {
          const firstKey = next.keys().next().value;
          if (firstKey) {
            dismiss(firstKey);
          }
        }

        next.set(id, toastItem);
        return next;
      });

      return id;
    },
    [defaultPosition, defaultDuration, maxToasts, dismiss]
  );

  // Convenience methods
  const success = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, "variant">) =>
      show(message, { ...options, variant: "success" }),
    [show]
  );

  const info = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, "variant">) =>
      show(message, { ...options, variant: "info" }),
    [show]
  );

  const warning = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, "variant">) =>
      show(message, { ...options, variant: "warning" }),
    [show]
  );

  const danger = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, "variant">) =>
      show(message, { ...options, variant: "danger" }),
    [show]
  );

  const error = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, "variant">) =>
      show(message, { ...options, variant: "danger" }),
    [show]
  );

  const custom = useCallback(
    (content: React.ReactNode, options: ToastOptions = {}): string => {
      return show(content, options);
    },
    [show]
  );

  const dismissAll = useCallback(() => {
    toasts.forEach((_, id) => dismiss(id));
  }, [toasts, dismiss]);

  const contextValue = useMemo<ToastContextValue>(
    () => ({
      show,
      success,
      info,
      warning,
      danger,
      error,
      dismiss,
      dismissAll,
      custom,
    }),
    [show, success, info, warning, danger, error, dismiss, dismissAll, custom]
  );

  // Group toasts by position
  const toastsByPosition = useMemo(() => {
    const grouped = new Map<ToastPosition, ToastItem[]>();

    toasts.forEach((toast) => {
      const position = toast.position || defaultPosition;
      if (!grouped.has(position)) {
        grouped.set(position, []);
      }
      grouped.get(position)!.push(toast);
    });

    return grouped;
  }, [toasts, defaultPosition]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className={styles.toastPortal}>
            {Array.from(toastsByPosition.entries()).map(
              ([position, positionToasts]) => (
                <div
                  key={position}
                  className={`${styles.toastContainer} ${
                    styles[`toastContainer--${position}`]
                  }`}
                >
                  {positionToasts.map((toast) => (
                    <Toast
                      key={toast.id}
                      {...toast}
                      isExiting={exitingToasts.has(toast.id)}
                      onClose={() => dismiss(toast.id)}
                    />
                  ))}
                </div>
              )
            )}
          </div>,
          getPortalContainer()
        )}
    </ToastContext.Provider>
  );
};
