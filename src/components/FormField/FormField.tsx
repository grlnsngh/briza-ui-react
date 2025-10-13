import React, { useId } from "react";
import styles from "./formfield.module.css";

export type FormFieldSize = "sm" | "md" | "lg";
export type FormFieldStatus = "default" | "error" | "success";

export interface FormFieldProps {
  /**
   * Size of the form field control
   * @default "md"
   * @example
   * ```tsx
   * <FormField size="sm" label="Small field" />
   * <FormField size="md" label="Medium field" />
   * <FormField size="lg" label="Large field" />
   * ```
   */
  size?: FormFieldSize;
  /**
   * Visual status to communicate validation state
   * @default "default"
   * @example
   * ```tsx
   * <FormField status="error" errorMessage="Invalid input" />
   * <FormField status="success" successMessage="Input validated" />
   * ```
   */
  status?: FormFieldStatus;
  /**
   * Label text or element rendered above the input field
   * @example
   * ```tsx
   * <FormField label="Email Address" />
   * <FormField label={<span>Username <strong>*</strong></span>} />
   * ```
   */
  label?: React.ReactNode;
  /**
   * Additional descriptive text rendered below the label
   * @example
   * ```tsx
   * <FormField
   *   label="API Key"
   *   description="You can find this in your account settings"
   * />
   * ```
   */
  description?: React.ReactNode;
  /**
   * Helper text rendered below the input field
   * @example
   * ```tsx
   * <FormField
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
   * <FormField
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
   * <FormField
   *   status="success"
   *   successMessage="Input is valid"
   * />
   * ```
   */
  successMessage?: React.ReactNode;
  /**
   * Whether the field is required. Displays asterisk indicator.
   * @default false
   * @example
   * ```tsx
   * <FormField label="Email" isRequired />
   * ```
   */
  isRequired?: boolean;
  /**
   * Whether the field is disabled
   * @default false
   * @example
   * ```tsx
   * <FormField label="Disabled field" disabled />
   * ```
   */
  disabled?: boolean;
  /**
   * The form control element to be wrapped (input, select, textarea, etc.)
   * @example
   * ```tsx
   * <FormField label="Email">
   *   <input type="email" />
   * </FormField>
   * ```
   */
  children: React.ReactNode;
  /**
   * Class name applied to the outer wrapper element
   * @example
   * ```tsx
   * <FormField wrapperClassName="my-custom-wrapper" />
   * ```
   */
  wrapperClassName?: string;
  /**
   * Class name applied to the content area
   * @example
   * ```tsx
   * <FormField contentClassName="my-custom-content" />
   * ```
   */
  contentClassName?: string;
  /**
   * Unique identifier for the form field. If not provided, one will be generated.
   * @example
   * ```tsx
   * <FormField id="email-field" label="Email" />
   * ```
   */
  id?: string;
  /**
   * Optional callback to receive ARIA IDs for manual association
   * Useful when you need more control over ARIA relationships
   * @example
   * ```tsx
   * <FormField
   *   label="Custom field"
   *   onAriaIdsChange={({ labelId, descriptionId, errorId, helperId }) => {
   *     console.log('ARIA IDs:', { labelId, descriptionId, errorId, helperId });
   *   }}
   * />
   * ```
   */
  onAriaIdsChange?: (ids: {
    labelId: string;
    descriptionId?: string;
    errorId?: string;
    successId?: string;
    helperId?: string;
    fieldId: string;
  }) => void;
}

const FormFieldComponent = React.forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(props, ref) {
    const {
      size = "md",
      status = "default",
      label,
      description,
      helperText,
      errorMessage,
      successMessage,
      isRequired = false,
      disabled = false,
      children,
      wrapperClassName,
      contentClassName,
      id: providedId,
      onAriaIdsChange,
    } = props;

    // Generate unique IDs for proper ARIA associations
    const generatedId = useId();
    const fieldId = providedId || generatedId;
    const labelId = `${fieldId}-label`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const helperId = helperText ? `${fieldId}-helper` : undefined;
    const errorId = errorMessage ? `${fieldId}-error` : undefined;
    const successId = successMessage ? `${fieldId}-success` : undefined;

    // Build the aria-describedby value
    const describedByIds = [
      descriptionId,
      helperId,
      status === "error" ? errorId : undefined,
      status === "success" ? successId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    // Notify parent of ARIA IDs if callback provided
    React.useEffect(() => {
      if (onAriaIdsChange) {
        onAriaIdsChange({
          labelId,
          descriptionId,
          errorId,
          successId,
          helperId,
          fieldId,
        });
      }
    }, [
      onAriaIdsChange,
      labelId,
      descriptionId,
      errorId,
      successId,
      helperId,
      fieldId,
    ]);

    // Clone children to inject ARIA attributes
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const childProps: Record<string, unknown> = {
          id: fieldId,
          "aria-labelledby": labelId,
        };

        if (describedByIds) {
          childProps["aria-describedby"] = describedByIds;
        }

        if (status === "error") {
          childProps["aria-invalid"] = true;
        }

        if (isRequired) {
          childProps["aria-required"] = true;
        }

        if (disabled) {
          childProps["disabled"] = true;
        }

        return React.cloneElement(child, childProps);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[`wrapper--${size}`]} ${
          wrapperClassName || ""
        }`}
        data-size={size}
        data-status={status}
        data-disabled={disabled}
      >
        {/* Label Section */}
        {label && (
          <label id={labelId} htmlFor={fieldId} className={styles.label}>
            {label}
            {isRequired && (
              <span className={styles.label__required} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Description Section */}
        {description && (
          <div id={descriptionId} className={styles.description}>
            {description}
          </div>
        )}

        {/* Form Control Section */}
        <div className={`${styles.content} ${contentClassName || ""}`}>
          {enhancedChildren}
        </div>

        {/* Helper Text Section */}
        {helperText && !errorMessage && !successMessage && (
          <div id={helperId} className={styles.helper}>
            {helperText}
          </div>
        )}

        {/* Error Message Section */}
        {status === "error" && errorMessage && (
          <div id={errorId} className={styles.error} role="alert">
            {errorMessage}
          </div>
        )}

        {/* Success Message Section */}
        {status === "success" && successMessage && (
          <div id={successId} className={styles.success} role="status">
            {successMessage}
          </div>
        )}
      </div>
    );
  }
);

FormFieldComponent.displayName = "FormField";

export const FormField = React.memo(FormFieldComponent);
