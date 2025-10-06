/**
 * Toast Context and Types
 *
 * Separate file for React Context to support Fast Refresh.
 */

import { createContext } from "react";
import type { ToastProps, ToastVariant, ToastPosition } from "./Toast";

export interface ToastOptions {
  /**
   * Position where the toast will appear
   * @default "top-right"
   */
  position?: ToastPosition;
  /**
   * Duration in milliseconds before auto-dismiss
   * @default 5000
   */
  duration?: number;
  /**
   * Visual variant
   * @default "default"
   */
  variant?: ToastVariant;
  /**
   * Title of the toast
   */
  title?: React.ReactNode;
  /**
   * Description/message
   */
  description?: React.ReactNode;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Whether to show default icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Action button
   */
  action?: ToastProps["action"];
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether to pause on hover
   * @default true
   */
  pauseOnHover?: boolean;
}

export interface ToastContextValue {
  /**
   * Show a toast notification
   */
  show: (message: React.ReactNode, options?: ToastOptions) => string;
  /**
   * Show a success toast
   */
  success: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, "variant">
  ) => string;
  /**
   * Show an info toast
   */
  info: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, "variant">
  ) => string;
  /**
   * Show a warning toast
   */
  warning: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, "variant">
  ) => string;
  /**
   * Show a danger/error toast
   */
  danger: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, "variant">
  ) => string;
  /**
   * Show an error toast (alias for danger)
   */
  error: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, "variant">
  ) => string;
  /**
   * Dismiss a specific toast by ID
   */
  dismiss: (id: string) => void;
  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;
  /**
   * Custom toast with full control
   */
  custom: (content: React.ReactNode, options?: ToastOptions) => string;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
