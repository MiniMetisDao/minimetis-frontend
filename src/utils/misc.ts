export const getDisplayPrice = (
  tokenPrice?: number,
  tokenDecimal?: number,
  multiplyFactor?: number,
  waitForMultiplyFactor = false
) => {
  try {
    if (waitForMultiplyFactor && multiplyFactor === undefined) {
      throw new Error("Waiting for multiplyFactor");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const displayPrice = (tokenPrice! / tokenDecimal!) * (multiplyFactor || 1);
    if (isNaN(displayPrice)) {
      throw new Error("Got NaN");
    }

    return displayPrice;
  } catch (error) {
    return undefined;
  }
};

export const getShortTransactionHash = (address: string) =>
  address.substring(0, 10) + "..." + address.substring(address.length - 8);
