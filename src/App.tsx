import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

import { AccountChainIdListener } from "components";
import { AboutUsPage } from "pages/AboutUsPage";
import { ComingSoonPage } from "pages/ComingSoonPage";
import { DashboardPage } from "pages/DashboardPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { TradePage } from "pages/TradePage";
import { queryClient } from "queryClient";
import { Theme } from "theme";

import "react-toastify/dist/ReactToastify.css";

const location = new ReactLocation();

export const App: React.FC = () => (
  <Theme>
    <QueryClientProvider client={queryClient}>
      <AccountChainIdListener />
      <Router
        location={location}
        routes={[
          { path: "/", element: <DashboardPage /> },
          { path: "trade", element: <TradePage /> },
          { path: "stake", element: <ComingSoonPage /> },
          { path: "about-us", element: <AboutUsPage /> },
          { path: "hugs-not-rugs", element: <ComingSoonPage /> },
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Theme>
);
