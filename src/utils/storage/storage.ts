export const Keys = {
  slippageTolerance: "slippageTolerance",
  transactionDeadline: "transactionDeadline",
  enableMultiHops: "enableMultiHops",
  transactionIds: "transactionIds",
  tradingTokens: "tradingTokens",
};

export type Keys = keyof typeof Keys;

export const set = <TValue>(key: Keys, value: TValue) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore the error for now.
  }
};

export const get = <TValue>(
  key: Keys,
  defaultValue?: TValue
): TValue | undefined => {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || defaultValue;
  } catch {
    // Ignore the error for now.
  }

  return defaultValue;
};
