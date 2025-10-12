import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Slider } from "./Slider";
import { expectNoA11yViolations } from "../../utils/test-helpers";

describe("Slider component", () => {
  describe("Rendering and Accessibility", () => {
    it("renders with label without accessibility violations", async () => {
      const { container } = render(
        <Slider label="Volume" min={0} max={100} defaultValue={50} />
      );

      expect(screen.getByText("Volume")).toBeInTheDocument();

      await expectNoA11yViolations(container);
    });

    it("renders with helper text", () => {
      render(
        <Slider
          label="Brightness"
          helperText="Adjust screen brightness"
          min={0}
          max={100}
          defaultValue={75}
        />
      );

      expect(screen.getByText("Adjust screen brightness")).toBeInTheDocument();
    });

    it("applies correct size classes", () => {
      const { container, rerender } = render(
        <Slider label="Small" size="sm" min={0} max={100} defaultValue={50} />
      );

      let wrapper = container.querySelector('[class*="wrapper"]');
      expect(wrapper?.className).toContain("wrapper--sm");

      rerender(
        <Slider label="Medium" size="md" min={0} max={100} defaultValue={50} />
      );

      wrapper = container.querySelector('[class*="wrapper"]');
      expect(wrapper?.className).toContain("wrapper--md");

      rerender(
        <Slider label="Large" size="lg" min={0} max={100} defaultValue={50} />
      );

      wrapper = container.querySelector('[class*="wrapper"]');
      expect(wrapper?.className).toContain("wrapper--lg");
    });

    it("applies disabled state correctly", () => {
      render(
        <Slider
          label="Disabled Slider"
          disabled
          min={0}
          max={100}
          defaultValue={50}
        />
      );

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-disabled", "true");
      expect(slider).toHaveAttribute("tabIndex", "-1");
    });

    it("has proper ARIA attributes for single mode", () => {
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          defaultValue={50}
          aria-label="Volume control"
        />
      );

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(slider).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("has proper ARIA attributes for range mode", () => {
      render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          defaultRange={[200, 800]}
        />
      );

      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);

      // Start thumb
      expect(sliders[0]).toHaveAttribute("aria-valuemin", "0");
      expect(sliders[0]).toHaveAttribute("aria-valuemax", "1000");
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "200");
      expect(sliders[0]).toHaveAttribute("aria-valuetext", "200 (start)");

      // End thumb
      expect(sliders[1]).toHaveAttribute("aria-valuemin", "0");
      expect(sliders[1]).toHaveAttribute("aria-valuemax", "1000");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "800");
      expect(sliders[1]).toHaveAttribute("aria-valuetext", "800 (end)");
    });

    it("applies vertical orientation correctly", () => {
      render(
        <Slider
          label="Vertical Volume"
          orientation="vertical"
          min={0}
          max={100}
          defaultValue={50}
        />
      );

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Single Value Mode", () => {
    it("allows changing value with controlled component", () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "50");

      rerender(
        <Slider
          label="Volume"
          min={0}
          max={100}
          value={75}
          onChange={onChange}
        />
      );

      expect(slider).toHaveAttribute("aria-valuenow", "75");
    });

    it("handles uncontrolled mode correctly", () => {
      render(<Slider label="Volume" min={0} max={100} defaultValue={30} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "30");
    });

    it("displays value when showValue is true", () => {
      const { container } = render(
        <Slider label="Volume" min={0} max={100} defaultValue={50} showValue />
      );

      // Value should be in the external display
      const valueDisplay = container.querySelector('[class*="value-display"]');
      expect(valueDisplay).toHaveTextContent("50");
    });

    it("uses custom value formatter", () => {
      const { container } = render(
        <Slider
          label="Temperature"
          min={0}
          max={100}
          defaultValue={25}
          showValue
          formatValue={(value) => `${value}°C`}
        />
      );

      const valueDisplay = container.querySelector('[class*="value-display"]');
      expect(valueDisplay).toHaveTextContent("25°C");
    });
  });

  describe("Range Mode", () => {
    it("renders two thumbs in range mode", () => {
      render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          defaultRange={[200, 800]}
        />
      );

      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("allows changing range with controlled component", () => {
      const onRangeChange = vi.fn();
      const { rerender } = render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          range={[200, 800]}
          onRangeChange={onRangeChange}
        />
      );

      const sliders = screen.getAllByRole("slider");
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "200");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "800");

      rerender(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          range={[300, 700]}
          onRangeChange={onRangeChange}
        />
      );

      expect(sliders[0]).toHaveAttribute("aria-valuenow", "300");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "700");
    });

    it("displays both range values when showValue is true", () => {
      const { container } = render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          defaultRange={[200, 800]}
          showValue
        />
      );

      const valueDisplays = container.querySelectorAll(
        '[class*="value-display"]'
      );
      expect(valueDisplays[0]).toHaveTextContent("200");
      expect(valueDisplays[1]).toHaveTextContent("800");
    });

    it("uses custom formatter for range values", () => {
      const { container } = render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          defaultRange={[200, 800]}
          showValue
          formatValue={(value) => `$${value}`}
        />
      );

      const valueDisplays = container.querySelectorAll(
        '[class*="value-display"]'
      );
      expect(valueDisplays[0]).toHaveTextContent("$200");
      expect(valueDisplays[1]).toHaveTextContent("$800");
    });
  });

  describe("Keyboard Navigation", () => {
    it("increases value with ArrowRight key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(51);
    });

    it("increases value with ArrowUp key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowUp" });

      expect(onChange).toHaveBeenCalledWith(51);
    });

    it("decreases value with ArrowLeft key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalledWith(49);
    });

    it("decreases value with ArrowDown key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowDown" });

      expect(onChange).toHaveBeenCalledWith(49);
    });

    it("jumps with PageUp key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "PageUp" });

      expect(onChange).toHaveBeenCalledWith(60);
    });

    it("jumps with PageDown key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "PageDown" });

      expect(onChange).toHaveBeenCalledWith(40);
    });

    it("jumps to min with Home key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "Home" });

      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("jumps to max with End key", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "End" });

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it("does not respond to keyboard when disabled", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          value={50}
          onChange={onChange}
          disabled
        />
      );

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "ArrowRight" });

      expect(onChange).not.toHaveBeenCalled();
    });

    it("handles keyboard navigation in range mode for start thumb", () => {
      const onRangeChange = vi.fn();
      render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          step={10}
          range={[200, 800]}
          onRangeChange={onRangeChange}
        />
      );

      const sliders = screen.getAllByRole("slider");
      const startThumb = sliders[0];

      startThumb.focus();
      fireEvent.keyDown(startThumb, { key: "ArrowRight" });

      expect(onRangeChange).toHaveBeenCalledWith([210, 800]);
    });

    it("handles keyboard navigation in range mode for end thumb", () => {
      const onRangeChange = vi.fn();
      render(
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          step={10}
          range={[200, 800]}
          onRangeChange={onRangeChange}
        />
      );

      const sliders = screen.getAllByRole("slider");
      const endThumb = sliders[1];

      endThumb.focus();
      fireEvent.keyDown(endThumb, { key: "ArrowLeft" });

      expect(onRangeChange).toHaveBeenCalledWith([200, 790]);
    });
  });

  describe("Step Configuration", () => {
    it("respects step value", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Temperature"
          min={0}
          max={100}
          step={5}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(55);
    });

    it("clamps value to min", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={0}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("clamps value to max", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          step={1}
          value={100}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(100);
    });
  });

  describe("Mouse Interactions", () => {
    it("can be focused", () => {
      render(<Slider label="Volume" min={0} max={100} defaultValue={50} />);

      const slider = screen.getByRole("slider");
      slider.focus();

      expect(slider).toHaveFocus();
    });

    it("responds to mousedown on thumb", () => {
      const onChange = vi.fn();
      render(
        <Slider
          label="Volume"
          min={0}
          max={100}
          value={50}
          onChange={onChange}
        />
      );

      const slider = screen.getByRole("slider");
      fireEvent.mouseDown(slider);

      // Should set active state
      expect(slider.className).toContain("thumb--active");
    });
  });

  describe("Accessibility - Advanced", () => {
    it("connects label with slider using aria-labelledby", () => {
      render(
        <Slider label="Volume Control" min={0} max={100} defaultValue={50} />
      );

      const slider = screen.getByRole("slider");
      const labelledBy = slider.getAttribute("aria-labelledby");

      expect(labelledBy).toBeTruthy();
      expect(labelledBy).not.toBeNull();

      if (labelledBy) {
        const label = document.getElementById(labelledBy);
        expect(label).not.toBeNull();
        expect(label).toHaveTextContent("Volume Control");
      }
    });

    it("connects helper text with slider using aria-describedby", () => {
      render(
        <Slider
          label="Volume"
          helperText="Adjust system volume"
          min={0}
          max={100}
          defaultValue={50}
        />
      );

      const slider = screen.getByRole("slider");
      const describedBy = slider.getAttribute("aria-describedby");

      expect(describedBy).toBeTruthy();

      if (describedBy) {
        const helperText = document.getElementById(describedBy);
        expect(helperText).toHaveTextContent("Adjust system volume");
      }
    });

    it("provides proper aria-label when no visible label", () => {
      render(
        <Slider
          aria-label="Volume slider"
          min={0}
          max={100}
          defaultValue={50}
        />
      );

      const slider = screen.getByRole("slider", { name: "Volume slider" });
      expect(slider).toBeInTheDocument();
    });
  });
});
