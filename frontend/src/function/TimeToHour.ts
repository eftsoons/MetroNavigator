import { t } from "i18next";

function TimeForDate(seconds: number) {
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  seconds %= 60;

  return `${h > 0 ? `${h.toFixed(0)}${t("h")} ` : ""}${
    m > 0 && h < 100
      ? `${m.toFixed(0)}${t("m")}${h == 0 ? ` ${seconds}${t("s")}` : ""}`
      : h == 0 && m == 0
      ? `${seconds}${t("s")}`
      : ""
  }`;
}

export default TimeForDate;
