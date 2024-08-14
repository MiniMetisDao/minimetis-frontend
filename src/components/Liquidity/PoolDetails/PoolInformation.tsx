import React from "react";
import type { AmountType } from "utils/types";

import { formatAmount } from "utils/common";

const PoolInformation = ({
  amount,
  type,
  label,
}: {
  amount: string;
  type: AmountType;
  label: string;
}) => {
  const amountFormatted = formatAmount(amount, type);

  return (
    <div className="pool-inf-wrapper">
      <h4>{label}</h4>
      <p>{amountFormatted}</p>
    </div>
  );
};

export default PoolInformation;
