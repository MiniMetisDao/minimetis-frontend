import { formatUnits } from "ethers/lib/utils";
import { JSBI, type Pair, Percent, type Token, TokenAmount } from "minime-sdk";
import { useMemo } from "react";

import { LOGOS } from "config/trade/tradingTokens";

interface YourPositionProps {
  tokenA: Token;
  tokenB: Token;
  lpBalance: string;
  totalSupply: string;
  pair: Pair | undefined;
}

interface PoolAmount {
  tokenA: Token;
  tokenB: Token;
  lpBalance: string;
}

const PoolAmount = ({ tokenA, tokenB, lpBalance }: PoolAmount) => {
  const { symbol: symbolA } = tokenA;
  const { symbol: symbolB } = tokenB;

  return (
    <div className="your-position-row">
      <div className="tokens-logos">
        <div className="tokens">
          <img
            src={LOGOS[tokenA.address]}
            alt={tokenA.symbol}
            style={{ width: "auto", height: 30 }}
          />
          <img
            src={LOGOS[tokenB.address]}
            alt={tokenB.symbol}
            style={{ width: "auto", height: 30, translate: -10 }}
          />
        </div>
        <p>
          {symbolA}/{symbolB}
        </p>
      </div>
      <p>{lpBalance}</p>
    </div>
  );
};

export default function YourPosition({
  tokenA,
  tokenB,
  lpBalance,
  totalSupply,
  pair,
}: YourPositionProps) {
  const { symbol: symbolA } = tokenA;
  const { symbol: symbolB } = tokenB;
  const formatBalance = formatUnits(lpBalance, 18);

  const userPool = useMemo(() => {
    if (!pair) return undefined;
    if (!totalSupply || !lpBalance) return undefined;
    if (totalSupply === "0") return undefined;
    if (lpBalance === "0") return undefined;
    const totalPoolTokens = new TokenAmount(pair.liquidityToken, totalSupply);
    const userPoolBalance = new TokenAmount(pair.liquidityToken, lpBalance);

    const isGreaterThanOrEqual = JSBI.greaterThanOrEqual(
      totalPoolTokens.raw,
      userPoolBalance.raw
    );

    const poolTokenPercentage = isGreaterThanOrEqual
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined;

    const [token0Deposited, token1Deposited] = isGreaterThanOrEqual
      ? [
          pair.getLiquidityValue(
            pair.token0,
            totalPoolTokens,
            userPoolBalance,
            false
          ),
          pair.getLiquidityValue(
            pair.token1,
            totalPoolTokens,
            userPoolBalance,
            false
          ),
        ]
      : [undefined, undefined];

    return { poolTokenPercentage, token0Deposited, token1Deposited };
  }, [lpBalance, pair, totalSupply]);

  if (!userPool) return null;
  const { poolTokenPercentage, token0Deposited, token1Deposited } = userPool;

  return (
    <div className="your-position-wrapper">
      <div className="your-position-card">
        <h5 style={{ margin: 0 }}>Your Position</h5>
        {/* POOL BALANCE */}
        <PoolAmount tokenA={tokenA} tokenB={tokenB} lpBalance={formatBalance} />
        <div className="your-position-row">
          <p>Your pool share:</p>
          <p>
            {poolTokenPercentage ? poolTokenPercentage.toFixed(2) + "%" : "-"}
          </p>
        </div>
        <div className="your-position-row">
          <p>{symbolA}:</p>
          <p>{token0Deposited ? token0Deposited.toSignificant(6) : "-"}</p>
        </div>
        <div className="your-position-row">
          <p>{symbolB}:</p>
          <p>{token1Deposited ? token1Deposited.toSignificant(6) : "-"}</p>
        </div>
      </div>
    </div>
  );
}
