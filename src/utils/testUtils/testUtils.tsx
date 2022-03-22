import { Theme } from "theme";
import { render } from "@testing-library/react";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <Theme>{children}</Theme>,
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { render, customRender };
