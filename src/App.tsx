import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AccountChainIdListener } from "components";
import { Dashboard } from "pages/Dashboard";
import { Trade } from "pages/Trade";
import { NotFound } from "pages/NotFound";
import { Theme } from "theme";
import { queryClient } from "queryClient";

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
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Theme>
);
