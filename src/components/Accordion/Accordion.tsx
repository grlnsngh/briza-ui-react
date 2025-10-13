import React, {
  useId,
  useState,
  useCallback,
  useRef,
  KeyboardEvent,
} from "react";
import styles from "./accordion.module.css";

export type AccordionVariant = "default" | "bordered" | "shadow" | "splitted";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export interface AccordionItemProps {
  /**
   * Unique key for the accordion item
   */
  key: string;
  /**
   * Title/header content for the accordion item
   */
  title: React.ReactNode;
  /**
   * Content to display when expanded
   */
  content: React.ReactNode;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Custom icon to display (replaces default expand/collapse icon)
   */
  icon?: React.ReactNode;
  /**
   * Subtitle text shown below the title
   */
  subtitle?: React.ReactNode;
  /**
   * Additional class name for the item
   */
  className?: string;
}

export interface AccordionProps {
  /**
   * Array of accordion items
   * @example
   * ```tsx
   * <Accordion items={[
   *   { key: "1", title: "Item 1", content: <div>Content 1</div> },
   *   { key: "2", title: "Item 2", content: <div>Content 2</div> }
   * ]} />
   * ```
   */
  items: AccordionItemProps[];
  /**
   * Visual variant of the accordion
   * @default "default"
   * @example
   * ```tsx
   * <Accordion variant="shadow" items={items} />
   * ```
   */
  variant?: AccordionVariant;
  /**
   * Size of the accordion items
   * @default "md"
   * @example
   * ```tsx
   * <Accordion size="lg" items={items} />
   * ```
   */
  size?: AccordionSize;
  /**
   * Color theme of the accordion
   * @default "primary"
   * @example
   * ```tsx
   * <Accordion color="secondary" items={items} />
   * ```
   */
  color?: AccordionColor;
  /**
   * Whether to allow multiple items to be expanded at once
   * @default false (single expansion mode)
   * @example
   * ```tsx
   * <Accordion selectionMode="multiple" items={items} />
   * ```
   */
  selectionMode?: "single" | "multiple";
  /**
   * Currently expanded item key(s) (controlled mode)
   * For single mode: string | undefined
   * For multiple mode: string[]
   * @example
   * ```tsx
   * // Single mode
   * const [expanded, setExpanded] = useState("1");
   * <Accordion expandedKeys={expanded} onExpandedChange={setExpanded} items={items} />
   *
   * // Multiple mode
   * const [expanded, setExpanded] = useState(["1", "2"]);
   * <Accordion selectionMode="multiple" expandedKeys={expanded} onExpandedChange={setExpanded} items={items} />
   * ```
   */
  expandedKeys?: string | string[];
  /**
   * Default expanded item key(s) (uncontrolled mode)
   * @example
   * ```tsx
   * <Accordion defaultExpandedKeys={["1"]} items={items} />
   * ```
   */
  defaultExpandedKeys?: string | string[];
  /**
   * Callback fired when expanded items change
   * @example
   * ```tsx
   * <Accordion onExpandedChange={(keys) => console.log('Expanded:', keys)} items={items} />
   * ```
   */
  onExpandedChange?: (keys: string | string[]) => void;
  /**
   * Whether to show dividers between items
   * @default true
   * @example
   * ```tsx
   * <Accordion showDivider={false} items={items} />
   * ```
   */
  showDivider?: boolean;
  /**
   * Whether to keep content mounted in DOM when collapsed
   * @default false
   * @example
   * ```tsx
   * <Accordion keepMounted items={items} />
   * ```
   */
  keepMounted?: boolean;
  /**
   * Whether keyboard navigation is enabled
   * @default true
   * @example
   * ```tsx
   * <Accordion disableKeyboardNavigation items={items} />
   * ```
   */
  disableKeyboardNavigation?: boolean;
  /**
   * Custom expand icon
   */
  expandIcon?: React.ReactNode;
  /**
   * Custom collapse icon
   */
  collapseIcon?: React.ReactNode;
  /**
   * Custom class name for the root element
   */
  className?: string;
  /**
   * Custom class name for item headers
   */
  itemHeaderClassName?: string;
  /**
   * Custom class name for item content
   */
  itemContentClassName?: string;
  /**
   * ARIA label for the accordion
   */
  ariaLabel?: string;
}

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Accordion Component
 *
 * A versatile accordion component supporting single/multiple panel expansion,
 * controlled/uncontrolled behavior, keyboard navigation, and ARIA disclosure semantics.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Accordion items={[
 *   { key: "1", title: "What is React?", content: "React is a JavaScript library..." },
 *   { key: "2", title: "What is TypeScript?", content: "TypeScript is a typed superset..." }
 * ]} />
 *
 * // Multiple expansion mode
 * <Accordion
 *   selectionMode="multiple"
 *   defaultExpandedKeys={["1", "2"]}
 *   items={items}
 * />
 *
 * // Controlled mode
 * const [expanded, setExpanded] = useState("1");
 * <Accordion
 *   expandedKeys={expanded}
 *   onExpandedChange={setExpanded}
 *   items={items}
 * />
 * ```
 */
const AccordionComponent = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      items,
      variant = "default",
      size = "md",
      color = "primary",
      selectionMode = "single",
      expandedKeys: controlledExpandedKeys,
      defaultExpandedKeys,
      onExpandedChange,
      showDivider = true,
      keepMounted = false,
      disableKeyboardNavigation = false,
      expandIcon,
      collapseIcon,
      className,
      itemHeaderClassName,
      itemContentClassName,
      ariaLabel,
      ...rest
    } = props;

    const accordionId = useId();
    const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    // Normalize expanded keys for internal state
    const normalizeKeys = useCallback(
      (keys: string | string[] | undefined): string[] => {
        if (keys === undefined) return [];
        if (typeof keys === "string") return [keys];
        return keys;
      },
      []
    );

    // Initialize default expanded keys
    const getInitialExpandedKeys = useCallback(() => {
      if (defaultExpandedKeys !== undefined) {
        return normalizeKeys(defaultExpandedKeys);
      }
      return [];
    }, [defaultExpandedKeys, normalizeKeys]);

    // Internal state for uncontrolled mode
    const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(
      getInitialExpandedKeys
    );

    // Determine if we're in controlled mode
    const isControlled = controlledExpandedKeys !== undefined;
    const expandedKeysArray = isControlled
      ? normalizeKeys(controlledExpandedKeys)
      : internalExpandedKeys;

    // Handle expansion change
    const handleExpandedChange = useCallback(
      (newKeys: string[]) => {
        if (!isControlled) {
          setInternalExpandedKeys(newKeys);
        }

        if (onExpandedChange) {
          const result =
            selectionMode === "single" ? newKeys[0] || "" : newKeys;
          onExpandedChange(result);
        }
      },
      [isControlled, onExpandedChange, selectionMode]
    );

    // Toggle a single item
    const toggleItem = useCallback(
      (key: string) => {
        const isExpanded = expandedKeysArray.includes(key);

        let newKeys: string[];
        if (selectionMode === "single") {
          // Single mode: only one can be open at a time
          newKeys = isExpanded ? [] : [key];
        } else {
          // Multiple mode: toggle the specific item
          newKeys = isExpanded
            ? expandedKeysArray.filter((k) => k !== key)
            : [...expandedKeysArray, key];
        }

        handleExpandedChange(newKeys);
      },
      [expandedKeysArray, selectionMode, handleExpandedChange]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>, currentKey: string) => {
        if (disableKeyboardNavigation) return;

        const enabledItems = items.filter((item) => !item.disabled);
        const currentIndex = enabledItems.findIndex(
          (item) => item.key === currentKey
        );

        let targetIndex: number | null = null;

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            targetIndex = (currentIndex + 1) % enabledItems.length;
            break;
          case "ArrowUp":
            event.preventDefault();
            targetIndex =
              (currentIndex - 1 + enabledItems.length) % enabledItems.length;
            break;
          case "Home":
            event.preventDefault();
            targetIndex = 0;
            break;
          case "End":
            event.preventDefault();
            targetIndex = enabledItems.length - 1;
            break;
          default:
            break;
        }

        if (targetIndex !== null) {
          const targetKey = enabledItems[targetIndex].key;
          itemRefs.current.get(targetKey)?.focus();
        }
      },
      [disableKeyboardNavigation, items]
    );

    const accordionClasses = [
      styles.accordion,
      styles[`accordion--${variant}`],
      styles[`accordion--${size}`],
      styles[`accordion--${color}`],
      !showDivider && styles["accordion--no-divider"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={accordionClasses}
        aria-label={ariaLabel}
        {...rest}
      >
        {items.map((item) => {
          const isExpanded = expandedKeysArray.includes(item.key);
          const buttonId = `${accordionId}-button-${item.key}`;
          const panelId = `${accordionId}-panel-${item.key}`;

          const itemClasses = [
            styles["accordion-item"],
            isExpanded && styles["accordion-item--expanded"],
            item.disabled && styles["accordion-item--disabled"],
            item.className,
          ]
            .filter(Boolean)
            .join(" ");

          const headerClasses = [
            styles["accordion-item-header"],
            itemHeaderClassName,
          ]
            .filter(Boolean)
            .join(" ");

          const contentClasses = [
            styles["accordion-item-content"],
            itemContentClassName,
          ]
            .filter(Boolean)
            .join(" ");

          const shouldRenderContent = keepMounted || isExpanded;

          return (
            <div key={item.key} className={itemClasses}>
              <h3 className={styles["accordion-item-heading"]}>
                <button
                  ref={(el) => {
                    if (el) {
                      itemRefs.current.set(item.key, el);
                    } else {
                      itemRefs.current.delete(item.key);
                    }
                  }}
                  id={buttonId}
                  type="button"
                  className={headerClasses}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  aria-disabled={item.disabled}
                  disabled={item.disabled}
                  onClick={() => !item.disabled && toggleItem(item.key)}
                  onKeyDown={(e) => handleKeyDown(e, item.key)}
                >
                  <span className={styles["accordion-item-header-content"]}>
                    {item.icon && (
                      <span className={styles["accordion-item-icon"]}>
                        {item.icon}
                      </span>
                    )}
                    <span className={styles["accordion-item-title-wrapper"]}>
                      <span className={styles["accordion-item-title"]}>
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className={styles["accordion-item-subtitle"]}>
                          {item.subtitle}
                        </span>
                      )}
                    </span>
                  </span>
                  <span
                    className={styles["accordion-item-indicator"]}
                    aria-hidden="true"
                  >
                    {isExpanded
                      ? collapseIcon || <ChevronDownIcon />
                      : expandIcon || <ChevronDownIcon />}
                  </span>
                </button>
              </h3>
              {shouldRenderContent && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={contentClasses}
                  hidden={!isExpanded}
                >
                  <div className={styles["accordion-item-content-inner"]}>
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

AccordionComponent.displayName = "Accordion";

export const Accordion = React.memo(AccordionComponent);
