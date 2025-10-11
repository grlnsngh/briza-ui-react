import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete, AutocompleteOption } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
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
A powerful, accessible autocomplete/combobox component with async data fetching, debounced search, and comprehensive keyboard navigation.

## Features
- 📏 Three size variants (\`sm\`, \`md\`, \`lg\`) matching Input component
- 🔍 **Searchable** - Built-in search/filter functionality with debouncing
- ⚡ **Async Support** - Async data fetching with loading states
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, Home, End)
- ♿ **WCAG Compliant** - Proper ARIA combobox attributes and focus management
- 🎨 **Theme Support** - Automatic light/dark theme integration with design tokens
- 🎭 **Custom Rendering** - Customize option display with render functions
- 🎪 **Portal Rendering** - Dropdown rendered in a portal for proper z-index handling
- 📍 **Smart Positioning** - Automatic dropdown positioning relative to input
- 🚀 **Debounced Search** - Configurable debounce delay for async operations
- 🎯 **Free Solo Mode** - Allow free text input beyond selection options

## Keyboard Navigation
- **Arrow Up/Down** - Navigate through options
- **Enter** - Select focused option
- **Escape** - Close dropdown and restore selected value
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
      description:
        "Controls the overall height and typography of the autocomplete",
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
        "Label text displayed above the autocomplete. Can be ReactNode for rich content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description: "Additional context shown between label and autocomplete",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text shown below the autocomplete",
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
      description: "Placeholder text shown when no value is entered",
      table: {
        defaultValue: { summary: "Search..." },
        type: { summary: "string" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the autocomplete and prevents interaction",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    required: {
      control: { type: "boolean" },
      description:
        "Marks the field as required with appropriate ARIA attributes",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Shows loading indicator",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    debounceDelay: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description: "Debounce delay for async search in milliseconds",
      table: {
        defaultValue: { summary: "300" },
        type: { summary: "number" },
      },
    },
    minSearchLength: {
      control: { type: "number", min: 0, max: 5, step: 1 },
      description: "Minimum characters required before showing dropdown",
      table: {
        defaultValue: { summary: "0" },
        type: { summary: "number" },
      },
    },
    openOnFocus: {
      control: { type: "boolean" },
      description: "Show dropdown when input is focused (even if empty)",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    clearOnSelect: {
      control: { type: "boolean" },
      description: "Clear input after selection",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    freeSolo: {
      control: { type: "boolean" },
      description: "Allow free text input (not just selection from options)",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Sample data
const countriesData: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "za", label: "South Africa" },
  { value: "eg", label: "Egypt" },
];

const programmingLanguages: AutocompleteOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
];

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    placeholder: "Search countries...",
    options: countriesData,
  },
};

export const Playground: Story = {
  args: {
    label: "Choose a Country",
    description: "Select your country from the list",
    placeholder: "Search countries...",
    helperText: "Start typing to filter options",
    options: countriesData,
    size: "md",
    status: "default",
  },
};

// ============================================================================
// Common Patterns
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Autocomplete
        size="sm"
        label="Small"
        placeholder="Search..."
        options={countriesData.slice(0, 5)}
      />
      <Autocomplete
        size="md"
        label="Medium (Default)"
        placeholder="Search..."
        options={countriesData.slice(0, 5)}
      />
      <Autocomplete
        size="lg"
        label="Large"
        placeholder="Search..."
        options={countriesData.slice(0, 5)}
      />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Programming Language",
    placeholder: "Select a language...",
    options: programmingLanguages,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Preferred Country",
    description: "Choose the country where you currently reside",
    placeholder: "Search countries...",
    options: countriesData,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Search Location",
    placeholder: "Type to search...",
    helperText: "Start typing at least 2 characters to see suggestions",
    options: countriesData,
  },
};

export const Required: Story = {
  args: {
    label: "Country",
    placeholder: "Select your country...",
    required: true,
    options: countriesData,
  },
};

// ============================================================================
// Status States
// ============================================================================

export const StatusStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Autocomplete
        label="Default State"
        placeholder="Search..."
        status="default"
        helperText="This is the default state"
        options={countriesData.slice(0, 5)}
      />
      <Autocomplete
        label="Error State"
        placeholder="Search..."
        status="error"
        errorMessage="This field is required"
        options={countriesData.slice(0, 5)}
      />
      <Autocomplete
        label="Success State"
        placeholder="Search..."
        status="success"
        successMessage="Valid selection"
        options={countriesData.slice(0, 5)}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country...",
    status: "error",
    errorMessage: "Please select a valid country",
    options: countriesData,
  },
};

export const SuccessState: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country...",
    status: "success",
    successMessage: "Valid selection!",
    value: "us",
    options: countriesData,
  },
};

export const Disabled: Story = {
  args: {
    label: "Country (Disabled)",
    placeholder: "Cannot select...",
    disabled: true,
    options: countriesData,
  },
};

// ============================================================================
// Async Data Loading
// ============================================================================

// Mock API function
const mockApiSearch = async (query: string): Promise<AutocompleteOption[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  const allUsers = [
    { value: "1", label: "John Doe", data: { email: "john@example.com" } },
    { value: "2", label: "Jane Smith", data: { email: "jane@example.com" } },
    { value: "3", label: "Bob Johnson", data: { email: "bob@example.com" } },
    {
      value: "4",
      label: "Alice Williams",
      data: { email: "alice@example.com" },
    },
    {
      value: "5",
      label: "Charlie Brown",
      data: { email: "charlie@example.com" },
    },
    { value: "6", label: "David Lee", data: { email: "david@example.com" } },
    { value: "7", label: "Emma Wilson", data: { email: "emma@example.com" } },
    { value: "8", label: "Frank Miller", data: { email: "frank@example.com" } },
  ];

  // Filter based on query
  if (!query) return allUsers;

  return allUsers.filter((user) =>
    user.label.toLowerCase().includes(query.toLowerCase())
  );
};

export const AsyncSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);

    return (
      <Autocomplete
        label="Search Users"
        placeholder="Type to search users..."
        helperText="Search by name (debounced with 500ms delay)"
        value={value ?? undefined}
        onChange={(newValue) => setValue(newValue)}
        onSearch={mockApiSearch}
        debounceDelay={500}
        minSearchLength={1}
      />
    );
  },
};

export const AsyncWithError: Story = {
  render: () => {
    const failingSearch = async (): Promise<AutocompleteOption[]> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      throw new Error("API Error");
    };

    return (
      <Autocomplete
        label="Failing Search"
        placeholder="Type to trigger error..."
        helperText="This will fail after searching"
        onSearch={failingSearch}
        asyncErrorMessage="Failed to load results. Please try again."
      />
    );
  },
};

export const LoadingState: Story = {
  args: {
    label: "Loading Data",
    placeholder: "Loading...",
    isLoading: true,
    options: [],
  },
};

// ============================================================================
// Advanced Features
// ============================================================================

export const CustomRendering: Story = {
  render: () => {
    const usersWithDetails: AutocompleteOption<{
      email: string;
      role: string;
    }>[] = [
      {
        value: "1",
        label: "John Doe",
        data: { email: "john@example.com", role: "Admin" },
      },
      {
        value: "2",
        label: "Jane Smith",
        data: { email: "jane@example.com", role: "Developer" },
      },
      {
        value: "3",
        label: "Bob Johnson",
        data: { email: "bob@example.com", role: "Designer" },
      },
      {
        value: "4",
        label: "Alice Williams",
        data: { email: "alice@example.com", role: "Manager" },
      },
    ];

    return (
      <Autocomplete
        label="Select Team Member"
        placeholder="Search team members..."
        options={usersWithDetails}
        renderOption={(option, isSelected, isHighlighted) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <div
              style={{
                fontWeight: isSelected ? "600" : "400",
                fontSize: "0.875rem",
              }}
            >
              {option.label}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: isHighlighted ? "inherit" : "#6b7280",
              }}
            >
              {option.data?.email} • {option.data?.role}
            </div>
          </div>
        )}
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: "Select Option",
    placeholder: "Some options are disabled...",
    options: [
      { value: "1", label: "Available Option 1" },
      { value: "2", label: "Disabled Option", disabled: true },
      { value: "3", label: "Available Option 2" },
      { value: "4", label: "Another Disabled", disabled: true },
      { value: "5", label: "Available Option 3" },
    ],
  },
};

export const FreeSoloMode: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    const [inputValue, setInputValue] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Autocomplete
          label="Tags"
          placeholder="Type anything or select..."
          helperText="You can type custom text or select from suggestions"
          options={programmingLanguages}
          value={value ?? undefined}
          onChange={(newValue) => setValue(newValue)}
          onInputChange={setInputValue}
          freeSolo
        />
        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          Selected value: {value ? String(value) : "None"}
          <br />
          Input value: {inputValue || "Empty"}
        </div>
      </div>
    );
  },
};

export const OpenOnFocus: Story = {
  args: {
    label: "Quick Select",
    placeholder: "Click to see all options...",
    openOnFocus: true,
    options: programmingLanguages.slice(0, 6),
  },
};

export const ClearOnSelect: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
      []
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Autocomplete
          label="Add Tags"
          placeholder="Select and add multiple tags..."
          helperText="Selection clears after each pick for multiple selections"
          options={programmingLanguages}
          clearOnSelect
          onChange={(value) => {
            if (value && !selectedValues.includes(value)) {
              setSelectedValues([...selectedValues, value]);
            }
          }}
        />
        {selectedValues.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {selectedValues.map((val) => {
              const option = programmingLanguages.find(
                (opt) => opt.value === val
              );
              return (
                <span
                  key={val}
                  style={{
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {option?.label}
                  <button
                    onClick={() =>
                      setSelectedValues(selectedValues.filter((v) => v !== val))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: "1rem",
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  },
};

export const MinSearchLength: Story = {
  args: {
    label: "Search with Minimum Length",
    placeholder: "Type at least 2 characters...",
    helperText: "Dropdown appears after typing 2 or more characters",
    minSearchLength: 2,
    options: countriesData,
  },
};

export const EmptyState: Story = {
  args: {
    label: "Empty Options",
    placeholder: "No options available...",
    noOptionsMessage: "No matching results found",
    options: [],
  },
};

// ============================================================================
// Controlled vs Uncontrolled
// ============================================================================

export const ControlledComponent: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | null>("us");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Autocomplete
          label="Controlled Autocomplete"
          placeholder="Search countries..."
          value={value ?? undefined}
          onChange={(newValue) => setValue(newValue)}
          options={countriesData}
        />
        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          Current value: {value || "None"}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setValue("ca")}>Set to Canada</button>
          <button onClick={() => setValue("uk")}>Set to UK</button>
          <button onClick={() => setValue(null)}>Clear</button>
        </div>
      </div>
    );
  },
};

export const UncontrolledComponent: Story = {
  render: () => {
    return (
      <Autocomplete
        label="Uncontrolled Autocomplete"
        placeholder="Search countries..."
        defaultValue="us"
        options={countriesData}
        onChange={(value, option) => {
          console.log("Selected:", value, option);
        }}
      />
    );
  },
};

// ============================================================================
// Real-world Examples
// ============================================================================

export const UserSearch: Story = {
  render: () => {
    const searchUsers = async (query: string) => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const users = [
        {
          value: "1",
          label: "John Doe",
          data: { avatar: "👨", status: "online" },
        },
        {
          value: "2",
          label: "Jane Smith",
          data: { avatar: "👩", status: "away" },
        },
        {
          value: "3",
          label: "Bob Johnson",
          data: { avatar: "👨‍💼", status: "offline" },
        },
        {
          value: "4",
          label: "Alice Williams",
          data: { avatar: "👩‍💻", status: "online" },
        },
      ];

      return users.filter((u) =>
        u.label.toLowerCase().includes(query.toLowerCase())
      );
    };

    return (
      <Autocomplete
        label="Search Users"
        placeholder="Type to search users..."
        onSearch={searchUsers}
        renderOption={(option, isSelected) => (
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "1.5rem" }}>{option.data?.avatar}</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.125rem",
              }}
            >
              <span style={{ fontWeight: isSelected ? "600" : "400" }}>
                {option.label}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color:
                    option.data?.status === "online"
                      ? "#22c55e"
                      : option.data?.status === "away"
                      ? "#eab308"
                      : "#6b7280",
                }}
              >
                {option.data?.status}
              </span>
            </div>
          </div>
        )}
      />
    );
  },
};

export const CitySearch: Story = {
  render: () => {
    const searchCities = async (query: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const cities = [
        {
          value: "nyc",
          label: "New York City",
          data: { country: "USA", population: "8.3M" },
        },
        {
          value: "lon",
          label: "London",
          data: { country: "UK", population: "9M" },
        },
        {
          value: "tok",
          label: "Tokyo",
          data: { country: "Japan", population: "14M" },
        },
        {
          value: "par",
          label: "Paris",
          data: { country: "France", population: "2.1M" },
        },
        {
          value: "ber",
          label: "Berlin",
          data: { country: "Germany", population: "3.6M" },
        },
      ];

      return cities.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
    };

    return (
      <Autocomplete
        label="Destination City"
        placeholder="Search for a city..."
        description="Search for major cities around the world"
        onSearch={searchCities}
        renderOption={(option) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "500" }}>{option.label}</span>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                {option.data?.country}
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              {option.data?.population}
            </span>
          </div>
        )}
      />
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: "",
      language: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <Autocomplete
          label="Country"
          placeholder="Select your country..."
          required
          options={countriesData}
          value={formData.country}
          onChange={(value) =>
            setFormData({ ...formData, country: String(value ?? "") })
          }
        />
        <Autocomplete
          label="Programming Language"
          placeholder="Select your preferred language..."
          required
          options={programmingLanguages}
          value={formData.language}
          onChange={(value) =>
            setFormData({ ...formData, language: String(value ?? "") })
          }
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    );
  },
};
