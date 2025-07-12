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
import { openLink } from "@telegram-apps/sdk-react";
import InfoSchema from "./InfoSchema";
import InfSchedule from "./InfoSchedule";
import { setFavoritesSave } from "@/redux/userinfo";
import { AppDispatch } from "@/redux";
import { useTranslation } from "react-i18next";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";
import TimeSeconds from "@/function/TimeSeconds";
import TimeForDate from "@/function/TimeForDate";

function InfoStationAll({
  station,
  lastupdate,
  connects,
  transfer,
}: {
  station: { station: station; line: line };
  lastupdate: Date;
  connects: Array<connectinfo>;
  transfer: Array<{ station: station; line: line }>;
}) {
  const { t } = useTranslation();

  const favoritessave = useSelector(
    (data: Store) => data.userinfo.favoritessave
  );

  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  const dispatch = useDispatch<AppDispatch>();

  const day = new Date().getDay();

  const [openexit, setopenexit] = useState(false);
  const [openschema, setopenschema] = useState(false);
  const [openschedule, setopenschedule] = useState(false);

  return (
    <>
      <>
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[15px]">
            <img
              className="h-[30px] w-[30px] object-contain"
              src={station.line.icon}
            />
            <span>
              {station.line.name[i18next.language as AllLang]
                ? station.line.name[i18next.language as AllLang]
                : station.line.name.ru}
            </span>
          </div>
          {station.station.workTime[day] &&
            station.station.workTime[day].open &&
            station.station.workTime[day].close &&
            lastupdate && (
              <span className="text-[var(--primary-muted-color)]!">
                {TimeSeconds(TimeForDate(lastupdate)) >=
                  TimeSeconds(station.station.workTime[day].open) &&
                (TimeSeconds(TimeForDate(lastupdate)) >=
                  TimeSeconds(station.station.workTime[day].close) ||
                  TimeSeconds(station.station.workTime[day].open) >=
                    TimeSeconds(station.station.workTime[day].close))
                  ? t("OpenHours", {
                      from: station.station.workTime[day].open,
                      to: station.station.workTime[day].close,
                    })
                  : t("NotWorkingToday")}
              </span>
            )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[28px] font-medium!">
              {t("TransfersAndExits")}
            </h1>
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
                  <span>{data.station.name[i18next.language as AllLang]}</span>
                  <span className="text-[14px] text-[var(--primary-muted-color)]!">
                    {t("LineName", {
                      name: data.line.name[i18next.language as AllLang]
                        ? data.line.name[i18next.language as AllLang]
                        : data.line.name.ru,
                    })}
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
              {t("ExitAndTransport")}
            </Button>
            {station.station.schemes[0] && (
              <Button onClick={() => setopenschema(true)}>
                {t("SchemaStation")}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[28px] font-medium!">{t("ArrivalTrains")}</h1>
            <div className="flex flex-col gap-[15px]">
              {connects.map((data, index) => (
                <AnimatePresence key={index} mode="wait">
                  {data.wagon && data.station && (
                    <div className="flex flex-col relative gap-[8px]">
                      <span className="text-[var(--primary-muted-color)]!">
                        {t("TowardsStation", {
                          station:
                            data.station.name[i18next.language as AllLang],
                        })}
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
                            ? t("After", { time: Time(data.wagon.arrivalTime) })
                            : t("Arrived")}
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
              {t("LastUpdateDataTime", { time: TimeForDate(lastupdate) })}
            </span>
            <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
            {Object.keys(station.station.scheduleTrains).length != 0 && (
              <Button onClick={() => setopenschedule(true)}>
                {t("FirstLastTrains")}
              </Button>
            )}
            <Button
              href={
                TypePlatform == "vk" &&
                `https://yandex.ru/maps/?ll=${station.station.location.lon}%2C${station.station.location.lat}&mode=search&sll=${station.station.location.lon}%2C${station.station.location.lat}&text=${station.station.location.lat}%2C${station.station.location.lon}&z=18.58`
              }
              onClick={() =>
                TypePlatform == "tg" &&
                openLink(
                  `https://yandex.ru/maps/?ll=${station.station.location.lon}%2C${station.station.location.lat}&mode=search&sll=${station.station.location.lon}%2C${station.station.location.lat}&text=${station.station.location.lat}%2C${station.station.location.lon}&z=18.58`
                )
              }
            >
              {t("StationonMap")}
            </Button>
          </div>
          {station.station.services.length > 0 && (
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-[28px] font-medium!">
                {t("ServiceonStation")}
              </h1>
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
                        <span className="w-[90%]">{t(info.text)}</span>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[28px] font-medium!">{t("Favorites")}</h1>
            <Button
              onClick={() =>
                dispatch(
                  setFavoritesSave({
                    stationid: station.station.id,
                  })
                )
              }
            >
              {favoritessave.includes(station.station.id)
                ? t("DelFavorites")
                : t("AddFavorites")}
            </Button>
          </div>
        </div>
      </>
      <PageAnimation
        open={openexit}
        className="flex flex-col gap-[10px]"
        backfunction={() => setopenexit(false)}
        backbuttondisabled={TypePlatform != "vk"}
        headertitle={
          <h1 className="text-[28px] font-medium! break-all w-[90%]">
            {t("ExitAndTransport")}
          </h1>
        }
        back={true}
      >
        <InfoExit station={station} />
      </PageAnimation>
      <PageAnimation
        open={openschema}
        className="flex flex-col gap-[5px]"
        backfunction={() => setopenschema(false)}
        back={true}
        style={{ padding: "0" }}
        headerbackbuttonfixed={TypePlatform == "vk"}
      >
        <InfoSchema station={station} />
      </PageAnimation>
      <PageAnimation
        open={openschedule}
        className="flex flex-col gap-[5px] p-[16px]!"
        backfunction={() => setopenschedule(false)}
        backbuttondisabled={TypePlatform != "vk"}
        back={true}
        headertitle={t("FirstLastTrains")}
      >
        <InfSchedule station={station} />
      </PageAnimation>
    </>
  );
}

export default InfoStationAll;
