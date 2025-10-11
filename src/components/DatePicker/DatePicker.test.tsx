import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("DatePicker Accessibility Tests", () => {
  describe("Basic Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <DatePicker label="Select Date" onChange={() => {}} />
      );
      await expectNoA11yViolations(container);
    });

    it("should render with proper input role", () => {
      render(<DatePicker label="Select Date" onChange={() => {}} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should have accessible label", () => {
      render(<DatePicker label="Appointment Date" onChange={() => {}} />);
      expect(
        screen.getByRole("combobox", { name: /appointment date/i })
      ).toBeInTheDocument();
    });

    it("should support custom aria-label", () => {
      render(
        <DatePicker
          label="Date"
          ariaLabel="Select your appointment date"
          onChange={() => {}}
        />
      );
      expect(
        screen.getByRole("combobox", { name: "Select your appointment date" })
      ).toBeInTheDocument();
    });

    it("should have aria-expanded attribute", () => {
      render(<DatePicker label="Select Date" onChange={() => {}} />);
      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");
    });

    it("should update aria-expanded when calendar opens", async () => {
      const user = userEvent.setup();
      render(<DatePicker label="Select Date" onChange={() => {}} />);
      const input = screen.getByRole("combobox");

      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("should have proper aria attributes for required field", () => {
      render(<DatePicker label="Select Date" required onChange={() => {}} />);
      const input = screen.getByRole("combobox");
      expect(input).toBeRequired();
    });
  });

  describe("Size Variants Accessibility", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      it(`should not have accessibility violations with ${size} size`, async () => {
        const { container } = render(
          <DatePicker size={size} label="Select Date" onChange={() => {}} />
        );
        await expectNoA11yViolations(container);
      });
    });
  });

  describe("Disabled State Accessibility", () => {
    it("should not have accessibility violations when disabled", async () => {
      const { container } = render(
        <DatePicker disabled label="Select Date" onChange={() => {}} />
      );
      await expectNoA11yViolations(container);
    });

    it("should have disabled attribute", () => {
      render(<DatePicker disabled label="Select Date" onChange={() => {}} />);
      expect(screen.getByRole("combobox")).toBeDisabled();
    });
  });

  describe("Error State Accessibility", () => {
    it("should announce error to screen readers", () => {
      render(
        <DatePicker
          label="Select Date"
          errorMessage="Please select a valid date"
          onChange={() => {}}
        />
      );
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Please select a valid date"
      );
    });
  });

  describe("Calendar Dialog Accessibility", () => {
    it("should open calendar with dialog role", async () => {
      const user = userEvent.setup();
      render(<DatePicker label="Select Date" onChange={() => {}} />);

      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should have accessible name for dialog", async () => {
      const user = userEvent.setup();
      render(<DatePicker label="Select Date" onChange={() => {}} />);

      await user.click(screen.getByRole("combobox"));
      expect(
        screen.getByRole("dialog", { name: /choose date/i })
      ).toBeInTheDocument();
    });

    it("should have accessible date buttons with proper labels", async () => {
      const user = userEvent.setup();
      render(<DatePicker label="Select Date" onChange={() => {}} />);

      await user.click(screen.getByRole("combobox"));

      // Check that date buttons have proper aria-labels
      const dateButtons = screen.getAllByRole("gridcell");
      expect(dateButtons.length).toBeGreaterThan(0);

      // Each button should have an aria-label with full date
      dateButtons.forEach((button) => {
        expect(button).toHaveAttribute("aria-label");
      });
    });
  });
});

describe("DatePicker Single Mode Tests", () => {
  it("should render with default props", () => {
    render(<DatePicker label="Select Date" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should display placeholder text", () => {
    render(
      <DatePicker
        label="Select Date"
        placeholder="Choose a date"
        onChange={() => {}}
      />
    );
    expect(screen.getByPlaceholderText("Choose a date")).toBeInTheDocument();
  });

  it("should display selected date", () => {
    const date = new Date(2024, 0, 15);
    render(<DatePicker value={date} label="Select Date" onChange={() => {}} />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("01/15/2024");
  });

  it("should call onChange when date is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<DatePicker label="Select Date" onChange={handleChange} />);

    // Open calendar
    await user.click(screen.getByRole("combobox"));

    // Click on a date
    const dateButtons = screen.getAllByRole("gridcell");
    await user.click(dateButtons[15]); // Click on a valid date

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it("should close calendar after selecting a date", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Select Date" onChange={() => {}} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const dateButtons = screen.getAllByRole("gridcell");
    await user.click(dateButtons[15]);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should clear date when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const date = new Date(2024, 0, 15);

    render(
      <DatePicker
        value={date}
        label="Select Date"
        showClearButton
        onChange={handleChange}
      />
    );

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(null);
  });
});

describe("DatePicker Range Mode Tests", () => {
  it("should render in range mode", () => {
    render(
      <DatePicker
        mode="range"
        label="Select Date Range"
        onRangeChange={() => {}}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should display selected range", () => {
    const startDate = new Date(2024, 0, 15);
    const endDate = new Date(2024, 0, 20);

    render(
      <DatePicker
        mode="range"
        rangeValue={{ start: startDate, end: endDate }}
        label="Select Date Range"
        onRangeChange={() => {}}
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("01/15/2024 - 01/20/2024");
  });

  it("should call onRangeChange when range is selected", async () => {
    const user = userEvent.setup();
    const handleRangeChange = vi.fn();

    render(
      <DatePicker
        mode="range"
        label="Select Date Range"
        onRangeChange={handleRangeChange}
      />
    );

    await user.click(screen.getByRole("combobox"));

    const dateButtons = screen.getAllByRole("gridcell");
    await user.click(dateButtons[15]); // Select start date
    await user.click(dateButtons[20]); // Select end date

    expect(handleRangeChange).toHaveBeenCalled();
  });

  it("should highlight dates in range", async () => {
    const user = userEvent.setup();
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 15);
    const endDate = new Date(today.getFullYear(), today.getMonth(), 20);

    render(
      <DatePicker
        mode="range"
        rangeValue={{ start: startDate, end: endDate }}
        label="Select Date Range"
        defaultValue={startDate}
        onRangeChange={() => {}}
      />
    );

    await user.click(screen.getByRole("combobox"));

    // Check that range styling is applied (dates have aria-selected)
    const dateButtons = screen.getAllByRole("gridcell");
    const selectedButtons = dateButtons.filter(
      (btn) => btn.getAttribute("aria-selected") === "true"
    );
    expect(selectedButtons.length).toBeGreaterThanOrEqual(6); // At least start, end, and 4 days in between
  });
});

describe("DatePicker Date Restrictions Tests", () => {
  it("should disable dates before minDate", async () => {
    const user = userEvent.setup();
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 15);

    render(
      <DatePicker
        label="Select Date"
        minDate={minDate}
        defaultValue={minDate}
        onChange={() => {}}
      />
    );

    await user.click(screen.getByRole("combobox"));

    // Dates before minDate should be disabled
    const dateButtons = screen.getAllByRole("gridcell");
    const disabledButtons = dateButtons.filter((btn) =>
      btn.hasAttribute("disabled")
    );
    expect(disabledButtons.length).toBeGreaterThan(0);
  });

  it("should disable dates after maxDate", async () => {
    const user = userEvent.setup();
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth(), 15);

    render(
      <DatePicker
        label="Select Date"
        maxDate={maxDate}
        defaultValue={maxDate}
        onChange={() => {}}
      />
    );

    await user.click(screen.getByRole("combobox"));

    const dateButtons = screen.getAllByRole("gridcell");
    const disabledButtons = dateButtons.filter((btn) =>
      btn.hasAttribute("disabled")
    );
    expect(disabledButtons.length).toBeGreaterThan(0);
  });

  it("should disable specific dates", async () => {
    const user = userEvent.setup();
    const today = new Date();
    const disabledDate = new Date(today.getFullYear(), today.getMonth(), 15);

    render(
      <DatePicker
        label="Select Date"
        disabledDates={[disabledDate]}
        defaultValue={today}
        onChange={() => {}}
      />
    );

    await user.click(screen.getByRole("combobox"));

    const dateButtons = screen.getAllByRole("gridcell");
    const disabledButtons = dateButtons.filter((btn) =>
      btn.hasAttribute("disabled")
    );
    expect(disabledButtons.length).toBeGreaterThan(0);
  });

  it("should not allow selecting disabled dates", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 15);

    render(
      <DatePicker
        label="Select Date"
        minDate={minDate}
        defaultValue={minDate}
        onChange={handleChange}
      />
    );

    await user.click(screen.getByRole("combobox"));

    const dateButtons = screen.getAllByRole("gridcell");
    const disabledButton = dateButtons.find((btn) =>
      btn.hasAttribute("disabled")
    );

    if (disabledButton) {
      await user.click(disabledButton);
      expect(handleChange).not.toHaveBeenCalled();
    }
  });
});

describe("DatePicker Keyboard Navigation Tests", () => {
  it("should open calendar on Enter key", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Select Date" onChange={() => {}} />);

    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should close calendar on Escape key", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Select Date" onChange={() => {}} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should navigate dates with arrow keys", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Select Date" onChange={() => {}} />);

    await user.click(screen.getByRole("combobox"));

    // Focus should move between dates with arrow keys
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{ArrowUp}");

    // Calendar should still be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should select date on Enter key", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<DatePicker label="Select Date" onChange={handleChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Enter}");

    expect(handleChange).toHaveBeenCalled();
  });
});

describe("DatePicker Month Navigation Tests", () => {
  it("should navigate to previous month", async () => {
    const user = userEvent.setup();
    const today = new Date(2024, 5, 15); // June 2024

    render(
      <DatePicker
        label="Select Date"
        defaultValue={today}
        onChange={() => {}}
      />
    );

    await user.click(screen.getByRole("combobox"));

    const prevButton = screen.getByRole("button", { name: /previous month/i });
    await user.click(prevButton);

    // Should show May 2024
    expect(screen.getByText(/may/i)).toBeInTheDocument();
  });

  it("should navigate to next month", async () => {
    const user = userEvent.setup();
    const today = new Date(2024, 5, 15); // June 2024

    render(
      <DatePicker
        label="Select Date"
        defaultValue={today}
        onChange={() => {}}
      />
    );

    await user.click(screen.getByRole("combobox"));

    const nextButton = screen.getByRole("button", { name: /next month/i });
    await user.click(nextButton);

    // Should show July 2024
    expect(screen.getByText(/july/i)).toBeInTheDocument();
  });
});

describe("DatePicker Internationalization Tests", () => {
  it("should format date according to locale", () => {
    const date = new Date(2024, 0, 15);

    render(
      <DatePicker
        value={date}
        label="Select Date"
        locale="en-US"
        onChange={() => {}}
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("01/15/2024");
  });

  it("should display weekdays in specified locale", async () => {
    const user = userEvent.setup();

    render(
      <DatePicker label="Select Date" locale="fr-FR" onChange={() => {}} />
    );

    await user.click(screen.getByRole("combobox"));

    // French locale should show "lun", "mar", etc.
    expect(screen.getByText(/lun/i)).toBeInTheDocument();
  });
});

describe("DatePicker Helper Text Tests", () => {
  it("should display helper text", () => {
    render(
      <DatePicker
        label="Select Date"
        helperText="Please select a valid date"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Please select a valid date")).toBeInTheDocument();
  });

  it("should display error message", () => {
    render(
      <DatePicker
        label="Select Date"
        errorMessage="Invalid date selected"
        onChange={() => {}}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid date selected"
    );
  });
});

describe("DatePicker Edge Cases", () => {
  it("should handle undefined value", () => {
    render(
      <DatePicker value={undefined} label="Select Date" onChange={() => {}} />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");
  });

  it("should handle null value", () => {
    render(
      <DatePicker value={undefined} label="Select Date" onChange={() => {}} />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");
  });

  it("should not open calendar when disabled", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled label="Select Date" onChange={() => {}} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close calendar when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DatePicker label="Select Date" onChange={() => {}} />
        <button>Outside Button</button>
      </div>
    );

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByRole("button", { name: /outside button/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should display today's date with special styling", async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Select Date" onChange={() => {}} />);

    await user.click(screen.getByRole("combobox"));

    // Today's date should be in the calendar
    const today = new Date();
    const todayLabel = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const todayButton = screen.getByRole("gridcell", { name: todayLabel });
    expect(todayButton).toBeInTheDocument();
  });
});
