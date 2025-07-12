import { schema } from "@/type";

function GetStation(schema: schema | null, stationid: number) {
  const station = schema?.stations.find((data) => data.id == stationid);

  if (station) {
    const line = schema?.lines.find((data) => data.id == station.lineId);

    const stationall = schema
      ? schema.transitions
          .filter(
            (data) =>
              data.stationFromId == stationid || data.stationToId == stationid
          )
          .map((data) => {
            const stationinfo =
              data.stationFromId == stationid
                ? schema.stations.find(
                    (datastation) => data.stationToId == datastation.id
                  )
                : schema.stations.find(
                    (datastation) => data.stationFromId == datastation.id
                  );

            if (stationinfo) {
              const line = schema.lines.find(
                (data) => data.id == stationinfo.lineId
              );

              return { station: stationinfo, line: line };
            } else {
              return undefined;
            }
          })
          .filter(Boolean)
      : [];

    return [{ station: station, line: line }, ...stationall];
  } else {
    return [];
  }
}

export default GetStation;
