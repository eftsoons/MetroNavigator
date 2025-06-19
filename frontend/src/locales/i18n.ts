import i18n, { Resource, ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";

const translate: Resource = {};

const locales = import.meta.glob("/src/locales/**/*.json", { eager: true });

function isResourceLanguage(file: unknown): file is ResourceLanguage {
  return (
    typeof file === "object" &&
    file !== null &&
    Object.values(file).every(
      (val) =>
        typeof val === "string" || (typeof val === "object" && val !== null)
    )
  );
}

Object.entries(locales).forEach(([path, file]) => {
  if (isResourceLanguage(file)) {
    const lang = path.split("/")[3];
    if (!translate[lang]) {
      translate[lang] = { translation: {} };
    }

    Object.assign(translate[lang].translation, file);
  }
});

i18n.use(initReactI18next).init({
  resources: translate,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export type AllLang = "ru" | "en";
