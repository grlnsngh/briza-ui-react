import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The DatePicker component provides a comprehensive date selection interface with support for single dates, date ranges, keyboard navigation, and internationalization.

## Features

- **Single & Range Selection**: Choose individual dates or date ranges
- **Keyboard Navigation**: Full keyboard support with Arrow keys, Enter, and Escape
- **Date Restrictions**: Set min/max dates and disable specific dates
- **Internationalization**: Supports multiple locales and date formats
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **Theming**: Full light/dark theme support

## Usage

\`\`\`tsx
import { DatePicker } from '@briza-ui/react';

function MyComponent() {
  const [date, setDate] = useState<Date>();
  
  return (
    <DatePicker
      value={date}
      onChange={(date) => setDate(date || undefined)}
      label="Select Date"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range"],
      description: "Selection mode",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    locale: {
      control: "text",
      description: "Locale for internationalization (e.g., en-US, fr-FR)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date picker is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the date selection is required",
    },
    showClearButton: {
      control: "boolean",
      description: "Whether to show clear button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/* =============================================================================
 * BASIC EXAMPLES
 * ============================================================================= */

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Select Date"
        placeholder="Choose a date"
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Appointment Date"
      />
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = useState<{
      start: Date | null;
      end: Date | null;
    }>({ start: null, end: null });
    return (
      <DatePicker
        mode="range"
        rangeValue={rangeValue}
        onRangeChange={setRangeValue}
        label="Select Date Range"
        placeholder="Choose start and end dates"
      />
    );
  },
};

/* =============================================================================
 * SIZE VARIANTS
 * ============================================================================= */

export const Sizes: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date>();
    const [date2, setDate2] = useState<Date>();
    const [date3, setDate3] = useState<Date>();
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <DatePicker
          size="sm"
          value={date1}
          onChange={(date) => setDate1(date ?? undefined)}
          label="Small"
        />
        <DatePicker
          size="md"
          value={date2}
          onChange={(date) => setDate2(date ?? undefined)}
          label="Medium (Default)"
        />
        <DatePicker
          size="lg"
          value={date3}
          onChange={(date) => setDate3(date ?? undefined)}
          label="Large"
        />
      </div>
    );
  },
};

/* =============================================================================
 * DATE RESTRICTIONS
 * ============================================================================= */

export const MinMaxDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Select Date (Current Month Only)"
        minDate={minDate}
        maxDate={maxDate}
        helperText={`Valid dates: ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`}
      />
    );
  },
};

export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    // Disable weekends
    // Generate disabled weekend dates for the next 3 months
    const disabledDates: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const day = checkDate.getDay();
      if (day === 0 || day === 6) {
        disabledDates.push(checkDate);
      }
    }

    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Select Weekday"
        disabledDates={disabledDates}
        helperText="Weekends are disabled"
      />
    );
  },
};

export const FutureDatesOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Select Future Date"
        minDate={tomorrow}
        helperText="Only future dates are available"
      />
    );
  },
};

/* =============================================================================
 * INTERNATIONALIZATION
 * ============================================================================= */

export const Locales: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date>();
    const [date2, setDate2] = useState<Date>();
    const [date3, setDate3] = useState<Date>();
    const [date4, setDate4] = useState<Date>();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <DatePicker
          value={date1}
          onChange={(date) => setDate1(date ?? undefined)}
          label="English (US)"
          locale="en-US"
        />
        <DatePicker
          value={date2}
          onChange={(date) => setDate2(date ?? undefined)}
          label="French"
          locale="fr-FR"
        />
        <DatePicker
          value={date3}
          onChange={(date) => setDate3(date ?? undefined)}
          label="German"
          locale="de-DE"
        />
        <DatePicker
          value={date4}
          onChange={(date) => setDate4(date ?? undefined)}
          label="Japanese"
          locale="ja-JP"
        />
      </div>
    );
  },
};

export const CustomDateFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();

    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Custom Format"
        format="yyyy-MM-dd"
        helperText="Format: YYYY-MM-DD"
      />
    );
  },
};

/* =============================================================================
 * STATES
 * ============================================================================= */

export const Disabled: Story = {
  render: () => (
    <DatePicker
      value={new Date()}
      onChange={() => {}}
      label="Disabled Date Picker"
      disabled
    />
  ),
};

export const Required: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Required Date"
        required
        helperText="This field is required"
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Date with Error"
        errorMessage="Please select a valid date"
      />
    );
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={(date) => setDate(date || undefined)}
        label="Date with Clear Button"
        showClearButton
        helperText="Click the × button to clear"
      />
    );
  },
};

/* =============================================================================
 * RANGE SELECTION
 * ============================================================================= */

export const DateRangeBasic: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = useState<{
      start: Date | null;
      end: Date | null;
    }>({ start: null, end: null });

    return (
      <DatePicker
        mode="range"
        rangeValue={rangeValue}
        onRangeChange={setRangeValue}
        label="Trip Dates"
        placeholder="Select check-in and check-out dates"
        helperText="Select your travel dates"
      />
    );
  },
};

export const DateRangeWithRestrictions: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = useState<{
      start: Date | null;
      end: Date | null;
    }>({ start: null, end: null });
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);

    return (
      <DatePicker
        mode="range"
        rangeValue={rangeValue}
        onRangeChange={setRangeValue}
        label="Booking Period"
        minDate={today}
        maxDate={maxDate}
        helperText="Available for the next 3 months"
      />
    );
  },
};

/* =============================================================================
 * ACCESSIBILITY
 * ============================================================================= */

export const KeyboardNavigation: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <DatePicker
          value={date}
          onChange={(date) => setDate(date || undefined)}
          label="Keyboard Navigation"
          helperText="Use Arrow keys to navigate, Enter to select, Escape to close"
        />
        <div
          style={{
            fontSize: "14px",
            color: "var(--color-default-600)",
            maxWidth: "400px",
          }}
        >
          <strong>Keyboard shortcuts:</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>Arrow Keys: Navigate between dates</li>
            <li>Enter/Space: Select date</li>
            <li>Escape: Close calendar</li>
            <li>Tab: Move focus to/from calendar</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const ScreenReaderFriendly: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <DatePicker
          value={date}
          onChange={(date) => setDate(date || undefined)}
          label="Appointment Date"
          placeholder="Select appointment date"
          helperText="All dates include proper ARIA labels"
          required
          ariaLabel="Select your appointment date"
        />
        <div
          style={{
            fontSize: "14px",
            color: "var(--color-default-600)",
            maxWidth: "400px",
          }}
        >
          <strong>Accessibility features:</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>ARIA labels for all interactive elements</li>
            <li>Proper focus management</li>
            <li>Screen reader announcements</li>
            <li>Semantic HTML structure</li>
          </ul>
        </div>
      </div>
    );
  },
};

/* =============================================================================
 * REAL-WORLD USE CASES
 * ============================================================================= */

export const BookingForm: Story = {
  render: () => {
    const [checkIn, setCheckIn] = useState<Date>();
    const [checkOut, setCheckOut] = useState<Date>();
    const today = new Date();

    // Check-out must be after check-in
    const minCheckOut = checkIn
      ? new Date(checkIn.getTime() + 86400000)
      : today;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "400px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Hotel Booking
        </h3>
        <DatePicker
          value={checkIn}
          onChange={(date) => {
            setCheckIn(date ?? undefined);
            if (checkOut && date && checkOut <= date) {
              setCheckOut(undefined);
            }
          }}
          label="Check-in Date"
          minDate={today}
          required
          showClearButton
        />
        <DatePicker
          value={checkOut}
          onChange={(date) => setCheckOut(date ?? undefined)}
          label="Check-out Date"
          minDate={minCheckOut}
          disabled={!checkIn}
          required
          showClearButton
          helperText={
            !checkIn ? "Please select check-in date first" : undefined
          }
        />
      </div>
    );
  },
};

export const EventScheduler: Story = {
  render: () => {
    const [eventDate, setEventDate] = useState<Date>();
    const today = new Date();

    // Disable holidays (example: Christmas, New Year)
    const holidays = [
      new Date(2024, 11, 25), // Dec 25
      new Date(2025, 0, 1), // Jan 1
    ];

    // Create array of disabled dates (weekends + holidays)
    const disabledDates: Date[] = [...holidays];

    // Add weekends for the next 6 months
    for (let i = 0; i < 180; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const day = checkDate.getDay();
      if (day === 0 || day === 6) {
        disabledDates.push(checkDate);
      }
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <DatePicker
          value={eventDate}
          onChange={(date) => setEventDate(date ?? undefined)}
          label="Event Date"
          minDate={today}
          disabledDates={disabledDates}
          helperText="Weekends and holidays are not available"
          required
          size="lg"
        />
      </div>
    );
  },
};

export const BirthdayPicker: Story = {
  render: () => {
    const [birthDate, setBirthDate] = useState<Date>();
    const maxDate = new Date();
    const minDate = new Date(1900, 0, 1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <DatePicker
          value={birthDate}
          onChange={(date) => setBirthDate(date ?? undefined)}
          label="Date of Birth"
          minDate={minDate}
          maxDate={maxDate}
          placeholder="MM/DD/YYYY"
          helperText="You must be at least 18 years old"
          required
        />
      </div>
    );
  },
};

export const ProjectDeadline: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = useState<{
      start: Date | null;
      end: Date | null;
    }>({ start: null, end: null });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "600px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
          Project Timeline
        </h3>
        <DatePicker
          mode="range"
          rangeValue={rangeValue}
          onRangeChange={setRangeValue}
          label="Project Duration"
          placeholder="Select project start and end dates"
          minDate={new Date()}
          required
          size="lg"
          showClearButton
        />
        {rangeValue.start && rangeValue.end && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "var(--color-primary-100)",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <strong>Project Duration:</strong>{" "}
            {Math.ceil(
              (rangeValue.end.getTime() - rangeValue.start.getTime()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days
          </div>
        )}
      </div>
    );
  },
};

/* =============================================================================
 * POSITIONING DEMO
 * ============================================================================= */

export const PositioningComparison: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date>();
    const [date2, setDate2] = useState<Date>();

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          padding: "20px",
        }}
      >
        <div>
          <h3
            style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 600 }}
          >
            🔍 Quick Comparison: Opens Below vs Opens Above
          </h3>
          <p
            style={{
              color: "var(--color-default-600)",
              marginBottom: "32px",
              maxWidth: "600px",
            }}
          >
            These two date pickers demonstrate the difference in positioning
            behavior. The top one always has space below, while the bottom one
            will open above.
          </p>
        </div>

        {/* Container with controlled height to show both behaviors */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            minHeight: "500px",
          }}
        >
          {/* Left: Opens Below */}
          <div
            style={{
              backgroundColor: "var(--color-success-100)",
              padding: "24px",
              borderRadius: "12px",
              border: "2px dashed var(--color-success-400)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                backgroundColor: "var(--color-success-200)",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "32px" }}>⬇️</span>
              <div>
                <div
                  style={{ fontWeight: 600, color: "var(--color-success-600)" }}
                >
                  Opens Below
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--color-success-500)",
                  }}
                >
                  Plenty of space underneath
                </div>
              </div>
            </div>
            <DatePicker
              value={date1}
              onChange={(date) => setDate1(date ?? undefined)}
              label="DatePicker at Top"
              helperText="Click to see calendar open below"
              size="md"
            />
            <div
              style={{
                fontSize: "13px",
                color: "var(--color-success-600)",
                padding: "12px",
                backgroundColor: "var(--color-success-200)",
                borderRadius: "6px",
              }}
            >
              ✓ Calendar opens downward when there's enough space below
            </div>
          </div>

          {/* Right: Opens Above - needs to be at bottom */}
          <div
            style={{
              backgroundColor: "var(--color-danger-100)",
              padding: "24px",
              borderRadius: "12px",
              border: "2px dashed var(--color-danger-400)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignSelf: "end",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                backgroundColor: "var(--color-danger-200)",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "32px" }}>⬆️</span>
              <div>
                <div
                  style={{ fontWeight: 600, color: "var(--color-danger-600)" }}
                >
                  Opens Above
                </div>
                <div
                  style={{ fontSize: "13px", color: "var(--color-danger-500)" }}
                >
                  Not enough space below
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--color-danger-600)",
                padding: "12px",
                backgroundColor: "var(--color-danger-200)",
                borderRadius: "6px",
              }}
            >
              ✓ Calendar opens upward when space below is limited
            </div>
            <DatePicker
              value={date2}
              onChange={(date) => setDate2(date ?? undefined)}
              label="DatePicker at Bottom"
              helperText="Click to see calendar open above"
              size="md"
            />
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            backgroundColor: "var(--color-primary-50)",
            borderRadius: "8px",
            borderLeft: "4px solid var(--color-primary)",
          }}
        >
          <strong style={{ color: "var(--color-primary-700)" }}>
            💡 Try This:
          </strong>
          <p style={{ margin: "8px 0 0 0", color: "var(--color-primary-700)" }}>
            Resize your browser window or zoom in/out to see how the calendar
            adapts its position dynamically to stay visible!
          </p>
        </div>
      </div>
    );
  },
};

export const PositioningDemo: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date>();
    const [date2, setDate2] = useState<Date>();
    const [date3, setDate3] = useState<Date>();

    return (
      <div
        style={{
          padding: "40px 20px",
          minHeight: "200vh",
          backgroundColor: "var(--color-background)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "var(--color-primary-200)",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "40px",
            zIndex: 1,
            border: "2px solid var(--color-primary-400)",
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: "12px",
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--color-primary-600)",
            }}
          >
            📍 Smart Positioning Demo - Interactive Test
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "var(--color-primary-600)",
            }}
          >
            <strong>Instructions:</strong> Scroll down the page and click each
            date picker. Notice how the calendar automatically positions itself
            to stay visible!
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "600px",
            maxWidth: "500px",
          }}
        >
          {/* Top Picker */}
          <div
            style={{
              backgroundColor: "var(--color-success-200)",
              padding: "24px",
              borderRadius: "12px",
              border: "2px solid var(--color-success-400)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: "var(--color-success-600)",
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: "24px" }}>⬇️</span>
              <span>Opens BELOW (lots of space below)</span>
            </div>
            <DatePicker
              value={date1}
              onChange={(date) => setDate1(date ?? undefined)}
              label="Picker #1 - Near Top"
              helperText="Click to open - calendar appears below the input"
              size="lg"
            />
          </div>

          {/* Middle Picker */}
          <div
            style={{
              backgroundColor: "var(--color-warning-200)",
              padding: "24px",
              borderRadius: "12px",
              border: "2px solid var(--color-warning-400)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: "var(--color-warning-600)",
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: "24px" }}>↕️</span>
              <span>Adapts based on scroll position</span>
            </div>
            <DatePicker
              value={date2}
              onChange={(date) => setDate2(date ?? undefined)}
              label="Picker #2 - Middle"
              helperText="Try opening this at different scroll positions"
              size="lg"
            />
          </div>

          {/* Bottom Picker */}
          <div
            style={{
              backgroundColor: "var(--color-danger-200)",
              padding: "24px",
              borderRadius: "12px",
              border: "2px solid var(--color-danger-400)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: "var(--color-danger-600)",
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: "24px" }}>⬆️</span>
              <span>Opens ABOVE (not enough space below)</span>
            </div>
            <DatePicker
              value={date3}
              onChange={(date) => setDate3(date ?? undefined)}
              label="Picker #3 - Near Bottom"
              helperText="Click to open - calendar appears above the input"
              size="lg"
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "60px",
            padding: "24px",
            backgroundColor: "var(--color-default-100)",
            borderRadius: "8px",
            maxWidth: "600px",
          }}
        >
          <h4 style={{ marginTop: 0, fontSize: "16px", fontWeight: 600 }}>
            💡 What's Being Demonstrated:
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>
              <strong>Top picker (green):</strong> Opens below because there's
              plenty of space
            </li>
            <li>
              <strong>Middle picker (yellow):</strong> Position changes based on
              where you've scrolled
            </li>
            <li>
              <strong>Bottom picker (red):</strong> Opens above to stay visible
              on screen
            </li>
            <li>
              <strong>All pickers:</strong> Calendar follows the input when you
              scroll (try it!)
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

/* =============================================================================
 * INTERACTIVE DEMO
 * ============================================================================= */

export const InteractivePlayground: Story = {
  args: {
    label: "Date Picker",
    placeholder: "Select a date",
    size: "md",
    mode: "single",
    locale: "en-US",
    disabled: false,
    required: false,
    showClearButton: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        {...args}
        value={date}
        onChange={(date) => setDate(date || undefined)}
      />
    );
  },
};
