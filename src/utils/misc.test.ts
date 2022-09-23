import { describe, expect, it } from "vitest";

import { isValidNumber, isValidNumberInput } from "./misc";

describe("misc", () => {
  it("isValidNumberInput", () => {
    //empty
    expect(isValidNumberInput("")).toBe(true);

    // negative number cases
    expect(isValidNumberInput("-")).toBe(false);
    expect(isValidNumberInput("-1")).toBe(false);
    expect(isValidNumberInput("-1.0")).toBe(false);
    expect(isValidNumberInput("-0.1")).toBe(false);

    // positive number cases
    expect(isValidNumberInput("0")).toBe(true);
    expect(isValidNumberInput("1")).toBe(true);
    expect(isValidNumberInput("1.0")).toBe(true);
    expect(isValidNumberInput("40.00")).toBe(true);
    expect(isValidNumberInput(".")).toBe(true);
    expect(isValidNumberInput("1.")).toBe(true);
    expect(isValidNumberInput(".1")).toBe(true);
    expect(isValidNumberInput("00.1")).toBe(true);

    // falsy cases
    expect(isValidNumberInput("--1")).toBe(false);
    expect(isValidNumberInput("..0")).toBe(false);
    expect(isValidNumberInput("0.1.2")).toBe(false);
    expect(isValidNumberInput("test")).toBe(false);
    expect(isValidNumberInput("+1")).toBe(false);
    expect(isValidNumberInput("1-2")).toBe(false);
    expect(isValidNumberInput("1,200")).toBe(false);
  });

  it("isValidNumber", () => {
    //empty
    expect(isValidNumber("")).toBe(false);

    // negative number cases
    expect(isValidNumber("-")).toBe(false);
    expect(isValidNumber("-1")).toBe(false);
    expect(isValidNumber("-1.0")).toBe(false);
    expect(isValidNumber("-0.1")).toBe(false);

    // positive number cases
    expect(isValidNumber("0")).toBe(true);
    expect(isValidNumber("1")).toBe(true);
    expect(isValidNumber("1.0")).toBe(true);
    expect(isValidNumber("40.00")).toBe(true);
    expect(isValidNumber(".")).toBe(false);
    expect(isValidNumber("1.")).toBe(false);
    expect(isValidNumber(".1")).toBe(true);
    expect(isValidNumber("00.1")).toBe(true);

    // falsy cases
    expect(isValidNumber("--1")).toBe(false);
    expect(isValidNumber("..0")).toBe(false);
    expect(isValidNumber("0.1.2")).toBe(false);
    expect(isValidNumber("test")).toBe(false);
    expect(isValidNumber("+1")).toBe(false);
    expect(isValidNumber("1-2")).toBe(false);
    expect(isValidNumber("1,200")).toBe(false);
  });
});
