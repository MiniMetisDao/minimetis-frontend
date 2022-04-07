import { css, Interpolation, Theme } from "@emotion/react";
import { useGetWalletDetails } from "queries";
import { connectWallet } from "utils";
import { styles } from "./styles";

export const ConnectWallet: React.FunctionComponent<{
  css?: Interpolation<Theme>;
}> = (props) => {
  const { isLoading, data, error, refetch } = useGetWalletDetails();

  const handleConnectWallet = async () => {
    if (data?.status === "CONNECTED") {
      return;
    }

    await connectWallet();
    refetch();
  };

  let text: string;

  // TODO: Revisit the loading case.
  if (isLoading || error || !data) {
    text = "Connect wallet";
  } else {
    text = data?.label;
  }

  return (
    <div css={styles}>
      <button
        css={css`
          outline: none;
          min-width: 70px;
        `}
        {...props}
        onClick={handleConnectWallet}
      >
        {text}
      </button>
    </div>
  );
};
