import { type Token as SDKToken } from "minime-sdk";

import type { Token } from "types/common";
import { getSDKToken } from "utils/trade";

const LOGO_LINK =
  "https://raw.githubusercontent.com/MetisProtocol/metis-bridge-resources/master/tokens/";

export const LOGOS: Record<string, string> = {
  "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000": `${LOGO_LINK}METIS/logo.png`,
  "0x5A3b6A5c737B0e85DD9120CeED7c0DB86F41FA68": "/logos/minime.png",
  "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21": `${LOGO_LINK}USDC/logo.png`,
  "0x420000000000000000000000000000000000000A": `${LOGO_LINK}ETH/logo.png`,
  "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC": `${LOGO_LINK}USDT/logo.png`,
};

const tokens: Token[] = [
  {
    chainId: 1088,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
  },
  {
    chainId: 1088,
    address: "0x5A3b6A5c737B0e85DD9120CeED7c0DB86F41FA68",
    decimals: 18,
    name: "MiniMe V2",
    symbol: "MINIME",
  },
  {
    chainId: 1088,
    address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
    decimals: 6,
    name: "USDC Token",
    symbol: "m.USDC",
  },
  {
    chainId: 1088,
    address: "0x420000000000000000000000000000000000000A",
    decimals: 18,
    name: "Ether",
    symbol: "WETH",
  },
  {
    chainId: 1088,
    address: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
    decimals: 6,
    name: "USDT Token",
    symbol: "m.USDT",
  },
];

export const TOKENS: Record<string, SDKToken> = {
  METIS: getSDKToken(tokens[0]),
  MINIME: getSDKToken(tokens[1]),
  "m.USDC": getSDKToken(tokens[2]),
  WETH: getSDKToken(tokens[3]),
  "m.USDT": getSDKToken(tokens[4]),
};

export const tradingTokens = Object.values(TOKENS);
