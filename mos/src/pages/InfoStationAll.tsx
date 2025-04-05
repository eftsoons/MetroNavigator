import Button from "@/components/Button";
import PageAnimation from "@/components/PageAnimation";
import Time from "@/function/Time";
import { servicesfilterdata } from "@/info";
import Vagon from "@/svg/vagon";
import Vagon1 from "@/svg/vagon1";
import { Store, station, line, connectinfo } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoExit from "./InfoExit";
import { initData, openLink, useSignal } from "@telegram-apps/sdk-react";
import InfoSchema from "./InfoSchema";
import InfSchedule from "./InfoSchedule";
import { setFavoritesSave } from "@/redux/userinfo";
import { AppDispatch } from "@/redux";

function InfoStationAll({
  station,
  lastupdate,
  connects,
  transfer,
}: {
  station: { station: station; line: line };
  lastupdate: string | null;
  connects: Array<connectinfo>;
  transfer: Array<{ station: station; line: line }>;
}) {
  const date = useSelector((data: Store) => data.info.date) as string;
  const favoritessave = useSelector(
    (data: Store) => data.userinfo.favoritessave
  );

  const raw = useSignal(initData.raw);

  const dispatch = useDispatch<AppDispatch>();

  const day = new Date(date).getDay();

  const [openexit, setopenexit] = useState(false);
  const [openschema, setopenschema] = useState(false);
  const [openschedule, setopenschedule] = useState(false);

  return (
    <>
      <>
        <div className="flex flex-col gap-[15px]">
          <h1 className="text-[28px] font-medium!">
            {station.station.name.ru}
          </h1>
          <div className="flex items-center gap-[15px]">
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
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[28px] font-medium!">Пересадки и выходы</h1>
            {transfer.map((data, index) => (
              <div
                key={index}
                className="flex items-center gap-[15px] object-contain"
              >
                <img
                  className="h-[30px] w-[30px] object-contain"
                  src={data.line.icon}
                />
                <div className="flex flex-col">
                  <span>{data.station.name.ru}</span>
                  <span className="text-[14px] text-[var(--primary-muted-color)]!">
                    {data.line.name.ru} линия
                  </span>
                </div>
              </div>
            ))}
            <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
            <Button
              onClick={() => {
                setopenexit(true);
              }}
            >
              Выходы и транспорт
            </Button>
            {station.station.schemes[0] && (
              <Button onClick={() => setopenschema(true)}>Схема станции</Button>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[28px] font-medium!">Прибытие поездов</h1>
            <div className="flex flex-col gap-[15px]">
              {connects.map((data, index) => (
                <AnimatePresence key={index} mode="wait">
                  {data.wagon && data.station && (
                    <div className="flex flex-col relative gap-[8px]">
                      <span className="text-[var(--primary-muted-color)]!">
                        В сторону ст. {data.station.name.ru}
                      </span>
                      <div className="flex p-[16px]! bg-[var(--primary-color)] rounded-[10px] flex-col overflow-hidden">
                        <span
                          style={{
                            color:
                              data.wagon.arrivalTime <= 0
                                ? "var(--primary-accept)"
                                : "var(--primary-muted-color)",
                          }}
                        >
                          {data.wagon.arrivalTime >= 0
                            ? `Через: ${Time(data.wagon.arrivalTime)}`
                            : "Прибыл"}
                        </span>
                        <motion.div
                          initial={{ x: "100%" }}
                          animate={{
                            x: `${Math.min(10, data.wagon.arrivalTime)}%`,
                          }}
                          exit={{
                            x: "-100%",
                          }}
                          transition={{ duration: 0.5 }}
                          className="flex gap-[5px] relative"
                        >
                          {data.wagon &&
                            Object.entries(data.wagon.wagons).map(
                              ([_, key], index) => (
                                <div
                                  key={index}
                                  className="h-[30px] w-[30px] grid items-end"
                                  style={{
                                    fill:
                                      key == "low"
                                        ? "var(--primary-accept)"
                                        : key == "medium"
                                        ? "#FFD600"
                                        : key == "mediumHigh"
                                        ? "#EF7E24"
                                        : "#DA2032",
                                  }}
                                >
                                  {index == 0 ? <Vagon1 /> : <Vagon />}
                                </div>
                              )
                            )}
                        </motion.div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              ))}
            </div>
            <span className="text-[var(--primary-muted-color)]!">
              Последнее обновление данных в {lastupdate}
            </span>
            <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
            {Object.keys(station.station.scheduleTrains).length != 0 && (
              <Button onClick={() => setopenschedule(true)}>
                Первые и последние поезда
              </Button>
            )}
            <Button
              onClick={() =>
                openLink(
                  `https://yandex.ru/maps/?ll=${station.station.location.lon}%2C${station.station.location.lat}&mode=search&sll=${station.station.location.lon}%2C${station.station.location.lat}&text=${station.station.location.lat}%2C${station.station.location.lon}&z=18.58`
                )
              }
            >
              Станция на карте
            </Button>
          </div>
          {station.station.services.length > 0 && (
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-[28px] font-medium!">Сервисы на станции</h1>
              <div className="flex flex-col gap-[8px]">
                {station.station.services.map((nameservices, index) => {
                  const info = servicesfilterdata[nameservices];
                  const element = info
                    ? cloneElement(info.svg, { width: 30, height: 30 })
                    : null;

                  return (
                    element && (
                      <div key={index} className="flex gap-[10px] items-center">
                        <div className="bg-[var(--primary-color)] rounded-[12.5px] p-[5px]! w-[43px] h-[43px] flex items-center">
                          {element}
                        </div>
                        <span className="w-[90%]">{info.text}</span>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[28px] font-medium!">Избранное</h1>
            <Button
              onClick={() =>
                dispatch(
                  setFavoritesSave({
                    raw: raw,
                    stationid: station.station.id,
                  })
                )
              }
            >
              {favoritessave.includes(station.station.id)
                ? "Убрать станцию из избранного"
                : "Добавить станцию в избранное"}
            </Button>
          </div>
        </div>
      </>
      <PageAnimation
        open={openexit}
        className="flex flex-col gap-[5px]"
        backfunction={() => setopenexit(false)}
        backbuttondisabled={true}
        back={true}
      >
        <InfoExit station={station} />
      </PageAnimation>
      <PageAnimation
        open={openschema}
        className="flex flex-col gap-[5px"
        backfunction={() => setopenschema(false)}
        backbuttondisabled={true}
        back={true}
      >
        <InfoSchema station={station} />
      </PageAnimation>
      <PageAnimation
        open={openschedule}
        className="flex flex-col gap-[5px] p-[16px]!"
        backfunction={() => setopenschedule(false)}
        backbuttondisabled={true}
        back={true}
      >
        <InfSchedule station={station} />
      </PageAnimation>
    </>
  );
}

export default InfoStationAll;
