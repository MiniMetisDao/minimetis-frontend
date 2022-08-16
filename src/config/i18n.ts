import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { BASE_CURRENCY_CODE } from "./config";

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "translation"],
    fallbackNS: ["common", "translation"],
    debug: import.meta.env.MODE === "development",
    interpolation: {
      escapeValue: false,
    },
  });

i18next.services.formatter?.add("formatToken", (value, lng, options) => {
  if (value === undefined || isNaN(value)) return "--";

  return `${new Intl.NumberFormat(lng, {
    notation: options.isCompact ? "compact" : "standard",
    maximumSignificantDigits: value < 1 ? 4 : undefined,
    maximumFractionDigits: options.isCompact
      ? 2
      : options.roundingDecimal !== undefined
      ? options.roundingDecimal
      : 2,
    compactDisplay: "long",
  }).format(value)} ${options.tokenSymbol || ""}`;
});

i18next.services.formatter?.add("formatCurrency", (value, lng, options) => {
  if (value === undefined || isNaN(value)) return "--";

  return new Intl.NumberFormat(lng, {
    style: "currency",
    notation: options.isCompact ? "compact" : "standard",
    currency: BASE_CURRENCY_CODE,
    maximumSignificantDigits: value < 1 ? 4 : undefined,
    maximumFractionDigits:
      options.roundingDecimal !== undefined ? options.roundingDecimal : 2,
    compactDisplay: "long",
  }).format(value);
});

i18next.services.formatter?.add("formatNumber", (value, lng, options) => {
  if (value === undefined || isNaN(value)) return "--";

  return new Intl.NumberFormat(lng, {
    notation: options.isCompact ? "compact" : "standard",
    maximumSignificantDigits: value < 1 ? 4 : undefined,
    maximumFractionDigits:
      options.roundingDecimal !== undefined ? options.roundingDecimal : 2,
  }).format(value);
});

export { i18next as i18n };
