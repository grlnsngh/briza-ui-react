import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the header with user name", () => {
    render(<Header user={{ name: "John" }} />);
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
