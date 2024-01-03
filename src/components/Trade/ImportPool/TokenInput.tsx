import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { AiOutlineEdit } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

import { DisplayPrice } from "components/shared/DisplayPrice";
import { IconButton } from "components/shared/IconButton";
import { Input } from "components/shared/Input";
import { Tooltip } from "components/shared/Tooltip";
import { APPROVAL_MAX_EDIT } from "config";
import { useGetTokenAllowance, useTokenApproval } from "queries/trade";
import { type Token } from "types/common";
import {
  getFormattedAmount,
  getFormattedAmountRounded,
  getHumanReadableAmount,
  truncateNumber,
} from "utils/common";

import { ApprovalEditModal } from "../ApprovalEditModal";
import { SelectTokenModal } from "../SelectTokenModal";

import { tokenInputStyles } from "./styles";

type TokenInputProps = {
  amount?: string;
  balance?: string;
  token: Token;
  from?: boolean;
  estimated?: boolean;
  onChange: (input: string) => void;
  onTokenChange: (token: Token) => void;
};
export const TokenInput: React.FC<TokenInputProps> = ({
  amount = "",
  balance = "0",
  token,
  from = false,
  estimated = false,
  onChange,
  onTokenChange,
}) => {
  const [showTokenSelector, setShowTokenSelector] = React.useState(false);

  const handleTokenSelectorClick = () => setShowTokenSelector(true);

  const handleTokenSelect = (token: Token) => {
    onTokenChange(token);
    setShowTokenSelector(false);
  };

  return (
    <>
      <div css={tokenInputStyles()}>
        <button
          className="pool-selector-btn"
          onClick={handleTokenSelectorClick}
        >
          <div className="pool-name">
            <img src={token.logoURI} /> {token.symbol}
          </div>

          <span className="icon">
            <FaChevronDown />
          </span>
        </button>
      </div>

      {showTokenSelector && (
        <SelectTokenModal
          selectedToken={token}
          onSelect={handleTokenSelect}
          onClose={() => setShowTokenSelector(false)}
        />
      )}
    </>
  );
};
