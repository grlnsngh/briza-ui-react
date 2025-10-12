import React from "react";
import styles from "./card.module.css";

export type CardVariant = "default" | "bordered" | "shadow" | "elevated";
export type CardSize = "sm" | "md" | "lg";
export type CardRadius = "none" | "sm" | "md" | "lg";

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Visual variant of the card
   * @default "default"
   */
  variant?: CardVariant;
  /**
   * Size of the card
   * @default "md"
   */
  size?: CardSize;
  /**
   * Border radius of the card
   * @default "md"
   */
  radius?: CardRadius;
  /**
   * Whether the card is hoverable (adds hover effects like lift and shadow enhancement)
   * Use for cards that navigate or show more details
   * @default false
   */
  isHoverable?: boolean;
  /**
   * Whether the card is pressable (adds pressed state with scale down effect)
   * Use for cards that perform an action like selecting an option
   * @default false
   */
  isPressable?: boolean;
  /**
   * Whether the card is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  /**
   * Click handler (makes card interactive)
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * ARIA role
   * @default undefined
   */
  role?: string;
  /**
   * ARIA label
   */
  "aria-label"?: string;
  /**
   * Tab index
   */
  tabIndex?: number;
}

/**
 * Card Component
 *
 * A flexible card component with header, body, and footer sections.
 * Supports hover states, loading states, images, and action buttons.
 *
 * @example
 * ```tsx
 * <Card variant="shadow" isHoverable>
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Card content goes here</p>
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      children,
      variant = "default",
      size = "md",
      radius = "md",
      isHoverable = false,
      isPressable = false,
      isDisabled = false,
      className,
      style,
      onClick,
      role,
      "aria-label": ariaLabel,
      tabIndex,
      ...rest
    } = props;

    const cardClasses = [
      styles.card,
      styles[`card--${variant}`],
      styles[`card--${size}`],
      styles[`card--radius-${radius}`],
      isHoverable && styles["card--hoverable"],
      isPressable && styles["card--pressable"],
      isDisabled && styles["card--disabled"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isInteractive = onClick && !isDisabled;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isInteractive && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        ref={ref}
        className={cardClasses}
        style={style}
        onClick={isInteractive ? onClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        role={role || (isInteractive ? "button" : undefined)}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        tabIndex={isInteractive ? tabIndex ?? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps {
  /**
   * Header content
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether to add divider below header
   * @default false
   */
  divider?: boolean;
}

/**
 * CardHeader Component
 *
 * Header section of a card, typically contains titles and actions.
 *
 * @example
 * ```tsx
 * <CardHeader divider>
 *   <h3>Card Title</h3>
 * </CardHeader>
 * ```
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const { children, className, divider = false, ...rest } = props;

    const headerClasses = [
      styles["card__header"],
      divider && styles["card__header--divider"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={headerClasses} {...rest}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardBodyProps {
  /**
   * Body content
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * CardBody Component
 *
 * Main content area of a card.
 *
 * @example
 * ```tsx
 * <CardBody>
 *   <p>Card content goes here</p>
 * </CardBody>
 * ```
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    const bodyClasses = [styles["card__body"], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={bodyClasses} {...rest}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = "CardBody";

export interface CardFooterProps {
  /**
   * Footer content
   */
  children: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Whether to add divider above footer
   * @default false
   */
  divider?: boolean;
}

/**
 * CardFooter Component
 *
 * Footer section of a card, typically contains actions.
 *
 * @example
 * ```tsx
 * <CardFooter divider>
 *   <Button>Action</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const { children, className, divider = false, ...rest } = props;

    const footerClasses = [
      styles["card__footer"],
      divider && styles["card__footer--divider"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={footerClasses} {...rest}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

export interface CardImageProps {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Image alt text
   */
  alt: string;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Image loading strategy
   * @default "lazy"
   */
  loading?: "lazy" | "eager";
  /**
   * Object fit style
   * @default "cover"
   */
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * CardImage Component
 *
 * Image component for cards with proper sizing and aspect ratio.
 *
 * @example
 * ```tsx
 * <CardImage
 *   src="/path/to/image.jpg"
 *   alt="Card image"
 * />
 * ```
 */
export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  (props, ref) => {
    const {
      src,
      alt,
      className,
      loading = "lazy",
      objectFit = "cover",
      ...rest
    } = props;

    const imageClasses = [
      styles["card__image"],
      styles[`card__image--${objectFit}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        className={imageClasses}
        {...rest}
      />
    );
  }
);

CardImage.displayName = "CardImage";
