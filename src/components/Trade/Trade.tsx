import { useMatch } from "@tanstack/react-location";
import React from "react";

import { LiquidityPool } from "./LiquidityPool";
import { Swap } from "./Swap";

export const Trade: React.FC = () => {
  const { pathname } = useMatch();
  console.log("hello", pathname);

  return pathname === "/trade/swap-tokens" ? <Swap /> : <LiquidityPool />;
};
