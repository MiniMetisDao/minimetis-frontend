import { AccountChainIdListener } from "components";
import { Dashboard } from "pages/Dashboard";

import { queryClient } from "queryClient";
import { QueryClientProvider } from "react-query";
import { Theme } from "theme";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { Trade } from "pages/Trade";
import { NotFound } from "pages/NotFound";
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
    </QueryClientProvider>
  </Theme>
);
