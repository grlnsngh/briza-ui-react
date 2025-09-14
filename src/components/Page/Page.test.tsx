import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Page } from "./Page";

describe("Page", () => {
  it("renders the page with header", () => {
    render(<Page />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
