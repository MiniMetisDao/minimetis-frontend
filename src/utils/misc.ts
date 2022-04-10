export const getDisplayPrice = (
  tokenPrice: number,
  tokenDecimal: number,
  multiplyFactor?: number,
  waitForMultiplyFactor: boolean = false
) => {
  try {
    if (waitForMultiplyFactor && multiplyFactor === undefined) {
      throw new Error("Waiting for multiplyFactor");
    }

    const displayPrice = (tokenPrice / tokenDecimal) * (multiplyFactor || 1);
    if (isNaN(displayPrice)) {
      throw new Error("Got NaN");
    }
    return displayPrice;
  } catch (error) {
    return undefined;
  }
};
