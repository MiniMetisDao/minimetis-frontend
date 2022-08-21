import { Token } from "types/common";

export type SwapToken = {
  amount: string;
  token: Token;
  estimated?: boolean;
};
