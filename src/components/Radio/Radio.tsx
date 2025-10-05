import React, { useId } from "react";
import styles from "./radio.module.css";

export type RadioSize = "sm" | "md" | "lg";
export type RadioStatus = "default" | "error" | "success";

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange"
>;

export interface RadioProps extends NativeInputProps {
  /**
   * Size of the radio control
   * @default "md"
   * @example
   * ```tsx
   * <Radio size="sm" label="Small" />
   * <Radio size="md" label="Medium" />
   * <Radio size="lg" label="Large" />
   * ```
   */
  size?: RadioSize;
  /**
   * Visual status to communicate validation state
   * @default "default"
   * @example
   * ```tsx
   * <Radio status="error" label="Option" />
   * <Radio status="success" label="Verified" />
   * ```
   */
  status?: RadioStatus;
  /**
   * Label text or element rendered next to the radio
   * @example
   * ```tsx
   * <Radio label="Remember me" />
   * <Radio label={<span>Option <strong>A</strong></span>} />
   * ```
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text rendered below the label
   * @example
   * ```tsx
   * <Radio
   *   label="Email notifications"
   *   description="Receive updates about your account"
   * />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Helper text rendered below the radio
   * @example
   * ```tsx
   * <Radio
   *   label="Subscribe"
   *   helperText="You can unsubscribe anytime"
   * />
   * ```
   */
  helperText?: React.ReactNode;
  /**
   * Error message shown when status is set to "error"
   * @example
   * ```tsx
   * <Radio
   *   status="error"
   *   label="Option"
   *   errorMessage="Please select an option"
   * />
   * ```
   */
  errorMessage?: React.ReactNode;
  /**
   * Success message shown when status is set to "success"
   * @example
   * ```tsx
   * <Radio
   *   status="success"
   *   label="Verified"
   *   successMessage="Selection confirmed"
   * />
   * ```
   */
  successMessage?: React.ReactNode;
  /**
   * Whether the radio is checked (controlled mode)
   * @example
   * ```tsx
   * const [value, setValue] = useState("option1");
   * <Radio checked={value === "option1"} onChange={() => setValue("option1")} />
   * ```
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled mode)
   * @example
   * ```tsx
   * <Radio defaultChecked label="Default option" />
   * ```
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when the radio state changes
   * @example
   * ```tsx
   * <Radio
   *   label="Option"
   *   onChange={(e) => console.log(e.target.value)}
   * />
   * ```
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Class name applied to the outer wrapper element
   */
  wrapperClassName?: string;
  /**
   * Class name applied to the radio input element
   */
  inputClassName?: string;
  /**
   * Class name applied to the label element
   */
  labelClassName?: string;
  /**
   * Whether the radio is required
   */
  required?: boolean;
  /**
   * Name attribute for form submission
   */
  name?: string;
  /**
   * Value attribute for form submission
   */
  value?: string;
}

/**
 * Radio Component
 *
 * A customizable radio button input with support for labels, descriptions, validation states.
 * Should be used within a RadioGroup for proper keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Radio label="Option 1" name="choice" value="1" />
 *
 * // With description
 * <Radio
 *   label="Premium Plan"
 *   description="Access to all features"
 *   name="plan"
 *   value="premium"
 * />
 *
 * // Controlled with validation
 * <Radio
 *   checked={selected === "option1"}
 *   onChange={() => setSelected("option1")}
 *   status="error"
 *   errorMessage="Please select an option"
 * />
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = "md",
      status = "default",
      label,
      description,
      helperText,
      errorMessage,
      successMessage,
      checked,
      defaultChecked,
      onChange,
      wrapperClassName,
      inputClassName,
      labelClassName,
      required,
      disabled,
      name,
      value,
      id: providedId,
      className,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = `${id}-description`;
    const helperTextId = `${id}-helper`;
    const errorId = `${id}-error`;
    const successId = `${id}-success`;

    const hasError = status === "error" && errorMessage;
    const hasSuccess = status === "success" && successMessage;
    const hasHelper = helperText && !hasError && !hasSuccess;

    const ariaDescribedBy =
      [
        description ? descriptionId : null,
        hasHelper ? helperTextId : null,
        hasError ? errorId : null,
        hasSuccess ? successId : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div
        className={`${styles.wrapper} ${
          disabled ? styles["wrapper--disabled"] : ""
        } ${wrapperClassName || ""}`}
      >
        <div className={styles.radioContainer}>
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-describedby={ariaDescribedBy}
            className={`${styles.input} ${styles[`input--${size}`]} ${
              styles[`input--${status}`]
            } ${inputClassName || ""} ${className || ""}`}
            {...rest}
          />
          {label && (
            <label
              htmlFor={id}
              className={`${styles.label} ${styles[`label--${size}`]} ${
                labelClassName || ""
              }`}
            >
              <span className={styles.labelText}>
                {label}
                {required && <span className={styles.required}>*</span>}
              </span>
              {description && (
                <span id={descriptionId} className={styles.description}>
                  {description}
                </span>
              )}
            </label>
          )}
        </div>

        {hasHelper && (
          <div id={helperTextId} className={styles.helperText}>
            {helperText}
          </div>
        )}

        {hasError && (
          <div id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </div>
        )}

        {hasSuccess && (
          <div id={successId} className={styles.successMessage} role="status">
            {successMessage}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

// ============================================
// RadioGroup Component
// ============================================

export interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /**
   * Label for the radio group
   * @example
   * ```tsx
   * <RadioGroup label="Select your plan" options={options} />
   * ```
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text for the group
   * @example
   * ```tsx
   * <RadioGroup
   *   label="Preferences"
   *   description="Choose one option"
   *   options={options}
   * />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Size applied to all radios in the group
   * @default "md"
   */
  size?: RadioSize;
  /**
   * Status applied to all radios in the group
   * @default "default"
   */
  status?: RadioStatus;
  /**
   * Array of radio options
   * @example
   * ```tsx
   * const options = [
   *   { value: 'basic', label: 'Basic Plan' },
   *   { value: 'pro', label: 'Pro Plan', disabled: true },
   * ];
   * <RadioGroup options={options} />
   * ```
   */
  options: RadioGroupOption[];
  /**
   * Selected value (controlled mode)
   * @example
   * ```tsx
   * const [selected, setSelected] = useState('basic');
   * <RadioGroup value={selected} onChange={setSelected} options={options} />
   * ```
   */
  value?: string;
  /**
   * Default selected value (uncontrolled mode)
   * @example
   * ```tsx
   * <RadioGroup defaultValue="basic" options={options} />
   * ```
   */
  defaultValue?: string;
  /**
   * Callback fired when any radio in the group changes
   * @example
   * ```tsx
   * <RadioGroup
   *   options={options}
   *   onChange={(value) => console.log('Selected:', value)}
   * />
   * ```
   */
  onChange?: (value: string) => void;
  /**
   * Whether all radios in the group are disabled
   */
  disabled?: boolean;
  /**
   * Whether one radio must be selected
   */
  required?: boolean;
  /**
   * Helper text for the group
   */
  helperText?: React.ReactNode;
  /**
   * Error message for the group
   */
  errorMessage?: React.ReactNode;
  /**
   * Success message for the group
   */
  successMessage?: React.ReactNode;
  /**
   * Name attribute for all radios (for form submission)
   */
  name?: string;
  /**
   * Class name applied to the outer wrapper
   */
  className?: string;
  /**
   * Orientation of the radio group
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * RadioGroup Component
 *
 * Groups multiple radio buttons together with shared state management and keyboard navigation.
 * Supports controlled and uncontrolled modes with arrow key navigation.
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: 'basic', label: 'Basic Plan' },
 *   { value: 'pro', label: 'Pro Plan' },
 *   { value: 'enterprise', label: 'Enterprise Plan' },
 * ];
 *
 * // Uncontrolled
 * <RadioGroup
 *   label="Select a plan"
 *   options={options}
 *   defaultValue="basic"
 * />
 *
 * // Controlled
 * const [value, setValue] = useState('basic');
 * <RadioGroup
 *   label="Select a plan"
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 * />
 * ```
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      description,
      size = "md",
      status = "default",
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      helperText,
      errorMessage,
      successMessage,
      name: providedName,
      className,
      orientation = "vertical",
    },
    ref
  ) => {
    const groupId = useId();
    const generatedName = useId();
    const name = providedName || generatedName;

    const [internalValue, setInternalValue] = React.useState<
      string | undefined
    >(defaultValue);

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;

    const handleRadioChange = (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
    };

    // Keyboard navigation with arrow keys
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = options.findIndex(
        (opt) => opt.value === selectedValue
      );
      let nextIndex = currentIndex;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= options.length) nextIndex = 0;

        // Skip disabled options
        while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
          nextIndex++;
          if (nextIndex >= options.length) nextIndex = 0;
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = options.length - 1;

        // Skip disabled options
        while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
          nextIndex--;
          if (nextIndex < 0) nextIndex = options.length - 1;
        }
      }

      if (nextIndex !== currentIndex && !options[nextIndex]?.disabled) {
        handleRadioChange(options[nextIndex].value);

        // Focus the new radio button
        const radioElement = document.querySelector(
          `input[name="${name}"][value="${options[nextIndex].value}"]`
        ) as HTMLInputElement;
        radioElement?.focus();
      }
    };

    const hasError = status === "error" && errorMessage;
    const hasSuccess = status === "success" && successMessage;
    const hasHelper = helperText && !hasError && !hasSuccess;

    const descriptionId = description ? `${groupId}-description` : undefined;
    const helperTextId = hasHelper ? `${groupId}-helper` : undefined;
    const errorId = hasError ? `${groupId}-error` : undefined;
    const successId = hasSuccess ? `${groupId}-success` : undefined;

    const ariaDescribedBy =
      [descriptionId, helperTextId, errorId, successId]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div
        ref={ref}
        className={`${styles.group} ${className || ""}`}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={ariaDescribedBy}
        aria-required={required ? "true" : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {label && (
          <div id={`${groupId}-label`} className={styles.groupLabel}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </div>
        )}

        {description && (
          <div id={descriptionId} className={styles.groupDescription}>
            {description}
          </div>
        )}

        <div
          className={`${styles.groupOptions} ${
            orientation === "horizontal"
              ? styles["groupOptions--horizontal"]
              : ""
          }`}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              size={size}
              status={status}
              label={option.label}
              description={option.description}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleRadioChange(option.value)}
              disabled={disabled || option.disabled}
            />
          ))}
        </div>

        {hasHelper && (
          <div id={helperTextId} className={styles.helperText}>
            {helperText}
          </div>
        )}

        {hasError && (
          <div id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </div>
        )}

        {hasSuccess && (
          <div id={successId} className={styles.successMessage} role="status">
            {successMessage}
          </div>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
