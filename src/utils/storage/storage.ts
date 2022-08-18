export const Keys = {
  slippageTolerance: "slippageTolerance",
  transactionDeadline: "transactionDeadline",
  enableMultiHops: "enableMultiHops",
  transactionIds: "transactionIds",
};

export type Keys = keyof typeof Keys;

export const set = (key: Keys, value: string | Record<string, any>) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore the error for now.
  }
};

export const get = <T>(key: Keys, defaultValue?: T): T | undefined => {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || defaultValue;
  } catch {
    // Ignore the error for now.
  }

  return defaultValue;
};
