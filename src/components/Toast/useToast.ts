/**
 * useToast Hook for Briza UI React
 *
 * Custom hook to access the Toast context and show toast notifications.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   const handleClick = () => {
 *     toast.success("Operation successful!");
 *   };
 *
 *   return <button onClick={handleClick}>Show Toast</button>;
 * }
 * ```
 */

import { useContext } from "react";
import { ToastContext, type ToastContextValue } from "./ToastContext";

/**
 * Hook to access toast notifications
 * @throws {Error} If used outside of ToastProvider
 * @returns {ToastContextValue} Toast context methods
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used within a ToastProvider. " +
        "Please wrap your app with <ToastProvider>...</ToastProvider>"
    );
  }

  return context;
};
