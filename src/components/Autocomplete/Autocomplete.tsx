import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import { createPortal } from "react-dom";
import styles from "./autocomplete.module.css";

export type AutocompleteSize = "sm" | "md" | "lg";
export type AutocompleteStatus = "default" | "error" | "success";

export interface AutocompleteOption<T = unknown> {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  data?: T;
}

export interface AutocompleteProps<T = unknown> {
  /**
   * Size of the autocomplete control
   * @default "md"
   */
  size?: AutocompleteSize;
  /**
   * Visual status to communicate validation state
   * @default "default"
   */
  status?: AutocompleteStatus;
  /**
   * Optional label element rendered above the autocomplete
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text rendered below the label
   */
  description?: React.ReactNode;
  /**
   * Helper text rendered below the autocomplete
   */
  helperText?: React.ReactNode;
  /**
   * Error message shown when status is set to "error"
   */
  errorMessage?: React.ReactNode;
  /**
   * Success message shown when status is set to "success"
   */
  successMessage?: React.ReactNode;
  /**
   * Whether the autocomplete is disabled
   */
  disabled?: boolean;
  /**
   * Whether the autocomplete is required
   */
  required?: boolean;
  /**
   * Placeholder text when no value is entered
   */
  placeholder?: string;
  /**
   * Array of options to display (for static data)
   */
  options?: AutocompleteOption<T>[];
  /**
   * Selected value
   */
  value?: string | number;
  /**
   * Default value for uncontrolled component
   */
  defaultValue?: string | number;
  /**
   * Callback when selection changes
   */
  onChange?: (
    value: string | number | null,
    option: AutocompleteOption<T> | null
  ) => void;
  /**
   * Async function to fetch options based on search query
   */
  onSearch?: (query: string) => Promise<AutocompleteOption<T>[]>;
  /**
   * Callback when input value changes
   */
  onInputChange?: (value: string) => void;
  /**
   * Enable loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Debounce delay for search in milliseconds
   * @default 300
   */
  debounceDelay?: number;
  /**
   * Custom render function for options
   */
  renderOption?: (
    option: AutocompleteOption<T>,
    isSelected: boolean,
    isHighlighted: boolean
  ) => React.ReactNode;
  /**
   * Custom render function for selected value display
   */
  renderValue?: (
    selectedOption: AutocompleteOption<T> | null,
    inputValue: string
  ) => React.ReactNode;
  /**
   * Filter function for filtering options
   */
  filterOption?: (
    option: AutocompleteOption<T>,
    searchValue: string
  ) => boolean;
  /**
   * Custom no options message
   */
  noOptionsMessage?: React.ReactNode;
  /**
   * Custom loading message
   */
  loadingMessage?: React.ReactNode;
  /**
   * Custom error message for async errors
   */
  asyncErrorMessage?: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Maximum height of the dropdown
   */
  maxDropdownHeight?: number;
  /**
   * Minimum characters required before showing dropdown
   * @default 0
   */
  minSearchLength?: number;
  /**
   * Whether to show dropdown when input is focused (even if empty)
   * @default false
   */
  openOnFocus?: boolean;
  /**
   * Whether to clear input on selection
   * @default false
   */
  clearOnSelect?: boolean;
  /**
   * Whether to allow free text input (not just selection from options)
   * @default false
   */
  freeSolo?: boolean;
}

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClearIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={styles.spinner}
  >
    <path
      d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Default filter function
const defaultFilterOption = <T,>(
  option: AutocompleteOption<T>,
  searchValue: string
): boolean => {
  if (!searchValue) return true;
  const search = searchValue.toLowerCase();
  const label = String(option.label).toLowerCase();
  return label.includes(search);
};

export function Autocomplete<T = unknown>(props: AutocompleteProps<T>) {
  const {
    size = "md",
    status = "default",
    label,
    description,
    helperText,
    errorMessage,
    successMessage,
    disabled = false,
    required = false,
    placeholder = "Search...",
    options: staticOptions = [],
    value: controlledValue,
    defaultValue,
    onChange,
    onSearch,
    onInputChange,
    isLoading: externalLoading = false,
    debounceDelay = 300,
    renderOption,
    // renderValue, // Reserved for future use
    filterOption = defaultFilterOption,
    noOptionsMessage = "No options found",
    loadingMessage = "Loading...",
    asyncErrorMessage = "Error loading options",
    className,
    maxDropdownHeight = 300,
    minSearchLength = 0,
    openOnFocus = false,
    clearOnSelect = false,
    freeSolo = false,
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [internalValue, setInternalValue] = useState<string | number | null>(
    defaultValue ?? null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [asyncOptions, setAsyncOptions] = useState<AutocompleteOption<T>[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [asyncError, setAsyncError] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const [portalTheme, setPortalTheme] = useState<string | undefined>(undefined);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSelectingRef = useRef(false);

  const uniqueId = useId();
  const inputId = `autocomplete-input-${uniqueId}`;
  const listboxId = `autocomplete-listbox-${uniqueId}`;
  // Keep portal aligned with active theme so dark mode styles apply when rendered outside the provider
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const updateThemeAttribute = () => {
      const currentTheme = root.getAttribute("data-theme") ?? undefined;
      setPortalTheme((prev) => (prev === currentTheme ? prev : currentTheme));
    };

    updateThemeAttribute();

    const observer = new MutationObserver(updateThemeAttribute);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const labelId = label ? `autocomplete-label-${uniqueId}` : undefined;
  const descriptionId = description
    ? `autocomplete-description-${uniqueId}`
    : undefined;
  const helperTextId = helperText
    ? `autocomplete-helper-${uniqueId}`
    : undefined;
  const errorMessageId = errorMessage
    ? `autocomplete-error-${uniqueId}`
    : undefined;
  const successMessageId = successMessage
    ? `autocomplete-success-${uniqueId}`
    : undefined;

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Determine loading state
  const isLoading = externalLoading || internalLoading;

  // Combine static and async options
  const allOptions = useMemo(() => {
    return onSearch ? asyncOptions : staticOptions;
  }, [onSearch, asyncOptions, staticOptions]);

  // Filter options based on input value
  const filteredOptions = useMemo(() => {
    if (!inputValue || onSearch) return allOptions;
    return allOptions.filter((option) => filterOption(option, inputValue));
  }, [allOptions, inputValue, filterOption, onSearch]);

  // Find selected option
  const selectedOption = useMemo(() => {
    return allOptions.find((opt) => opt.value === value) ?? null;
  }, [allOptions, value]);

  // Update input value when selected option changes (but only when not clearOnSelect and not during selection)
  useEffect(() => {
    if (
      selectedOption &&
      !clearOnSelect &&
      !isSelectingRef.current &&
      !isOpen
    ) {
      setInputValue(String(selectedOption.label));
    }
  }, [selectedOption, clearOnSelect, isOpen]);

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (!onSearch) return;

      debounceTimerRef.current = setTimeout(async () => {
        if (query.length < minSearchLength) {
          setAsyncOptions([]);
          return;
        }

        setInternalLoading(true);
        setAsyncError(false);

        try {
          const results = await onSearch(query);
          setAsyncOptions(results);
        } catch (error) {
          console.error("Autocomplete search error:", error);
          setAsyncError(true);
          setAsyncOptions([]);
        } finally {
          setInternalLoading(false);
        }
      }, debounceDelay);
    },
    [onSearch, debounceDelay, minSearchLength]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newValue = e.target.value;
      setInputValue(newValue);

      // Only open if minSearchLength is met or no requirement
      if (newValue.length >= minSearchLength) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }

      setHighlightedIndex(-1);

      if (onInputChange) {
        onInputChange(newValue);
      }

      if (onSearch) {
        debouncedSearch(newValue);
      }

      // If freeSolo and no option matches, clear value
      if (freeSolo && !isControlled) {
        setInternalValue(null);
      }
    },
    [
      onInputChange,
      onSearch,
      debouncedSearch,
      freeSolo,
      isControlled,
      disabled,
      minSearchLength,
    ]
  );

  // Handle option selection
  const handleSelectOption = useCallback(
    (option: AutocompleteOption<T>) => {
      if (option.disabled) return;

      isSelectingRef.current = true;
      const newValue = option.value;
      setInputValue(clearOnSelect ? "" : String(option.label));
      setIsOpen(false);
      setHighlightedIndex(-1);

      if (!isControlled) {
        setInternalValue(newValue);
      }

      if (onChange) {
        onChange(newValue, option);
      }

      inputRef.current?.focus();

      // Reset the flag after a short delay
      setTimeout(() => {
        isSelectingRef.current = false;
      }, 100);
    },
    [isControlled, onChange, clearOnSelect]
  );

  // Handle clear button
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setInputValue("");
      setIsOpen(false);
      setHighlightedIndex(-1);

      if (!isControlled) {
        setInternalValue(null);
      }

      if (onChange) {
        onChange(null, null);
      }

      if (onInputChange) {
        onInputChange("");
      }

      inputRef.current?.focus();
    },
    [isControlled, onChange, onInputChange]
  );

  // Calculate dropdown position
  const updateDropdownPosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            updateDropdownPosition();
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          }
          break;

        case "Enter":
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const option = filteredOptions[highlightedIndex];
            if (option && !option.disabled) {
              handleSelectOption(option);
            }
          } else if (freeSolo && inputValue) {
            // Allow free text submission
            setIsOpen(false);
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          if (selectedOption) {
            setInputValue(String(selectedOption.label));
          }
          break;

        case "Home":
          if (isOpen) {
            e.preventDefault();
            setHighlightedIndex(0);
          }
          break;

        case "End":
          if (isOpen) {
            e.preventDefault();
            setHighlightedIndex(filteredOptions.length - 1);
          }
          break;

        case "Tab":
          setIsOpen(false);
          break;
      }
    },
    [
      disabled,
      isOpen,
      highlightedIndex,
      filteredOptions,
      handleSelectOption,
      selectedOption,
      freeSolo,
      inputValue,
      updateDropdownPosition,
    ]
  );

  // Handle input focus
  const handleFocus = useCallback(() => {
    if (disabled) return;

    if (openOnFocus || inputValue.length >= minSearchLength) {
      setIsOpen(true);
      updateDropdownPosition();
    }

    if (onSearch && inputValue) {
      debouncedSearch(inputValue);
    }
  }, [
    disabled,
    openOnFocus,
    inputValue,
    minSearchLength,
    updateDropdownPosition,
    onSearch,
    debouncedSearch,
  ]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);

        // Restore selected value if not freeSolo
        if (selectedOption && !freeSolo) {
          setInputValue(String(selectedOption.label));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedOption, freeSolo]);

  // Update dropdown position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    updateDropdownPosition();

    const handleUpdate = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen, updateDropdownPosition]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [highlightedIndex]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Build aria-describedby
  const ariaDescribedBy = [
    descriptionId,
    helperTextId,
    status === "error" ? errorMessageId : undefined,
    status === "success" ? successMessageId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  // Render options
  const renderOptions = () => {
    if (isLoading) {
      return <div className={styles.dropdown__message}>{loadingMessage}</div>;
    }

    if (asyncError) {
      return (
        <div
          className={[
            styles.dropdown__message,
            styles["dropdown__message--error"],
          ].join(" ")}
        >
          {asyncErrorMessage}
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      return <div className={styles.dropdown__message}>{noOptionsMessage}</div>;
    }

    return filteredOptions.map((option, index) => {
      const isSelected = option.value === value;
      const isHighlighted = index === highlightedIndex;

      const optionClasses = [
        styles.dropdown__option,
        isSelected && styles["dropdown__option--selected"],
        isHighlighted && styles["dropdown__option--highlighted"],
        option.disabled && styles["dropdown__option--disabled"],
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <div
          key={option.value}
          ref={(el) => {
            optionRefs.current[index] = el;
          }}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled}
          tabIndex={-1}
          className={optionClasses}
          onClick={() => !option.disabled && handleSelectOption(option)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!option.disabled) {
                handleSelectOption(option);
              }
            }
          }}
          onMouseEnter={() => setHighlightedIndex(index)}
        >
          {renderOption ? (
            renderOption(option, isSelected, isHighlighted)
          ) : (
            <span className={styles.dropdown__option__label}>
              {option.label}
            </span>
          )}
        </div>
      );
    });
  };

  // Wrapper classes
  const wrapperClasses = [
    styles.wrapper,
    size === "sm" && styles["wrapper--sm"],
    size === "md" && styles["wrapper--md"],
    size === "lg" && styles["wrapper--lg"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Control classes
  const controlClasses = [
    styles.control,
    size === "sm" && styles["control--sm"],
    size === "md" && styles["control--md"],
    size === "lg" && styles["control--lg"],
    status === "error" && styles["control--error"],
    status === "success" && styles["control--success"],
    isOpen && styles["control--open"],
    disabled && styles["control--disabled"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={wrapperRef} className={wrapperClasses} data-disabled={disabled}>
      {label && (
        <label htmlFor={inputId} id={labelId} className={styles.label}>
          {label}
          {required && <span className={styles.label__required}>*</span>}
        </label>
      )}

      {description && (
        <div id={descriptionId} className={styles.description}>
          {description}
        </div>
      )}

      <div className={controlClasses}>
        <div className={styles.control__icon}>
          <SearchIcon />
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={
            highlightedIndex >= 0
              ? listboxId + "-option-" + highlightedIndex
              : undefined
          }
          aria-labelledby={labelId}
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={status === "error"}
          aria-required={required}
          aria-disabled={disabled}
          className={styles.control__input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />

        {isLoading && (
          <div className={styles.control__icon}>
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && inputValue && !disabled && (
          <button
            type="button"
            className={styles.control__clear}
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {helperText && status === "default" && (
        <div id={helperTextId} className={styles.helperText}>
          {helperText}
        </div>
      )}

      {status === "error" && errorMessage && (
        <div id={errorMessageId} className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}

      {status === "success" && successMessage && (
        <div id={successMessageId} className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            id={listboxId}
            role="listbox"
            className={styles.dropdown}
            data-theme={portalTheme}
            style={{
              position: "absolute",
              top: dropdownPosition.top + "px",
              left: dropdownPosition.left + "px",
              width: dropdownPosition.width + "px",
              maxHeight: maxDropdownHeight + "px",
            }}
          >
            {renderOptions()}
          </div>,
          document.body
        )}
    </div>
  );
}

Autocomplete.displayName = "Autocomplete";
