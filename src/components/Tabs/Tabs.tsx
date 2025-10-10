import React, { useId, useState, useRef, useEffect, useCallback } from "react";
import styles from "./tabs.module.css";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsSize = "sm" | "md" | "lg";
export type TabsVariant = "solid" | "underlined" | "bordered" | "light";
export type TabsColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: string;
  /**
   * Tab label content
   */
  label: React.ReactNode;
  /**
   * Tab panel content
   */
  content: React.ReactNode;
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;
}

export interface TabsProps {
  /**
   * Array of tab items
   * @example
   * ```tsx
   * <Tabs items={[
   *   { key: "tab1", label: "Tab 1", content: <div>Content 1</div> },
   *   { key: "tab2", label: "Tab 2", content: <div>Content 2</div> }
   * ]} />
   * ```
   */
  items: TabItem[];
  /**
   * Orientation of the tabs
   * @default "horizontal"
   * @example
   * ```tsx
   * <Tabs orientation="vertical" items={items} />
   * ```
   */
  orientation?: TabsOrientation;
  /**
   * Size of the tabs
   * @default "md"
   * @example
   * ```tsx
   * <Tabs size="sm" items={items} />
   * <Tabs size="lg" items={items} />
   * ```
   */
  size?: TabsSize;
  /**
   * Visual variant of the tabs
   * @default "solid"
   * @example
   * ```tsx
   * <Tabs variant="underlined" items={items} />
   * <Tabs variant="bordered" items={items} />
   * ```
   */
  variant?: TabsVariant;
  /**
   * Color theme of the tabs
   * @default "primary"
   * @example
   * ```tsx
   * <Tabs color="secondary" items={items} />
   * ```
   */
  color?: TabsColor;
  /**
   * Currently selected tab key (controlled mode)
   * @example
   * ```tsx
   * const [selectedKey, setSelectedKey] = useState("tab1");
   * <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey} items={items} />
   * ```
   */
  selectedKey?: string;
  /**
   * Default selected tab key (uncontrolled mode)
   * @default First non-disabled tab
   * @example
   * ```tsx
   * <Tabs defaultSelectedKey="tab2" items={items} />
   * ```
   */
  defaultSelectedKey?: string;
  /**
   * Callback fired when tab selection changes
   * @example
   * ```tsx
   * <Tabs onSelectionChange={(key) => console.log('Selected:', key)} items={items} />
   * ```
   */
  onSelectionChange?: (key: string) => void;
  /**
   * Whether to enable lazy loading of tab content
   * @default false
   * @example
   * ```tsx
   * <Tabs isLazy items={items} />
   * ```
   */
  isLazy?: boolean;
  /**
   * Whether to keep mounted tab panels in DOM (when isLazy is false)
   * @default false
   * @example
   * ```tsx
   * <Tabs keepMounted items={items} />
   * ```
   */
  keepMounted?: boolean;
  /**
   * Whether the tabs should take full width
   * @default false
   * @example
   * ```tsx
   * <Tabs fullWidth items={items} />
   * ```
   */
  fullWidth?: boolean;
  /**
   * Whether keyboard navigation is enabled
   * @default true
   * @example
   * ```tsx
   * <Tabs disableKeyboardNavigation items={items} />
   * ```
   */
  disableKeyboardNavigation?: boolean;
  /**
   * Custom class name for the root element
   */
  className?: string;
  /**
   * Custom class name for the tab list
   */
  tabListClassName?: string;
  /**
   * Custom class name for individual tabs
   */
  tabClassName?: string;
  /**
   * Custom class name for the tab panels
   */
  tabPanelClassName?: string;
  /**
   * ARIA label for the tabs
   * @example
   * ```tsx
   * <Tabs ariaLabel="Navigation tabs" items={items} />
   * ```
   */
  ariaLabel?: string;
}

/**
 * Tabs Component
 *
 * A versatile tabs component with support for horizontal/vertical orientations,
 * controlled/uncontrolled modes, keyboard navigation, and lazy loading.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Tabs items={[
 *   { key: "home", label: "Home", content: <HomePage /> },
 *   { key: "profile", label: "Profile", content: <ProfilePage /> },
 *   { key: "settings", label: "Settings", content: <SettingsPage /> }
 * ]} />
 *
 * // Vertical orientation
 * <Tabs
 *   orientation="vertical"
 *   items={items}
 * />
 *
 * // Controlled mode
 * const [selected, setSelected] = useState("tab1");
 * <Tabs
 *   selectedKey={selected}
 *   onSelectionChange={setSelected}
 *   items={items}
 * />
 *
 * // With lazy loading
 * <Tabs
 *   isLazy
 *   items={items}
 * />
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    items,
    orientation = "horizontal",
    size = "md",
    variant = "solid",
    color = "primary",
    selectedKey: controlledSelectedKey,
    defaultSelectedKey,
    onSelectionChange,
    isLazy = false,
    keepMounted = false,
    fullWidth = false,
    disableKeyboardNavigation = false,
    className,
    tabListClassName,
    tabClassName,
    tabPanelClassName,
    ariaLabel,
  },
  ref
) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Find first non-disabled tab
  const getFirstNonDisabledTab = useCallback(() => {
    return items.find((item) => !item.disabled)?.key || items[0]?.key || "";
  }, [items]);

  // Initialize selected key
  const [internalSelectedKey, setInternalSelectedKey] = useState<string>(() => {
    if (controlledSelectedKey !== undefined) {
      return controlledSelectedKey;
    }
    if (defaultSelectedKey !== undefined) {
      return defaultSelectedKey;
    }
    return getFirstNonDisabledTab();
  });

  // Track which tabs have been visited (for lazy loading)
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
    new Set([internalSelectedKey])
  );

  // Determine if component is controlled
  const isControlled = controlledSelectedKey !== undefined;
  const selectedKey = isControlled
    ? controlledSelectedKey
    : internalSelectedKey;

  // Handle tab selection
  const handleTabSelect = useCallback(
    (key: string) => {
      const tab = items.find((item) => item.key === key);
      if (!tab || tab.disabled) return;

      if (!isControlled) {
        setInternalSelectedKey(key);
      }

      // Track visited tabs for lazy loading
      setVisitedTabs((prev) => new Set(prev).add(key));

      onSelectionChange?.(key);
    },
    [items, isControlled, onSelectionChange]
  );

  // Get all non-disabled tab keys
  const getNonDisabledTabKeys = useCallback(() => {
    return items.filter((item) => !item.disabled).map((item) => item.key);
  }, [items]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disableKeyboardNavigation) return;

      const nonDisabledKeys = getNonDisabledTabKeys();
      const currentIndex = nonDisabledKeys.indexOf(selectedKey);

      let nextIndex = currentIndex;
      let handled = false;

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          if (
            (orientation === "horizontal" && event.key === "ArrowLeft") ||
            (orientation === "vertical" && event.key === "ArrowUp")
          ) {
            nextIndex =
              currentIndex > 0 ? currentIndex - 1 : nonDisabledKeys.length - 1;
            handled = true;
          }
          break;

        case "ArrowRight":
        case "ArrowDown":
          if (
            (orientation === "horizontal" && event.key === "ArrowRight") ||
            (orientation === "vertical" && event.key === "ArrowDown")
          ) {
            nextIndex =
              currentIndex < nonDisabledKeys.length - 1 ? currentIndex + 1 : 0;
            handled = true;
          }
          break;

        case "Home":
          nextIndex = 0;
          handled = true;
          break;

        case "End":
          nextIndex = nonDisabledKeys.length - 1;
          handled = true;
          break;

        default:
          break;
      }

      if (handled) {
        event.preventDefault();
        const nextKey = nonDisabledKeys[nextIndex];
        if (nextKey) {
          handleTabSelect(nextKey);
          // Focus the newly selected tab
          const tabElement = tabListRef.current?.querySelector(
            `[data-key="${nextKey}"]`
          ) as HTMLElement;
          tabElement?.focus();
        }
      }
    },
    [
      disableKeyboardNavigation,
      getNonDisabledTabKeys,
      selectedKey,
      orientation,
      handleTabSelect,
    ]
  );

  // Update visited tabs when controlled selectedKey changes
  useEffect(() => {
    if (isControlled && controlledSelectedKey) {
      setVisitedTabs((prev) => new Set(prev).add(controlledSelectedKey));
    }
  }, [isControlled, controlledSelectedKey]);

  // Should render tab panel
  const shouldRenderPanel = useCallback(
    (tabKey: string) => {
      if (keepMounted) return true;
      if (isLazy) {
        return visitedTabs.has(tabKey);
      }
      return true;
    },
    [keepMounted, isLazy, visitedTabs]
  );

  // Classes
  const rootClasses = [
    styles.tabs,
    styles[`tabs--${orientation}`],
    styles[`tabs--${size}`],
    styles[`tabs--${variant}`],
    styles[`tabs--${color}`],
    fullWidth && styles["tabs--full-width"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tabListClasses = [styles.tabList, tabListClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={rootClasses}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={tabListClasses}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {items.map((item) => {
          const isSelected = selectedKey === item.key;
          const tabId = `${baseId}-tab-${item.key}`;
          const panelId = `${baseId}-panel-${item.key}`;

          const tabClasses = [
            styles.tab,
            isSelected && styles["tab--selected"],
            item.disabled && styles["tab--disabled"],
            tabClassName,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={item.key}
              id={tabId}
              role="tab"
              type="button"
              data-key={item.key}
              aria-selected={isSelected}
              aria-controls={panelId}
              aria-disabled={item.disabled}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={tabClasses}
              onClick={() => handleTabSelect(item.key)}
            >
              {item.icon && <span className={styles.tabIcon}>{item.icon}</span>}
              <span className={styles.tabLabel}>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.tabPanels}>
        {items.map((item) => {
          const isSelected = selectedKey === item.key;
          const tabId = `${baseId}-tab-${item.key}`;
          const panelId = `${baseId}-panel-${item.key}`;

          if (!shouldRenderPanel(item.key)) {
            return null;
          }

          const panelClasses = [
            styles.tabPanel,
            isSelected && styles["tabPanel--selected"],
            tabPanelClassName,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={item.key}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              tabIndex={0}
              hidden={!isSelected}
              className={panelClasses}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
});

Tabs.displayName = "Tabs";
