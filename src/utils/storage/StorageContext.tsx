import React from "react";

import { type Keys, get, set } from "./storage";

export interface IStorage {
  set: <TValue>(key: Keys, value: TValue) => void;
  get: <TValue>(key: Keys, defaultValue?: TValue) => TValue | undefined;
}

interface IProps {
  children: React.ReactNode;
}

export const StorageContext = React.createContext<IStorage | null>(null);

export const StorageProvider: React.FunctionComponent<IProps> = ({
  children,
}) => {
  const [, forceUpdate] = React.useReducer((prev) => prev + 1, 1);

  const value = {
    set: function <TValue>(key: Keys, value: TValue) {
      forceUpdate();
      set(key, value);
    },
    get,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
