import React from "react";

import { type IStorage, StorageContext } from "./StorageContext";

export function useStorage() {
  const context = React.useContext(StorageContext);

  if (context === undefined) {
    throw new Error("useStorage must be used within a StorageProvider");
  }

  return context as IStorage;
}
