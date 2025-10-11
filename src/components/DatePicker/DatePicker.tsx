import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import styles from "./datepicker.module.css";

export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerMode = "single" | "range";
export type DatePickerView = "days" | "months" | "years";

export interface DatePickerProps {
  /**
   * Size of the date picker
   * @default "md"
   */
  size?: DatePickerSize;

  /**
   * Selection mode: single date or date range
   * @default "single"
   */
  mode?: DatePickerMode;

  /**
   * Selected date (for single mode)
   */
  value?: Date;

  /**
   * Selected date range (for range mode)
   */
  rangeValue?: { start: Date | null; end: Date | null };

  /**
   * Default date value
   */
  defaultValue?: Date;

  /**
   * Callback when date changes
   */
  onChange?: (date: Date | null) => void;

  /**
   * Callback when date range changes
   */
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Disabled dates
   */
  disabledDates?: Date[];

  /**
   * Enable time picker
   * @default false
   */
  showTime?: boolean;

  /**
   * Date format string
   * @default "MM/DD/YYYY"
   */
  format?: string;

  /**
   * Locale for internationalization
   * @default "en-US"
   */
  locale?: string;

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  firstDayOfWeek?: number;

  /**
   * Show week numbers
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Label for the input
   */
  label?: React.ReactNode;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * Helper text
   */
  helperText?: React.ReactNode;

  /**
   * Error message
   */
  errorMessage?: React.ReactNode;

  /**
   * Whether the picker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the picker is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether to clear button
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Name attribute for form integration
   */
  name?: string;
}

// Utility functions
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

const isDateInRange = (
  date: Date,
  start: Date | null,
  end: Date | null
): boolean => {
  if (!start || !end) return false;
  return date >= start && date <= end;
};

const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates && disabledDates.some((d) => isSameDay(d, date)))
    return true;
  return false;
};

const formatDate = (
  date: Date | null,
  format: string,
  locale: string
): string => {
  if (!date) return "";

  const intl = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return intl.format(date);
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthStart = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

// Icons
const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="10"
      height="9"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M3 6H13" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 2V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 2V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(props, forwardedRef) {
    const {
      size = "md",
      mode = "single",
      value,
      rangeValue,
      defaultValue,
      onChange,
      onRangeChange,
      minDate,
      maxDate,
      disabledDates,
      showTime = false,
      format = "MM/DD/YYYY",
      locale = "en-US",
      firstDayOfWeek = 0,
      // showWeekNumbers = false, // TODO: Implement week numbers feature
      placeholder = "Select date",
      label,
      ariaLabel,
      helperText,
      errorMessage,
      disabled = false,
      required = false,
      showClearButton = true,
      className,
      name,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value || defaultValue || null
    );
    const [selectedRange, setSelectedRange] = useState<{
      start: Date | null;
      end: Date | null;
    }>(rangeValue || { start: null, end: null });
    const [currentMonth, setCurrentMonth] = useState(
      value || defaultValue || new Date()
    );
    const [view, setView] = useState<DatePickerView>("days");
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const [calendarPosition, setCalendarPosition] = useState<{
      top: number;
      left: number;
      placement: "bottom" | "top";
    }>({ top: 0, left: 0, placement: "bottom" });

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Merge the forwarded ref with our internal ref
    React.useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(inputRef.current);
      } else if (forwardedRef) {
        forwardedRef.current = inputRef.current;
      }
    }, [forwardedRef]);

    // Calculate optimal calendar position
    const calculatePosition = useCallback(() => {
      if (!containerRef.current || !calendarRef.current) return;

      const inputRect = containerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
      const calendarHeight = calendarRect.height || 400; // Fallback height
      const calendarWidth = calendarRect.width || 320; // Fallback width

      // Determine vertical placement (prefer below, but use above if not enough space)
      let placement: "bottom" | "top" = "bottom";
      let top = inputRect.bottom + window.scrollY + 4;

      if (spaceBelow < calendarHeight && spaceAbove > spaceBelow) {
        placement = "top";
        top = inputRect.top + window.scrollY - calendarHeight - 4;
      }

      // Determine horizontal placement (keep within viewport)
      let left = inputRect.left + window.scrollX;

      // Check if calendar would overflow on the right
      if (left + calendarWidth > viewportWidth + window.scrollX) {
        left = Math.max(
          window.scrollX + 8, // Min 8px from left edge
          inputRect.right + window.scrollX - calendarWidth
        );
      }

      // Ensure calendar doesn't overflow on the left
      if (left < window.scrollX + 8) {
        left = window.scrollX + 8;
      }

      setCalendarPosition({ top, left, placement });
    }, []);

    // Update position when calendar opens
    useEffect(() => {
      if (isOpen) {
        // Initial position calculation
        calculatePosition();

        // Recalculate on scroll and resize
        const handleUpdate = () => calculatePosition();

        window.addEventListener("scroll", handleUpdate, true);
        window.addEventListener("resize", handleUpdate);

        return () => {
          window.removeEventListener("scroll", handleUpdate, true);
          window.removeEventListener("resize", handleUpdate);
        };
      }
    }, [isOpen, calculatePosition]);

    // Generate calendar days
    const calendarDays = useMemo(() => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = getMonthStart(year, month);
      const daysInMonth = getDaysInMonth(year, month);

      let startDay = firstDay.getDay() - firstDayOfWeek;
      if (startDay < 0) startDay += 7;

      const days: (Date | null)[] = [];

      // Previous month days
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

      for (let i = startDay - 1; i >= 0; i--) {
        days.push(new Date(prevYear, prevMonth, daysInPrevMonth - i));
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      // Next month days to fill the grid
      const remainingDays = 42 - days.length; // 6 weeks
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;

      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(nextYear, nextMonth, i));
      }

      return days;
    }, [currentMonth, firstDayOfWeek]);

    // Handle date selection
    const handleDateSelect = useCallback(
      (date: Date) => {
        if (isDateDisabled(date, minDate, maxDate, disabledDates)) {
          return;
        }

        if (mode === "single") {
          setSelectedDate(date);
          onChange?.(date);
          if (!showTime) {
            setIsOpen(false);
          }
        } else {
          // Range mode
          if (
            !selectedRange.start ||
            (selectedRange.start && selectedRange.end)
          ) {
            setSelectedRange({ start: date, end: null });
          } else {
            const start = selectedRange.start;
            if (date < start) {
              setSelectedRange({ start: date, end: start });
            } else {
              setSelectedRange({ start, end: date });
            }
            onRangeChange?.({
              start: date < start ? date : start,
              end: date < start ? start : date,
            });
            if (!showTime) {
              setIsOpen(false);
            }
          }
        }
      },
      [
        mode,
        selectedRange,
        minDate,
        maxDate,
        disabledDates,
        onChange,
        onRangeChange,
        showTime,
      ]
    );

    // Navigation handlers
    const handlePreviousMonth = useCallback(() => {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() - 1);
        return newDate;
      });
    }, []);

    const handleNextMonth = useCallback(() => {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + 1);
        return newDate;
      });
    }, []);

    // TODO: Implement year navigation for year picker view
    // const handlePreviousYear = useCallback(() => {
    //   setCurrentMonth((prev) => {
    //     const newDate = new Date(prev);
    //     newDate.setFullYear(prev.getFullYear() - 1);
    //     return newDate;
    //   });
    // }, []);

    // const handleNextYear = useCallback(() => {
    //   setCurrentMonth((prev) => {
    //     const newDate = new Date(prev);
    //     newDate.setFullYear(prev.getFullYear() + 1);
    //     return newDate;
    //   });
    // }, []);

    // Clear selection
    const handleClear = useCallback(() => {
      if (mode === "single") {
        setSelectedDate(null);
        onChange?.(null);
      } else {
        setSelectedRange({ start: null, end: null });
        onRangeChange?.({ start: null, end: null });
      }
    }, [mode, onChange, onRangeChange]);

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
          return;
        }

        const currentFocus = focusedDate || selectedDate || new Date();

        switch (e.key) {
          case "Escape":
            e.preventDefault();
            setIsOpen(false);
            inputRef.current?.focus();
            break;
          case "ArrowLeft":
            e.preventDefault();
            setFocusedDate(
              new Date(currentFocus.getTime() - 24 * 60 * 60 * 1000)
            );
            break;
          case "ArrowRight":
            e.preventDefault();
            setFocusedDate(
              new Date(currentFocus.getTime() + 24 * 60 * 60 * 1000)
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setFocusedDate(
              new Date(currentFocus.getTime() - 7 * 24 * 60 * 60 * 1000)
            );
            break;
          case "ArrowDown":
            e.preventDefault();
            setFocusedDate(
              new Date(currentFocus.getTime() + 7 * 24 * 60 * 60 * 1000)
            );
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if (focusedDate) {
              handleDateSelect(focusedDate);
            }
            break;
        }
      },
      [isOpen, focusedDate, selectedDate, handleDateSelect]
    );

    // Format display value
    const displayValue = useMemo(() => {
      if (mode === "single") {
        return selectedDate ? formatDate(selectedDate, format, locale) : "";
      } else {
        if (selectedRange.start && selectedRange.end) {
          return `${formatDate(
            selectedRange.start,
            format,
            locale
          )} - ${formatDate(selectedRange.end, format, locale)}`;
        } else if (selectedRange.start) {
          return formatDate(selectedRange.start, format, locale);
        }
        return "";
      }
    }, [mode, selectedDate, selectedRange, format, locale]);

    // Get month/year display
    const monthYearDisplay = useMemo(() => {
      const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
      return `${monthFormatter.format(
        currentMonth
      )} ${currentMonth.getFullYear()}`;
    }, [currentMonth, locale]);

    // Get weekday names
    const weekdayNames = useMemo(() => {
      const baseDate = new Date(2021, 0, 3); // A Sunday
      const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const names: string[] = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(baseDate);
        day.setDate(baseDate.getDate() + ((i + firstDayOfWeek) % 7));
        names.push(formatter.format(day));
      }

      return names;
    }, [locale, firstDayOfWeek]);

    const inputClasses = [
      styles.datepicker__input,
      styles[`datepicker__input--${size}`],
      errorMessage && styles["datepicker__input--error"],
      disabled && styles["datepicker__input--disabled"],
    ]
      .filter(Boolean)
      .join(" ");

    const wrapperClasses = [
      styles.datepicker,
      styles[`datepicker--${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses} ref={containerRef}>
        {label && (
          <label className={styles.datepicker__label}>
            {label}
            {required && <span className={styles.datepicker__required}>*</span>}
          </label>
        )}

        <div className={styles.datepicker__inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            name={name}
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            readOnly
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={inputClasses}
            aria-label={ariaLabel || (label ? String(label) : "Select date")}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls="datepicker-calendar"
          />

          <div className={styles.datepicker__icons}>
            {showClearButton && displayValue && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className={styles.datepicker__clearButton}
                aria-label="Clear date"
              >
                <CloseIcon />
              </button>
            )}
            <span className={styles.datepicker__icon}>
              <CalendarIcon />
            </span>
          </div>
        </div>

        {helperText && !errorMessage && (
          <div className={styles.datepicker__helperText}>{helperText}</div>
        )}

        {errorMessage && (
          <div className={styles.datepicker__errorMessage} role="alert">
            {errorMessage}
          </div>
        )}

        {isOpen &&
          createPortal(
            <div
              id="datepicker-calendar"
              ref={calendarRef}
              className={styles.datepicker__calendar}
              role="dialog"
              aria-label="Choose date"
              data-placement={calendarPosition.placement}
              style={{
                position: "absolute",
                top: `${calendarPosition.top}px`,
                left: `${calendarPosition.left}px`,
                zIndex: 9999,
              }}
            >
              <div className={styles.datepicker__header}>
                <button
                  type="button"
                  onClick={handlePreviousMonth}
                  className={styles.datepicker__navButton}
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon />
                </button>

                <button
                  type="button"
                  onClick={() => setView(view === "days" ? "months" : "days")}
                  className={styles.datepicker__monthYear}
                >
                  {monthYearDisplay}
                </button>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className={styles.datepicker__navButton}
                  aria-label="Next month"
                >
                  <ChevronRightIcon />
                </button>
              </div>

              <div className={styles.datepicker__weekdays}>
                {weekdayNames.map((name, index) => (
                  <div key={index} className={styles.datepicker__weekday}>
                    {name}
                  </div>
                ))}
              </div>

              <div className={styles.datepicker__days}>
                {calendarDays.map((day, index) => {
                  if (!day) return <div key={index} />;

                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isSelected =
                    mode === "single"
                      ? selectedDate && isSameDay(day, selectedDate)
                      : false;
                  const isInRange =
                    mode === "range"
                      ? isDateInRange(
                          day,
                          selectedRange.start,
                          selectedRange.end
                        )
                      : false;
                  const isRangeStart =
                    mode === "range" && selectedRange.start
                      ? isSameDay(day, selectedRange.start)
                      : false;
                  const isRangeEnd =
                    mode === "range" && selectedRange.end
                      ? isSameDay(day, selectedRange.end)
                      : false;
                  const isToday = isSameDay(day, new Date());
                  const isDisabled = isDateDisabled(
                    day,
                    minDate,
                    maxDate,
                    disabledDates
                  );
                  const isFocused = focusedDate
                    ? isSameDay(day, focusedDate)
                    : false;

                  return (
                    <button
                      key={index}
                      type="button"
                      role="gridcell"
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={[
                        styles.datepicker__day,
                        !isCurrentMonth && styles["datepicker__day--outside"],
                        isSelected && styles["datepicker__day--selected"],
                        isInRange && styles["datepicker__day--in-range"],
                        isRangeStart && styles["datepicker__day--range-start"],
                        isRangeEnd && styles["datepicker__day--range-end"],
                        isToday && styles["datepicker__day--today"],
                        isDisabled && styles["datepicker__day--disabled"],
                        isFocused && styles["datepicker__day--focused"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-label={day.toLocaleDateString(locale, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      aria-selected={
                        isSelected || isRangeStart || isRangeEnd || isInRange
                      }
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);
