import { type Theme } from "@emotion/react";

export const darkTheme: Theme = {
  color: {
    text: {
      primary: "#ffffff",
      secondary: "#c39cf9",
      alternative: "#000000",
      white: "#ffffff",
      black: "#000000",
      color1: "#00dacc",
    },
    button: {
      primary: "#00dacc",
      hover: "#00dacbdc",
      active: "#00dacbdc",
      disabled: "#b991d1",
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
    primary: "#3b005f",
    secondary: "#58008e",
    alternative: "#00dacc",
    color1: "#4d007c",
    color2: "#8755cd",
    color3: "#8755cd",
    color4: "#58008e",
    color5: "#00DACC",
    color5Shadow: { start: "#00000026", end: "#0ec4a5" },
    color6: "#01A69B",
    color7: "#58008e",
    color7Shadow1: "#00000040",
    color7Shadow2: "#4e007e4d",
    color8: "#29D4C8",
  },
};

export const lightTheme: Theme = {
  color: {
    text: {
      primary: "#000000",
      secondary: "#8755cd",
      alternative: "#ffffff",
      white: "#ffffff",
      black: "#000000",
      color1: "#00dacc",
    },
    button: {
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
    primary: "#ffffff",
    secondary: "#7300b9",
    alternative: "#9600f1",
    color1: "#9500f1",
    color2: "#8755cd",
    color3: "#8755cd",
    color4: "#00a6da",
    color5: "#00DACC",
    color5Shadow: { start: "#00000026", end: "#0ec4a5" },
    color6: "#01A69B",
    color7: "#7300b9",
    color7Shadow1: "#00000040",
    color7Shadow2: "#4e007e4d",
    color8: "#29D4C8",
  },
};
