import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

import { AccountChainIdListener } from "components";
import { Dashboard } from "pages/Dashboard";
import { Trade } from "pages/Trade";
import { NotFound } from "pages/NotFound";
import { Theme } from "theme";
import { queryClient } from "queryClient";
import "react-toastify/dist/ReactToastify.css";

const location = new ReactLocation();

export const App: React.FC = () => (
  <Theme>
    <QueryClientProvider client={queryClient}>
      <AccountChainIdListener />
      <Router
        location={location}
        routes={[
          { path: "/", element: <Dashboard /> },
          { path: "trade", element: <Trade /> },
          { path: "*", element: <NotFound /> },
        ]}
      >
        <Outlet />
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Theme>
);
