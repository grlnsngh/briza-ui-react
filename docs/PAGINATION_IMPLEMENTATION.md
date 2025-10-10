# Pagination Component Implementation

## Overview

The Pagination component provides a comprehensive, accessible navigation solution for paginated content with full theme support, keyboard navigation, and customizable controls.

## Features

### Core Functionality

- ✅ Page number navigation with intelligent ellipsis
- ✅ Previous/Next navigation controls
- ✅ Optional First/Last page buttons
- ✅ Items per page selector with customizable options
- ✅ Total items display with current range
- ✅ Jump-to-page input for direct navigation
- ✅ Configurable siblings and boundaries for page range
- ✅ Controlled and uncontrolled modes

### Accessibility (WCAG 2.1 AA Compliant)

- ✅ Semantic HTML with proper navigation landmarks
- ✅ ARIA labels for all interactive elements
- ✅ Current page marked with `aria-current="page"`
- ✅ Keyboard navigation support:
  - `Arrow Left/Right`: Navigate to previous/next page
  - `Home`: Jump to first page
  - `End`: Jump to last page
  - `Tab`: Navigate through page buttons
  - `Enter/Space`: Activate buttons
- ✅ Screen reader friendly labels
- ✅ Proper focus management
- ✅ Disabled state properly communicated

### Design System Integration

- ✅ Three size variants: `sm`, `md`, `lg`
- ✅ Three visual variants: `default`, `bordered`, `light`
- ✅ Full light/dark theme support
- ✅ Uses design tokens for consistency
- ✅ Responsive design for mobile devices
- ✅ Smooth transitions and hover effects

## Usage Examples

### Basic Pagination

```tsx
import { Pagination } from "briza-ui-react";

function Example() {
  const [page, setPage] = useState(1);

  return (
    <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />
  );
}
```

### With Items Per Page Selector

```tsx
function DataTablePagination() {
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
        setPage(1); // Reset to first page
      }}
    />
  );
}
```

### Advanced Configuration

```tsx
function AdvancedPagination() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      totalPages={100}
      currentPage={page}
      onPageChange={setPage}
      size="lg"
      variant="bordered"
      siblings={2}
      boundaries={2}
      showFirstLast
      showJumpToPage
      totalItems={1000}
      itemsPerPage={10}
      showItemsPerPage
      ariaLabel="Search results pagination"
    />
  );
}
```

### Custom Labels

```tsx
function CustomLabelsPagination() {
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
}
```

## Props API

### Required Props

| Prop         | Type     | Description           |
| ------------ | -------- | --------------------- |
| `totalPages` | `number` | Total number of pages |

### Optional Props

| Prop                   | Type                                 | Default                 | Description                                |
| ---------------------- | ------------------------------------ | ----------------------- | ------------------------------------------ |
| `currentPage`          | `number`                             | `1`                     | Current active page (1-indexed)            |
| `onPageChange`         | `(page: number) => void`             | -                       | Callback when page changes                 |
| `size`                 | `"sm" \| "md" \| "lg"`               | `"md"`                  | Size variant                               |
| `variant`              | `"default" \| "bordered" \| "light"` | `"default"`             | Visual variant                             |
| `siblings`             | `number`                             | `1`                     | Number of page buttons around current page |
| `boundaries`           | `number`                             | `1`                     | Number of page buttons at boundaries       |
| `showFirstLast`        | `boolean`                            | `false`                 | Show first/last page buttons               |
| `showPrevNext`         | `boolean`                            | `true`                  | Show previous/next buttons                 |
| `disabled`             | `boolean`                            | `false`                 | Disable all interactions                   |
| `totalItems`           | `number`                             | -                       | Total number of items (for display)        |
| `itemsPerPage`         | `number`                             | -                       | Number of items per page                   |
| `showItemsPerPage`     | `boolean`                            | `false`                 | Show items per page selector               |
| `itemsPerPageOptions`  | `number[]`                           | `[10, 20, 50, 100]`     | Items per page options                     |
| `onItemsPerPageChange` | `(itemsPerPage: number) => void`     | -                       | Callback when items per page changes       |
| `showJumpToPage`       | `boolean`                            | `false`                 | Show jump to page input                    |
| `previousLabel`        | `ReactNode`                          | `<ChevronLeftIcon />`   | Custom previous button label               |
| `nextLabel`            | `ReactNode`                          | `<ChevronRightIcon />`  | Custom next button label                   |
| `firstLabel`           | `ReactNode`                          | `<ChevronsLeftIcon />`  | Custom first button label                  |
| `lastLabel`            | `ReactNode`                          | `<ChevronsRightIcon />` | Custom last button label                   |
| `className`            | `string`                             | -                       | Additional CSS class                       |
| `ariaLabel`            | `string`                             | `"Pagination"`          | ARIA label for navigation                  |

## Pagination Range Algorithm

The component uses an intelligent algorithm to display page numbers with ellipsis:

1. Shows all pages if total fits in available space
2. Shows boundaries (first/last N pages)
3. Shows siblings (N pages around current)
4. Uses ellipsis (`...`) for gaps

Example with `siblings=1, boundaries=1`:

- Page 1: `[1] 2 ... 20`
- Page 10: `1 ... 9 [10] 11 ... 20`
- Page 20: `1 ... 19 [20]`

## Styling & Theming

### CSS Variables Used

The component uses design tokens for consistent theming:

```css
/* Colors */
--color-primary
--color-primary-foreground
--color-default-*
--color-foreground
--color-background

/* Spacing */
--spacing-0_5 to --spacing-8

/* Typography */
--font-size-xs to --font-size-lg
--font-weight-medium, --font-weight-semibold

/* Borders */
--radius-md

/* Transitions */
--transition-duration-200
--transition-timing-ease

/* Opacity */
--opacity-40, --opacity-60, --opacity-80
```

### Dark Mode Support

The component automatically adapts to dark mode:

- Input/select backgrounds use darker shades
- Borders use lighter colors for visibility
- Hover states optimized for dark backgrounds
- Active states maintain proper contrast

### Variants

**Default**: Subtle appearance, transparent buttons with hover effects
**Bordered**: Buttons have visible borders, good for defined layouts
**Light**: Light background for buttons, works well on darker surfaces

### Sizes

**Small (`sm`)**: Compact, 2rem button height, ideal for dense layouts
**Medium (`md`)**: Default, 2.5rem button height, balanced
**Large (`lg`)**: Spacious, 3rem button height, prominent navigation

## Best Practices

### Performance

1. Use controlled state for `currentPage` to manage navigation
2. Reset to page 1 when changing `itemsPerPage`
3. Memoize callbacks to prevent unnecessary re-renders

### Accessibility

1. Always provide descriptive `ariaLabel` for context
2. Use custom labels for buttons when needed for clarity
3. Ensure sufficient color contrast in custom themes

### UX Guidelines

1. Show First/Last buttons for large page counts (>10)
2. Enable jump-to-page for very large datasets (>50 pages)
3. Use items per page selector for data tables
4. Consider mobile viewport - component is responsive

### Common Patterns

**Data Tables**: Use with `showItemsPerPage`, `totalItems`, and range display
**Search Results**: Use `bordered` variant with total items count
**Image Galleries**: Use `light` variant with custom labels
**API Pagination**: Sync with backend page/limit parameters

## Integration with Data Fetching

### With React Query

```tsx
function DataList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading } = useQuery({
    queryKey: ["items", page, pageSize],
    queryFn: () => fetchItems({ page, pageSize }),
  });

  return (
    <>
      {isLoading ? <Spinner /> : <ItemsList items={data.items} />}

      <Pagination
        totalPages={Math.ceil(data.total / pageSize)}
        currentPage={page}
        onPageChange={setPage}
        totalItems={data.total}
        itemsPerPage={pageSize}
        showItemsPerPage
        onItemsPerPageChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(1);
        }}
      />
    </>
  );
}
```

### With URL Parameters

```tsx
function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <Pagination
      totalPages={20}
      currentPage={page}
      onPageChange={handlePageChange}
    />
  );
}
```

## Testing

The component includes comprehensive test coverage:

- ✅ 60 test cases
- ✅ Accessibility compliance tests
- ✅ Keyboard navigation tests
- ✅ All size and variant combinations
- ✅ Edge cases and error handling
- ✅ User interaction scenarios

Run tests:

```bash
npm test -- Pagination.test.tsx
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## Migration Guide

If upgrading from a custom pagination solution:

1. Replace pagination logic with Pagination component
2. Map existing state to `currentPage` and `totalPages`
3. Use `onPageChange` callback for navigation
4. Add items per page selector if needed
5. Customize labels and variants to match existing design

## Roadmap

Potential future enhancements:

- Server-side pagination helpers
- Virtualized page number lists for extreme page counts
- Infinite scroll integration
- Animation presets for page transitions
- Custom page number formatters (e.g., Roman numerals)

## Related Components

- **Table**: Uses Pagination for data tables
- **Select**: Similar dropdown pattern for items per page
- **Input**: Similar input pattern for jump to page

## Support

For issues, questions, or feature requests, please refer to the project's GitHub repository.
