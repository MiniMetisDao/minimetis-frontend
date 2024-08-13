import { type Token } from "minime-sdk";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";

import { InputCompact } from "components/shared/Input";
import { Modal } from "components/shared/Modal";
import { Switch } from "components/shared/Switch";
import { LOGOS } from "config/trade/tradingTokens";

import { SelectTokenModal } from "../SelectTokenModal";

import { styles } from "./styles";

const getTradeLink = (params: { [key: string]: string }) => {
  const url = window.location.href.split("?")[0];

  return `${url}?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
};

type TradeLinkModalProps = {
  onClose: () => void;
  fromToken: Token;
  toToken: Token;
};

export const TradeLinkModal: React.FC<TradeLinkModalProps> = ({
  onClose,
  fromToken,
  toToken,
}) => {
  const { t } = useTranslation("trade");

  const [showFromTokenSelector, setShowFromTokenSelector] =
    React.useState(false);

  const [showToTokenSelector, setShowToTokenSelector] = React.useState(false);
  const [fromTokenInput, setFromTokenInput] = React.useState(fromToken);
  const [toTokenInput, setToTokenInput] = React.useState(toToken);
  const [slippage, setSlippage] = React.useState("");
  const [includeSlippage, setIncludeSlippage] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleFromTokenSelectorClick = () => setShowFromTokenSelector(true);
  const handleToTokenSelectorClick = () => setShowToTokenSelector(true);

  const handleFromTokenSelect = (token: Token) => {
    setFromTokenInput(token);
    setShowFromTokenSelector(false);
  };

  const handleToTokenSelect = (token: Token) => {
    setToTokenInput(token);
    setShowToTokenSelector(false);
  };

  const tradeLink = getTradeLink({
    from: fromTokenInput.symbol || fromTokenInput.address,
    to: toTokenInput.symbol || toTokenInput.address,
    ...(includeSlippage && slippage ? { slippage } : {}),
  });

  return (
    <>
      <Modal onClose={onClose} title={t("getTradeLink")}>
        <div css={styles}>
          <div className="field-item">
            <h4>{t("from")}</h4>
            <button
              className="token-selector-btn"
              onClick={handleFromTokenSelectorClick}
            >
              {fromTokenInput ? (
                <>
                  <img src={LOGOS[fromTokenInput.address]} />{" "}
                  {fromTokenInput.symbol}
                </>
              ) : (
                <span>{t("selectToken")} </span>
              )}
              <span className="icon">
                <FaChevronDown />
              </span>
            </button>
          </div>
          <div className="field-item">
            <h4>{t("to")}</h4>
            <button
              className="token-selector-btn"
              onClick={handleToTokenSelectorClick}
            >
              {toTokenInput ? (
                <>
                  <img src={LOGOS[toTokenInput.address]} />{" "}
                  {toTokenInput.symbol}
                </>
              ) : (
                <span>{t("selectToken")} </span>
              )}
              <span className="icon">
                <FaChevronDown />
              </span>
            </button>
          </div>
          <div className="field-item">
            <h4>{t("includeSlippage")}</h4>
            <Switch
              onChange={(checked: boolean) => setIncludeSlippage(checked)}
              checked={!!includeSlippage}
            />
          </div>
          {includeSlippage && (
            <div className="field-item">
              <h4>{t("slippage")}</h4>
              <div className="compact-field">
                <InputCompact
                  value={slippage}
                  onChange={(input) => setSlippage(input)}
                  suffix="%"
                />
              </div>
            </div>
          )}
          <div className="field-item copy-link">
            <textarea value={tradeLink} readOnly></textarea>
            <div className="copy-icon">
              <CopyToClipboard text={tradeLink} onCopy={() => setCopied(true)}>
                {/* TODO: tooltip */}
                <IoCopyOutline title={t("copyTradeLink")} />
              </CopyToClipboard>
            </div>
            {copied && (
              <div
                className="copy-info"
                onAnimationEnd={() => setCopied(false)}
              >
                <IoIosLink /> {t("tradeLinkCopied")}
              </div>
            )}
          </div>
        </div>
      </Modal>
      {showFromTokenSelector && (
        <SelectTokenModal
          selectedToken={fromTokenInput}
          onSelect={handleFromTokenSelect}
          onClose={() => setShowFromTokenSelector(false)}
        />
      )}
      {showToTokenSelector && (
        <SelectTokenModal
          selectedToken={toTokenInput}
          onSelect={handleToTokenSelect}
          onClose={() => setShowToTokenSelector(false)}
        />
      )}
    </>
  );
};
