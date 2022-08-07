import { type Theme } from "@emotion/react";

export const darkTheme: Theme = {
  color: {
    text: {
      primary: "#ffffff",
      secondary: "#00DACC",
      alternative: "#443247",
      white: "#ffffff",
      black: "#000000",
    },
    button: {
      text: "#ffffff",
      primary: "#00dacc",
      hover: "#00dacbdc",
      active: "#00dacbdc",
      disabled: "#b991d1",
      shadow: { start: "#00000026", end: "#0ec4a5" },
    },
    connectButton: {
      primary: "#8755CD",
      hover: "#9f66ef",
      text: "#ffffff",
    },
    connectInfo: {
      primary: "#C8BED6",
      text: "#6C3DAD",
    },
    alert: {
      warning: "#ffc107",
      error: "#860000",
    },
    modal: {
      primary: "#111111",
      text: "#ffffff",
    },
    primary: "#180623",
    secondary: "#38134F",
    alternative: "#230C31",
    color5: "#00DACC",
    color5Shadow: { start: "#00000026", end: "#0ec4a5" },
    color7Shadow1: "#00000040",
    color7Shadow2: "#4e007e4d",
    color12: "#3B005F",
    color13: "#8755CD",
    color14: "#AE75FF",
    color15: "#B885FF",
    color16: "#008800",
  },
};

export const lightTheme: Theme = {
  color: {
    text: {
      primary: "#443247",
      secondary: "#04D8CC",
      alternative: "#ffffff",
      white: "#ffffff",
      black: "#000000",
    },
    button: {
      text: "#ffffff",
      primary: "#00dacc",
      hover: "#00dacbdc",
      active: "#00dacbdc",
      disabled: "#c8bed6",
      shadow: { start: "#00000026", end: "#0ec4a5" },
    },
    connectButton: {
      primary: "#8755cd",
      hover: "#9f66ef",
      text: "#ffffff",
    },
    connectInfo: {
      primary: "#C8BED6",
      text: "#6C3DAD",
    },
    alert: {
      warning: "#ffc107",
      error: "#860000",
    },
    modal: {
      primary: "#ffffff",
      text: "#111111",
    },
    primary: "#ffffff",
    secondary: "#04D8CC",
    alternative: "#B5FFF2",
    color5: "#00DACC",
    color5Shadow: { start: "#00000026", end: "#0ec4a5" },
    color7Shadow1: "#00000040",
    color7Shadow2: "#4e007e4d",
    color12: "#00A59A",
    color13: "#DCFFF9",
    color14: "#BCFBEB",
    color15: "#BFF1E9",
    color16: "#008800",
  },
};
