import { Header, AccountChainIdListener } from "components";

import { queryClient } from "queryClient";
import { QueryClientProvider } from "react-query";
import { Theme } from "theme";

export const App: React.FunctionComponent = () => (
  <Theme>
    <QueryClientProvider client={queryClient}>
      <AccountChainIdListener />
      <Header />
    </QueryClientProvider>
  </Theme>
);
