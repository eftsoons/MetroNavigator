import { createHmac } from "crypto";

const secretKey = process.env.VK_TOKEN!;

function CheckValidVK(searchOrParsedUrlQuery: string | undefined): boolean {
  try {
    if (searchOrParsedUrlQuery) {
      const launchParams = decodeURIComponent(
        searchOrParsedUrlQuery.slice(searchOrParsedUrlQuery.indexOf("?") + 1)
      );

      let sign;
      const queryParams: Array<{ key: string; value: string | undefined }> = [];

      /**
       * Функция, которая обрабатывает входящий query-параметр. В случае передачи
       * параметра, отвечающего за подпись, подменяет "sign". В случае встречи
       * корректного в контексте подписи параметра добавляет его в массив
       * известных параметров.
       * @param key
       * @param value
       */
      const processQueryParam = (key: string, value: string | undefined) => {
        if (typeof value === "string") {
          if (key === "sign") {
            sign = value;
          } else if (key.startsWith("vk_")) {
            queryParams.push({ key, value });
          }
        }
      };

      if (typeof launchParams === "string") {
        // Если строка начинается с вопроса (когда передан window.location.search),
        // его необходимо удалить.
        const formattedSearch = launchParams.startsWith("?")
          ? launchParams.slice(1)
          : launchParams;

        // Пытаемся разобрать строку как query-параметр.
        for (const param of formattedSearch.split("&")) {
          const [key, value] = param.split("=");
          if (key) {
            processQueryParam(key, value);
          }
        }
      } else {
        if (launchParams) {
          for (const key of Object.keys(launchParams)) {
            const value = launchParams[key];
            processQueryParam(key, value);
          }
        }
      }
      // Обрабатываем исключительный случай, когда не найдена ни подпись в параметрах,
      // ни один параметр, начинающийся с "vk_", чтобы избежать
      // излишней нагрузки, образующейся в процессе работы дальнейшего кода.
      if (!sign || queryParams.length === 0) {
        return false;
      }
      // Снова создаём запрос в виде строки из уже отфильтрованных параметров.
      const queryString = queryParams
        // Сортируем ключи в порядке возрастания.
        .sort((a, b) => a.key.localeCompare(b.key))
        // Воссоздаём новый запрос в виде строки.
        .reduce((acc, { key, value }, idx) => {
          return (
            acc +
            (idx === 0 ? "" : "&") +
            `${key}=${value ? encodeURIComponent(value) : ""}`
          );
        }, "");

      // Создаём хеш получившейся строки на основе секретного ключа.
      const paramsHash = createHmac("sha256", secretKey)
        .update(queryString)
        .digest()
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=$/, "");

      return paramsHash === sign;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export default CheckValidVK;
