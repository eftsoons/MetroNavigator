//доделать

import i18next from "i18next";

// const translate: Resource = {};

// function getAllresources() {

// }

// function isResourceLanguage(file: unknown): file is ResourceLanguage {
//   return (
//     typeof file === "object" &&
//     file !== null &&
//     Object.values(file).every(
//       (val) =>
//         typeof val === "string" || (typeof val === "object" && val !== null)
//     )
//   );
// }

// const test = fs.readdirSync("./src/locales");

// Object.entries(locales).forEach(([path, file]) => {
//   if (isResourceLanguage(file)) {
//     const lang = path.split("/")[3];
//     if (!translate[lang]) {
//       translate[lang] = { translation: {} };
//     }

//     Object.assign(translate[lang].translation, file);
//   }
// });

i18next.init({
  resources: {
    ru: {
      translation: {
        // start:
        // 'Здраствуйте!\nДанный бот был создан для осуществление более удобной навигации в метрополитенах мира.\n\nТелеграмм канал проекта - <a href="{{channel}}">канал</a> ℹ️\nВсего пользователей: {{countalluser}} (Обновляется раз в день) 📈\n\nНа данный момент доступны схемы навигации в метрополитенах:',
        start:
          'Здраствуйте!\nДанный бот был создан для осуществление более удобной навигации в метрополитенах мира.\n\nТелеграмм канал проекта - <a href="{{channel}}">канал</a> ℹ️\n\nНа данный момент доступны схемы навигации в метрополитенах:',

        mos: "Москва",
        sbp: "Санкт-Петербург",
        Sourcecode: "Исходный код проекта",
      },
    },
    en: {
      translation: {
        // start: `Hello! This bot was created to provide more convenient navigation in the world's subways.\n\nTelegram channel of the project - <a href="{{channel}}">канал</a> ℹ️\nTotal users: {{countalluser}} (Updated once a day) 📈\n\nCurrently, navigation schemes in subways are available:`,
        start: `Hello! This bot was created to provide more convenient navigation in the world's subways.\n\nTelegram channel of the project - <a href="{{channel}}">канал</a> ℹ️\n\nCurrently, navigation schemes in subways are available:`,
        mos: "Moscow",
        sbp: "Saint-Petersburg",
        Sourcecode: "Source Сode Github",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
