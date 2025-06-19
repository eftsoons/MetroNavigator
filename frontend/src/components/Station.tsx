import ReplactTextTspan from "@/function/ReplaceTextTspan";
import { Store, schema, station } from "@/type";
import { useSelector } from "react-redux";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";

function Station({
  stationid,
  type,
  arrayerrorstation,
}: {
  stationid: number | null;
  type: "A" | "B";
  arrayerrorstation: Array<number>;
}) {
  const schema = useSelector((data: Store) => data.schema) as schema;

  const station = schema.stations.find(
    (data) => data.id == stationid
  ) as station;
  const line = schema.lines.find((data) => data.id == station?.lineId);

  const stationicon = document.querySelector(`#icon-${stationid}`);

  const stationerror = arrayerrorstation.some((data) => data == station?.id);

  const stationsvg = [];

  if (stationicon) {
    stationsvg.push(stationicon.outerHTML);
  } else {
    if (stationerror) {
      stationsvg.push(`<g
            x="${station.stationSvg.x}"
            y="${station.stationSvg.y}"
            transform="translate(${station.stationSvg.x - 11.5}, ${
        station.stationSvg.y - 11.5
      })"
          >
            <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.75"
                    y="0.75"
                    width="21.5"
                    height="21.5"
                    rx="10.25"
                    fill="var(--primary-bg)"
                    stroke="var(--primary-text)"
                    strokeWidth="1.5"
                  ></rect>
                  <path
                    d="M11.5638 11.217V7"
                    stroke="var(--primary-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5627 14.6053C11.407 14.6053 11.2808 14.7315 11.2819 14.8871C11.2819 15.0427 11.4082 15.169 11.5638 15.169C11.7194 15.169 11.8457 15.0427 11.8457 14.8871C11.8457 14.7315 11.7194 14.6053 11.5627 14.6053"
                    stroke="var(--primary-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
          </g>`);
    }
  }

  if (station) {
    stationsvg.push(
      ReplactTextTspan(
        station.textSvg.svg,
        station.name[i18next.language as AllLang]
      ),
      station.stationSvg.svg
    );
  }

  return (
    station &&
    line && (
      <g x={station.stationSvg.x} y={station.stationSvg.y}>
        <g
          x={station.stationSvg.x}
          y={station.stationSvg.y}
          dangerouslySetInnerHTML={{
            __html: stationsvg.join(""),
          }}
        />
        <g x={station.stationSvg.x} y={station.stationSvg.y}>
          <rect
            x={station.stationSvg.x - 15}
            y={station.stationSvg.y - 40}
            width="30"
            height="30"
            rx="5"
            fill={line.color}
          />
          <rect
            x={station.stationSvg.x - 10}
            y={station.stationSvg.y - 25}
            width="20"
            height="20"
            rx="3"
            fill={line.color}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: "rotate(45deg)",
            }}
          />
          <text
            fill={"white"}
            x={station.stationSvg.x}
            y={station.stationSvg.y - 23.5}
            textAnchor="middle"
            dominantBaseline="middle"
            width="30"
            height="30"
          >
            {type}
          </text>
        </g>
      </g>
    )
  );
}

export default Station;
