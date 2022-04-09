import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "translation"],
    fallbackNS: ["common", "translation"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

i18next.services.formatter!.add("formatToken", (value, lng, options) => {
  return new Intl.NumberFormat(lng, {
    notation: "compact",
    compactDisplay: "long",
  }).format(value);
  // console.log("string", string, value, lng, options);
});

i18next.services.formatter!.add("formatCurrency", (value, lng, options) => {
  return new Intl.NumberFormat(lng, {
    style: "currency",
    currency: "USD",
    compactDisplay: "long",
  }).format(value);
});

export { i18next as i18n };
