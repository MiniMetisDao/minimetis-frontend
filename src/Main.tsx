import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import "config/i18n";
import { LoadingSpinner } from "components/LoadingSpinner";

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
