function TimeForDate(seconds: number) {
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  seconds %= 60;

  return `${h > 0 ? `${h.toFixed(0)}ч ` : ""}${
    m > 0 && h < 100
      ? `${m.toFixed(0)}м${h == 0 ? ` ${seconds}с` : ""}`
      : h == 0 && m == 0
      ? `${seconds}с`
      : ""
  }`;
}

export default TimeForDate;
