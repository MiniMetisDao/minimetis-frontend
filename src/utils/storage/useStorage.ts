import React from "react";

import { type Keys, get, set } from "./storage";

export const useStorage = <T>(key: Keys, defaultValue: T) => {
  const [value, setValue] = React.useState(get(key, defaultValue));

  const setStorage = (value: T) => {
    set(key, value);
    setValue(value);
  };

  return [value, setStorage];
};
