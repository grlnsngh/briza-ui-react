/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table, TableColumn } from "./Table";
import {
  expectNoA11yViolations,
} from "../../utils/test-helpers";

// Sample test data
interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
  status: string;
}

const testData: TestData[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 30, status: "active" },
  { id: 2, name: "Bob", email: "bob@example.com", age: 25, status: "inactive" },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 35, status: "active" },
];

const basicColumns: TableColumn<TestData>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

describe("Table", () => {
  describe("Basic Rendering", () => {
    it("should render table with data", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
        />
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
    });

    it("should render column headers", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
        />
      );

      expect(screen.getByText("ID")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("should render table caption when provided", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          caption="User Table"
        />
      );

      expect(screen.getByText("User Table")).toBeInTheDocument();
    });

    it("should apply ariaLabel when provided", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          ariaLabel="User data table"
        />
      );

      expect(screen.getByRole("table")).toHaveAttribute("aria-label", "User data table");
    });
  });

  describe("Sorting", () => {
    it("should call onSortChange when sortable header is clicked", async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      const columns: TableColumn<TestData>[] = [
        { key: "name", label: "Name", sortable: true },
      ];

      render(
        <Table
          columns={columns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          onSortChange={onSortChange}
        />
      );

      const nameHeader = screen.getByText("Name").closest("th");
      await user.click(nameHeader!);

      expect(onSortChange).toHaveBeenCalledWith({
        column: "name",
        direction: "asc",
      });
    });

    it("should display sort indicators with aria-sort", () => {
      const columns: TableColumn<TestData>[] = [
        { key: "name", label: "Name", sortable: true },
      ];

      const { rerender } = render(
        <Table
          columns={columns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          sort={{ column: "name", direction: "asc" }}
        />
      );

      const nameHeader = screen.getByText("Name").closest("th");
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

      rerender(
        <Table
          columns={columns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          sort={{ column: "name", direction: "desc" }}
        />
      );

      expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    });
  });

  describe("Selection", () => {
    it("should render selection checkboxes in single mode", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          selectionMode="single"
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(3); // One per row
    });

    it("should render selection checkboxes with select all in multiple mode", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(4); // Select all + 3 rows
    });

    it("should call onSelectionChange in single mode", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          selectionMode="single"
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[0]); // Click first row

      expect(onSelectionChange).toHaveBeenCalledWith([1]);
    });

    it("should call onSelectionChange in multiple mode", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[1]); // Click first data row (skip select all)

      expect(onSelectionChange).toHaveBeenCalledWith([1]);
    });

    it("should select all rows when select all checkbox is clicked", async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole("checkbox");
      await user.click(checkboxes[0]); // Click select all

      expect(onSelectionChange).toHaveBeenCalledWith([1, 2, 3]);
    });

    it("should mark selected rows with aria-selected", () => {
      const { container } = render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          selectionMode="multiple"
          selectedRows={[1]}
        />
      );

      const rows = container.querySelectorAll("tbody tr");
      expect(rows[0]).toHaveAttribute("aria-selected", "true");
      expect(rows[1]).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Custom Renderers", () => {
    it("should use custom cell renderer", () => {
      const columns: TableColumn<TestData>[] = [
        {
          key: "name",
          label: "Name",
          render: (value) => <strong>{value as string}</strong>,
        },
      ];

      render(
        <Table
          columns={columns as any}
          data={[testData[0]] as any}
          rowKey={(row) => row.id as number}
        />
      );

      const strongElement = screen.getByText("Alice");
      expect(strongElement.tagName).toBe("STRONG");
    });

    it("should use custom header renderer", () => {
      const columns: TableColumn<TestData>[] = [
        {
          key: "name",
          label: "Name",
          renderHeader: () => <span data-testid="custom-header">Custom Name</span>,
        },
      ];

      render(
        <Table
          columns={columns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
        />
      );

      expect(screen.getByTestId("custom-header")).toHaveTextContent("Custom Name");
    });
  });

  describe("Loading State", () => {
    it("should render loading skeleton", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={[] as any}
          isLoading
          loadingRows={3}
        />
      );

      const skeletons = screen.getAllByTestId("skeleton-row");
      expect(skeletons).toHaveLength(3);
    });

    it("should not render data when loading", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          isLoading
          loadingRows={3}
        />
      );

      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
      expect(screen.getAllByTestId("skeleton-row")).toHaveLength(3);
    });
  });

  describe("Empty State", () => {
    it("should render empty content when no data", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={[] as any}
          emptyContent={<div>No data available</div>}
        />
      );

      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("should not render empty content when data exists", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          emptyContent={<div>No data available</div>}
        />
      );

      expect(screen.queryByText("No data available")).not.toBeInTheDocument();
    });
  });

  describe("Row Click", () => {
    it("should call onRowClick when row is clicked", async () => {
      const user = userEvent.setup();
      const onRowClick = vi.fn();

      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          onRowClick={onRowClick}
        />
      );

      const rows = screen.getAllByRole("row");
      await user.click(rows[1]); // First data row

      expect(onRowClick).toHaveBeenCalledWith(testData[0], 0);
    });
  });

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
          ariaLabel="Test table"
        />
      );

      await expectNoA11yViolations(container);
    });

    it("should have proper table structure", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
        />
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader")).toHaveLength(3);
      expect(screen.getAllByRole("row")).toHaveLength(4); // 1 header + 3 data rows
    });

    it("should have scope attribute on header cells", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
          rowKey={(row) => row.id as number}
        />
      );

      const headers = screen.getAllByRole("columnheader");
      headers.forEach((header) => {
        expect(header).toHaveAttribute("scope", "col");
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty data array", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={[] as any}
        />
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      // Empty state will show a cell with the empty message
    });

    it("should handle single row", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={[testData[0]] as any}
          rowKey={(row) => row.id as number}
        />
      );

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(2); // 1 header + 1 data row
    });

    it("should handle missing rowKey", () => {
      render(
        <Table
          columns={basicColumns as any}
          data={testData as any}
        />
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
  });
});
