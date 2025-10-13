import React, { useId, useState, useRef } from "react";
import styles from "./breadcrumb.module.css";

export type BreadcrumbSize = "sm" | "md" | "lg";
export type BreadcrumbOverflow = "collapse" | "ellipsis" | "scroll";

export interface BreadcrumbItem {
  /**
   * Unique key for the item
   */
  key: string;
  /**
   * Label text or element
   */
  label: React.ReactNode;
  /**
   * URL to navigate to
   */
  href?: string;
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;
  /**
   * Whether the item is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether this is the current page
   * @default false
   */
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items
   * @example
   * ```tsx
   * <Breadcrumb items={[
   *   { key: "home", label: "Home", href: "/" },
   *   { key: "products", label: "Products", href: "/products" },
   *   { key: "details", label: "Details", isCurrent: true }
   * ]} />
   * ```
   */
  items: BreadcrumbItem[];
  /**
   * Size of the breadcrumb
   * @default "md"
   * @example
   * ```tsx
   * <Breadcrumb size="sm" items={items} />
   * <Breadcrumb size="lg" items={items} />
   * ```
   */
  size?: BreadcrumbSize;
  /**
   * Custom separator between items
   * @default "/"
   * @example
   * ```tsx
   * <Breadcrumb separator=">" items={items} />
   * <Breadcrumb separator={<span>→</span>} items={items} />
   * ```
   */
  separator?: React.ReactNode;
  /**
   * Overflow handling strategy for long paths
   * @default "collapse"
   * @example
   * ```tsx
   * <Breadcrumb overflow="ellipsis" items={items} />
   * <Breadcrumb overflow="scroll" items={items} />
   * ```
   */
  overflow?: BreadcrumbOverflow;
  /**
   * Maximum number of items to show before collapsing
   * Only applies when overflow is "collapse"
   * @default 4
   * @example
   * ```tsx
   * <Breadcrumb maxItems={3} items={items} />
   * ```
   */
  maxItems?: number;
  /**
   * Whether items are clickable
   * @default true
   * @example
   * ```tsx
   * <Breadcrumb isClickable={false} items={items} />
   * ```
   */
  isClickable?: boolean;
  /**
   * Callback fired when an item is clicked
   * @example
   * ```tsx
   * <Breadcrumb onItemClick={(item) => console.log('Clicked:', item)} items={items} />
   * ```
   */
  onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent) => void;
  /**
   * Custom class name for the root element
   */
  className?: string;
  /**
   * Custom class name for individual items
   */
  itemClassName?: string;
  /**
   * Custom class name for separators
   */
  separatorClassName?: string;
  /**
   * ARIA label for the breadcrumb navigation
   * @default "Breadcrumb"
   * @example
   * ```tsx
   * <Breadcrumb ariaLabel="Page navigation" items={items} />
   * ```
   */
  ariaLabel?: string;
}

/**
 * Breadcrumb Component
 *
 * A navigation component that displays the current page's location within a hierarchy.
 * Supports custom separators, overflow handling, and full accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Breadcrumb items={[
 *   { key: "home", label: "Home", href: "/" },
 *   { key: "products", label: "Products", href: "/products" },
 *   { key: "details", label: "Product Details", isCurrent: true }
 * ]} />
 *
 * // With custom separator
 * <Breadcrumb
 *   separator=">"
 *   items={items}
 * />
 *
 * // With icons
 * <Breadcrumb items={[
 *   { key: "home", label: "Home", icon: "🏠", href: "/" },
 *   { key: "products", label: "Products", icon: "📦", href: "/products" }
 * ]} />
 *
 * // With overflow handling
 * <Breadcrumb
 *   overflow="collapse"
 *   maxItems={3}
 *   items={longPathItems}
 * />
 * ```
 */
const BreadcrumbComponent = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      items,
      size = "md",
      separator = "/",
      overflow = "collapse",
      maxItems = 4,
      isClickable = true,
      onItemClick,
      className,
      itemClassName,
      separatorClassName,
      ariaLabel = "Breadcrumb",
    },
    ref
  ) {
    const baseId = useId();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle item click
    const handleItemClick = (item: BreadcrumbItem, event: React.MouseEvent) => {
      if (item.isDisabled || item.isCurrent) {
        event.preventDefault();
        return;
      }

      if (!isClickable) {
        event.preventDefault();
      }

      onItemClick?.(item, event);
    };

    // Calculate visible items based on overflow strategy
    const getVisibleItems = () => {
      if (overflow !== "collapse" || items.length <= maxItems) {
        return items;
      }

      // Always show first, last, and collapse middle items
      const firstItem = items[0];
      const lastItems = items.slice(-2); // Last two items
      const collapsedItems = items.slice(1, items.length - 2);

      return {
        first: firstItem,
        collapsed: collapsedItems,
        last: lastItems,
      };
    };

    const visibleItems = getVisibleItems();
    const isCollapsed =
      overflow === "collapse" &&
      items.length > maxItems &&
      typeof visibleItems === "object" &&
      "collapsed" in visibleItems;

    // Render a single breadcrumb item
    const renderItem = (
      item: BreadcrumbItem,
      index: number,
      isLast: boolean
    ) => {
      const itemId = `${baseId}-item-${item.key}`;
      const itemClasses = [
        styles.item,
        item.isDisabled && styles["item--disabled"],
        item.isCurrent && styles["item--current"],
        itemClassName,
      ]
        .filter(Boolean)
        .join(" ");

      const content = (
        <>
          {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
          <span className={styles.itemLabel}>{item.label}</span>
        </>
      );

      const commonProps = {
        id: itemId,
        className: itemClasses,
        "aria-current": item.isCurrent ? ("page" as const) : undefined,
        "aria-disabled": item.isDisabled ? true : undefined,
      };

      return (
        <li key={item.key}>
          {item.href && !item.isDisabled && !item.isCurrent && isClickable ? (
            <a
              {...commonProps}
              href={item.href}
              onClick={(e) => handleItemClick(item, e)}
            >
              {content}
            </a>
          ) : (
            <span
              {...commonProps}
              onClick={
                !item.isDisabled && !item.isCurrent
                  ? (e) => handleItemClick(item, e)
                  : undefined
              }
              onKeyDown={
                !item.isDisabled && !item.isCurrent
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleItemClick(item, e as unknown as React.MouseEvent);
                      }
                    }
                  : undefined
              }
              role={!item.isDisabled && !item.isCurrent ? "button" : undefined}
              tabIndex={!item.isDisabled && !item.isCurrent ? 0 : undefined}
            >
              {content}
            </span>
          )}
          {!isLast && (
            <span
              className={[styles.separator, separatorClassName]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            >
              {separator}
            </span>
          )}
        </li>
      );
    };

    // Render collapsed menu
    const renderCollapsedMenu = (collapsedItems: BreadcrumbItem[]) => {
      return (
        <li className={styles.collapsedContainer}>
          <button
            type="button"
            className={styles.collapsedButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Show hidden breadcrumbs"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.ellipsis}>...</span>
          </button>
          {isMenuOpen && (
            <div ref={menuRef} className={styles.collapsedMenu} role="menu">
              {collapsedItems.map((item) => (
                <div
                  key={item.key}
                  className={styles.collapsedMenuItem}
                  role="menuitem"
                >
                  {item.href && !item.isDisabled && isClickable ? (
                    <a
                      href={item.href}
                      className={styles.collapsedMenuLink}
                      onClick={(e) => {
                        handleItemClick(item, e);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.icon && (
                        <span className={styles.itemIcon}>{item.icon}</span>
                      )}
                      {item.label}
                    </a>
                  ) : (
                    <span className={styles.collapsedMenuLabel}>
                      {item.icon && (
                        <span className={styles.itemIcon}>{item.icon}</span>
                      )}
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          <span
            className={[styles.separator, separatorClassName]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {separator}
          </span>
        </li>
      );
    };

    // Classes
    const rootClasses = [
      styles.breadcrumb,
      styles[`breadcrumb--${size}`],
      styles[`breadcrumb--${overflow}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <nav ref={ref} className={rootClasses} aria-label={ariaLabel}>
        <ol className={styles.list}>
          {isCollapsed ? (
            <>
              {renderItem(visibleItems.first, 0, false)}
              {renderCollapsedMenu(visibleItems.collapsed)}
              {visibleItems.last.map((item, index) =>
                renderItem(
                  item,
                  index + items.length - 2,
                  index === visibleItems.last.length - 1
                )
              )}
            </>
          ) : (
            Array.isArray(visibleItems) &&
            visibleItems.map((item, index) =>
              renderItem(item, index, index === visibleItems.length - 1)
            )
          )}
        </ol>
      </nav>
    );
  }
);

BreadcrumbComponent.displayName = "Breadcrumb";

export const Breadcrumb = React.memo(BreadcrumbComponent);
