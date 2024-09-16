import { type Token } from "minime-sdk";

import { LOGOS } from "config/trade/tradingTokens";

type TokenLabelProps = {
  address: string;
  symbol: string;
};

type PoolAmountsProps = {
  tokenA: Token;
  tokenB: Token;
};
const TokenLabel = ({ address, symbol }: TokenLabelProps) => {
  return (
    <div className="token-label-wrapper">
      <img
        src={LOGOS[address]}
        alt={symbol}
        style={{ width: "auto", height: 30 }}
      />
      <p>{symbol}</p>
    </div>
  );
};

export default function PoolAmounts({ tokenA, tokenB }: PoolAmountsProps) {
  return (
    <div className="pool-amounts-wrapper">
      <div className="pool-row-amount">
        <p>-</p>
        <TokenLabel address={tokenA.address} symbol={tokenA.symbol ?? ""} />
      </div>
      <div className="pool-row-amount">
        <p>-</p>
        <TokenLabel address={tokenB.address} symbol={tokenB.symbol ?? ""} />
      </div>
    </div>
  );
}
