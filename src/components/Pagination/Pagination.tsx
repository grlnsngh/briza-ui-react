import React, { useCallback, useMemo } from "react";
import styles from "./pagination.module.css";

export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "default" | "bordered" | "light";

export interface PaginationProps {
  /**
   * Current active page (1-indexed)
   * @default 1
   */
  currentPage?: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;

  /**
   * Number of page buttons to show around current page
   * @default 1
   */
  siblings?: number;

  /**
   * Number of page buttons to show at boundaries
   * @default 1
   */
  boundaries?: number;

  /**
   * Size of the pagination component
   * @default "md"
   */
  size?: PaginationSize;

  /**
   * Visual variant of the pagination
   * @default "default"
   */
  variant?: PaginationVariant;

  /**
   * Show first/last page buttons
   * @default false
   */
  showFirstLast?: boolean;

  /**
   * Show previous/next buttons
   * @default true
   */
  showPrevNext?: boolean;

  /**
   * Whether the pagination is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Total number of items (for display)
   */
  totalItems?: number;

  /**
   * Number of items per page
   */
  itemsPerPage?: number;

  /**
   * Enable items per page selector
   * @default false
   */
  showItemsPerPage?: boolean;

  /**
   * Items per page options
   * @default [10, 20, 50, 100]
   */
  itemsPerPageOptions?: number[];

  /**
   * Callback when items per page changes
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void;

  /**
   * Enable jump to page input
   * @default false
   */
  showJumpToPage?: boolean;

  /**
   * Custom label for previous button
   * @default "Previous"
   */
  previousLabel?: React.ReactNode;

  /**
   * Custom label for next button
   * @default "Next"
   */
  nextLabel?: React.ReactNode;

  /**
   * Custom label for first button
   * @default "First"
   */
  firstLabel?: React.ReactNode;

  /**
   * Custom label for last button
   * @default "Last"
   */
  lastLabel?: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ARIA label for the pagination navigation
   * @default "Pagination"
   */
  ariaLabel?: string;
}

const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronsLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11 12L7 8L11 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 12L3 8L7 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronsRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 4L9 8L5 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 4L13 8L9 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Generate pagination range
 */
const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblings: number,
  boundaries: number
): (number | "ellipsis")[] => {
  const totalNumbers = siblings * 2 + 3 + boundaries * 2; // siblings on each side + current + boundaries on each side

  if (totalNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, boundaries + 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblings,
    totalPages - boundaries
  );

  const showLeftEllipsis = leftSiblingIndex > boundaries + 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - boundaries - 1;

  const range: (number | "ellipsis")[] = [];

  // Add boundary pages at the start
  for (let i = 1; i <= boundaries; i++) {
    range.push(i);
  }

  // Add left ellipsis if needed
  if (showLeftEllipsis) {
    range.push("ellipsis");
  } else if (boundaries + 1 < leftSiblingIndex) {
    for (let i = boundaries + 1; i < leftSiblingIndex; i++) {
      range.push(i);
    }
  }

  // Add sibling pages around current page
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  // Add right ellipsis if needed
  if (showRightEllipsis) {
    range.push("ellipsis");
  } else if (rightSiblingIndex < totalPages - boundaries) {
    for (let i = rightSiblingIndex + 1; i <= totalPages - boundaries; i++) {
      range.push(i);
    }
  }

  // Add boundary pages at the end
  for (let i = totalPages - boundaries + 1; i <= totalPages; i++) {
    if (i > 0 && i > rightSiblingIndex) {
      range.push(i);
    }
  }

  return range;
};

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  function Pagination(props, ref) {
    const {
      currentPage = 1,
      totalPages,
      onPageChange,
      siblings = 1,
      boundaries = 1,
      size = "md",
      variant = "default",
      showFirstLast = false,
      showPrevNext = true,
      disabled = false,
      totalItems,
      itemsPerPage,
      showItemsPerPage = false,
      itemsPerPageOptions = [10, 20, 50, 100],
      onItemsPerPageChange,
      showJumpToPage = false,
      previousLabel = <ChevronLeftIcon />,
      nextLabel = <ChevronRightIcon />,
      firstLabel = <ChevronsLeftIcon />,
      lastLabel = <ChevronsRightIcon />,
      className,
      ariaLabel = "Pagination",
    } = props;

    const [jumpToPageValue, setJumpToPageValue] = React.useState("");

    // Calculate pagination range
    const paginationRange = useMemo(
      () => getPaginationRange(currentPage, totalPages, siblings, boundaries),
      [currentPage, totalPages, siblings, boundaries]
    );

    // Handle page change
    const handlePageChange = useCallback(
      (page: number) => {
        if (disabled || page === currentPage || page < 1 || page > totalPages) {
          return;
        }
        onPageChange?.(page);
      },
      [disabled, currentPage, totalPages, onPageChange]
    );

    // Handle jump to page
    const handleJumpToPage = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        const page = parseInt(jumpToPageValue, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
          handlePageChange(page);
          setJumpToPageValue("");
        }
      },
      [jumpToPageValue, totalPages, handlePageChange]
    );

    // Handle items per page change
    const handleItemsPerPageChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10);
        onItemsPerPageChange?.(value);
      },
      [onItemsPerPageChange]
    );

    // Handle keyboard navigation on buttons
    const handleButtonKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            handlePageChange(currentPage - 1);
            break;
          case "ArrowRight":
            e.preventDefault();
            handlePageChange(currentPage + 1);
            break;
          case "Home":
            e.preventDefault();
            handlePageChange(1);
            break;
          case "End":
            e.preventDefault();
            handlePageChange(totalPages);
            break;
        }
      },
      [disabled, currentPage, totalPages, handlePageChange]
    );

    // Calculate item range display
    const itemRangeDisplay = useMemo(() => {
      if (!totalItems || !itemsPerPage) return null;

      const start = (currentPage - 1) * itemsPerPage + 1;
      const end = Math.min(currentPage * itemsPerPage, totalItems);

      return `${start}-${end} of ${totalItems}`;
    }, [currentPage, itemsPerPage, totalItems]);

    const wrapperClass = [
      styles.pagination,
      styles[`pagination--${size}`],
      styles[`pagination--${variant}`],
      disabled && styles["pagination--disabled"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClass}>
        {/* Items info and per-page selector */}
        {(showItemsPerPage || itemRangeDisplay) && (
          <div className={styles.pagination__info}>
            {itemRangeDisplay && (
              <span className={styles.pagination__range}>
                {itemRangeDisplay}
              </span>
            )}
            {showItemsPerPage && itemsPerPage && (
              <div className={styles.pagination__perPage}>
                <label
                  htmlFor="items-per-page"
                  className={styles.pagination__perPageLabel}
                >
                  Items per page:
                </label>
                <select
                  id="items-per-page"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  disabled={disabled}
                  className={styles.pagination__perPageSelect}
                  aria-label="Items per page"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Pagination controls */}
        <nav
          ref={ref as React.Ref<HTMLElement>}
          className={styles.pagination__nav}
          aria-label={ariaLabel}
        >
          <ul className={styles.pagination__list}>
            {/* First page button */}
            {showFirstLast && (
              <li className={styles.pagination__item}>
                <button
                  type="button"
                  onClick={() => handlePageChange(1)}
                  onKeyDown={handleButtonKeyDown}
                  disabled={disabled || currentPage === 1}
                  className={styles.pagination__button}
                  aria-label="Go to first page"
                >
                  {firstLabel}
                </button>
              </li>
            )}

            {/* Previous page button */}
            {showPrevNext && (
              <li className={styles.pagination__item}>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  onKeyDown={handleButtonKeyDown}
                  disabled={disabled || currentPage === 1}
                  className={styles.pagination__button}
                  aria-label="Go to previous page"
                >
                  {previousLabel}
                </button>
              </li>
            )}

            {/* Page numbers */}
            {paginationRange.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <li
                    key={`ellipsis-${index}`}
                    className={styles.pagination__item}
                  >
                    <span
                      className={styles.pagination__ellipsis}
                      aria-hidden="true"
                    >
                      ...
                    </span>
                  </li>
                );
              }

              const isActive = page === currentPage;
              return (
                <li key={page} className={styles.pagination__item}>
                  <button
                    type="button"
                    onClick={() => handlePageChange(page)}
                    onKeyDown={handleButtonKeyDown}
                    disabled={disabled}
                    className={`${styles.pagination__button} ${
                      isActive ? styles["pagination__button--active"] : ""
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            {/* Next page button */}
            {showPrevNext && (
              <li className={styles.pagination__item}>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  onKeyDown={handleButtonKeyDown}
                  disabled={disabled || currentPage === totalPages}
                  className={styles.pagination__button}
                  aria-label="Go to next page"
                >
                  {nextLabel}
                </button>
              </li>
            )}

            {/* Last page button */}
            {showFirstLast && (
              <li className={styles.pagination__item}>
                <button
                  type="button"
                  onClick={() => handlePageChange(totalPages)}
                  onKeyDown={handleButtonKeyDown}
                  disabled={disabled || currentPage === totalPages}
                  className={styles.pagination__button}
                  aria-label="Go to last page"
                >
                  {lastLabel}
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Jump to page input */}
        {showJumpToPage && (
          <form
            onSubmit={handleJumpToPage}
            className={styles.pagination__jumpToPage}
          >
            <label
              htmlFor="jump-to-page"
              className={styles.pagination__jumpToPageLabel}
            >
              Go to page:
            </label>
            <input
              id="jump-to-page"
              type="number"
              min={1}
              max={totalPages}
              value={jumpToPageValue}
              onChange={(e) => setJumpToPageValue(e.target.value)}
              disabled={disabled}
              className={styles.pagination__jumpToPageInput}
              placeholder="Page"
              aria-label="Jump to page number"
            />
            <button
              type="submit"
              disabled={disabled || !jumpToPageValue}
              className={styles.pagination__jumpToPageButton}
              aria-label="Jump to page"
            >
              Go
            </button>
          </form>
        )}
      </div>
    );
  }
);
