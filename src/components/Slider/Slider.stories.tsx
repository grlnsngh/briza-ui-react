import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A versatile slider component supporting both single value and range (dual thumb) modes. Features keyboard navigation, custom styling, and proper ARIA implementation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the slider control",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment value",
    },
    value: {
      control: "number",
      description: "Current value (for single thumb mode)",
    },
    range: {
      control: "object",
      description: "Range values [min, max] (for dual thumb mode)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    showValue: {
      control: "boolean",
      description: "Whether to show value labels on thumbs",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the slider",
    },
    label: {
      control: "text",
      description: "Optional label element",
    },
    helperText: {
      control: "text",
      description: "Helper text rendered below the slider",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/**
 * Default slider with standard configuration
 */
export const Default: Story = {
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    defaultValue: 50,
    helperText: "Adjust the volume level",
  },
};

/**
 * Slider with value display
 */
export const WithValueDisplay: Story = {
  args: {
    label: "Brightness",
    min: 0,
    max: 100,
    defaultValue: 75,
    showValue: true,
    helperText: "Current brightness level is displayed",
  },
};

/**
 * Slider in range mode (dual thumb)
 */
export const RangeMode: Story = {
  args: {
    label: "Price Range",
    min: 0,
    max: 1000,
    defaultRange: [200, 800],
    showValue: true,
    helperText: "Select your price range",
  },
};

/**
 * Slider with custom step value
 */
export const WithStep: Story = {
  args: {
    label: "Temperature",
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 20,
    showValue: true,
    helperText: "Increments of 5 degrees",
    formatValue: (value) => `${value}°C`,
  },
};

/**
 * Small size slider
 */
export const SmallSize: Story = {
  args: {
    label: "Opacity",
    size: "sm",
    min: 0,
    max: 100,
    defaultValue: 80,
    showValue: true,
    formatValue: (value) => `${value}%`,
  },
};

/**
 * Large size slider
 */
export const LargeSize: Story = {
  args: {
    label: "Volume Control",
    size: "lg",
    min: 0,
    max: 100,
    defaultValue: 60,
    showValue: true,
  },
};

/**
 * Disabled slider
 */
export const Disabled: Story = {
  args: {
    label: "Locked Setting",
    min: 0,
    max: 100,
    defaultValue: 50,
    disabled: true,
    helperText: "This setting is currently locked",
  },
};

/**
 * Vertical orientation slider
 */
export const VerticalOrientation: Story = {
  args: {
    label: "Vertical Volume",
    orientation: "vertical",
    min: 0,
    max: 100,
    defaultValue: 70,
    showValue: true,
  },
};

/**
 * Vertical range slider
 */
export const VerticalRange: Story = {
  args: {
    label: "Vertical Range",
    orientation: "vertical",
    min: 0,
    max: 100,
    defaultRange: [30, 70],
    showValue: true,
  },
};

/**
 * Slider with custom value formatter
 */
export const CustomFormatter: Story = {
  args: {
    label: "Download Speed",
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: 250,
    showValue: true,
    formatValue: (value) => {
      if (value >= 1000) return `${(value / 1000).toFixed(1)} GB/s`;
      return `${value} MB/s`;
    },
    helperText: "Network download speed",
  },
};

/**
 * Slider with percentage display
 */
export const PercentageSlider: Story = {
  args: {
    label: "Progress",
    min: 0,
    max: 100,
    defaultValue: 45,
    showValue: true,
    formatValue: (value) => `${value}%`,
    helperText: "Task completion percentage",
  },
};

/**
 * Range slider with percentage
 */
export const PercentageRange: Story = {
  args: {
    label: "Target Range",
    min: 0,
    max: 100,
    defaultRange: [25, 75],
    showValue: true,
    formatValue: (value) => `${value}%`,
    helperText: "Acceptable range for metric",
  },
};

/**
 * Slider with large range
 */
export const LargeRange: Story = {
  args: {
    label: "Year Selection",
    min: 1900,
    max: 2025,
    step: 1,
    defaultValue: 2000,
    showValue: true,
    helperText: "Select a year",
  },
};

/**
 * Dual range slider with large range
 */
export const LargeRangeMode: Story = {
  args: {
    label: "Year Range",
    min: 1900,
    max: 2025,
    step: 5,
    defaultRange: [1950, 2000],
    showValue: true,
    helperText: "Select a year range",
  },
};

/**
 * Controlled slider example
 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);

    return (
      <div>
        <Slider
          {...args}
          value={value}
          onChange={setValue}
          label="Controlled Volume"
          showValue
          helperText={`Current value: ${value}`}
        />
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setValue(0)}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          >
            Mute
          </button>
          <button
            onClick={() => setValue(50)}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          >
            50%
          </button>
          <button
            onClick={() => setValue(100)}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Controlled range slider example
 */
export const ControlledRange: Story = {
  render: (args) => {
    const [range, setRange] = useState<[number, number]>([250, 750]);

    return (
      <div>
        <Slider
          {...args}
          range={range}
          onRangeChange={setRange}
          min={0}
          max={1000}
          step={10}
          label="Controlled Price Range"
          showValue
          formatValue={(value) => `$${value}`}
          helperText={`Selected range: $${range[0]} - $${range[1]}`}
        />
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setRange([0, 500])}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          >
            Budget
          </button>
          <button
            onClick={() => setRange([250, 750])}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          >
            Mid-Range
          </button>
          <button
            onClick={() => setRange([500, 1000])}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Premium
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Multiple sliders in a form
 */
export const InForm: Story = {
  render: () => {
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(75);
    const [range, setRange] = useState<[number, number]>([20, 80]);

    return (
      <form
        style={{ maxWidth: "600px", margin: "0 auto" }}
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            `Settings:\nVolume: ${volume}\nBrightness: ${brightness}\nRange: ${range[0]}-${range[1]}`
          );
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <Slider
            label="Volume"
            value={volume}
            onChange={setVolume}
            min={0}
            max={100}
            showValue
            formatValue={(v) => `${v}%`}
            helperText="System volume level"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <Slider
            label="Brightness"
            value={brightness}
            onChange={setBrightness}
            min={0}
            max={100}
            showValue
            formatValue={(v) => `${v}%`}
            helperText="Screen brightness level"
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <Slider
            label="Temperature Range"
            range={range}
            onRangeChange={setRange}
            min={0}
            max={100}
            step={5}
            showValue
            formatValue={(v) => `${v}°C`}
            helperText="Comfortable temperature range"
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </form>
    );
  },
};

/**
 * Playground for testing all features
 */
export const Playground: Story = {
  args: {
    label: "Slider Playground",
    helperText: "Test all features with the controls",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    size: "md",
    showValue: false,
    disabled: false,
    orientation: "horizontal",
  },
};
