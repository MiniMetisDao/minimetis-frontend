import {
  Navigate,
  Outlet,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { AccountChainIdListener } from "components/shared/AccountChainIdListener";
import { AboutUsPage } from "pages/AboutUsPage";
import { ComingSoonPage } from "pages/ComingSoonPage";
import { DashboardPage } from "pages/DashboardPage";
import { HugsNotRugsPage } from "pages/HugsNotRugsPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { PoolPage } from "pages/PoolPage";
import { TradePage } from "pages/TradePage";
import { queryClient } from "queryClient";
import { Theme } from "theme";
import { StorageProvider } from "utils/storage";

import "react-toastify/dist/ReactToastify.min.css";

const location = new ReactLocation();

export const App: React.FC = () => (
  <Theme>
    <QueryClientProvider client={queryClient}>
      <AccountChainIdListener />
      <StorageProvider>
        <Router
          location={location}
          routes={[
            { path: "/", element: <AboutUsPage /> },
            {
              path: "trade",
              children: [
                {
                  path: "/",
                  element: <Navigate to="/trade/swap-tokens" />,
                },
                {
                  path: "swap-tokens",
                  element: <TradePage />,
                },

                { path: "*", element: <Navigate to="/trade/swap-tokens" /> },
              ],
            },
            { path: "pool", element: <PoolPage /> },
            { path: "stake", element: <ComingSoonPage /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "hugs-not-rugs", element: <HugsNotRugsPage /> },
            { path: "mint", element: <ComingSoonPage /> },
            { path: "*", element: <NotFoundPage /> },
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
      </StorageProvider>
    </QueryClientProvider>
  </Theme>
);
