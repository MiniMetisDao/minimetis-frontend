import React from "react";
import { useTranslation } from "react-i18next";

import { SelectTokenModal } from "components/Trade/SelectTokenModal";
import { useTokens } from "components/Trade/SelectTokenModal/useTokens";

export const Swap: React.FC = () => {
  const { t } = useTranslation("trade");
  const tokens = useTokens();

  return (
    <div>
      <h2>{t("swap")}</h2>
      <SelectTokenModal tokens={tokens} />
    </div>
  );
};
