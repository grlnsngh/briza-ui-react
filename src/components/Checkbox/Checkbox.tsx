import React, { useId } from "react";
import styles from "./checkbox.module.css";

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxStatus = "default" | "error" | "success";

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange" | "value"
>;

export interface CheckboxProps extends NativeInputProps {
  /**
   * Size of the checkbox control
   * @default "md"
   * @example
   * ```tsx
   * <Checkbox size="sm" label="Small" />
   * <Checkbox size="md" label="Medium" />
   * <Checkbox size="lg" label="Large" />
   * ```
   */
  size?: CheckboxSize;
  /**
   * Visual status to communicate validation state
   * @default "default"
   * @example
   * ```tsx
   * <Checkbox status="error" label="Accept terms" />
   * <Checkbox status="success" label="Verified" />
   * ```
   */
  status?: CheckboxStatus;
  /**
   * Label text or element rendered next to the checkbox
   * @example
   * ```tsx
   * <Checkbox label="Remember me" />
   * <Checkbox label={<span>I agree to <a href="#">terms</a></span>} />
   * ```
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text rendered below the label
   * @example
   * ```tsx
   * <Checkbox
   *   label="Email notifications"
   *   description="Receive updates about your account"
   * />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Helper text rendered below the checkbox
   * @example
   * ```tsx
   * <Checkbox
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
   * <Checkbox
   *   status="error"
   *   label="Accept terms"
   *   errorMessage="You must accept the terms"
   * />
   * ```
   */
  errorMessage?: React.ReactNode;
  /**
   * Success message shown when status is set to "success"
   * @example
   * ```tsx
   * <Checkbox
   *   status="success"
   *   label="Verified"
   *   successMessage="Email verified successfully"
   * />
   * ```
   */
  successMessage?: React.ReactNode;
  /**
   * Whether the checkbox is in an indeterminate state
   * @default false
   * @example
   * ```tsx
   * <Checkbox
   *   label="Select all"
   *   indeterminate={someChecked && !allChecked}
   * />
   * ```
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is checked (controlled mode)
   * @example
   * ```tsx
   * const [checked, setChecked] = useState(false);
   * <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
   * ```
   */
  checked?: boolean;
  /**
   * Default checked state (uncontrolled mode)
   * @example
   * ```tsx
   * <Checkbox defaultChecked label="Remember me" />
   * ```
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when the checkbox state changes
   * @example
   * ```tsx
   * <Checkbox
   *   label="Agree"
   *   onChange={(e) => console.log(e.target.checked)}
   * />
   * ```
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Class name applied to the outer wrapper element
   */
  wrapperClassName?: string;
  /**
   * Class name applied to the checkbox input element
   */
  inputClassName?: string;
  /**
   * Class name applied to the label element
   */
  labelClassName?: string;
  /**
   * Whether the checkbox is required
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
 * Checkbox Component
 *
 * A customizable checkbox input with support for labels, descriptions, validation states,
 * and indeterminate state. Can be used individually or as part of a CheckboxGroup.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Remember me" />
 *
 * // With description
 * <Checkbox
 *   label="Email notifications"
 *   description="Receive updates about your account"
 * />
 *
 * // Controlled with validation
 * <Checkbox
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 *   status="error"
 *   errorMessage="You must agree to continue"
 * />
 *
 * // Indeterminate state
 * <Checkbox
 *   label="Select all"
 *   indeterminate={someChecked && !allChecked}
 *   onChange={handleSelectAll}
 * />
 * ```
 */
const CheckboxComponent = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      status = "default",
      label,
      description,
      helperText,
      errorMessage,
      successMessage,
      indeterminate = false,
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

    const checkboxRef = React.useRef<HTMLInputElement | null>(null);

    // Handle ref forwarding
    React.useImperativeHandle(ref, () => checkboxRef.current!);

    // Set indeterminate property on the DOM element
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

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
        <div className={styles.checkboxContainer}>
          <input
            ref={checkboxRef}
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-describedby={ariaDescribedBy}
            aria-invalid={status === "error"}
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

CheckboxComponent.displayName = "Checkbox";

export const Checkbox = React.memo(CheckboxComponent);

// ============================================
// CheckboxGroup Component
// ============================================

export interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /**
   * Label for the checkbox group
   * @example
   * ```tsx
   * <CheckboxGroup label="Select your interests" options={options} />
   * ```
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text for the group
   * @example
   * ```tsx
   * <CheckboxGroup
   *   label="Preferences"
   *   description="Choose all that apply"
   *   options={options}
   * />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Size applied to all checkboxes in the group
   * @default "md"
   */
  size?: CheckboxSize;
  /**
   * Status applied to all checkboxes in the group
   * @default "default"
   */
  status?: CheckboxStatus;
  /**
   * Array of checkbox options
   * @example
   * ```tsx
   * const options = [
   *   { value: 'react', label: 'React' },
   *   { value: 'vue', label: 'Vue', disabled: true },
   * ];
   * <CheckboxGroup options={options} />
   * ```
   */
  options: CheckboxGroupOption[];
  /**
   * Array of selected values (controlled mode)
   * @example
   * ```tsx
   * const [selected, setSelected] = useState(['react', 'vue']);
   * <CheckboxGroup value={selected} onChange={setSelected} options={options} />
   * ```
   */
  value?: string[];
  /**
   * Default selected values (uncontrolled mode)
   * @example
   * ```tsx
   * <CheckboxGroup defaultValue={['react']} options={options} />
   * ```
   */
  defaultValue?: string[];
  /**
   * Callback fired when any checkbox in the group changes
   * @example
   * ```tsx
   * <CheckboxGroup
   *   options={options}
   *   onChange={(values) => console.log('Selected:', values)}
   * />
   * ```
   */
  onChange?: (values: string[]) => void;
  /**
   * Whether all checkboxes in the group are disabled
   */
  disabled?: boolean;
  /**
   * Whether at least one checkbox must be selected
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
   * Name attribute for all checkboxes (for form submission)
   */
  name?: string;
  /**
   * Class name applied to the outer wrapper
   */
  className?: string;
  /**
   * Orientation of the checkbox group
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * CheckboxGroup Component
 *
 * Groups multiple checkboxes together with shared state management.
 * Supports controlled and uncontrolled modes with keyboard navigation.
 *
 * @example
 * ```tsx
 * const options = [
 *   { value: 'react', label: 'React' },
 *   { value: 'vue', label: 'Vue' },
 *   { value: 'angular', label: 'Angular' },
 * ];
 *
 * // Uncontrolled
 * <CheckboxGroup
 *   label="Select frameworks"
 *   options={options}
 *   defaultValue={['react']}
 * />
 *
 * // Controlled
 * const [values, setValues] = useState(['react']);
 * <CheckboxGroup
 *   label="Select frameworks"
 *   options={options}
 *   value={values}
 *   onChange={setValues}
 * />
 * ```
 */
const CheckboxGroupComponent = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(
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
      name,
      className,
      orientation = "vertical",
    },
    ref
  ) => {
    const groupId = useId();
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue || []
    );

    const isControlled = controlledValue !== undefined;
    const selectedValues = isControlled ? controlledValue : internalValue;

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      const newValues = checked
        ? [...selectedValues, optionValue]
        : selectedValues.filter((v) => v !== optionValue);

      if (!isControlled) {
        setInternalValue(newValues);
      }

      onChange?.(newValues);
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
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={ariaDescribedBy}
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
            <Checkbox
              key={option.value}
              size={size}
              status={status}
              label={option.label}
              description={option.description}
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={(e) =>
                handleCheckboxChange(option.value, e.target.checked)
              }
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

CheckboxGroupComponent.displayName = "CheckboxGroup";

export const CheckboxGroup = React.memo(CheckboxGroupComponent);
