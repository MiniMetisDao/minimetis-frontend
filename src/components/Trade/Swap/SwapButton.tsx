import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";

import { Button } from "components/Button";
import { ConnectButton } from "components/Connect";
import { useGetWalletDetails } from "queries";
import { useGetTokenAllowance } from "queries/trade/useGetTokenAllowance";
import { useTokenApproval } from "queries/trade/useTokenApproval";
import { Token } from "types/common";
import { getAmount } from "utils";

type SwapButtonProps = {
  hasInputError: boolean;
  inputToken: Token;
  slippageAdjustedInputAmount?: string;
};

export const SwapButton: React.FC<SwapButtonProps> = ({
  hasInputError,
  inputToken,
  slippageAdjustedInputAmount = "",
}) => {
  const { t } = useTranslation("trade");

  const { data: walletDetails } = useGetWalletDetails();
  const { mutate } = useTokenApproval({ tokenAddress: inputToken?.address });
  const { data: allowance } = useGetTokenAllowance({ token: inputToken });
  console.log("sand", hasInputError);

  const hasApproved =
    allowance && slippageAdjustedInputAmount
      ? BigNumber(allowance).isGreaterThanOrEqualTo(
          getAmount(slippageAdjustedInputAmount, inputToken.decimals)
        )
      : false;

  if (!hasInputError && !hasApproved) {
    return (
      <Button disabled={hasInputError} onClick={() => mutate()}>
        {t("Approve")}
      </Button>
    );
  }

  return walletDetails?.status === "CONNECTED" ? (
    <Button disabled={hasInputError}>{t("swap")}</Button>
  ) : (
    <ConnectButton />
  );
};
