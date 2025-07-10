import ReplactTextTspan from "@/function/ReplaceTextTspan";
import { filterstation, station } from "@/type";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";
import { cloneElement } from "react";
import { servicesfilterdata, typefilter } from "@/info";

import ReactDOMServer from "react-dom/server";

function StationSvgAll(
  station: station,
  filter: filterstation,
  arrayerrorstation: boolean
): string[] {
  const stationsvg: string[] = [];

  const { x, y } = station.stationSvg;

  const filterdata = typefilter.filter(
    (s) => station.services.includes(s) && filter && filter[s]
  );

  stationsvg.push(station.stationSvg.svg);

  if (arrayerrorstation) {
    stationsvg.push(
      ReactDOMServer.renderToStaticMarkup(
        <g x={x} y={y} transform={`translate(${x - 11.5}, ${y - 11.5})`}>
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
        </g>
      )
    );
  } else if (filterdata.length == 1) {
    const info = servicesfilterdata[filterdata[0]];
    const element = cloneElement(info.svg, { width: 23, height: 23 });

    stationsvg.push(
      ReactDOMServer.renderToStaticMarkup(
        <g id={`icon-${station.id}`} key={`icon-${station.id}`} x={x} y={y}>
          <circle
            fill="var(--primary-bg)"
            stroke="var(--primary-text)"
            cx={x}
            cy={y}
            r="13.5"
            strokeWidth="1.5"
          />
          <g
            width={23}
            height={23}
            transform={`translate(${x - 11.5}, ${y - 11.5})`}
          >
            {element}
          </g>
        </g>
      )
    );
  } else if (filterdata.length > 1) {
    stationsvg.push(
      ReactDOMServer.renderToStaticMarkup(
        <g id={`icon-${station.id}`} key={`icon-${station.id}`} x={x} y={y}>
          <circle
            cx={x}
            cy={y}
            r="13.5"
            fill="var(--primary-text)"
            stroke="var(--primary-bg)"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
          <text
            x={x}
            y={y}
            dy="0.1em"
            fill="var(--primary-bg)"
            fontSize="14"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {filterdata.length}+
          </text>
        </g>
      )
    );
  }

  stationsvg.push(
    ReplactTextTspan(
      station.textSvg.svg,
      station.name[i18next.language as AllLang]
    )
  );

  return stationsvg;
}

export default StationSvgAll;
