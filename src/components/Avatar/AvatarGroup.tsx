import React from "react";
import styles from "./avatar-group.module.css";
import type { AvatarSize } from "./Avatar";

/**
 * Props for the AvatarGroup component
 */
export interface AvatarGroupProps {
  /**
   * Avatar components to display
   */
  children: React.ReactNode;
  /**
   * Maximum number of avatars to display before showing "+N"
   * @default 5
   */
  max?: number;
  /**
   * Size of avatars in the group
   * @default "md"
   */
  size?: AvatarSize;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether to show the count of remaining avatars
   * @default true
   */
  renderCount?: boolean;
}

/**
 * AvatarGroup Component
 *
 * Groups multiple avatars together with overlapping layout.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar name="John Doe" />
 *   <Avatar name="Jane Smith" />
 *   <Avatar name="Bob Johnson" />
 *   <Avatar name="Alice Brown" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (props, ref) => {
    const {
      children,
      max = 5,
      size = "md",
      className,
      renderCount = true,
    } = props;

    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    const groupClasses = [
      styles["avatar-group"],
      styles[`avatar-group--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={groupClasses} role="group">
        {visibleChildren.map((child, index) => (
          <div key={index} className={styles["avatar-group__item"]}>
            {child}
          </div>
        ))}
        {renderCount && remainingCount > 0 && (
          <div
            className={`${styles["avatar-group__item"]} ${styles["avatar-group__count"]}`}
          >
            <div
              className={`${styles["avatar-group__count-avatar"]} ${
                styles[`avatar-group__count-avatar--${size}`]
              }`}
            >
              <span className={styles["avatar-group__count-text"]}>
                +{remainingCount}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";
