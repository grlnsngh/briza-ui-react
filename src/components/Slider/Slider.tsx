import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./slider.module.css";

export type SliderSize = "sm" | "md" | "lg";
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderProps {
  /**
   * Size of the slider control
   * @default "md"
   */
  size?: SliderSize;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step increment value
   * @default 1
   */
  step?: number;
  /**
   * Current value (for single thumb mode)
   */
  value?: number;
  /**
   * Default value (for single thumb mode, uncontrolled)
   * @default min
   */
  defaultValue?: number;
  /**
   * Range values [min, max] (for dual thumb mode)
   */
  range?: [number, number];
  /**
   * Default range values (for dual thumb mode, uncontrolled)
   */
  defaultRange?: [number, number];
  /**
   * Callback fired when value changes (single thumb mode)
   */
  onChange?: (value: number) => void;
  /**
   * Callback fired when range changes (dual thumb mode)
   */
  onRangeChange?: (range: [number, number]) => void;
  /**
   * Optional label element
   */
  label?: React.ReactNode;
  /**
   * Helper text rendered below the slider
   */
  helperText?: React.ReactNode;
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show value labels on thumbs
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom value formatter function
   */
  formatValue?: (value: number) => string;
  /**
   * Orientation of the slider
   * @default "horizontal"
   */
  orientation?: SliderOrientation;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * ID for the label element
   */
  "aria-labelledby"?: string;
}

/**
 * Default value formatter
 */
const defaultFormatValue = (value: number): string => String(value);

/**
 * Clamp a value between min and max
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round value to nearest step
 */
const roundToStep = (value: number, step: number): number => {
  return Math.round(value / step) * step;
};

/**
 * Get percentage from value
 */
const getPercentage = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

/**
 * Get value from percentage
 */
const getValueFromPercentage = (
  percentage: number,
  min: number,
  max: number
): number => {
  return (percentage / 100) * (max - min) + min;
};

/**
 * Slider Component
 *
 * A versatile slider component supporting both single value and range (dual thumb) modes.
 * Features keyboard navigation, custom styling, and proper ARIA implementation.
 *
 * @example
 * ```tsx
 * // Single value slider
 * <Slider
 *   label="Volume"
 *   min={0}
 *   max={100}
 *   value={volume}
 *   onChange={setVolume}
 * />
 *
 * // Range slider
 * <Slider
 *   label="Price Range"
 *   min={0}
 *   max={1000}
 *   range={priceRange}
 *   onRangeChange={setPriceRange}
 * />
 * ```
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (props, ref) => {
    const {
      size = "md",
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = min,
      range: controlledRange,
      defaultRange,
      onChange,
      onRangeChange,
      label,
      helperText,
      disabled = false,
      showValue = false,
      formatValue = defaultFormatValue,
      orientation = "horizontal",
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    } = props;

    // Determine if we're in range mode
    const isRangeMode =
      controlledRange !== undefined || defaultRange !== undefined;

    // State for single value mode
    const [internalValue, setInternalValue] = useState<number>(
      controlledValue ?? defaultValue
    );

    // State for range mode
    const [internalRange, setInternalRange] = useState<[number, number]>(
      controlledRange ?? defaultRange ?? [min, min + (max - min) / 4]
    );

    // Use controlled or uncontrolled value
    const currentValue = controlledValue ?? internalValue;
    const currentRange = controlledRange ?? internalRange;

    // State for dragging
    const [isDragging, setIsDragging] = useState(false);
    const [activeThumb, setActiveThumb] = useState<
      "single" | "start" | "end" | null
    >(null);

    // Refs
    const trackRef = useRef<HTMLDivElement>(null);
    const startThumbRef = useRef<HTMLDivElement>(null);
    const endThumbRef = useRef<HTMLDivElement>(null);
    const singleThumbRef = useRef<HTMLDivElement>(null);

    // Generate IDs for accessibility
    const labelId = useId();
    const helperTextId = useId();
    const trackId = useId();

    /**
     * Calculate value from mouse/touch position
     */
    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number): number => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        let percentage: number;

        if (orientation === "horizontal") {
          percentage = ((clientX - rect.left) / rect.width) * 100;
        } else {
          percentage = ((rect.bottom - clientY) / rect.height) * 100;
        }

        percentage = clamp(percentage, 0, 100);
        const value = getValueFromPercentage(percentage, min, max);
        return roundToStep(clamp(value, min, max), step);
      },
      [min, max, step, orientation]
    );

    /**
     * Update value for single thumb mode
     */
    const updateSingleValue = useCallback(
      (newValue: number) => {
        const clampedValue = clamp(roundToStep(newValue, step), min, max);

        if (controlledValue === undefined) {
          setInternalValue(clampedValue);
        }

        onChange?.(clampedValue);
      },
      [controlledValue, min, max, step, onChange]
    );

    /**
     * Update range for dual thumb mode
     */
    const updateRange = useCallback(
      (newRange: [number, number]) => {
        const clampedRange: [number, number] = [
          clamp(roundToStep(newRange[0], step), min, max),
          clamp(roundToStep(newRange[1], step), min, max),
        ];

        // Ensure start <= end
        if (clampedRange[0] > clampedRange[1]) {
          [clampedRange[0], clampedRange[1]] = [
            clampedRange[1],
            clampedRange[0],
          ];
        }

        if (controlledRange === undefined) {
          setInternalRange(clampedRange);
        }

        onRangeChange?.(clampedRange);
      },
      [controlledRange, min, max, step, onRangeChange]
    );

    /**
     * Handle mouse/touch move
     */
    const handleMove = useCallback(
      (clientX: number, clientY: number) => {
        if (!isDragging || disabled) return;

        const newValue = getValueFromPosition(clientX, clientY);

        if (isRangeMode) {
          if (activeThumb === "start") {
            updateRange([newValue, currentRange[1]]);
          } else if (activeThumb === "end") {
            updateRange([currentRange[0], newValue]);
          }
        } else {
          updateSingleValue(newValue);
        }
      },
      [
        isDragging,
        disabled,
        isRangeMode,
        activeThumb,
        currentRange,
        getValueFromPosition,
        updateSingleValue,
        updateRange,
      ]
    );

    /**
     * Handle mouse down on track
     */
    const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();

      const newValue = getValueFromPosition(e.clientX, e.clientY);

      if (isRangeMode) {
        // Determine which thumb to move based on proximity
        const distanceToStart = Math.abs(newValue - currentRange[0]);
        const distanceToEnd = Math.abs(newValue - currentRange[1]);

        if (distanceToStart <= distanceToEnd) {
          setActiveThumb("start");
          updateRange([newValue, currentRange[1]]);
          startThumbRef.current?.focus();
        } else {
          setActiveThumb("end");
          updateRange([currentRange[0], newValue]);
          endThumbRef.current?.focus();
        }
      } else {
        setActiveThumb("single");
        updateSingleValue(newValue);
        singleThumbRef.current?.focus();
      }

      setIsDragging(true);
    };

    /**
     * Handle mouse down on thumb
     */
    const handleThumbMouseDown = (
      e: React.MouseEvent<HTMLDivElement>,
      thumb: "single" | "start" | "end"
    ) => {
      if (disabled) return;
      e.stopPropagation();
      setActiveThumb(thumb);
      setIsDragging(true);
    };

    /**
     * Handle keyboard navigation
     */
    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLDivElement>,
      thumb: "single" | "start" | "end"
    ) => {
      if (disabled) return;

      let increment = step;

      // Determine increment based on key
      switch (e.key) {
        case "ArrowUp":
        case "ArrowRight":
          e.preventDefault();
          break;
        case "ArrowDown":
        case "ArrowLeft":
          e.preventDefault();
          increment = -step;
          break;
        case "PageUp":
          e.preventDefault();
          increment = step * 10;
          break;
        case "PageDown":
          e.preventDefault();
          increment = -step * 10;
          break;
        case "Home":
          e.preventDefault();
          if (isRangeMode) {
            if (thumb === "start") {
              updateRange([min, currentRange[1]]);
            } else {
              updateRange([currentRange[0], min]);
            }
          } else {
            updateSingleValue(min);
          }
          return;
        case "End":
          e.preventDefault();
          if (isRangeMode) {
            if (thumb === "start") {
              updateRange([max, currentRange[1]]);
            } else {
              updateRange([currentRange[0], max]);
            }
          } else {
            updateSingleValue(max);
          }
          return;
        default:
          return;
      }

      // Apply increment
      if (isRangeMode) {
        if (thumb === "start") {
          updateRange([currentRange[0] + increment, currentRange[1]]);
        } else {
          updateRange([currentRange[0], currentRange[1] + increment]);
        }
      } else {
        updateSingleValue(currentValue + increment);
      }
    };

    /**
     * Handle mouse move (global)
     */
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        setActiveThumb(null);
      };

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [isDragging, handleMove]);

    /**
     * Handle touch move (global)
     */
    useEffect(() => {
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
        setActiveThumb(null);
      };

      if (isDragging) {
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
          document.removeEventListener("touchmove", handleTouchMove);
          document.removeEventListener("touchend", handleTouchEnd);
        };
      }
    }, [isDragging, handleMove]);

    // Calculate percentages for positioning
    const singlePercentage = getPercentage(currentValue, min, max);
    const startPercentage = getPercentage(currentRange[0], min, max);
    const endPercentage = getPercentage(currentRange[1], min, max);

    const wrapperClasses = [
      styles.wrapper,
      styles[`wrapper--${size}`],
      styles[`wrapper--${orientation}`],
      disabled && styles["wrapper--disabled"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const trackClasses = [styles.track, disabled && styles["track--disabled"]]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperClasses}>
        {label && (
          <label id={labelId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.container}>
          {/* Value display (start) */}
          {showValue && isRangeMode && (
            <div className={styles["value-display"]}>
              {formatValue(currentRange[0])}
            </div>
          )}

          {/* Slider track */}
          <div
            ref={trackRef}
            id={trackId}
            className={trackClasses}
            onMouseDown={handleTrackMouseDown}
            role="presentation"
            aria-labelledby={ariaLabelledBy || (label ? labelId : undefined)}
            aria-label={!ariaLabelledBy && !label ? ariaLabel : undefined}
          >
            {/* Progress fill */}
            <div
              className={styles["track-fill"]}
              style={
                isRangeMode
                  ? {
                      [orientation === "horizontal"
                        ? "left"
                        : "bottom"]: `${startPercentage}%`,
                      [orientation === "horizontal" ? "width" : "height"]: `${
                        endPercentage - startPercentage
                      }%`,
                    }
                  : {
                      [orientation === "horizontal"
                        ? "width"
                        : "height"]: `${singlePercentage}%`,
                    }
              }
            />

            {/* Single thumb */}
            {!isRangeMode && (
              <div
                ref={singleThumbRef}
                className={`${styles.thumb} ${
                  activeThumb === "single" ? styles["thumb--active"] : ""
                }`}
                style={{
                  [orientation === "horizontal"
                    ? "left"
                    : "bottom"]: `${singlePercentage}%`,
                }}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={currentValue}
                aria-valuetext={formatValue(currentValue)}
                aria-orientation={orientation}
                aria-disabled={disabled}
                aria-labelledby={
                  ariaLabelledBy || (label ? labelId : undefined)
                }
                aria-label={!ariaLabelledBy && !label ? ariaLabel : undefined}
                aria-describedby={helperText ? helperTextId : undefined}
                tabIndex={disabled ? -1 : 0}
                onMouseDown={(e) => handleThumbMouseDown(e, "single")}
                onKeyDown={(e) => handleKeyDown(e, "single")}
              >
                {showValue && (
                  <div className={styles["thumb-value"]}>
                    {formatValue(currentValue)}
                  </div>
                )}
              </div>
            )}

            {/* Range thumbs */}
            {isRangeMode && (
              <>
                {/* Start thumb */}
                <div
                  ref={startThumbRef}
                  className={`${styles.thumb} ${styles["thumb--start"]} ${
                    activeThumb === "start" ? styles["thumb--active"] : ""
                  }`}
                  style={{
                    [orientation === "horizontal"
                      ? "left"
                      : "bottom"]: `${startPercentage}%`,
                  }}
                  role="slider"
                  aria-valuemin={min}
                  aria-valuemax={max}
                  aria-valuenow={currentRange[0]}
                  aria-valuetext={`${formatValue(currentRange[0])} (start)`}
                  aria-orientation={orientation}
                  aria-disabled={disabled}
                  aria-labelledby={
                    ariaLabelledBy || (label ? labelId : undefined)
                  }
                  aria-label={!ariaLabelledBy && !label ? ariaLabel : undefined}
                  aria-describedby={helperText ? helperTextId : undefined}
                  tabIndex={disabled ? -1 : 0}
                  onMouseDown={(e) => handleThumbMouseDown(e, "start")}
                  onKeyDown={(e) => handleKeyDown(e, "start")}
                >
                  {showValue && (
                    <div className={styles["thumb-value"]}>
                      {formatValue(currentRange[0])}
                    </div>
                  )}
                </div>

                {/* End thumb */}
                <div
                  ref={endThumbRef}
                  className={`${styles.thumb} ${styles["thumb--end"]} ${
                    activeThumb === "end" ? styles["thumb--active"] : ""
                  }`}
                  style={{
                    [orientation === "horizontal"
                      ? "left"
                      : "bottom"]: `${endPercentage}%`,
                  }}
                  role="slider"
                  aria-valuemin={min}
                  aria-valuemax={max}
                  aria-valuenow={currentRange[1]}
                  aria-valuetext={`${formatValue(currentRange[1])} (end)`}
                  aria-orientation={orientation}
                  aria-disabled={disabled}
                  aria-labelledby={
                    ariaLabelledBy || (label ? labelId : undefined)
                  }
                  aria-label={!ariaLabelledBy && !label ? ariaLabel : undefined}
                  aria-describedby={helperText ? helperTextId : undefined}
                  tabIndex={disabled ? -1 : 0}
                  onMouseDown={(e) => handleThumbMouseDown(e, "end")}
                  onKeyDown={(e) => handleKeyDown(e, "end")}
                >
                  {showValue && (
                    <div className={styles["thumb-value"]}>
                      {formatValue(currentRange[1])}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Value display (end) */}
          {showValue && isRangeMode && (
            <div className={styles["value-display"]}>
              {formatValue(currentRange[1])}
            </div>
          )}
          {showValue && !isRangeMode && (
            <div className={styles["value-display"]}>
              {formatValue(currentValue)}
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <div id={helperTextId} className={styles["helper-text"]}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
