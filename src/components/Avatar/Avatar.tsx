import React, { useState, useCallback } from "react";
import styles from "./avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarRadius = "none" | "sm" | "md" | "lg" | "full";
export type AvatarColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type AvatarStatus = "online" | "offline" | "away" | "busy";

/**
 * Props for the Avatar component
 */
export interface AvatarProps {
  /**
   * Image source URL for the avatar
   */
  src?: string;
  /**
   * Alternative text for the image (for accessibility)
   */
  alt?: string;
  /**
   * Name to generate initials from (used when image fails to load or src is not provided)
   */
  name?: string;
  /**
   * Custom initials (overrides generated initials from name)
   */
  initials?: string;
  /**
   * Size of the avatar
   * @default "md"
   */
  size?: AvatarSize;
  /**
   * Border radius of the avatar
   * @default "full"
   */
  radius?: AvatarRadius;
  /**
   * Color variant for the avatar background (used with initials)
   * @default "default"
   */
  color?: AvatarColor;
  /**
   * Whether the avatar is loading
   * @default false
   */
  isLoading?: boolean;
  /**
   * Whether the avatar is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether to show a border
   * @default false
   */
  isBordered?: boolean;
  /**
   * Status indicator
   */
  status?: AvatarStatus;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom icon to display (instead of initials or image)
   */
  icon?: React.ReactNode;
  /**
   * Callback when image fails to load
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /**
   * Whether the avatar is purely decorative (not informative)
   * When true, sets aria-hidden and removes alt text requirement
   * @default false
   */
  isDecorative?: boolean;
}

/**
 * Generate initials from a name
 */
const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";

  // Get first letter of first word and first letter of last word
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0).toUpperCase() +
    words[words.length - 1].charAt(0).toUpperCase()
  );
};

/**
 * Avatar Component
 *
 * Displays user avatars with image support, initials fallback, various sizes,
 * status indicators, loading states, and accessibility considerations.
 *
 * @example
 * ```tsx
 * // Image avatar
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * // Initials avatar
 * <Avatar name="John Doe" color="primary" />
 *
 * // With status indicator
 * <Avatar src="/user.jpg" alt="John Doe" status="online" />
 *
 * // Loading state
 * <Avatar isLoading />
 * ```
 */
const AvatarComponent = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const {
      src,
      alt,
      name,
      initials: customInitials,
      size = "md",
      radius = "full",
      color = "default",
      isLoading = false,
      isDisabled = false,
      isBordered = false,
      status,
      className,
      icon,
      onError,
      isDecorative = false,
    } = props;

    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setImageError(true);
        onError?.(event);
      },
      [onError]
    );

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    // Determine what to display
    const showImage = src && !imageError && !isLoading;
    const initials = customInitials || (name ? getInitials(name) : undefined);
    const showInitials = !showImage && !icon && initials;
    const showIcon = !showImage && !showInitials && icon;
    const showPlaceholder = !showImage && !showInitials && !showIcon;

    const avatarClasses = [
      styles.avatar,
      styles[`avatar--${size}`],
      styles[`avatar--radius-${radius}`],
      styles[`avatar--${color}`],
      isDisabled && styles["avatar--disabled"],
      isBordered && styles["avatar--bordered"],
      isLoading && styles["avatar--loading"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Accessibility attributes
    const ariaLabel = isDecorative
      ? undefined
      : isLoading
      ? "Loading avatar"
      : alt || name;
    const ariaHidden = isDecorative ? true : undefined;

    return (
      <div
        ref={ref}
        className={avatarClasses}
        role={isDecorative ? "presentation" : "img"}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <div className={styles.avatar__loading}>
            <svg
              className={styles.avatar__spinner}
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                fill="currentColor"
              />
            </svg>
          </div>
        ) : showImage ? (
          <>
            <img
              src={src}
              alt={isDecorative ? "" : alt || name || "Avatar"}
              className={styles.avatar__image}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className={styles["avatar__image-loading"]}>
                <div className={styles.avatar__skeleton} />
              </div>
            )}
          </>
        ) : showInitials ? (
          <span className={styles.avatar__initials}>{initials}</span>
        ) : showIcon ? (
          <span className={styles.avatar__icon}>{icon}</span>
        ) : showPlaceholder ? (
          <svg
            className={styles.avatar__placeholder}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : null}

        {status && (
          <span
            className={`${styles.avatar__status} ${
              styles[`avatar__status--${status}`]
            }`}
            role="status"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

AvatarComponent.displayName = "Avatar";

export const Avatar = React.memo(AvatarComponent);
