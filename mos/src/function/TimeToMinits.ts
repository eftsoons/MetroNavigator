function Time(sec: number) {
  const minutes = Math.floor(sec / 60);

  return minutes.toFixed(0);
}

export default Time;
