import { station, scheduleday, Store } from "@/type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type scheduletype = {
  [key: string]: {
    weekday: Array<scheduleday>;
    weekend: Array<scheduleday>;
    station: station;
  };
};

function InfoCall({ station }: { station: { station: station } }) {
  const schema = useSelector((data: Store) => data.schema);

  const [schedule, setschedule] = useState<scheduletype>({});

  useEffect(() => {
    const newschedule = {} as scheduletype;

    if (schema && schema.stations) {
      Object.entries(station.station.scheduleTrains).forEach(([key, data]) => {
        const station = schema?.stations.find((data) => String(data.id) == key);

        if (station) {
          newschedule[key] = { weekday: [], weekend: [], station: station };

          data.forEach((data) => {
            if (data.weekend) {
              newschedule[key].weekend.push(data);
            } else {
              newschedule[key].weekday.push(data);
            }
          });

          newschedule[key].weekend.sort((a, b) => {
            if (a.dayType == "ODD" && b.dayType == "EVEN") {
              return -1;
            } else {
              return 1;
            }
          });

          newschedule[key].weekday.sort((a, b) => {
            if (a.dayType == "ODD" && b.dayType == "EVEN") {
              return -1;
            } else {
              return 1;
            }
          });
        }
      });
    }

    setschedule(newschedule);
  }, [station, schema?.stations]);

  return (
    <>
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-medium! w-[90%] break-words">
            Первые и последнии поезда
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        {Object.entries(schedule).map(([_, data], index) => (
          <div key={index} className="flex flex-col gap-[10px]">
            <span className="text-(--primary-muted-color)!">
              В сторону ст. {data.station.name.ru}
            </span>
            <div className="bg-(--primary-color) rounded-[10px] p-[16px]! grid grid-cols-[1fr_auto_auto] gap-[5px_10px]">
              <span className="whitespace-nowrap">По выходным</span>
              <span className="text-(--primary-muted-color)! text-center">
                Четные
              </span>
              <span className="text-(--primary-muted-color)! text-center">
                Нечетные
              </span>
              <span className="text-(--primary-muted-color)! whitespace-nowrap">
                Первый поезд
              </span>
              <span className="break-words text-center">
                {data.weekend[0].first}
              </span>
              <span className="break-words text-center">
                {data.weekend[1].first}
              </span>
              <span className="text-(--primary-muted-color)! whitespace-nowrap">
                Последний поезд
              </span>
              <span className="break-all text-center">
                {data.weekend[0].last}
              </span>
              <span className="break-all text-center">
                {data.weekend[1].last}
              </span>
            </div>
            <div className="bg-(--primary-color) rounded-[10px] p-[16px]! grid grid-cols-[1fr_auto_auto] gap-[5px_10px]">
              <span className="whitespace-nowrap">По будням</span>
              <span className="text-(--primary-muted-color)! text-center">
                Четные
              </span>
              <span className="text-(--primary-muted-color)! text-center">
                Нечетные
              </span>
              <span className="text-(--primary-muted-color)! whitespace-nowrap">
                Первый поезд
              </span>
              <span className="break-words text-center">
                {data.weekday[0].first}
              </span>
              <span className="break-words text-center">
                {data.weekday[1].first}
              </span>
              <span className="text-(--primary-muted-color)! whitespace-nowrap">
                Последний поезд
              </span>
              <span className="break-all text-center">
                {data.weekday[0].last}
              </span>
              <span className="break-all text-center">
                {data.weekday[1].last}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default InfoCall;
