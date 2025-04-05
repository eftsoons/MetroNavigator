import {
  Store,
  schema,
  notifications,
  station,
  line,
  wagons,
  connectinfo,
} from "@/type";

import { useSelector } from "react-redux";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import InfoStationAll from "./InfoStationAll";
import axios from "axios";
import Next from "@/svg/next";
import Time from "@/function/Time";
import Warn from "@/svg/warn";
import TimeForDate from "@/function/TimeForDate";
import PageAnimation from "@/components/PageAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

function InfoStation({
  infostation,
  backfunction,
  handleAstation,
  handleBstation,
  selectinfostation,
  setinfoselectstation,
}: {
  infostation: null | Array<{ station: station; line: line }>;
  backfunction: () => void;
  handleAstation: (stationid: number | null) => void;
  handleBstation: (stationid: number | null) => void;
  selectinfostation: number;
  setinfoselectstation: (select: number) => void;
}) {
  const [station, setstation] = useState<{
    station: station;
    line: line;
  } | null>(null);
  const [connects, setconnects] = useState<Array<connectinfo>>([]);
  const [infostationall, setinfostationall] = useState(false);
  const [lastupdate, setlastupdate] = useState<string | null>(null);

  const schema = useSelector((data: Store) => data.schema) as schema;

  const notifications = useSelector(
    (data: Store) => data.notifications
  )?.filter(
    (data) =>
      station &&
      data.stations.find((data) => data.stationId == station.station.id)
  ) as notifications;

  const date = useSelector((data: Store) => data.info.date) as string;
  const day = new Date(date).getDay();

  useEffect(() => {
    if (infostation) {
      const station = infostation[selectinfostation];

      setstation(station);

      setconnects(
        schema.connections
          .filter(
            (data) =>
              data.stationFromId == station.station.id ||
              data.stationToId == station.station.id
          )
          .map((connect) => {
            return {
              connect: connect,
              direction:
                connect.stationFromId == station.station.id ? "next" : "back",
              station: schema.stations.find(
                (data) =>
                  data.id ==
                  (connect.stationFromId == station.station.id
                    ? connect.stationToId
                    : connect.stationFromId)
              ),
              wagon: null,
            };
          })
      );
    }
  }, [infostation, selectinfostation]);

  const handleaxios = (response: {
    data: {
      data: wagons;
    };
  }) => {
    setlastupdate(TimeForDate(new Date()));

    setconnects((prev) =>
      prev
        .map((data) => {
          return {
            ...data,
            wagon:
              data.station && response.data.data[data.station.id]
                ? response.data.data[data.station.id][0]
                : null,
          };
        })
        .sort((a, b) => {
          if (a.direction == "next" && b.direction == "back") {
            return 1;
          } else {
            return -1;
          }
        })
    );
  };

  useEffect(() => {
    if (station) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
            station.station.id
          }/wagons`
        )
        .then(handleaxios);

      const idinterval = setInterval(() => {
        axios
          .get(
            `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
              station.station.id
            }/wagons`
          )
          .then(handleaxios);
      }, 10000);

      return () => clearInterval(idinterval);
    }
  }, [station]);

  useEffect(() => {
    const intervalid = setInterval(() => {
      setconnects((prev) =>
        prev.map((data) => {
          if (data.wagon?.arrivalTime || data.wagon?.arrivalTime == 0) {
            return {
              ...data,
              wagon: { ...data.wagon, arrivalTime: data.wagon.arrivalTime - 1 },
            };
          } else {
            return data;
          }
        })
      );
    }, 1000);

    return () => clearInterval(intervalid);
  }, [lastupdate]);

  return (
    station && (
      <>
        <div className="flex flex-col gap-[15px]">
          {infostation && infostation.length > 1 && (
            <div className="flex gap-[10px]">
              {infostation.map((station, index) => {
                return (
                  <button
                    key={index}
                    className="bg-[var(--primary-color)] rounded-[10px] p-[5px]! border-solid border-[1px]"
                    onClick={() => {
                      setinfoselectstation(index);
                    }}
                    style={{
                      borderColor:
                        index == selectinfostation
                          ? "var(--primary-text)"
                          : "rgba(0,0,0,0)",
                    }}
                  >
                    <img
                      className="h-[20px] w-[20px] object-contain"
                      src={station.line.icon}
                    />
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center justify-between w-[90%]">
              <h1 className="text-[28px] font-medium!">
                {station.station.name.ru}
              </h1>
            </div>
            <div className="flex items-center gap-[15px] object-contain">
              <img
                className="h-[30px] w-[30px] object-contain"
                src={station.line.icon}
              />
              <span>{station.line.name.ru}</span>
            </div>
            {station.station.workTime[day] &&
            station.station.workTime[day].open ? (
              <span className="text-[var(--primary-muted-color)]!">
                Часы работы: с {station.station.workTime[day].open} до{" "}
                {station.station.workTime[day].close as any}
              </span>
            ) : (
              <span className="text-[var(--primary-muted-color)]!">
                Сегодня не работает
              </span>
            )}
          </div>
          {notifications && notifications.length > 0 && (
            <div className="p-[12px]! bg-[var(--primary-warn)] border-solid border-[1px] border-[var(--primary-border-warn)] rounded-[10px] h-[100px] overflow-x-hidden">
              <div className="gap-[10px] flex flex-col">
                {notifications.map((data, index) => (
                  <div key={index} className="flex flex-col gap-[10px]">
                    {index != 0 && (
                      <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                    )}
                    <div className="flex">
                      <div className="min-w-[30px]">
                        <div className="h-[20px] w-[20px] fill-[none] ">
                          <Warn />
                        </div>
                      </div>
                      <div className="w-full flex flex-col">
                        <span className="text-[var(--primary-border-warn)]! text-[0.8rem]">
                          {data.title.ru}
                        </span>
                        <span className="text-[0.8rem]">
                          {data.description.ru}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-[10px]">
            <Button
              onClick={() => {
                handleAstation(station ? station.station.id : null);
                backfunction();
              }}
            >
              Отсюда
            </Button>
            <Button
              onClick={() => {
                handleBstation(station ? station.station.id : null);
                backfunction();
              }}
            >
              Сюда
            </Button>
          </div>
          <div className="flex justify-center w-full">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={25}
              modules={[Mousewheel]}
              mousewheel={{
                enabled: true,
              }}
              className="max-w-[100%] z-[0]!"
            >
              {connects.map(
                (data, index) =>
                  data.station && (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <div className="flex gap-[25px] items-center">
                        {index != 0 && (
                          <div className="h-[24px] bg-[var(--primary-color)] w-[1px]" />
                        )}
                        <div className="w-full flex gap-[5px] items-center justify-center">
                          <div
                            className="h-[30px] w-[30px]"
                            style={{
                              transform:
                                data.direction == "back"
                                  ? "rotate(0deg)"
                                  : "rotate(180deg)",
                            }}
                          >
                            <Next />
                          </div>
                          <div className="flex flex-col">
                            <span className="break-words">
                              {data.station.name.ru}
                            </span>
                            <span
                              style={{
                                color:
                                  data.wagon &&
                                  data.wagon.arrivalTime &&
                                  data.wagon.arrivalTime <= 0
                                    ? "var(--primary-accept)"
                                    : "var(--primary-muted-color)",
                              }}
                            >
                              {data.wagon && data.wagon.arrivalTime
                                ? data.wagon.arrivalTime >= 0
                                  ? Time(data.wagon.arrivalTime)
                                  : "Прибыл"
                                : "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
          <Button
            onClick={() => {
              setinfostationall(true);
            }}
          >
            Информация о станции
          </Button>
        </div>
        {infostation && (
          <PageAnimation
            open={Boolean(infostationall)}
            className="flex flex-col gap-[5px]"
            backfunction={() => {
              setinfostationall(false);
            }}
            back={true}
            backbuttondisabled={true}
          >
            <InfoStationAll
              station={station}
              transfer={infostation}
              connects={connects}
              lastupdate={lastupdate}
            />
          </PageAnimation>
        )}
      </>
    )
  );
}

export default InfoStation;
