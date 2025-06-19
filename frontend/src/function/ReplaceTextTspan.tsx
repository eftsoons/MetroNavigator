function ReplactTextTspan(text: string, textset: string) {
  let textsvg = text;
  const textsplit = textset.split(/\s|\n|-/);

  const settext = Array.from(
    text.matchAll(/<tspan\b[^>]*>([\s\S]*?)<\/tspan>/gi)
  ).map((data) => data[1]);

  //пофиксить

  settext.forEach((text, index) => {
    if (textsplit.length > 1) {
      textsvg = textsvg.replace(text, textsplit[index]);
      textsvg = textsvg.replace(text, textsplit[index]);
    } else {
      textsvg = textsvg.replace(text, textsplit[0]);
    }
  });

  return textsvg;
}

export default ReplactTextTspan;
