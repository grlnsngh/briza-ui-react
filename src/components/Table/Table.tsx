import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./table.module.css";

export type TableSortDirection = "asc" | "desc" | null;
export type TableSelectionMode = "single" | "multiple" | "none";
export type TableSize = "sm" | "md" | "lg";

/**
 * Column definition for the Table component
 */
export interface TableColumn<T = Record<string, unknown>> {
  /**
   * Unique identifier for the column
   */
  key: string;
  /**
   * Display label for the column header
   */
  label: React.ReactNode;
  /**
   * Whether this column is sortable
   * @default false
   */
  sortable?: boolean;
  /**
   * Initial width of the column (in pixels or CSS unit)
   */
  width?: number | string;
  /**
   * Minimum width when resizing
   * @default 50
   */
  minWidth?: number;
  /**
   * Maximum width when resizing
   */
  maxWidth?: number;
  /**
   * Whether this column can be resized
   * @default false
   */
  resizable?: boolean;
  /**
   * Text alignment for the column
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Custom cell renderer function
   * @param value - The cell value
   * @param row - The entire row data
   * @param rowIndex - Index of the row
   * @returns React element to render in the cell
   * @example
   * ```tsx
   * {
   *   key: "status",
   *   label: "Status",
   *   render: (value, row) => (
   *     <Badge color={value === "active" ? "success" : "default"}>
   *       {value}
   *     </Badge>
   *   )
   * }
   * ```
   */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /**
   * Custom header renderer function
   * @param column - The column definition
   * @returns React element to render in the header
   */
  renderHeader?: (column: TableColumn<T>) => React.ReactNode;
}

/**
 * Sort state for the table
 */
export interface TableSort {
  /**
   * The column key being sorted
   */
  column: string | null;
  /**
   * The sort direction
   */
  direction: TableSortDirection;
}

/**
 * Props for the Table component
 */
export interface TableProps<T = Record<string, unknown>> {
  /**
   * Array of column definitions
   * @example
   * ```tsx
   * const columns = [
   *   { key: "id", label: "ID", sortable: true },
   *   { key: "name", label: "Name", sortable: true },
   *   { key: "email", label: "Email" },
   * ];
   * ```
   */
  columns: TableColumn<T>[];
  /**
   * Array of data rows
   * @example
   * ```tsx
   * const data = [
   *   { id: 1, name: "John Doe", email: "john@example.com" },
   *   { id: 2, name: "Jane Smith", email: "jane@example.com" },
   * ];
   * ```
   */
  data: T[];
  /**
   * Function to extract a unique key from each row
   * @default (row, index) => index
   * @example
   * ```tsx
   * <Table rowKey={(row) => row.id} />
   * ```
   */
  rowKey?: (row: T, index: number) => string | number;
  /**
   * Size of the table
   * @default "md"
   */
  size?: TableSize;
  /**
   * Selection mode for rows
   * @default "none"
   * @example
   * ```tsx
   * <Table selectionMode="multiple" />
   * <Table selectionMode="single" />
   * ```
   */
  selectionMode?: TableSelectionMode;
  /**
   * Array of selected row keys
   * @example
   * ```tsx
   * const [selected, setSelected] = useState([]);
   * <Table selectedRows={selected} onSelectionChange={setSelected} />
   * ```
   */
  selectedRows?: (string | number)[];
  /**
   * Callback when row selection changes
   * @param selectedKeys - Array of selected row keys
   * @example
   * ```tsx
   * <Table onSelectionChange={(keys) => console.log(keys)} />
   * ```
   */
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
  /**
   * Current sort state
   * @example
   * ```tsx
   * const [sort, setSort] = useState({ column: null, direction: null });
   * <Table sort={sort} onSortChange={setSort} />
   * ```
   */
  sort?: TableSort;
  /**
   * Callback when sort changes
   * @param sort - New sort state
   */
  onSortChange?: (sort: TableSort) => void;
  /**
   * Whether the table is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Number of skeleton rows to show when loading
   * @default 5
   */
  loadingRows?: number;
  /**
   * Content to display when data is empty
   * @example
   * ```tsx
   * <Table emptyContent={<div>No data found</div>} />
   * ```
   */
  emptyContent?: React.ReactNode;
  /**
   * Whether to make the header sticky
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Whether to enable striped rows
   * @default false
   */
  striped?: boolean;
  /**
   * Whether to show hover effect on rows
   * @default true
   */
  hoverable?: boolean;
  /**
   * Whether to show borders
   * @default false
   */
  bordered?: boolean;
  /**
   * Caption for the table (accessibility)
   * @example
   * ```tsx
   * <Table caption="User list" />
   * ```
   */
  caption?: string;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Custom aria-label for the table
   */
  ariaLabel?: string;
  /**
   * Callback when a row is clicked
   * @param row - The clicked row data
   * @param rowIndex - Index of the clicked row
   */
  onRowClick?: (row: T, rowIndex: number) => void;
  /**
   * Whether to enable keyboard navigation
   * @default true
   */
  keyboardNavigation?: boolean;
}

/**
 * Table Component
 *
 * A comprehensive data table with sorting, selection, column resizing,
 * keyboard navigation, and full accessibility support.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { key: "id", label: "ID", sortable: true, width: 80 },
 *   { key: "name", label: "Name", sortable: true },
 *   { key: "email", label: "Email" },
 *   {
 *     key: "status",
 *     label: "Status",
 *     render: (value) => <Badge>{value}</Badge>
 *   }
 * ];
 *
 * const data = [
 *   { id: 1, name: "John", email: "john@example.com", status: "active" },
 *   { id: 2, name: "Jane", email: "jane@example.com", status: "inactive" },
 * ];
 *
 * <Table
 *   columns={columns}
 *   data={data}
 *   selectionMode="multiple"
 *   stickyHeader
 *   striped
 * />
 * ```
 */
const TableComponent = React.forwardRef<HTMLTableElement, TableProps>(
  function Table(props, ref) {
    const {
      columns,
      data,
      rowKey = (_, index) => index,
      size = "md",
      selectionMode = "none",
      selectedRows = [],
      onSelectionChange,
      sort: controlledSort,
      onSortChange,
      isLoading = false,
      loadingRows = 5,
      emptyContent,
      stickyHeader = false,
      striped = false,
      hoverable = true,
      bordered = false,
      caption,
      className,
      ariaLabel,
      onRowClick,
      keyboardNavigation = true,
    } = props;

    // Internal sort state
    const [internalSort, setInternalSort] = useState<TableSort>({
      column: null,
      direction: null,
    });

    // Use controlled sort if provided, otherwise internal
    const sort = controlledSort !== undefined ? controlledSort : internalSort;
    const handleSortChange =
      onSortChange !== undefined ? onSortChange : setInternalSort;

    // Column width state for resizing
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
      {}
    );

    // Keyboard navigation state
    const [focusedCell, setFocusedCell] = useState<{
      row: number;
      col: number;
    } | null>(null);
    const tableRef = useRef<HTMLTableElement>(null);

    // Merge refs
    useEffect(() => {
      if (ref && tableRef.current) {
        if (typeof ref === "function") {
          ref(tableRef.current);
        } else {
          ref.current = tableRef.current;
        }
      }
    }, [ref]);

    // Handle sort click
    const handleSort = useCallback(
      (columnKey: string) => {
        const column = columns.find((col) => col.key === columnKey);
        if (!column?.sortable) return;

        let newDirection: TableSortDirection = "asc";
        if (sort.column === columnKey) {
          if (sort.direction === "asc") {
            newDirection = "desc";
          } else if (sort.direction === "desc") {
            newDirection = null;
          }
        }

        handleSortChange({
          column: newDirection ? columnKey : null,
          direction: newDirection,
        });
      },
      [columns, sort, handleSortChange]
    );

    // Handle row selection
    const handleRowSelection = useCallback(
      (rowKeyValue: string | number, isSelected: boolean) => {
        if (!onSelectionChange) return;

        let newSelection: (string | number)[];
        if (selectionMode === "single") {
          newSelection = isSelected ? [rowKeyValue] : [];
        } else if (selectionMode === "multiple") {
          if (isSelected) {
            newSelection = [...selectedRows, rowKeyValue];
          } else {
            newSelection = selectedRows.filter((key) => key !== rowKeyValue);
          }
        } else {
          newSelection = [];
        }

        onSelectionChange(newSelection);
      },
      [selectionMode, selectedRows, onSelectionChange]
    );

    // Handle select all checkbox
    const handleSelectAll = useCallback(
      (isSelected: boolean) => {
        if (!onSelectionChange || selectionMode !== "multiple") return;

        if (isSelected) {
          const allKeys = data.map((row, index) => rowKey(row, index));
          onSelectionChange(allKeys);
        } else {
          onSelectionChange([]);
        }
      },
      [data, rowKey, onSelectionChange, selectionMode]
    );

    // Check if all rows are selected
    const isAllSelected =
      selectionMode === "multiple" &&
      data.length > 0 &&
      data.every((row, index) => selectedRows.includes(rowKey(row, index)));

    // Check if some (but not all) rows are selected
    const isSomeSelected =
      selectionMode === "multiple" && selectedRows.length > 0 && !isAllSelected;

    // Handle column resize start
    const handleResizeStart = useCallback(
      (columnKey: string, startX: number, startWidth: number) => {
        const handleMouseMove = (e: MouseEvent) => {
          const diff = e.clientX - startX;
          const column = columns.find((col) => col.key === columnKey);
          const newWidth = Math.max(
            column?.minWidth || 50,
            Math.min(column?.maxWidth || Infinity, startWidth + diff)
          );
          setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth }));
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [columns]
    );

    // Keyboard navigation
    useEffect(() => {
      if (!keyboardNavigation) return;

      const tableElement = tableRef.current;
      if (!tableElement) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!focusedCell) return;

        const { row, col } = focusedCell;
        const totalRows = data.length;
        const totalCols = columns.length + (selectionMode !== "none" ? 1 : 0);

        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            newRow = Math.max(0, row - 1);
            break;
          case "ArrowDown":
            e.preventDefault();
            newRow = Math.min(totalRows - 1, row + 1);
            break;
          case "ArrowLeft":
            e.preventDefault();
            newCol = Math.max(0, col - 1);
            break;
          case "ArrowRight":
            e.preventDefault();
            newCol = Math.min(totalCols - 1, col + 1);
            break;
          case "Home":
            e.preventDefault();
            newCol = 0;
            break;
          case "End":
            e.preventDefault();
            newCol = totalCols - 1;
            break;
          case " ":
          case "Enter":
            if (selectionMode !== "none" && col === 0) {
              e.preventDefault();
              const rowKeyValue = rowKey(data[row], row);
              const isSelected = selectedRows.includes(rowKeyValue);
              handleRowSelection(rowKeyValue, !isSelected);
            }
            break;
        }

        if (newRow !== row || newCol !== col) {
          setFocusedCell({ row: newRow, col: newCol });
        }
      };

      tableElement.addEventListener("keydown", handleKeyDown);
      return () => {
        tableElement.removeEventListener("keydown", handleKeyDown);
      };
    }, [
      keyboardNavigation,
      focusedCell,
      data,
      columns,
      selectionMode,
      rowKey,
      selectedRows,
      handleRowSelection,
    ]);

    // Get cell value from row
    const getCellValue = (
      row: (typeof data)[0],
      column: TableColumn<(typeof data)[0]>
    ) => {
      return (row as Record<string, unknown>)[column.key];
    };

    // Container classes
    const containerClass = [
      styles.tableContainer,
      stickyHeader && styles["tableContainer--stickyHeader"],
      bordered && styles["tableContainer--bordered"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Table classes
    const tableClass = [
      styles.table,
      styles["table--" + size],
      striped && styles["table--striped"],
      hoverable && styles["table--hoverable"],
    ]
      .filter(Boolean)
      .join(" ");

    // Render loading skeleton
    const renderLoadingSkeleton = () => {
      return (
        <>
          {Array.from({ length: loadingRows }).map((_, rowIndex) => (
            <tr
              key={"skeleton-" + rowIndex}
              className={styles.tableRow}
              data-testid="skeleton-row"
            >
              {selectionMode !== "none" && (
                <td className={styles.tableCell}>
                  <div
                    className={styles.skeleton}
                    style={{ width: "16px", height: "16px" }}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} className={styles.tableCell}>
                  <div className={styles.skeleton} />
                </td>
              ))}
            </tr>
          ))}
        </>
      );
    };

    // Render empty state
    const renderEmptyState = () => {
      const colSpan = columns.length + (selectionMode !== "none" ? 1 : 0);
      return (
        <tr>
          <td colSpan={colSpan} className={styles.tableEmptyCell}>
            <div className={styles.tableEmpty}>
              {emptyContent || "No data available"}
            </div>
          </td>
        </tr>
      );
    };

    return (
      <div className={containerClass}>
        <table
          ref={tableRef}
          className={tableClass}
          role="table"
          aria-label={ariaLabel}
        >
          {caption && (
            <caption className={styles.tableCaption}>{caption}</caption>
          )}
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              {/* Selection column header */}
              {selectionMode !== "none" && (
                <th
                  className={[
                    styles.tableHeaderCell,
                    styles["tableHeaderCell--selection"],
                  ].join(" ")}
                  scope="col"
                  style={{ width: "48px" }}
                >
                  {selectionMode === "multiple" && (
                    <input
                      type="checkbox"
                      className={styles.tableCheckbox}
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = isSomeSelected;
                        }
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label="Select all rows"
                    />
                  )}
                </th>
              )}
              {/* Data column headers */}
              {columns.map((column) => {
                const isSorted = sort.column === column.key;
                const sortDirection = isSorted ? sort.direction : null;
                const width = columnWidths[column.key] || column.width;

                return (
                  <th
                    key={column.key}
                    className={[
                      styles.tableHeaderCell,
                      column.sortable && styles["tableHeaderCell--sortable"],
                      styles[
                        "tableHeaderCell--align-" + (column.align || "left")
                      ],
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    scope="col"
                    style={{ width }}
                    onClick={
                      column.sortable ? () => handleSort(column.key) : undefined
                    }
                    aria-sort={
                      isSorted
                        ? sortDirection === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <div className={styles.tableHeaderContent}>
                      {column.renderHeader
                        ? column.renderHeader(column)
                        : column.label}
                      {column.sortable && (
                        <span
                          className={[
                            styles.tableSortIcon,
                            isSorted && styles["tableSortIcon--active"],
                            isSorted &&
                              sortDirection === "desc" &&
                              styles["tableSortIcon--desc"],
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          aria-hidden="true"
                        >
                          ▲
                        </span>
                      )}
                    </div>
                    {/* Column resize handle */}
                    {column.resizable && (
                      <button
                        type="button"
                        className={styles.tableResizeHandle}
                        tabIndex={-1}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          const startX = e.clientX;
                          const startWidth =
                            columnWidths[column.key] ||
                            (typeof column.width === "number"
                              ? column.width
                              : 150);
                          handleResizeStart(column.key, startX, startWidth);
                        }}
                        aria-label={"Resize " + column.key + " column"}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {isLoading
              ? renderLoadingSkeleton()
              : data.length === 0
              ? renderEmptyState()
              : data.map((row, rowIndex) => {
                  const rowKeyValue = rowKey(row, rowIndex);
                  const isSelected = selectedRows.includes(rowKeyValue);

                  return (
                    <tr
                      key={rowKeyValue}
                      className={[
                        styles.tableRow,
                        isSelected && styles["tableRow--selected"],
                        onRowClick && styles["tableRow--clickable"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={
                        onRowClick ? () => onRowClick(row, rowIndex) : undefined
                      }
                      aria-selected={isSelected}
                    >
                      {/* Selection cell */}
                      {selectionMode !== "none" && (
                        <td className={styles.tableCell}>
                          <input
                            type="checkbox"
                            className={styles.tableCheckbox}
                            checked={isSelected}
                            onChange={(e) =>
                              handleRowSelection(rowKeyValue, e.target.checked)
                            }
                            onClick={(e) => e.stopPropagation()}
                            aria-label={"Select row " + (rowIndex + 1)}
                          />
                        </td>
                      )}
                      {/* Data cells */}
                      {columns.map((column, colIndex) => {
                        const value = getCellValue(row, column);
                        const isFocused =
                          focusedCell?.row === rowIndex &&
                          focusedCell?.col ===
                            colIndex + (selectionMode !== "none" ? 1 : 0);

                        return (
                          <td
                            key={column.key}
                            className={[
                              styles.tableCell,
                              styles[
                                "tableCell--align-" + (column.align || "left")
                              ],
                              isFocused && styles["tableCell--focused"],
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() =>
                              setFocusedCell({
                                row: rowIndex,
                                col:
                                  colIndex + (selectionMode !== "none" ? 1 : 0),
                              })
                            }
                            tabIndex={isFocused ? 0 : -1}
                          >
                            {column.render
                              ? column.render(value, row, rowIndex)
                              : (value as React.ReactNode)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
);

TableComponent.displayName = "Table";

export const Table = React.memo(TableComponent);
