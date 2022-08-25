import { ChainId, Currency, METIS, Token, WETH } from "minime-sdk";

export function wrappedCurrency(
  currency: Currency | undefined,
  chainId: ChainId | undefined
): Token | undefined {
  return chainId && currency === METIS
    ? WETH[chainId]
    : currency instanceof Token
    ? currency
    : undefined;
}
