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
        color1: string;
      };
      button: {
        primary: string;
        hover: string;
        active: string;
        disabled: string;
        shadow: {
          start: string;
          end: string;
        };
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
      // colors used as background colors
      primary: string;
      secondary: string;
      alternative: string;
      color1: string;
      color2: string;
      color3: string;
      color4: string;
      color5: string;
      color5Shadow: {
        start: string;
        end: string;
      };
      color6: string;
      color7: string;
      color7Shadow1: string;
      color7Shadow2: string;
      color8: string;
      color9: string;
      color10: string;
      color11: string;
      color12: string;
      color13: string;
      color14: string;
      color15: string;
      color16: string;
      // put other specific colors like chart colors into its own group
    };
  }
}
