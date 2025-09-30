import React from "react";
import styles from "./input.module.css";
import { EyeIcon, EyeOffIcon } from "./icons";

export type InputSize = "sm" | "md" | "lg";
export type InputStatus = "default" | "error" | "success";

type NativeInputProps<TElement extends HTMLInputElement> = Omit<
  React.InputHTMLAttributes<TElement>,
  "size" | "value" | "defaultValue" | "onChange" | "prefix" | "suffix"
>;

export interface InputProps<
  TValue extends string | number = string,
  TElement extends HTMLInputElement = HTMLInputElement
> extends NativeInputProps<TElement> {
  /**
   * Size of the input control
   * @default "md"
   * @example
   * ```tsx
   * <Input size="sm" label="Small" />
   * <Input size="md" label="Medium" />
   * <Input size="lg" label="Large" />
   * ```
   */
  size?: InputSize;
  /**
   * Visual status to communicate validation state
   * @default "default"
   * @example
   * ```tsx
   * <Input status="error" errorMessage="Invalid email" />
   * <Input status="success" successMessage="Email verified" />
   * ```
   */
  status?: InputStatus;
  /**
   * Optional label element rendered above the input
   * @example
   * ```tsx
   * <Input label="Email Address" />
   * <Input label={<span>Username <strong>*</strong></span>} />
   * ```
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text rendered below the label
   * @example
   * ```tsx
   * <Input
   *   label="API Key"
   *   description="You can find this in your account settings"
   * />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Helper text rendered below the input
   * @example
   * ```tsx
   * <Input
   *   label="Password"
   *   helperText="Must be at least 8 characters"
   * />
   * ```
   */
  helperText?: React.ReactNode;
  /**
   * Error message shown when status is set to "error"
   * @example
   * ```tsx
   * <Input
   *   status="error"
   *   errorMessage="This field is required"
   * />
   * ```
   */
  errorMessage?: React.ReactNode;
  /**
   * Success message shown when status is set to "success"
   * @example
   * ```tsx
   * <Input
   *   status="success"
   *   successMessage="Username is available"
   * />
   * ```
   */
  successMessage?: React.ReactNode;
  /**
   * Content rendered before the input, typically an icon
   * @example
   * ```tsx
   * <Input
   *   prefix={<SearchIcon />}
   *   placeholder="Search..."
   * />
   * ```
   */
  prefix?: React.ReactNode;
  /**
   * Content rendered after the input, typically an icon
   * @example
   * ```tsx
   * <Input
   *   suffix={<CheckIcon />}
   *   placeholder="Enter code"
   * />
   * ```
   */
  suffix?: React.ReactNode;
  /**
   * Class name applied to the outer wrapper element
   * @example
   * ```tsx
   * <Input wrapperClassName="my-custom-wrapper" />
   * ```
   */
  wrapperClassName?: string;
  /**
   * Class name applied directly to the native input element
   * @example
   * ```tsx
   * <Input inputClassName="my-custom-input" />
   * ```
   */
  inputClassName?: string;
  /**
   * Whether the input is required. Falls back to the native `required` prop.
   * @example
   * ```tsx
   * <Input label="Email" isRequired />
   * ```
   */
  isRequired?: boolean;
  /**
   * Optional callback fired with the updated value on change
   * @example
   * ```tsx
   * <Input
   *   onValueChange={(value) => console.log('New value:', value)}
   * />
   * ```
   */
  onValueChange?: (value: TValue, event: React.ChangeEvent<TElement>) => void;
  /**
   * Custom parser to transform the raw string value before emitting
   * @example
   * ```tsx
   * // Parse as positive integer only
   * <Input<number>
   *   type="number"
   *   valueParser={(raw) => Math.max(0, parseInt(raw) || 0)}
   *   onValueChange={(num) => console.log(num)}
   * />
   * ```
   */
  valueParser?: (
    rawValue: string,
    event: React.ChangeEvent<TElement>
  ) => TValue;
  /**
   * Controlled value for the input
   * @example
   * ```tsx
   * const [value, setValue] = useState('');
   * <Input value={value} onValueChange={setValue} />
   * ```
   */
  value?: TValue;
  /**
   * Default value for the input (uncontrolled usage)
   * @example
   * ```tsx
   * <Input defaultValue="Hello World" />
   * ```
   */
  defaultValue?: TValue;
  /**
   * Enable password visibility toggle when type is password
   * @default true
   * @example
   * ```tsx
   * <Input type="password" passwordToggle={false} />
   * ```
   */
  passwordToggle?: boolean;
  /**
   * Accessible labels for the password toggle button
   * @example
   * ```tsx
   * <Input
   *   type="password"
   *   passwordToggleLabels={{ show: "Reveal", hide: "Conceal" }}
   * />
   * ```
   */
  passwordToggleLabels?: {
    show: string;
    hide: string;
  };
  /**
   * Show character counter when maxLength is set
   * @default false
   * @example
   * ```tsx
   * <Input
   *   maxLength={280}
   *   showCharacterCount
   *   label="Tweet"
   * />
   * ```
   */
  showCharacterCount?: boolean;
  /**
   * Custom formatter for character count display
   * @default (current, max) => `${current}/${max}`
   * @example
   * ```tsx
   * <Input
   *   maxLength={100}
   *   showCharacterCount
   *   characterCountFormatter={(current, max) =>
   *     `${max - current} characters remaining`
   *   }
   * />
   * ```
   */
  characterCountFormatter?: (current: number, max?: number) => string;
  /**
   * Native change handler forwarded to the input element
   * @example
   * ```tsx
   * <Input
   *   onChange={(e) => console.log('Changed:', e.target.value)}
   * />
   * ```
   */
  onChange?: (event: React.ChangeEvent<TElement>) => void;
}

type InputComponent = <
  TValue extends string | number = string,
  TElement extends HTMLInputElement = HTMLInputElement
>(
  props: InputProps<TValue, TElement> & {
    ref?: React.Ref<TElement>;
  }
) => React.ReactElement | null;

function InputInner<
  TValue extends string | number = string,
  TElement extends HTMLInputElement = HTMLInputElement
>(
  props: InputProps<TValue, TElement>,
  forwardedRef: React.ForwardedRef<TElement>
) {
  const {
    id,
    label,
    description,
    helperText,
    errorMessage,
    successMessage,
    prefix,
    suffix,
    size = "md",
    status = "default",
    wrapperClassName,
    inputClassName,
    className,
    isRequired,
    onValueChange,
    valueParser,
    onChange,
    value,
    defaultValue,
    passwordToggle = true,
    passwordToggleLabels,
    type = "text",
    disabled,
    required,
    showCharacterCount = false,
    characterCountFormatter,
    maxLength,
    ...rest
  } = props;

  const generatedId = React.useId();
  const inputId = id ?? `briza-input-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId =
    status === "error" && errorMessage ? `${inputId}-error` : undefined;
  const successId =
    status === "success" && successMessage ? `${inputId}-success` : undefined;

  const describedBy =
    [descriptionId, helperId, errorId, successId].filter(Boolean).join(" ") ||
    undefined;

  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const isPasswordField = type === "password";
  const shouldShowPasswordToggle = isPasswordField && passwordToggle;

  React.useEffect(() => {
    if (!isPasswordField) {
      setPasswordVisible(false);
    }
  }, [isPasswordField]);

  const resolvedType =
    shouldShowPasswordToggle && isPasswordVisible ? "text" : type;

  const toggleLabels = React.useMemo(
    () => ({
      show: passwordToggleLabels?.show ?? "Show password",
      hide: passwordToggleLabels?.hide ?? "Hide password",
    }),
    [passwordToggleLabels]
  );

  const handleChange = (event: React.ChangeEvent<TElement>) => {
    if (onValueChange) {
      const rawValue = event.target.value;
      const parsedValue = valueParser
        ? valueParser(rawValue, event)
        : ((type === "number"
            ? event.target.valueAsNumber
            : rawValue) as unknown as TValue);

      onValueChange(parsedValue, event);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const combinedInputClassName = [
    styles.input,
    styles[`input--${size}`],
    status !== "default" && styles[`input--${status}`],
    (prefix || suffix || shouldShowPasswordToggle) && styles["input--adorned"],
    disabled && styles["input--disabled"],
    inputClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const controlClassName = [
    styles.control,
    styles[`control--${size}`],
    status !== "default" && styles[`control--${status}`],
    disabled && styles["control--disabled"],
    (prefix || suffix || shouldShowPasswordToggle) &&
      styles["control--adorned"],
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = [
    styles.wrapper,
    styles[`wrapper--${size}`],
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const isInputRequired = isRequired ?? required ?? false;

  const resolvedValue =
    value !== undefined ? (value as unknown as string | number) : undefined;
  const resolvedDefaultValue =
    value === undefined && defaultValue !== undefined
      ? (defaultValue as unknown as string | number)
      : undefined;

  // Character count logic
  const currentValue =
    resolvedValue !== undefined ? String(resolvedValue) : undefined;
  const shouldShowCharCount =
    showCharacterCount && maxLength !== undefined && maxLength > 0;
  const characterCount = currentValue?.length ?? 0;
  const isNearLimit = maxLength && characterCount / maxLength >= 0.8;
  const isAtLimit = maxLength && characterCount >= maxLength;

  const defaultCharCountFormatter = (current: number, max?: number) =>
    max ? `${current}/${max}` : `${current}`;

  const charCountText = shouldShowCharCount
    ? (characterCountFormatter ?? defaultCharCountFormatter)(
        characterCount,
        maxLength
      )
    : null;

  return (
    <div className={wrapperClasses} data-disabled={disabled || undefined}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {isInputRequired && (
            <span aria-hidden="true" className={styles["label__required"]}>
              *
            </span>
          )}
        </label>
      )}

      {description && (
        <div className={styles.description} id={descriptionId}>
          {description}
        </div>
      )}

      <div
        className={controlClassName}
        data-status={status}
        data-has-prefix={Boolean(prefix) || undefined}
        data-has-suffix={
          Boolean(suffix || shouldShowPasswordToggle) || undefined
        }
      >
        {prefix && (
          <span className={styles.prefix} aria-hidden="true">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          ref={forwardedRef}
          className={combinedInputClassName}
          type={resolvedType}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={status === "error" ? true : undefined}
          aria-required={isInputRequired || undefined}
          required={required}
          {...rest}
          value={resolvedValue}
          defaultValue={resolvedDefaultValue}
          maxLength={maxLength}
          onChange={handleChange}
        />

        {(suffix || shouldShowPasswordToggle) && (
          <span className={styles.suffix}>
            {suffix && (
              <span className={styles["suffix__content"]} aria-hidden="true">
                {suffix}
              </span>
            )}
            {shouldShowPasswordToggle && (
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setPasswordVisible((prev) => !prev)}
                aria-label={
                  isPasswordVisible ? toggleLabels.hide : toggleLabels.show
                }
                aria-pressed={isPasswordVisible}
                disabled={disabled}
                title={
                  isPasswordVisible ? toggleLabels.hide : toggleLabels.show
                }
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </span>
        )}
      </div>

      {helperText && (
        <p className={styles.helper} id={helperId}>
          {helperText}
        </p>
      )}

      {shouldShowCharCount && (
        <p
          className={`${styles["character-count"]} ${
            isAtLimit ? styles["character-count--limit"] : ""
          } ${isNearLimit ? styles["character-count--warning"] : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {charCountText}
        </p>
      )}

      {status === "error" && errorMessage && (
        <p className={styles["message--error"]} id={errorId} role="alert">
          {errorMessage}
        </p>
      )}

      {status === "success" && successMessage && (
        <p className={styles["message--success"]} id={successId} role="status">
          {successMessage}
        </p>
      )}
    </div>
  );
}

InputInner.displayName = "Input";

export const Input = React.forwardRef(InputInner) as InputComponent;
