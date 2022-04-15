import { describe, expect, it } from "vitest";

import { App } from "App";
import { render, screen, userEvent } from "utils";

describe("App", () => {
  it("render the App component", () => {
    render(<App />);

    expect(screen.getByText("Minimetis Dashboard")).toBeDefined();
    expect(screen.getByText("Toggle Theme")).toBeDefined();

    userEvent.click(screen.getByRole("button", { name: "Toggle Theme" }));
    expect(window.getComputedStyle(document.body).backgroundColor).toBe(
      "white"
    );
  });
});
