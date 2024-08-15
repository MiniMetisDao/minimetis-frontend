import {
  type ChainId,
  type Currency,
  type CurrencyAmount,
  METIS,
  Token,
  TokenAmount,
  WETH,
} from "minime-sdk";

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

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token =
    currencyAmount && chainId
      ? wrappedCurrency(currencyAmount.currency, chainId)
      : undefined;

  return token && currencyAmount
    ? new TokenAmount(token, currencyAmount.raw)
    : undefined;
}
