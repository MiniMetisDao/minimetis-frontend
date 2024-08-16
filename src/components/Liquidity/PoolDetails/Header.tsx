import { type Token } from "minime-sdk";
import React, { useMemo } from "react";
import { FaCopy } from "react-icons/fa";

import { LOGOS } from "config/trade/tradingTokens";
import { type LiquidityType } from "types/common";

interface HeaderProps {
  token0: Token;
  token1: Token;
  lp?: LiquidityType;
}

export default function Header({ token0, token1, lp }: HeaderProps) {
  const { lpName, tokenA, tokenB } = useMemo(() => {
    const token0Symbol = token0.symbol;
    const token1Symbol = token1.symbol;
    if (lp) {
      const { tokens } = lp;
      const [token0, token1] = tokens;

      const lpName = `${token0.symbol} - ${token1.symbol} LP`;

      return { lpName, tokenA: token0, tokenB: token1 };
    }
    const lpName = `${token0Symbol} - ${token1Symbol} LP`;

    return { lpName, tokenA: token0, tokenB: token1 };
  }, [lp, token0, token1]);

  return (
    <div className="header">
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

      <div>
        <p>{lpName}</p>
        {lp && (
          <div className="text-copy">
            <p>{`Pair Address: ${lp.address.slice(0, 4)}...${lp.address.slice(
              -4
            )}`}</p>
            <FaCopy size="15" />
          </div>
        )}
      </div>
    </div>
  );
}
