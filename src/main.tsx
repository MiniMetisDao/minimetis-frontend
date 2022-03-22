import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

if(import.meta.env.VITE_APP_ENABLE_MOCKS === 'true'){
  import('./mocks');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
