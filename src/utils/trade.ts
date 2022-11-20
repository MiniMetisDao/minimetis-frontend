import { Token as SDKToken } from "minime-sdk";

import { type Token } from "types/common";

export const getSDKToken = (token: Token) => {
  return new SDKToken(
    token.chainId,
    token.address,
    token.decimals,
    token.symbol,
    token.name
  );
};
