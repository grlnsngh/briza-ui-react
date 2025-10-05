import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, SelectOption } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
    docs: {
      description: {
        component: `
A powerful, accessible dropdown select component with comprehensive features for modern web applications.

## Features
- 📏 Three size variants (\`sm\`, \`md\`, \`lg\`) matching Input component
- 🎯 **Single & Multi-select** - Support for both selection modes
- 🔍 **Searchable** - Built-in search/filter functionality for large option lists
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, Home, End)
- ♿ **WCAG Compliant** - Proper ARIA attributes and focus management
- 🎨 **Theme Support** - Automatic light/dark theme integration with design tokens
- 🚀 **Async Loading** - Support for loading states and async data fetching
- 🎭 **Custom Rendering** - Customize option and value display with render functions
- 🎪 **Portal Rendering** - Dropdown rendered in a portal for proper z-index handling
- 📍 **Smart Positioning** - Automatic dropdown positioning relative to trigger

## Keyboard Navigation
- **Arrow Up/Down** - Navigate through options
- **Enter/Space** - Select focused option or open dropdown
- **Escape** - Close dropdown
- **Home/End** - Jump to first/last option
- **Tab** - Close dropdown and move to next element

Use the interactive **Playground** story below to explore all available props and see the component in action.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Controls the overall height and typography of the select",
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    status: {
      control: { type: "select" },
      options: ["default", "error", "success"],
      description:
        "Visual validation state with appropriate colors and ARIA attributes",
      table: {
        defaultValue: { summary: "default" },
        type: { summary: '"default" | "error" | "success"' },
      },
    },
    label: {
      control: { type: "text" },
      description:
        "Label text displayed above the select. Can be ReactNode for rich content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description: "Additional context shown between label and select",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text shown below the select",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message shown when status is 'error'",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    successMessage: {
      control: { type: "text" },
      description: "Success message shown when status is 'success'",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no option is selected",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the select and reduces visual emphasis",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Shows asterisk indicator and sets aria-required",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isMulti: {
      control: { type: "boolean" },
      description: "Enable multi-select mode for selecting multiple options",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isSearchable: {
      control: { type: "boolean" },
      description: "Enable search/filter functionality",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Show loading state for async operations",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    closeOnSelect: {
      control: { type: "boolean" },
      description: "Close dropdown after selection (applies to multi-select)",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    // Hide complex props from controls
    renderOption: {
      control: false,
      description: "Custom render function for options",
    },
    renderValue: {
      control: false,
      description: "Custom render function for selected value display",
    },
    filterOption: {
      control: false,
      description: "Custom filter function for searchable select",
    },
    onSearchChange: {
      control: false,
      description: "Callback when search value changes",
    },
    onChange: {
      control: false,
      description: "Callback when selection changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample data
const fruitOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
];

const statusOptions: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive", disabled: true },
  { value: "archived", label: "Archived" },
];

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    options: fruitOptions,
    label: "Favorite Fruit",
    placeholder: "Select a fruit...",
    helperText: "Choose the fruit you enjoy most",
  },
};

export const Playground: Story = {
  args: {
    options: fruitOptions,
    label: "Interactive Select",
    placeholder: "Try me out...",
    helperText: "Use the controls below to customize this select",
    size: "md",
    status: "default",
    disabled: false,
    required: false,
    isMulti: false,
    isSearchable: false,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Experiment with all props using the controls panel below. Try changing size, status, and enabling features like multi-select or search.",
      },
    },
  },
};

// ============================================================================
// Common Patterns
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "320px",
      }}
    >
      <Select
        options={fruitOptions}
        label="Small"
        placeholder="Small select"
        size="sm"
      />
      <Select
        options={fruitOptions}
        label="Medium"
        placeholder="Medium select"
        size="md"
      />
      <Select
        options={fruitOptions}
        label="Large"
        placeholder="Large select"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three size variants to match your design hierarchy: `sm`, `md` (default), and `lg`. Sizes match the Input component for consistency.",
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Select
        options={fruitOptions}
        label="Default"
        placeholder="Select a fruit"
        helperText="Choose your favorite"
      />
      <Select
        options={fruitOptions}
        label="Error"
        placeholder="Select a fruit"
        status="error"
        errorMessage="Please select a valid option"
      />
      <Select
        options={fruitOptions}
        label="Success"
        placeholder="Select a fruit"
        status="success"
        successMessage="Great choice!"
        defaultValue="apple"
      />
      <Select
        options={fruitOptions}
        label="Disabled"
        placeholder="Can't select"
        disabled
        defaultValue="banana"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Visual feedback for different states. Error and success states include appropriate ARIA attributes for accessibility.",
      },
    },
  },
};

export const WithMetadata: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Select
        options={fruitOptions}
        label="Required Field"
        placeholder="Select..."
        required
        helperText="This field is required"
      />
      <Select
        options={fruitOptions}
        label="With Description"
        description="Pick the fruit you enjoy the most"
        placeholder="Select..."
      />
      <Select
        options={fruitOptions}
        label="With Default Value"
        placeholder="Select..."
        defaultValue="banana"
        helperText="Pre-selected option"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common metadata patterns: required fields, descriptions, and default values.",
      },
    },
  },
};

// ============================================================================
// Features
// ============================================================================

export const Searchable: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Select
        options={countryOptions}
        label="Country"
        description="Type to search from the list"
        isSearchable
        placeholder="Search countries..."
      />
      <Select
        options={[
          ...countryOptions,
          { value: "es", label: "Spain" },
          { value: "it", label: "Italy" },
          { value: "nl", label: "Netherlands" },
          { value: "se", label: "Sweden" },
          { value: "no", label: "Norway" },
        ]}
        label="Large List"
        description="Search makes it easy to find options"
        isSearchable
        placeholder="Search 15+ countries..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Enable `isSearchable` to add a search input that filters options in real-time. Perfect for long option lists.",
      },
    },
  },
};

export const MultiSelect: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Select
        options={fruitOptions}
        label="Favorite Fruits"
        description="Select multiple fruits"
        isMulti
        placeholder="Select fruits..."
      />
      <Select
        options={fruitOptions}
        label="With Default Values"
        isMulti
        defaultValue={["apple", "banana"]}
      />
      <Select
        options={fruitOptions}
        label="Close on Select"
        description="Dropdown closes after each selection"
        isMulti
        closeOnSelect
        placeholder="Select..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Enable `isMulti` to allow selecting multiple options. Selected items appear as chips/tags. Use `closeOnSelect` to close dropdown after each selection.",
      },
    },
  },
};

export const MultiSelectSearchable: Story = {
  args: {
    options: countryOptions,
    label: "Countries Visited",
    description: "Search and select all countries you've visited",
    isMulti: true,
    isSearchable: true,
    placeholder: "Search and select...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combine `isMulti` and `isSearchable` for powerful multi-selection with filtering. Great for complex forms.",
      },
    },
  },
};

export const DisabledOptions: Story = {
  args: {
    options: statusOptions,
    label: "Status",
    description: "Some options are disabled",
    placeholder: "Select status...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Individual options can be disabled by setting `disabled: true` in the option object. Disabled options cannot be selected.",
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "360px",
      }}
    >
      <Select
        options={[]}
        label="Loading Data"
        isLoading
        loadingMessage="Loading options..."
        placeholder="Select..."
      />
      <Select
        options={fruitOptions}
        label="With Loading Indicator"
        isLoading
        placeholder="Select..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `isLoading` to show a loading state. Displays a spinner and optional loading message. Perfect for async data fetching.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    options: [],
    label: "Empty Select",
    noOptionsMessage: "No options available",
    placeholder: "Select...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Customize the empty state message with `noOptionsMessage`. Shown when no options are available or search returns no results.",
      },
    },
  },
};

// ============================================================================
// Advanced Examples
// ============================================================================

export const CustomOptionRendering: Story = {
  args: {
    options: [
      {
        value: "apple",
        label: "Apple",
        data: { emoji: "🍎", calories: 52 },
      },
      {
        value: "banana",
        label: "Banana",
        data: { emoji: "🍌", calories: 89 },
      },
      {
        value: "cherry",
        label: "Cherry",
        data: { emoji: "🍒", calories: 50 },
      },
      {
        value: "grape",
        label: "Grape",
        data: { emoji: "🍇", calories: 67 },
      },
    ] as SelectOption<{ emoji: string; calories: number }>[],
    label: "Fruit Selection",
    description: "Custom rendering with emojis and metadata",
    isSearchable: true,
    renderOption: (option, isSelected) => {
      const data = option.data as
        | { emoji: string; calories: number }
        | undefined;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>{data?.emoji}</span>
          <div style={{ flex: 1 }}>
            <div>{option.label}</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              {data?.calories} calories
            </div>
          </div>
          {isSelected && <span>✓</span>}
        </div>
      );
    },
    placeholder: "Select a fruit...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `renderOption` to customize how options are displayed. Add icons, metadata, or any custom JSX.",
      },
    },
  },
};

export const CustomValueRendering: Story = {
  args: {
    options: [
      {
        value: "us",
        label: "United States",
        data: { flag: "🇺🇸", code: "US" },
      },
      {
        value: "uk",
        label: "United Kingdom",
        data: { flag: "🇬🇧", code: "UK" },
      },
      {
        value: "ca",
        label: "Canada",
        data: { flag: "🇨🇦", code: "CA" },
      },
    ] as SelectOption<{ flag: string; code: string }>[],
    label: "Country",
    defaultValue: "us",
    renderValue: (selected) => {
      if (selected.length === 0) {
        return <span>Select country...</span>;
      }
      const option = selected[0];
      const data = option.data as { flag: string; code: string } | undefined;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>{data?.flag}</span>
          <span>{option.label}</span>
        </div>
      );
    },
    renderOption: (option) => {
      const data = option.data as { flag: string; code: string } | undefined;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>{data?.flag}</span>
          <span>{option.label}</span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "12px",
              opacity: 0.6,
              fontFamily: "monospace",
            }}
          >
            {data?.code}
          </span>
        </div>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `renderValue` to customize how selected value(s) are displayed in the control. Combine with `renderOption` for consistent styling.",
      },
    },
  },
};

const AsyncLoadingExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);

  const simulateAsyncLoad = (search: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = countryOptions.filter((opt) =>
        (opt.label as string).toLowerCase().includes(search.toLowerCase())
      );
      setOptions(filtered);
      setIsLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    simulateAsyncLoad("");
  }, []);

  return (
    <Select
      options={options}
      label="Country"
      description="Search to load countries from server"
      isSearchable
      isLoading={isLoading}
      onSearchChange={(value) => {
        simulateAsyncLoad(value);
      }}
      placeholder="Search countries..."
      loadingMessage="Searching..."
    />
  );
};

export const AsyncLoadingSimulation: Story = {
  render: () => <AsyncLoadingExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Example of async data loading with search. Use `onSearchChange` callback to fetch data based on user input.",
      },
    },
  },
};

// ============================================================================
// Controlled Examples
// ============================================================================

const ControlledSingleExample = () => {
  const [value, setValue] = useState<string | number>("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        options={fruitOptions}
        label="Controlled Select"
        description="Selected value is displayed below"
        value={value}
        onChange={(newValue) => setValue(newValue as string | number)}
        placeholder="Select a fruit..."
      />
      <div
        style={{
          padding: "12px",
          background: "var(--color-default-100)",
          borderRadius: "8px",
          fontFamily: "monospace",
        }}
      >
        Selected: {value || "(none)"}
      </div>
      <button
        onClick={() => setValue("")}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid var(--color-default-300)",
          background: "var(--color-background)",
          cursor: "pointer",
        }}
      >
        Clear Selection
      </button>
    </div>
  );
};

export const ControlledSingle: Story = {
  render: () => <ControlledSingleExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Controlled component example with external state management. The parent component controls the selected value.",
      },
    },
  },
};

const ControlledMultiExample = () => {
  const [values, setValues] = useState<(string | number)[]>([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        options={fruitOptions}
        label="Controlled Multi-Select"
        description="Selected values are displayed below"
        isMulti
        value={values}
        onChange={(newValues) => setValues(newValues as (string | number)[])}
        placeholder="Select fruits..."
      />
      <div
        style={{
          padding: "12px",
          background: "var(--color-default-100)",
          borderRadius: "8px",
          fontFamily: "monospace",
        }}
      >
        Selected ({values.length}):{" "}
        {values.length > 0 ? values.join(", ") : "(none)"}
      </div>
      <button
        onClick={() => setValues([])}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid var(--color-default-300)",
          background: "var(--color-background)",
          cursor: "pointer",
        }}
      >
        Clear All
      </button>
    </div>
  );
};

export const ControlledMulti: Story = {
  render: () => <ControlledMultiExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Controlled multi-select example. The parent component manages the array of selected values.",
      },
    },
  },
};
