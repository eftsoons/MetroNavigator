function RandomVagon() {
  const colorvagon = ["var(--primary-accept)", "#FFD600", "#EF7E24", "#DA2032"];

  const vagoncount = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  const vagon = [];

  for (let i = 0; i < vagoncount; i++) {
    const vagoncolor = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    vagon.push(colorvagon[vagoncolor]);
  }

  return vagon;
}

export default RandomVagon;
