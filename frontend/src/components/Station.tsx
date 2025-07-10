import { Store, schema, station } from "@/type";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import StationSvgAll from "@/function/StationSvgAll";

function Station({
  stationid,
  type,
  arrayerrorstation,
}: {
  stationid: number | null;
  type: "A" | "B";
  arrayerrorstation: boolean;
}) {
  const schema = useSelector((data: Store) => data.schema) as schema;

  const station = schema.stations.find(
    (data) => data.id == stationid
  ) as station;
  const line = schema.lines.find((data) => data.id == station?.lineId);
  const filter = useSelector((data: Store) => data.userinfo.filter);

  const [stationsvg, setstationsvg] = useState<string[]>(
    StationSvgAll(station, filter, arrayerrorstation)
  );

  useEffect(() => {
    setstationsvg(StationSvgAll(station, filter, arrayerrorstation));
  }, [filter, station]);

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
