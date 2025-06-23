function ReplactTextTspan(text: string, textset: string) {
  let textsvg = text;

  const settext = Array.from(
    text.matchAll(/<tspan\b[^>]*>([\s\S\-]*?)<\/tspan>/gi)
  ).map((data) => data[1]);

  settext.forEach((text, index) => {
    if (index == 0) {
      textsvg = textsvg.replace(text, textset);
    } else {
      textsvg = textsvg.replace(text, "");
    }
  });

  return textsvg;
}

export default ReplactTextTspan;
