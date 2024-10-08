import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      text: {
        primary: string;
        secondary: string;
        alternative: string;
        white: string;
        black: string;
      };
      button: {
        text: string;
        primary: string;
        hover: string;
        active: string;
        disabled: string;
        shadow: {
          start: string;
          end: string;
        };
      };
      actionButton: {
        text: string;
        primary: string;
        hover: string;
        active: string;
        disabled: string;
      };
      connectButton: {
        primary: string;
        hover: string;
        text: string;
      };
      connectInfo: {
        primary: string;
        text: string;
      };
      alert: {
        warning: string;
        error: string;
      };
      modal: {
        primary: string;
        text: string;
      };
      tooltip: {
        primary: string;
        text: string;
      };
      box: {
        primary: string;
      };
      // colors used as background colors
      primary: string;
      primaryShadow: string;
      secondary: string;
      alternative: string;
      color5: string;
      color5Shadow: {
        start: string;
        end: string;
      };
      color7Shadow1: string;
      color7Shadow2: string;
      color12: string;
      color13: string;
      color14: string;
      color15: string;
      color16: string;
      // put other specific colors like chart colors into its own group
    };
  }
}
