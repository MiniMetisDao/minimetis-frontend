import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "utils";

import { App } from "App";

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
