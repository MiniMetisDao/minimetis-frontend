import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      text: {
        primary: string;
        secondary: string;
        alternative: string;
        color1: string;
      };
      button: {
        primary: string;
        hover: string;
        active: string;
        disabled: string;
      };
      // colors used as background colors
      primary: string;
      secondary: string;
      alternative: string;
      color1: string;
      color2: string;
      color3: string;
      color4: string;
      // put other specific colors like chart colors into its own group
    };
  }
}
