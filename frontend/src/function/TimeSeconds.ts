function TimeSeconds(time: string): number {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parts[2] ? parseInt(parts[2], 10) : 0;

  return hours * 3600 + minutes * 60 + seconds;
}

export default TimeSeconds;
