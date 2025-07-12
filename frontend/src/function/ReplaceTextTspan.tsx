import { station } from "@/type";

function ReplactTextTspan(station: station, textset: string) {
  return `<foreignObject
      x="${station.textSvg.x}"
      y="${station.textSvg.y}"
      width="${station.tapSvg.w + station.textSvg.w}"
      height="${station.tapSvg.w + station.textSvg.h}"
      id="caption-${station.id}"
    >
      <div
        style="
          width: ${station.textSvg.w}px;
          font-family: MoscowSans-Light;
          font-size: 14px;
      "
      >
        ${textset}
      </div>
    </foreignObject>`;
}

export default ReplactTextTspan;
