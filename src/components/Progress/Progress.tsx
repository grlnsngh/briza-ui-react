import React from "react";
import styles from "./progress.module.css";

export type ProgressVariant = "linear" | "circular";

export type ProgressColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export type ProgressSize = "sm" | "md" | "lg";

/**
 * Props for the Progress component
 */
export interface ProgressProps {
  /**
   * The variant of the progress indicator
   * @default "linear"
   */
  variant?: ProgressVariant;
  /**
   * The color variant of the progress indicator
   * @default "primary"
   */
  color?: ProgressColor;
  /**
   * The size of the progress indicator
   * @default "md"
   */
  size?: ProgressSize;
  /**
   * The current progress value (0-100). If undefined, shows indeterminate state.
   */
  value?: number;
  /**
   * The maximum value
   * @default 100
   */
  maxValue?: number;
  /**
   * The minimum value
   * @default 0
   */
  minValue?: number;
  /**
   * Whether to show the value label
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Custom format function for the value label
   */
  formatValueLabel?: (value: number) => string;
  /**
   * Optional label for the progress indicator
   */
  label?: string;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Custom ARIA label (overrides default)
   */
  ariaLabel?: string;
  /**
   * Whether to disable animations
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Stripe pattern for linear progress
   * @default false
   */
  isStriped?: boolean;
  /**
   * Whether to animate stripes (only works with isStriped)
   * @default false
   */
  isAnimated?: boolean;
}

/**
 * Progress Component
 *
 * A versatile progress indicator with both linear and circular variants.
 * Supports determinate and indeterminate modes with customizable styling,
 * animations, and accessibility features.
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(props, ref) {
    const {
      variant = "linear",
      color = "primary",
      size = "md",
      value,
      maxValue = 100,
      minValue = 0,
      showValueLabel = false,
      formatValueLabel,
      label,
      className,
      ariaLabel,
      disableAnimation = false,
      isStriped = false,
      isAnimated = false,
    } = props;

    // Calculate percentage (0-100)
    const isDeterminate = value !== undefined;
    const percentage = isDeterminate
      ? Math.min(
          100,
          Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100)
        )
      : 0;

    // Default aria label
    const defaultAriaLabel = isDeterminate
      ? Math.round(percentage) + "% complete"
      : "Loading in progress";

    // Format value label
    const formattedValue = formatValueLabel
      ? formatValueLabel(value!)
      : Math.round(percentage) + "%";

    // Container classes
    const containerClass = [
      styles.progressContainer,
      styles["progressContainer--" + variant],
      styles["progressContainer--" + size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Render linear progress
    const renderLinear = () => {
      const trackClass = [
        styles.progressTrack,
        styles["progressTrack--" + size],
      ]
        .filter(Boolean)
        .join(" ");

      const barClass = [
        styles.progressBar,
        styles["progressBar--" + color],
        styles["progressBar--" + size],
        !isDeterminate && styles["progressBar--indeterminate"],
        isStriped && styles["progressBar--striped"],
        isAnimated && isStriped && styles["progressBar--animated"],
        disableAnimation && styles["progressBar--no-animation"],
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <div className={trackClass}>
          <div
            className={barClass}
            style={isDeterminate ? { width: percentage + "%" } : undefined}
            role="progressbar"
            aria-valuenow={isDeterminate ? value : undefined}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-label={ariaLabel || defaultAriaLabel}
          />
        </div>
      );
    };

    // Render circular progress
    const renderCircular = () => {
      // SVG properties based on size
      const sizeMap = {
        sm: { radius: 16, strokeWidth: 3, size: 40 },
        md: { radius: 20, strokeWidth: 4, size: 50 },
        lg: { radius: 28, strokeWidth: 5, size: 70 },
      };

      const { radius, strokeWidth, size: svgSize } = sizeMap[size];
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = isDeterminate
        ? circumference - (percentage / 100) * circumference
        : 0;

      const circularClass = [
        styles.progressCircular,
        styles["progressCircular--" + size],
        !isDeterminate && styles["progressCircular--indeterminate"],
        disableAnimation && styles["progressCircular--no-animation"],
      ]
        .filter(Boolean)
        .join(" ");

      const circleClass = [
        styles.progressCircle,
        styles["progressCircle--" + color],
      ]
        .filter(Boolean)
        .join(" ");

      const viewBoxValue = "0 0 " + svgSize + " " + svgSize;

      return (
        <div className={circularClass}>
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={viewBoxValue}
            xmlns="http://www.w3.org/2000/svg"
            role="progressbar"
            aria-valuenow={isDeterminate ? value : undefined}
            aria-valuemin={minValue}
            aria-valuemax={maxValue}
            aria-label={ariaLabel || defaultAriaLabel}
          >
            {/* Background circle */}
            <circle
              className={styles.progressCircleBackground}
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              className={circleClass}
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={
                isDeterminate
                  ? { transform: "rotate(-90deg)", transformOrigin: "50% 50%" }
                  : undefined
              }
            />
          </svg>
          {showValueLabel && isDeterminate && (
            <span className={styles.progressValueLabel}>{formattedValue}</span>
          )}
        </div>
      );
    };

    return (
      <div ref={ref} className={containerClass}>
        {label && <span className={styles.progressLabel}>{label}</span>}
        {variant === "linear" ? renderLinear() : renderCircular()}
        {variant === "linear" && showValueLabel && isDeterminate && (
          <span className={styles.progressValueLabel}>{formattedValue}</span>
        )}
      </div>
    );
  }
);
