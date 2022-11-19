import { cx } from "@emotion/css";
import BigNumber from "bignumber.js";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button } from "components/shared/Button";
import { Modal } from "components/shared/Modal";
import { MINIME_CONTRACT_ADDRESS_V1 } from "config";
import {
  useGetUpgradeTokenAllowance,
  useGetWalletDetails,
  useUpgradeToken,
  useUpgradeTokenApproval,
} from "queries";
import { useMultiCallContract } from "utils";

import { modalStyles } from "./styles";

type TokenUpgradeModalProps = {
  onClose: () => void;
};

export const TokenUpgradeModal: React.FC<TokenUpgradeModalProps> = ({
  onClose,
}) => {
  const { t } = useTranslation("dashboard");

  const { data: allowance } = useGetUpgradeTokenAllowance();
  const { data: walletDetails } = useGetWalletDetails();

  const { data: userBalance } = useMultiCallContract<string>(
    "userBalance",
    {
      address: MINIME_CONTRACT_ADDRESS_V1,
      method: "balanceOf",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      params: [walletDetails?.address!],
    },
    { enabled: Boolean(walletDetails?.address) }
  );

  const hasApproved =
    allowance &&
    (userBalance
      ? BigNumber(allowance).isGreaterThanOrEqualTo(userBalance)
      : false);

  const { mutate, isLoading, isSuccess } = useUpgradeToken({
    onTransactionStart: ({ shortHash, explorerUrl }) => {
      toast.loading(
        <Trans
          i18nKey="transactionPending"
          values={{ txHash: shortHash }}
          components={{
            a: <a target="_blank" href={explorerUrl} />,
          }}
        />,
        {
          toastId: "tokenUpgrade",
          closeButton: true,
        }
      );
    },
    onTransactionSuccess: ({ shortHash, explorerUrl }) => {
      toast.update("tokenUpgrade", {
        render: (
          <Trans
            i18nKey="transactionSuccess"
            values={{ txHash: shortHash }}
            components={{
              a: <a target="_blank" href={explorerUrl} />,
            }}
          />
        ),
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 6000,
      });
    },
    onError: (error) => {
      if (error?.code === 4001) {
        toast.error(t("transactionCancelled"));
      } else if (error?.code === 0) {
        //TODO: need better error handling
        toast.error(t("transactionError"));
      } else {
        toast.update("tokenUpgrade", {
          render: t("transactionError"),
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 6000,
        });
      }
    },
  });

  const { mutate: approvalMutate, isLoading: isApprovalLoading } =
    useUpgradeTokenApproval({
      onTransactionStart: ({ shortHash, explorerUrl }) => {
        toast.loading(
          <Trans
            i18nKey="transactionPending"
            values={{ txHash: shortHash }}
            components={{
              a: <a target="_blank" href={explorerUrl} />,
            }}
          />,
          {
            toastId: "tokenUpgradeApproval",
            closeButton: true,
          }
        );
      },
      onTransactionSuccess: ({ shortHash, explorerUrl }) => {
        toast.update("tokenUpgradeApproval", {
          render: (
            <Trans
              i18nKey="transactionSuccess"
              values={{ txHash: shortHash }}
              components={{
                a: <a target="_blank" href={explorerUrl} />,
              }}
            />
          ),
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 6000,
        });
      },
      onError: (error) => {
        if (error?.code === 4001) {
          toast.error(t("transactionCancelled"));
        } else {
          toast.update("tokenUpgradeApproval", {
            render: t("transactionError"),
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 6000,
          });
        }
      },
    });

  return (
    <Modal onClose={onClose} title={t("miniMetisUpgradeTitle")}>
      <div css={modalStyles}>
        {/* <h4>{t("stepsToUpgrade")}</h4>
        <Trans
          i18nKey="dashboard:upgradeSteps"
          components={{
            a: <a target="_blank" href="https://t.me/MiniMetis" />,
            ol: <ol />,
            li: <li />,
          }}
        /> */}
        {/* <div className="button-group">
          <Button
            disabled={
              walletDetails?.status !== "CONNECTED" ||
              hasApproved === undefined ||
              hasApproved ||
              isApprovalLoading ||
              (userBalance ? BigNumber(userBalance).isEqualTo(0) : true)
            }
            onClick={() => approvalMutate()}
          >
            {hasApproved
              ? t("approved")
              : isApprovalLoading
              ? t("approving")
              : t("approve")}
          </Button>
          <Button
            disabled={
              walletDetails?.status !== "CONNECTED" ||
              hasApproved === undefined ||
              !hasApproved ||
              isLoading ||
              isSuccess ||
              (userBalance ? BigNumber(userBalance).isEqualTo(0) : true)
            }
            onClick={() => mutate()}
          >
            {isSuccess
              ? t("upgraded")
              : isLoading
              ? t("upgrading")
              : t("upgrade")}
          </Button>
        </div>
        <div className="steps">
          <div className={cx("step", { completed: hasApproved === true })}>
            <span>1</span>
          </div>
          <div className={cx("step", { completed: isSuccess })}>
            <span>2</span>
          </div>
        </div> */}
        <div className="upgrade-ended">
          <h4>
            Upgrade Event Ended. More updates on Community Telegram and Discord
          </h4>
        </div>
      </div>
    </Modal>
  );
};
