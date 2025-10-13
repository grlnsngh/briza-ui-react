import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import { createPortal } from "react-dom";
import styles from "./select.module.css";

export type SelectSize = "sm" | "md" | "lg";
export type SelectStatus = "default" | "error" | "success";

export interface SelectOption<T = unknown> {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  data?: T;
}

export interface SelectProps<T = unknown> {
  /**
   * Size of the select control
   * @default "md"
   */
  size?: SelectSize;
  /**
   * Visual status to communicate validation state
   * @default "default"
   */
  status?: SelectStatus;
  /**
   * Optional label element rendered above the select
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text rendered below the label
   */
  description?: React.ReactNode;
  /**
   * Helper text rendered below the select
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
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * Array of options to display
   */
  options: SelectOption<T>[];
  /**
   * Selected value(s) - single value or array for multi-select
   */
  value?: string | number | (string | number)[];
  /**
   * Default value(s) for uncontrolled component
   */
  defaultValue?: string | number | (string | number)[];
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number | (string | number)[]) => void;
  /**
   * Enable multi-select mode
   * @default false
   */
  isMulti?: boolean;
  /**
   * Enable search/filter functionality
   * @default false
   */
  isSearchable?: boolean;
  /**
   * Enable loading state for async data
   * @default false
   */
  isLoading?: boolean;
  /**
   * Custom render function for options
   */
  renderOption?: (
    option: SelectOption<T>,
    isSelected: boolean
  ) => React.ReactNode;
  /**
   * Custom render function for selected value display
   */
  renderValue?: (
    selectedOptions: SelectOption<T>[],
    placeholder?: string
  ) => React.ReactNode;
  /**
   * Filter function for searchable select
   */
  filterOption?: (option: SelectOption<T>, searchValue: string) => boolean;
  /**
   * Callback when search value changes
   */
  onSearchChange?: (searchValue: string) => void;
  /**
   * Custom no options message
   */
  noOptionsMessage?: React.ReactNode;
  /**
   * Custom loading message
   */
  loadingMessage?: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Maximum height of the dropdown
   */
  maxDropdownHeight?: number;
  /**
   * Close dropdown on selection (for multi-select)
   * @default false
   */
  closeOnSelect?: boolean;
}

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const CloseIcon = () => (
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
    className={styles.spinner}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="30"
      strokeDashoffset="30"
    />
  </svg>
);

function SelectComponent<T = unknown>(props: SelectProps<T>) {
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
    placeholder = "Select...",
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    isMulti = false,
    isSearchable = false,
    isLoading = false,
    renderOption,
    renderValue,
    filterOption,
    onSearchChange,
    noOptionsMessage = "No options available",
    loadingMessage = "Loading...",
    className = "",
    maxDropdownHeight = 300,
    closeOnSelect = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState<
    string | number | (string | number)[]
  >(defaultValue ?? (isMulti ? [] : ""));

  const controlRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectId = useId();
  const dropdownId = `${selectId}-dropdown`;
  const labelId = `${selectId}-label`;

  // Use controlled value if provided, otherwise use internal value
  const currentValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  // Convert currentValue to array for easier handling
  const selectedValues = useMemo(() => {
    if (isMulti) {
      return Array.isArray(currentValue) ? currentValue : [];
    }
    return currentValue !== "" && currentValue !== undefined
      ? [currentValue]
      : [];
  }, [currentValue, isMulti]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => selectedValues.includes(opt.value));
  }, [options, selectedValues]);

  // Default filter function
  const defaultFilterOption = useCallback(
    (option: SelectOption<T>, search: string) => {
      const labelStr =
        typeof option.label === "string" ? option.label : String(option.value);
      return labelStr.toLowerCase().includes(search.toLowerCase());
    },
    []
  );

  const filterFn = filterOption || defaultFilterOption;

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!isSearchable || !searchValue) {
      return options;
    }
    return options.filter((opt) => filterFn(opt, searchValue));
  }, [options, searchValue, isSearchable, filterFn]);

  // Handle value change
  const handleValueChange = useCallback(
    (newValue: string | number | (string | number)[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  // Handle option selection
  const handleSelectOption = useCallback(
    (optionValue: string | number) => {
      if (isMulti) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const newValue = currentArray.includes(optionValue)
          ? currentArray.filter((v) => v !== optionValue)
          : [...currentArray, optionValue];
        handleValueChange(newValue);

        if (closeOnSelect && newValue.length > 0) {
          setIsOpen(false);
        }
      } else {
        handleValueChange(optionValue);
        setIsOpen(false);
        setSearchValue("");
      }
    },
    [isMulti, currentValue, handleValueChange, closeOnSelect]
  );

  // Handle remove option (for multi-select)
  const handleRemoveOption = useCallback(
    (optionValue: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMulti && Array.isArray(currentValue)) {
        const newValue = currentValue.filter((v) => v !== optionValue);
        handleValueChange(newValue);
      }
    },
    [isMulti, currentValue, handleValueChange]
  );

  // Handle search change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setFocusedIndex(-1);
      onSearchChange?.(value);
    },
    [onSearchChange]
  );

  // Handle clear all (for multi-select)
  const handleClearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleValueChange(isMulti ? [] : "");
      setSearchValue("");
    },
    [isMulti, handleValueChange]
  );

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  }, [disabled]);

  // Close dropdown
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearchValue("");
    setFocusedIndex(-1);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          } else if (
            focusedIndex >= 0 &&
            focusedIndex < filteredOptions.length
          ) {
            e.preventDefault();
            const option = filteredOptions[focusedIndex];
            if (!option.disabled) {
              handleSelectOption(option.value);
            }
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) => {
              let next = prev + 1;
              while (
                next < filteredOptions.length &&
                filteredOptions[next].disabled
              ) {
                next++;
              }
              return next < filteredOptions.length ? next : prev;
            });
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) => {
              let next = prev - 1;
              while (next >= 0 && filteredOptions[next].disabled) {
                next--;
              }
              return next >= 0 ? next : -1;
            });
          }
          break;

        case "Escape":
          e.preventDefault();
          closeDropdown();
          controlRef.current?.focus();
          break;

        case "Tab":
          if (isOpen) {
            closeDropdown();
          }
          break;

        case "Home":
          if (isOpen) {
            e.preventDefault();
            setFocusedIndex(0);
          }
          break;

        case "End":
          if (isOpen) {
            e.preventDefault();
            setFocusedIndex(filteredOptions.length - 1);
          }
          break;

        default:
          break;
      }
    },
    [
      disabled,
      isOpen,
      focusedIndex,
      filteredOptions,
      handleSelectOption,
      closeDropdown,
    ]
  );

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        controlRef.current &&
        !controlRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, closeDropdown]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isSearchable]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  // Calculate dropdown position
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && controlRef.current) {
      const rect = controlRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Default render value
  const defaultRenderValue = useCallback(
    (selected: SelectOption<T>[], placeholderText?: string) => {
      if (selected.length === 0) {
        return <span className={styles.placeholder}>{placeholderText}</span>;
      }

      if (isMulti) {
        return (
          <div className={styles.multiValueContainer}>
            {selected.map((option) => (
              <span key={option.value} className={styles.multiValueTag}>
                <span className={styles.multiValueLabel}>{option.label}</span>
                {!disabled && (
                  <button
                    type="button"
                    className={styles.multiValueRemove}
                    onClick={(e) => handleRemoveOption(option.value, e)}
                    aria-label={`Remove ${option.label}`}
                  >
                    <CloseIcon />
                  </button>
                )}
              </span>
            ))}
          </div>
        );
      }

      return <span className={styles.singleValue}>{selected[0].label}</span>;
    },
    [isMulti, disabled, handleRemoveOption]
  );

  const renderValueFn = renderValue || defaultRenderValue;

  // Default render option
  const defaultRenderOption = useCallback(
    (option: SelectOption<T>, isSelected: boolean) => {
      return (
        <>
          {isMulti && (
            <span className={styles.optionCheckbox}>
              {isSelected && <CheckIcon />}
            </span>
          )}
          <span className={styles.optionLabel}>{option.label}</span>
          {!isMulti && isSelected && (
            <span className={styles.optionCheck}>
              <CheckIcon />
            </span>
          )}
        </>
      );
    },
    [isMulti]
  );

  const renderOptionFn = renderOption || defaultRenderOption;

  // Build class names
  const wrapperClasses = [styles.wrapper, styles[`wrapper--${size}`], className]
    .filter(Boolean)
    .join(" ");

  const controlClasses = [
    styles.control,
    styles[`control--${size}`],
    styles[`control--${status}`],
    isOpen && styles["control--open"],
    disabled && styles["control--disabled"],
  ]
    .filter(Boolean)
    .join(" ");

  const dropdownClasses = [styles.dropdown, styles[`dropdown--${size}`]]
    .filter(Boolean)
    .join(" ");

  // Render feedback message
  const feedbackMessage =
    status === "error"
      ? errorMessage
      : status === "success"
      ? successMessage
      : helperText;

  const feedbackClasses = [
    styles.feedback,
    status === "error" && styles["feedback--error"],
    status === "success" && styles["feedback--success"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} data-disabled={disabled}>
      {label && (
        <label className={styles.label} id={labelId}>
          {label}
          {required && <span className={styles.label__required}>*</span>}
        </label>
      )}
      {description && <div className={styles.description}>{description}</div>}

      <div
        ref={controlRef}
        className={controlClasses}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? placeholder || "Select" : undefined}
        aria-disabled={disabled}
        aria-required={required}
        aria-invalid={status === "error"}
      >
        <div className={styles.valueContainer}>
          {renderValueFn(selectedOptions, placeholder)}
        </div>

        <div className={styles.indicators}>
          {isLoading && (
            <div className={styles.indicator}>
              <LoadingSpinner />
            </div>
          )}
          {!disabled && selectedValues.length > 0 && !isLoading && (
            <button
              type="button"
              className={styles.clearIndicator}
              onClick={handleClearAll}
              aria-label="Clear selection"
            >
              <CloseIcon />
            </button>
          )}
          <div className={styles.separator} />
          <div className={styles.indicator}>
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      {feedbackMessage && (
        <div
          className={feedbackClasses}
          role={status === "error" ? "alert" : undefined}
        >
          {feedbackMessage}
        </div>
      )}

      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            className={dropdownClasses}
            id={dropdownId}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            aria-multiselectable={isMulti}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxHeight: `${maxDropdownHeight}px`,
            }}
          >
            {isSearchable && (
              <div className={styles.searchContainer}>
                <div className={styles.searchIcon}>
                  <SearchIcon />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  aria-label="Search options"
                />
              </div>
            )}

            <div className={styles.optionsList}>
              {isLoading ? (
                <div className={styles.message}>{loadingMessage}</div>
              ) : filteredOptions.length === 0 ? (
                <div className={styles.message}>{noOptionsMessage}</div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = selectedValues.includes(option.value);
                  const isFocused = index === focusedIndex;

                  const optionClasses = [
                    styles.option,
                    isSelected && styles["option--selected"],
                    isFocused && styles["option--focused"],
                    option.disabled && styles["option--disabled"],
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <div
                      key={option.value}
                      ref={(el) => {
                        optionRefs.current[index] = el;
                      }}
                      className={optionClasses}
                      role="option"
                      tabIndex={-1}
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      onClick={() => {
                        if (!option.disabled) {
                          handleSelectOption(option.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (!option.disabled) {
                            handleSelectOption(option.value);
                          }
                        }
                      }}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      {renderOptionFn(option, isSelected)}
                    </div>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

SelectComponent.displayName = "Select";

export const Select = React.memo(SelectComponent) as typeof SelectComponent;
