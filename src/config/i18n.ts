import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { BASE_CURRENCY_CODE } from "./config";

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

i18next.services.formatter!.add("formatToken", (value, lng, options) => {
  return `${new Intl.NumberFormat(lng, {
    notation: options.isCompact ? "compact" : "standard",
    maximumSignificantDigits: 4,
    compactDisplay: "long",
  }).format(value)} ${options.tokenSymbol || ""}`;
});

i18next.services.formatter!.add("formatCurrency", (value, lng, options) => {
  return new Intl.NumberFormat(lng, {
    style: "currency",
    notation: options.isCompact ? "compact" : "standard",
    currency: BASE_CURRENCY_CODE,
    maximumSignificantDigits: 4,
    compactDisplay: "long",
  }).format(value);
});

export { i18next as i18n };
