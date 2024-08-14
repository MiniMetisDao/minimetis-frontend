import React from "react";
import type { AmountType } from "utils/types";

import { formatAmount } from "utils/common";

const ShareAmount = ({
  amount,
  type = "number",
  label,
}: {
  amount: string;
  type?: AmountType;
  label: string;
}) => {
  const amountFormatted = formatAmount(amount, type, 6);
  const isNumber = !isNaN(parseFloat(amountFormatted));

  const isInfinite = amountFormatted === "InfinityM";
  const isZero = parseFloat(amountFormatted) === 0;

  const showAmount = isNumber && !isInfinite && !isZero;

  return (
    <div className="share-amount">
      <p style={{ fontSize: "18px", fontWeight: 600 }}>
        {showAmount ? amountFormatted : "-"}
      </p>
      <h5>{label}</h5>
    </div>
  );
};

export default ShareAmount;
