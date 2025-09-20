import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import type { ReactElement } from "react";

/**
 * Custom render function that includes accessibility testing
 */
export const renderWithA11y = async (ui: ReactElement) => {
  const renderResult = render(ui);
  const a11yResults = await axe(renderResult.container);

  return {
    ...renderResult,
    a11yResults,
  };
};

/**
 * Test accessibility violations for a rendered component
 */
export const expectNoA11yViolations = async (
  container: HTMLElement
): Promise<void> => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

/**
 * Test accessibility with custom rules
 */
export const expectNoA11yViolationsWithRules = async (
  container: HTMLElement,
  rules: Record<string, { enabled: boolean }>
): Promise<void> => {
  const results = await axe(container, {
    rules,
  });
  expect(results).toHaveNoViolations();
};

/**
 * Get accessibility violations without failing the test
 */
export const getA11yViolations = async (container: HTMLElement) => {
  return await axe(container);
};

/**
 * Setup function to extend expect with axe matchers
 */
export const setupA11yMatchers = () => {
  expect.extend(toHaveNoViolations);
};
