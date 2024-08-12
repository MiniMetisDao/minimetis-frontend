import type { Token } from "types/common";

const LOGO_LINK =
  "https://raw.githubusercontent.com/MetisProtocol/metis-bridge-resources/master/tokens/";

export const LOGOS: Record<string, string> = {
  "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000": `${LOGO_LINK}METIS/logo.png`,
  "0x5A3b6A5c737B0e85DD9120CeED7c0DB86F41FA68": "/logos/minime.png",
  "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21": `${LOGO_LINK}USDC/logo.png`,
  "0x420000000000000000000000000000000000000A": `${LOGO_LINK}ETH/logo.png`,
};

export const tradingTokens: Token[] = [
  {
    chainId: 1088,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
    logoURI:
      "https://raw.githubusercontent.com/MetisProtocol/metis-bridge-resources/master/tokens/METIS/logo.png",
  },
  {
    chainId: 1088,
    address: "0x5A3b6A5c737B0e85DD9120CeED7c0DB86F41FA68",
    decimals: 18,
    name: "MiniMe V2",
    symbol: "MINIME",
    logoURI: "/logos/minime.png",
  },
  {
    chainId: 1088,
    address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
    decimals: 6,
    name: "USDC Token",
    symbol: "m.USDC",
    logoURI:
      "https://raw.githubusercontent.com/MetisProtocol/metis-bridge-resources/master/tokens/USDC/logo.png",
  },
  {
    chainId: 1088,
    address: "0x420000000000000000000000000000000000000A",
    decimals: 18,
    name: "Ether",
    symbol: "WETH",
    logoURI:
      "https://raw.githubusercontent.com/MetisProtocol/metis-bridge-resources/master/tokens/ETH/logo.png",
  },
];
