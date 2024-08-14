import { type Token } from "minime-sdk";
import React from "react";
import { FaCopy } from "react-icons/fa";

import { LOGOS } from "config/trade/tradingTokens";
import { type LiquidityType } from "types/common";

interface HeaderProps {
  token0: Token;
  token1: Token;
  lp?: LiquidityType;
}

export default function Header({ token0, token1, lp }: HeaderProps) {
  const token0Symbol = token0.symbol;
  const token1Symbol = token1.symbol;
  const lpName = `${token0Symbol} - ${token1Symbol} LP`;

  return (
    <div className="header">
      <div className="tokens">
        <img
          src={LOGOS[token0.address]}
          alt={token0Symbol}
          style={{ width: "auto", height: 30 }}
        />
        <img
          src={LOGOS[token1.address]}
          alt={token1Symbol}
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
