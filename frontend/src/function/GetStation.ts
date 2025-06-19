import { schema, station, line } from "@/type";

function GetStation(schema: schema | null, stationid: number) {
  const station = schema?.stations.find(
    (data) => data.id == stationid
  ) as station;

  const line = schema?.lines.find((data) => data.id == station.lineId) as line;

  const stationall = schema?.stations
    ? schema.stations
        .filter(
          (data) => data.name.ru == station.name.ru && data.id != station.id
        )
        .map((station) => {
          const line = schema.lines.find(
            (data) => data.id == station.lineId
          ) as line;

          return { station: station, line: line };
        })
    : [];

  return [{ station: station, line: line }, ...stationall];
}

export default GetStation;
