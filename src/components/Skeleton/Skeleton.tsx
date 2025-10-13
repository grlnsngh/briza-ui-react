import React from "react";
import styles from "./skeleton.module.css";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps {
  /**
   * The type of skeleton to display
   * @default "text"
   */
  variant?: SkeletonVariant;
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  /**
   * Whether to show animation
   * @default true
   */
  animation?: boolean;
}

/**
 * Skeleton Component
 *
 * A placeholder component that displays a shimmer loading effect.
 * Use for individual elements during loading states.
 *
 * @example
 * ```tsx
 * // Loading a title
 * <Skeleton variant="text" width="60%" height={24} />
 *
 * // Loading an avatar
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Loading an image
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
const SkeletonComponent = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const {
      variant = "text",
      width,
      height,
      className,
      style,
      animation = true,
      ...rest
    } = props;

    const skeletonClasses = [
      styles.skeleton,
      styles[`skeleton--${variant}`],
      animation && styles["skeleton--animated"],
      !animation && styles["skeleton--no-animation"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyles: React.CSSProperties = {
      width,
      height,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={skeletonClasses}
        style={inlineStyles}
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading..."
        {...rest}
      />
    );
  }
);

SkeletonComponent.displayName = "Skeleton";

export const Skeleton = React.memo(SkeletonComponent);
