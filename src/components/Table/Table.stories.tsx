/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - Table component generic types need fixing in the component itself
import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import { Table, TableColumn, TableSort } from "./Table";

/**
 * Table Component
 *
 * A feature-rich data table component with sorting, selection, column resizing,
 * keyboard navigation, and full accessibility support.
 *
 * ## Features
 * - **Sortable Columns**: Click column headers to sort data
 * - **Row Selection**: Single or multiple row selection with checkboxes
 * - **Column Resizing**: Drag column edges to resize
 * - **Keyboard Navigation**: Navigate with arrow keys, select with Space/Enter
 * - **Loading States**: Skeleton loaders while data is loading
 * - **Empty States**: Custom empty state content
 * - **Sticky Headers**: Keep headers visible while scrolling
 * - **Accessible**: Full ARIA support for screen readers
 * - **Themeable**: Built with design tokens, supports light/dark themes
 */
const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive table component for displaying and interacting with tabular data. Supports sorting, filtering, selection, and custom cell renderers.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

// Sample data
interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  age: number;
}

const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    age: 32,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    age: 28,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "inactive",
    age: 45,
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Editor",
    status: "active",
    age: 35,
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    age: 41,
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Viewer",
    status: "inactive",
    age: 29,
  },
  {
    id: 7,
    name: "Eve Anderson",
    email: "eve@example.com",
    role: "Editor",
    status: "active",
    age: 33,
  },
  {
    id: 8,
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Viewer",
    status: "active",
    age: 38,
  },
];

const basicColumns: TableColumn<User>[] = [
  { key: "id", label: "ID", sortable: true, width: 80 },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

/**
 * Interactive playground to test all Table component props.
 */
export const Playground = {
  args: {
    columns: basicColumns,
    data: sampleData,
    size: "md",
    selectionMode: "multiple",
    striped: true,
    hoverable: true,
    bordered: false,
    stickyHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls below to experiment with different table configurations.",
      },
    },
  },
};

/**
 * Basic table with default settings.
 * Shows a simple data table with no special features.
 */
export const BasicTable = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
    ];

    return (
      <Table
        columns={columns}
        data={sampleData.slice(0, 5)}
        rowKey={(row) => row.id as number}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A simple table displaying data without any advanced features.",
      },
    },
  },
};

/**
 * Table with sortable columns.
 * Click on column headers to sort data ascending/descending.
 */
export const SortableColumns = {
  render: () => {
    const [sort, setSort] = useState<TableSort>({
      column: null,
      direction: null,
    });

    const columns: TableColumn<User>[] = [
      { key: "id", label: "ID", sortable: true, width: 80 },
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "age", label: "Age", sortable: true, width: 100 },
      { key: "role", label: "Role" },
    ];

    // Apply sorting
    const sortedData = [...sampleData].sort((a, b) => {
      if (!sort.column || !sort.direction) return 0;

      const aVal = a[sort.column as keyof User];
      const bVal = b[sort.column as keyof User];

      if (aVal === bVal) return 0;
      const comparison =
        (aVal as number | string) > (bVal as number | string) ? 1 : -1;
      return sort.direction === "asc" ? comparison : -comparison;
    });

    return (
      <div style={{ maxWidth: "800px" }}>
        <Table
          columns={columns}
          data={sortedData}
          rowKey={(row) => row.id as number}
          sort={sort}
          onSortChange={setSort}
        />
        {sort.column && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "14px",
              color: "var(--color-default-600)",
            }}
          >
            Sorted by: <strong>{sort.column}</strong> ({sort.direction})
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sortable columns allow users to organize data by clicking column headers. Cycle through ascending, descending, and unsorted states.",
      },
    },
  },
};

/**
 * Table with single row selection.
 * Click checkboxes or rows to select one row at a time.
 */
export const SingleSelection = {
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>([]);

    return (
      <div style={{ maxWidth: "800px" }}>
        <Table
          columns={basicColumns}
          data={sampleData.slice(0, 5)}
          rowKey={(row) => row.id as number}
          selectionMode="single"
          selectedRows={selected}
          onSelectionChange={setSelected}
        />
        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          Selected:{" "}
          <strong>{selected.length > 0 ? selected[0] : "None"}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single selection mode allows users to select only one row at a time.",
      },
    },
  },
};

/**
 * Table with multiple row selection.
 * Select multiple rows using checkboxes, including select all.
 */
export const MultipleSelection = {
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>([]);

    return (
      <div style={{ maxWidth: "800px" }}>
        <Table
          columns={basicColumns}
          data={sampleData}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
          selectedRows={selected}
          onSelectionChange={setSelected}
        />
        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          Selected {selected.length} row{selected.length !== 1 ? "s" : ""}
          {selected.length > 0 && ": "}
          <strong>{selected.join(", ")}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple selection mode allows users to select multiple rows. The header checkbox selects/deselects all rows.",
      },
    },
  },
};

/**
 * Table with resizable columns.
 * Drag column edges to adjust column widths.
 */
export const ColumnResizing = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "id", label: "ID", resizable: true, width: 80, minWidth: 60 },
      {
        key: "name",
        label: "Name",
        resizable: true,
        width: 200,
        minWidth: 100,
      },
      {
        key: "email",
        label: "Email",
        resizable: true,
        width: 250,
        minWidth: 150,
      },
      {
        key: "role",
        label: "Role",
        resizable: true,
        width: 150,
        minWidth: 100,
      },
    ];

    return (
      <div style={{ maxWidth: "800px" }}>
        <Table
          columns={columns}
          data={sampleData.slice(0, 5)}
          rowKey={(row) => row.id as number}
        />
        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: "var(--color-default-600)",
          }}
        >
          Hover over column edges and drag to resize
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Resizable columns let users adjust column widths by dragging the resize handles at column edges.",
      },
    },
  },
};

/**
 * Table with custom cell renderers.
 * Use render functions to customize cell content.
 */
export const CustomCellRenderers = {
  render: () => {
    const columns: TableColumn<User>[] = [
      {
        key: "id",
        label: "ID",
        width: 80,
        align: "center",
      },
      {
        key: "name",
        label: "Name",
        render: (value) => (
          <strong style={{ color: "var(--color-primary-600)" }}>
            {value as string}
          </strong>
        ),
      },
      {
        key: "email",
        label: "Email",
        render: (value) => (
          <a
            href={"mailto:" + value}
            style={{ color: "var(--color-primary-500)" }}
          >
            {value as string}
          </a>
        ),
      },
      {
        key: "status",
        label: "Status",
        align: "center",
        render: (value) => (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor:
                value === "active"
                  ? "var(--color-success-100)"
                  : "var(--color-default-200)",
              color:
                value === "active"
                  ? "var(--color-success-700)"
                  : "var(--color-default-700)",
            }}
          >
            {value as string}
          </span>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        data={sampleData.slice(0, 5)}
        rowKey={(row) => row.id as number}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom cell renderers allow you to format and style cell content with React components.",
      },
    },
  },
};

/**
 * Table in loading state.
 * Shows skeleton loaders while data is being fetched.
 */
export const LoadingState = {
  render: () => {
    return <Table columns={basicColumns} data={[]} isLoading loadingRows={5} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state displays animated skeleton rows while data is being fetched.",
      },
    },
  },
};

/**
 * Table with empty state.
 * Shows custom message when no data is available.
 */
export const EmptyState = {
  render: () => {
    return (
      <div style={{ maxWidth: "800px" }}>
        <Table
          columns={basicColumns}
          data={[]}
          emptyContent={
            <div style={{ padding: "32px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                No users found
              </h3>
              <p style={{ margin: 0, color: "var(--color-default-500)" }}>
                Try adjusting your filters or add new users
              </p>
            </div>
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state can be customized to show helpful messages when no data is available.",
      },
    },
  },
};

/**
 * Table with sticky header.
 * Header remains visible when scrolling through data.
 */
export const StickyHeader = {
  render: () => {
    return (
      <Table
        columns={basicColumns}
        data={sampleData}
        rowKey={(row) => row.id as number}
        stickyHeader
        striped
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sticky headers remain visible when scrolling through large datasets.",
      },
    },
  },
};

/**
 * Table size variants.
 * Compare small, medium, and large table sizes.
 */
export const Sizes = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>Small</h3>
          <Table
            columns={columns}
            data={sampleData.slice(0, 3)}
            rowKey={(row) => row.id as number}
            size="sm"
            bordered
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>
            Medium (Default)
          </h3>
          <Table
            columns={columns}
            data={sampleData.slice(0, 3)}
            rowKey={(row) => row.id as number}
            size="md"
            bordered
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>Large</h3>
          <Table
            columns={columns}
            data={sampleData.slice(0, 3)}
            rowKey={(row) => row.id as number}
            size="lg"
            bordered
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tables come in three sizes: small, medium, and large. Choose based on content density needs.",
      },
    },
  },
};

/**
 * Table with all features combined.
 * Demonstrates sorting, selection, resizing, custom renderers, and more.
 */
export const ComplexExample = {
  render: () => {
    const [sort, setSort] = useState<TableSort>({
      column: null,
      direction: null,
    });
    const [selected, setSelected] = useState<(string | number)[]>([]);

    const columns: TableColumn<User>[] = [
      {
        key: "id",
        label: "ID",
        sortable: true,
        resizable: true,
        width: 80,
        align: "center",
      },
      {
        key: "name",
        label: "Name",
        sortable: true,
        resizable: true,
        width: 200,
        render: (value) => (
          <strong style={{ color: "var(--color-primary-600)" }}>
            {value as string}
          </strong>
        ),
      },
      {
        key: "email",
        label: "Email",
        sortable: true,
        resizable: true,
        width: 250,
      },
      {
        key: "age",
        label: "Age",
        sortable: true,
        width: 80,
        align: "center",
      },
      {
        key: "role",
        label: "Role",
        sortable: true,
        resizable: true,
        width: 120,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        align: "center",
        width: 120,
        render: (value) => (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor:
                value === "active"
                  ? "var(--color-success-100)"
                  : "var(--color-default-200)",
              color:
                value === "active"
                  ? "var(--color-success-700)"
                  : "var(--color-default-700)",
            }}
          >
            {value as string}
          </span>
        ),
      },
    ];

    // Apply sorting
    const sortedData = [...sampleData].sort((a, b) => {
      if (!sort.column || !sort.direction) return 0;

      const aVal = a[sort.column as keyof User];
      const bVal = b[sort.column as keyof User];

      if (aVal === bVal) return 0;
      const comparison =
        (aVal as number | string) > (bVal as number | string) ? 1 : -1;
      return sort.direction === "asc" ? comparison : -comparison;
    });

    return (
      <div>
        <Table
          columns={columns}
          data={sortedData}
          rowKey={(row) => row.id as number}
          sort={sort}
          onSortChange={setSort}
          selectionMode="multiple"
          selectedRows={selected}
          onSelectionChange={setSelected}
          stickyHeader
          striped
          hoverable
          bordered
          caption="User Management Table"
        />
        <div
          style={{
            marginTop: "16px",
            fontSize: "14px",
            color: "var(--color-default-600)",
          }}
        >
          {selected.length > 0 && (
            <p>
              Selected {selected.length} user{selected.length !== 1 ? "s" : ""}
            </p>
          )}
          {sort.column && (
            <p>
              Sorted by {sort.column} ({sort.direction})
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "A fully-featured table with all capabilities: sorting, selection, resizing, custom renderers, sticky header, and more.",
      },
    },
  },
};

/**
 * Table with keyboard navigation.
 * Use arrow keys to navigate, Space/Enter to select rows.
 */
export const KeyboardNavigation = {
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>([]);

    return (
      <div>
        <div
          style={{
            marginBottom: "16px",
            padding: "12px",
            backgroundColor: "var(--color-primary-50)",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <strong>Keyboard shortcuts:</strong>
          <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px" }}>
            <li>Arrow keys: Navigate cells</li>
            <li>Home: Jump to first column</li>
            <li>End: Jump to last column</li>
            <li>
              Space/Enter: Toggle row selection (when focused on checkbox
              column)
            </li>
          </ul>
        </div>
        <Table
          columns={basicColumns}
          data={sampleData.slice(0, 5)}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
          selectedRows={selected}
          onSelectionChange={setSelected}
          keyboardNavigation
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full keyboard navigation support for accessibility and power users.",
      },
    },
  },
};

/**
 * Accessibility demonstration.
 * Shows proper ARIA attributes and screen reader support.
 */
export const Accessibility = {
  render: () => {
    return (
      <div style={{ maxWidth: "900px" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>
          Accessibility Features
        </h3>
        <ul style={{ marginBottom: "24px", fontSize: "14px", lineHeight: 1.6 }}>
          <li>
            <strong>Semantic HTML</strong>: Uses proper table, thead, tbody, th,
            td elements
          </li>
          <li>
            <strong>ARIA Attributes</strong>: role="table", aria-label,
            aria-sort, aria-selected
          </li>
          <li>
            <strong>Keyboard Navigation</strong>: Full arrow key support
          </li>
          <li>
            <strong>Screen Reader Support</strong>: Proper labeling and
            announcements
          </li>
          <li>
            <strong>Focus Management</strong>: Visible focus indicators
          </li>
          <li>
            <strong>Selection Feedback</strong>: Clear visual and ARIA feedback
          </li>
        </ul>
        <Table
          columns={basicColumns}
          data={sampleData.slice(0, 5)}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
          caption="Accessible user data table"
          ariaLabel="User information table with sortable columns"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Table component follows WCAG 2.1 AA guidelines with comprehensive accessibility features.",
      },
    },
  },
};
