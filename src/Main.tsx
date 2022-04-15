import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { LoadingSpinner } from "components/LoadingSpinner";
import "config/i18n";

import { App } from "./App";

if (import.meta.env.VITE_APP_ENABLE_MOCKS === "true") {
  import("./mocks");
}

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
