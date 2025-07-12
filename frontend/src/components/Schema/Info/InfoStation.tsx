import { Store, schema, station, line, wagons, connectinfo } from "@/type";

import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import { memo, useEffect, useState } from "react";
import InfoStationAll from "./InfoStationAll";
import axios from "axios";
import Next from "@/svg/next";
import Time from "@/function/Time";
import Warn from "@/svg/warn";
import TimeForDate from "@/function/TimeForDate";
import PageAnimation from "@/components/PageAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import CopySVG from "@/svg/copy";
import ShareSVG from "@/svg/share";
import { shareURL } from "@telegram-apps/sdk-react";
import Copy from "@/function/Copy";
import {
  setinfoselectstation,
  setinfostation,
  setsnackbar,
} from "@/redux/info";
import { useTranslation } from "react-i18next";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";
import handleStation from "@/function/handlestation";
import bridge from "@vkontakte/vk-bridge";
import TimeSeconds from "@/function/TimeSeconds";
import CloseSVG from "@/svg/close";

const InfoStation = memo(() => {
  const { t } = useTranslation();

  const [station, setstation] = useState<{
    station: station;
    line: line;
  } | null>(null);
  const [connects, setconnects] = useState<Array<connectinfo>>([]);
  const [infostationall, setinfostationall] = useState(false);
  const [lastupdate, setlastupdate] = useState<Date>(new Date());

  const dispatch = useDispatch();

  const infostation = useSelector((data: Store) => data.info.infostation);
  const selectinfostation = useSelector(
    (data: Store) => data.info.infoselectstation
  );

  const region = useSelector((data: Store) => data.info.region);
  const schema = useSelector((data: Store) => data.schema) as schema;
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  const notifications = useSelector(
    (data: Store) => data.notifications
  )?.filter(
    (data) =>
      station &&
      data.stations.find((data) => data.stationId == station.station.id)
  );

  useEffect(() => {
    if (infostation && infostation[selectinfostation].station) {
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

  const backfunction = () => {
    dispatch(setinfostation(null));
  };

  const handleaxios = (response: {
    data: {
      data: wagons;
    };
  }) => {
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

      const intervalid = setInterval(() => {
        if (infostation) {
          axios
            .get(
              `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
                station.station.id
              }/wagons`
            )
            .then(handleaxios);

          setlastupdate(new Date());
        }
      }, 10000);

      const intervalid2 = setInterval(() => {
        if (infostation) {
          setconnects((prev) =>
            prev.map((data) => {
              if (data.wagon) {
                return {
                  ...data,
                  wagon: {
                    ...data.wagon,
                    arrivalTime: data.wagon.arrivalTime - 1,
                  },
                };
              } else {
                return data;
              }
            })
          );
        }
      }, 1000);

      return () => {
        clearInterval(intervalid);
        clearInterval(intervalid2);
      };
    }
  }, [station]);

  const workstation =
    station &&
    (!station.station.workTime[lastupdate.getDay()].open ||
      !station.station.workTime[lastupdate.getDay()].close)
      ? true
      : station &&
        TimeSeconds(TimeForDate(lastupdate)) >=
          TimeSeconds(station.station.workTime[lastupdate.getDay()].open) &&
        (TimeSeconds(TimeForDate(lastupdate)) >=
          TimeSeconds(station.station.workTime[lastupdate.getDay()].close) ||
          TimeSeconds(station.station.workTime[lastupdate.getDay()].open) >=
            TimeSeconds(station.station.workTime[lastupdate.getDay()].close));

  return (
    station && (
      <PageAnimation
        open={Boolean(infostation)}
        backfunction={() => {
          dispatch(setinfostation(null));
        }}
        className="h-auto!"
        contentheight={true}
        back={true}
        headeractive={true}
      >
        <div className="flex flex-col gap-[15px]">
          {infostation && infostation.length > 1 && (
            <div className="flex gap-[10px]">
              {infostation.map((station, index) => {
                return (
                  <button
                    key={index}
                    className="bg-[var(--primary-color)] rounded-[10px] p-[5px]! border-solid border-[1px]"
                    onClick={() => {
                      dispatch(setinfoselectstation(index));
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
            <div className="w-full flex justify-between items-center gap-[16px]">
              <div className="w-full truncate">
                <h1 className="text-[28px] font-medium! truncate">
                  {station.station.name[i18next.language as AllLang]}
                </h1>
              </div>
              {TypePlatform == "vk" && (
                <button
                  onClick={() => {
                    backfunction && backfunction();
                  }}
                  className="h-[28px] w-[28px] p-[8px]! bg-[var(--primary-button)] rounded-[999px]"
                >
                  <CloseSVG />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between">
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
              <div className="flex gap-[8px]">
                <button
                  onClick={() => {
                    let url = "";
                    if (TypePlatform == "vk") {
                      url = `https://vk.com/app53543259#${btoa(
                        encodeURIComponent(
                          JSON.stringify({ station: station.station.id })
                        )
                      )}`;
                    } else {
                      url = `https://t.me/MetroNavigatorBot/${region}?startapp=${btoa(
                        encodeURIComponent(
                          JSON.stringify({ station: station.station.id })
                        )
                      )}`;
                    }

                    Copy(url);
                    dispatch(
                      setsnackbar({
                        time: 5000,
                        title: t("TitleCopy"),
                        text: t("TextCopyStation", {
                          station: `${
                            station.station.name[i18next.language as AllLang]
                          } (${station.station.id})`,
                        }),
                        icon: "copy",
                      })
                    );
                  }}
                  className="p-[8px]! bg-[var(--primary-button)] rounded-[999px]"
                >
                  <CopySVG />
                </button>
                <button
                  className="p-[8px]! bg-[var(--primary-button)] rounded-[999px]"
                  onClick={() => {
                    if (TypePlatform == "tg") {
                      shareURL(
                        t(`ShareStation${region}`, {
                          station: `${
                            station.station.name[i18next.language as AllLang]
                          } (${station.station.id})`,
                          url: `https://t.me/MetroNavigatorBot/${region}?startapp=${btoa(
                            encodeURIComponent(
                              JSON.stringify({ station: station.station.id })
                            )
                          )}`,
                        })
                      );
                    } else {
                      /*
                      t(`ShareStation${region}`, {
                          station: `${
                            station.station.name[i18next.language as AllLang]
                          } (${station.station.id})`,
                          url: `https://vk.com/app53543259#${btoa(
                            encodeURIComponent(
                              JSON.stringify({ station: station.station.id })
                            )
                          )}`
                      */

                      bridge.send("VKWebAppShare", {
                        link: `https://vk.com/app53543259#${btoa(
                          encodeURIComponent(
                            JSON.stringify({ station: station.station.id })
                          )
                        )}`,
                      });
                    }
                  }}
                >
                  <ShareSVG />
                </button>
              </div>
            </div>
            {station.station.workTime[lastupdate.getDay()] &&
              station.station.workTime[lastupdate.getDay()].open &&
              station.station.workTime[lastupdate.getDay()].close && (
                <span className="text-[var(--primary-muted-color)]!">
                  {workstation
                    ? t("OpenHours", {
                        from: station.station.workTime[lastupdate.getDay()]
                          .open,
                        to: station.station.workTime[lastupdate.getDay()].close,
                      })
                    : t("NotWorkingToday")}
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
              disabled={!workstation}
              onClick={() => {
                handleStation("A")(
                  station ? station.station.id : null,
                  dispatch
                );
                backfunction();
              }}
            >
              {t("From")}
            </Button>
            <Button
              disabled={!workstation}
              onClick={() => {
                handleStation("B")(
                  station ? station.station.id : null,
                  dispatch
                );
                backfunction();
              }}
            >
              {t("Here")}
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
                              {data.station.name[i18next.language as AllLang]}
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
                                  : t("Arrived")
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
            {t("InfoStation")}
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
            backbuttondisabled={TypePlatform != "vk"}
            headertitle={
              <h1 className="text-[28px] font-medium!">
                {station.station.name[i18next.language as AllLang]}
              </h1>
            }
          >
            <InfoStationAll
              station={station}
              connects={connects}
              lastupdate={lastupdate}
              transfer={infostation}
            />
          </PageAnimation>
        )}
      </PageAnimation>
    )
  );
});

export default InfoStation;
