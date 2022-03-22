import { describe, expect, it } from "vitest";
import { customRender, screen, userEvent } from "utils";

import { Header } from "./Header";

describe("App", () => {
  it("customRender the App component", () => {
    customRender(<Header />);

    expect(screen.getByText("Minimetis Dashboard")).toBeDefined();
    expect(screen.getByText("Toggle Theme")).toBeDefined();

    userEvent.click(screen.getByRole("button", { name: "Toggle Theme" }));
    expect(window.getComputedStyle(document.body).backgroundColor).toBe(
      "white"
    );
  });
});
