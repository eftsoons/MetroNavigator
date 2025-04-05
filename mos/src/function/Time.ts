function Time(sec: number) {
  const minutes = Math.floor(sec / 60);
  sec %= 60;

  return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default Time;
