import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A comprehensive pagination component with customizable controls and full accessibility support.

## Features
- 📄 **Page navigation** - Navigate through pages with numbered buttons
- ⬅️➡️ **Previous/Next controls** - Quick navigation to adjacent pages
- 🔢 **Items per page selector** - Configurable items display
- 📊 **Total items display** - Shows current range and total items
- 🎯 **Jump to page** - Direct page navigation input
- ⌨️ **Keyboard navigation** - Arrow keys, Home, End support
- ♿ **WCAG compliant** - Proper ARIA labels and screen reader support
- 🎨 **Three size variants** (\`sm\`, \`md\`, \`lg\`)
- 🎭 **Multiple visual variants** (default, bordered, light)
- 🌓 **Theme support** - Optimized for light and dark modes

Use the interactive **Playground** story below to explore all available props.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page (1-indexed)",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the pagination component",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "light"],
      description: "Visual variant of the pagination",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    siblings: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of page buttons to show around current page",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    boundaries: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of page buttons to show at boundaries",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    showFirstLast: {
      control: { type: "boolean" },
      description: "Show first/last page buttons",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showPrevNext: {
      control: { type: "boolean" },
      description: "Show previous/next buttons",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showItemsPerPage: {
      control: { type: "boolean" },
      description: "Enable items per page selector",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showJumpToPage: {
      control: { type: "boolean" },
      description: "Enable jump to page input",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the pagination is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage || 1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};

export const Playground: Story = {
  args: {
    totalPages: 20,
    currentPage: 5,
    size: "md",
    variant: "default",
    siblings: 1,
    boundaries: 1,
    showFirstLast: true,
    showPrevNext: true,
    showItemsPerPage: true,
    showJumpToPage: true,
    totalItems: 200,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 50, 100],
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage || 1);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);

    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground with all features enabled. Try changing pages, items per page, and using the jump-to-page feature.",
      },
    },
  },
};

// ============================================================================
// Common Patterns
// ============================================================================

export const Sizes: Story = {
  render: () => {
    const [pageSm, setPageSm] = useState(1);
    const [pageMd, setPageMd] = useState(1);
    const [pageLg, setPageLg] = useState(1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Small
          </p>
          <Pagination
            size="sm"
            totalPages={10}
            currentPage={pageSm}
            onPageChange={setPageSm}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Medium (Default)
          </p>
          <Pagination
            size="md"
            totalPages={10}
            currentPage={pageMd}
            onPageChange={setPageMd}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Large
          </p>
          <Pagination
            size="lg"
            totalPages={10}
            currentPage={pageLg}
            onPageChange={setPageLg}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Three size variants available: `sm`, `md` (default), and `lg`. Choose based on your UI density needs.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => {
    const [pageDefault, setPageDefault] = useState(1);
    const [pageBordered, setPageBordered] = useState(1);
    const [pageLight, setPageLight] = useState(1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Default
          </p>
          <Pagination
            variant="default"
            totalPages={10}
            currentPage={pageDefault}
            onPageChange={setPageDefault}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Bordered
          </p>
          <Pagination
            variant="bordered"
            totalPages={10}
            currentPage={pageBordered}
            onPageChange={setPageBordered}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Light
          </p>
          <Pagination
            variant="light"
            totalPages={10}
            currentPage={pageLight}
            onPageChange={setPageLight}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Visual variants to match different design contexts: `default` for subtle appearance, `bordered` for defined boundaries, and `light` for lighter backgrounds.",
      },
    },
  },
};

export const WithFirstLastButtons: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        totalPages={20}
        currentPage={page}
        onPageChange={setPage}
        showFirstLast
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Enable first and last page buttons for quick navigation to boundaries. Useful for large page counts.",
      },
    },
  },
};

export const WithItemsPerPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const totalItems = 250;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        showItemsPerPage
        itemsPerPageOptions={[10, 20, 50, 100]}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setPage(1); // Reset to first page when items per page changes
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Enable items per page selector to allow users to control how many items they see. The component automatically displays the current range and total items.",
      },
    },
  },
};

export const WithJumpToPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        totalPages={100}
        currentPage={page}
        onPageChange={setPage}
        showJumpToPage
        totalItems={1000}
        itemsPerPage={10}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Enable jump-to-page functionality for direct navigation. Perfect for large datasets where users need to jump to specific pages.",
      },
    },
  },
};

// ============================================================================
// Advanced Features
// ============================================================================

export const CustomLabels: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={setPage}
        showFirstLast
        previousLabel="Prev"
        nextLabel="Next"
        firstLabel="First"
        lastLabel="Last"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Customize the labels for navigation buttons. You can use text labels instead of icons or use custom icons.",
      },
    },
  },
};

export const CustomSiblingsAndBoundaries: Story = {
  render: () => {
    const [page1, setPage1] = useState(10);
    const [page2, setPage2] = useState(10);
    const [page3, setPage3] = useState(10);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            siblings=1, boundaries=1 (default)
          </p>
          <Pagination
            totalPages={20}
            currentPage={page1}
            onPageChange={setPage1}
            siblings={1}
            boundaries={1}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            siblings=2, boundaries=1
          </p>
          <Pagination
            totalPages={20}
            currentPage={page2}
            onPageChange={setPage2}
            siblings={2}
            boundaries={1}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            siblings=1, boundaries=2
          </p>
          <Pagination
            totalPages={20}
            currentPage={page3}
            onPageChange={setPage3}
            siblings={1}
            boundaries={2}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Control the number of page buttons shown around the current page (`siblings`) and at the start/end (`boundaries`). Adjust based on available space and UX needs.",
      },
    },
  },
};

export const DisabledState: Story = {
  render: () => {
    return (
      <Pagination
        totalPages={10}
        currentPage={5}
        disabled
        showFirstLast
        showJumpToPage
        totalItems={100}
        itemsPerPage={10}
        showItemsPerPage
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state prevents all interactions. All buttons and inputs become non-interactive with reduced opacity.",
      },
    },
  },
};

export const LargePageCount: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return (
      <Pagination
        totalPages={500}
        currentPage={page}
        onPageChange={setPage}
        showFirstLast
        showJumpToPage
        totalItems={5000}
        itemsPerPage={10}
        showItemsPerPage
        itemsPerPageOptions={[10, 25, 50, 100]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination gracefully handles large page counts with ellipsis. Jump-to-page feature becomes especially useful in this scenario.",
      },
    },
  },
};

export const MinimalConfiguration: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        totalPages={5}
        currentPage={page}
        onPageChange={setPage}
        showPrevNext={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal configuration with only page numbers. Useful when space is limited or for simple use cases.",
      },
    },
  },
};

// ============================================================================
// Accessibility Examples
// ============================================================================

export const KeyboardNavigation: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <p
          style={{
            marginBottom: "0",
            fontSize: "0.875rem",
            maxWidth: "400px",
          }}
        >
          Try these keyboard shortcuts:
          <br />
          <strong>Arrow Left/Right</strong>: Previous/Next page
          <br />
          <strong>Home</strong>: First page
          <br />
          <strong>End</strong>: Last page
        </p>
        <Pagination
          totalPages={20}
          currentPage={page}
          onPageChange={setPage}
          showFirstLast
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full keyboard navigation support. Use Arrow keys for prev/next, Home for first page, and End for last page. Tab through buttons and use Enter to activate.",
      },
    },
  },
};

export const ScreenReaderFriendly: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <p
          style={{
            marginBottom: "0",
            fontSize: "0.875rem",
            maxWidth: "400px",
          }}
        >
          This pagination has proper ARIA labels and roles for screen readers:
          <br />• Navigation landmark with descriptive label
          <br />• Current page marked with aria-current="page"
          <br />• Descriptive button labels
          <br />• Proper form labels for inputs
        </p>
        <Pagination
          totalPages={10}
          currentPage={page}
          onPageChange={setPage}
          showFirstLast
          showJumpToPage
          totalItems={100}
          itemsPerPage={10}
          showItemsPerPage
          ariaLabel="Product list pagination"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "WCAG 2.1 AA compliant with proper ARIA attributes, semantic HTML, and screen reader announcements. Current page is announced, and all controls have descriptive labels.",
      },
    },
  },
};

// ============================================================================
// Real-World Use Cases
// ============================================================================

export const DataTablePagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = 523;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Simulate data
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* Sample table header */}
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.125rem" }}>User List</h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              opacity: 0.7,
            }}
          >
            Manage your users and their information
          </p>
        </div>

        {/* Sample data display */}
        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--color-default-50)",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            minHeight: "300px",
          }}
        >
          <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>
            Showing items {startItem} to {endItem} of {totalItems}
          </p>
          <p style={{ fontSize: "0.875rem", marginTop: "1rem" }}>
            [Table content would go here]
          </p>
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          showItemsPerPage
          itemsPerPageOptions={[10, 25, 50, 100]}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setPage(1);
          }}
          showJumpToPage
          showFirstLast
          ariaLabel="User list pagination"
        />
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Complete example showing pagination in a data table context with all features enabled. Notice how changing items per page resets to the first page.",
      },
    },
  },
};

export const SearchResultsPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const totalResults = 87;
    const resultsPerPage = 10;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    return (
      <div style={{ width: "100%", maxWidth: "600px" }}>
        {/* Search results header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.125rem" }}>Search Results</h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              opacity: 0.7,
            }}
          >
            Found {totalResults} results for "design system"
          </p>
        </div>

        {/* Sample results */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {Array.from({
            length: Math.min(
              resultsPerPage,
              totalResults - (page - 1) * resultsPerPage
            ),
          }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                backgroundColor: "var(--color-default-50)",
                borderRadius: "0.5rem",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>
                Result {(page - 1) * resultsPerPage + i + 1}
              </h4>
              <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
                Sample search result content...
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          totalItems={totalResults}
          itemsPerPage={resultsPerPage}
          showFirstLast={totalPages > 10}
          variant="bordered"
          ariaLabel="Search results pagination"
        />
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Example of pagination in a search results context. Uses bordered variant for better visual separation and conditionally shows first/last buttons based on page count.",
      },
    },
  },
};
