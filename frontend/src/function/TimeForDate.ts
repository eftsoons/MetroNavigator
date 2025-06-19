function TimeForDate(date: Date, type?: "minuts") {
  const h = date.getHours();

  const m = date.getMinutes();

  const s = date.getSeconds();

  return type == "minuts"
    ? `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}`
    : `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
}

export default TimeForDate;
