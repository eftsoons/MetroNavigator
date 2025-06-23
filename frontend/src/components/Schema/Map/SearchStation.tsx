import Button from "@/components/Button";
import { AppDispatch } from "@/redux";
import { clearRouteSave } from "@/redux/userinfo";
import NextSVG from "@/svg/next";
import { station, Store, schema, line } from "@/type";
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import i18next, { t } from "i18next";
import { AllLang } from "@/locales/i18n";
import PageAnimation from "@/components/PageAnimation";
import { setAstation, setBstation, setsearchstation } from "@/redux/info";
import handleStation from "@/function/handlestation";

const SearchStation = memo(() => {
  const [textsearch, settextsearch] = useState("");
  const [open, setopen] = useState(true);

  const schema = useSelector((data: Store) => data.schema) as schema;
  const favoritessave = useSelector(
    (data: Store) => data.userinfo.favoritessave
  );

  const routesave = useSelector((data: Store) => data.userinfo.routesave)
    .map((data) => {
      const infostationstart = schema.stations.find(
        (station) => station.id == data.start
      ) as station;

      const infolinestart = schema.lines.find(
        (line) => infostationstart.lineId == line.id
      ) as line;

      const infostationend = schema.stations.find(
        (station) => station.id == data.end
      ) as station;

      const infolineend = schema.lines.find(
        (line) => infostationend.lineId == line.id
      ) as line;

      if (infostationstart && infolinestart && infostationend && infolineend) {
        return {
          infostationstart: infostationstart,
          infolinestart: infolinestart,
          infostationend: infostationend,
          infolineend: infolineend,
          start: data.start,
          end: data.end,
        };
      } else {
        return null;
      }
    })
    .filter(Boolean) as Array<{
    infostationstart: station;
    infolinestart: line;
    infostationend: station;
    infolineend: line;
    start: number;
    end: number;
  }>;

  const searchstation = useSelector((data: Store) => data.info.searchstation);
  const astationid = useSelector((data: Store) => data.info.Astation);
  const bstationid = useSelector((data: Store) => data.info.Bstation);

  const AppPlatform = useSelector((data: Store) => data.platform.AppPlatform);

  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  const station = JSON.parse(JSON.stringify(schema.stations)).sort(
    (a: station, b: station) => {
      const namea = a.name.ru.toLowerCase();
      const nameb = b.name.ru.toLowerCase();
      if (namea < nameb) {
        return -1;
      } else if (namea > nameb) {
        return 1;
      }
      return 0;
    }
  ) as Array<station>;

  const lines = schema.lines;

  const dispatch = useDispatch<AppDispatch>();

  const handlebackfunction = () => {
    setopen(false);

    setTimeout(() => {
      dispatch(setsearchstation(null));
    }, 500);
  };

  const handlestation = (stationId: number | null) => {
    if (searchstation == "A") {
      dispatch(setAstation(stationId));
    } else {
      dispatch(setBstation(stationId));
    }
  };

  const stationsearch = useMemo(
    () =>
      station.filter(
        (data) =>
          (data.name.ru
            .toLocaleLowerCase()
            .includes(textsearch.toLocaleLowerCase()) ||
            data.name.en
              .toLocaleLowerCase()
              .includes(textsearch.toLocaleLowerCase())) &&
          data.id != astationid &&
          data.id != bstationid
      ),
    [astationid, bstationid, textsearch, station]
  );

  return (
    <PageAnimation
      open={open}
      back={true}
      backfunction={() => {
        setopen(false);
        setTimeout(() => {
          dispatch(setsearchstation(null));
        }, 500);
      }}
      backbuttondisabled={true}
      headeractive={TypePlatform == "vk"}
      className="w-full h-full flex flex-col gap-[12px] z-1"
    >
      <div className="h-full flex flex-col gap-[20px]">
        <div className="flex gap-[15px] items-center">
          <input
            id="searchstation"
            className="bg-[var(--primary-color)]! rounded-[10px] p-[16px]! w-full"
            placeholder={t("SearchStation")}
            onChange={(e) => settextsearch(e.target.value)}
          />
          {/*<button
          onClick={backfunction}
          className="h-[28px] w-[28px] p-[8px]! bg-[var(--primary-button)] rounded-[999px]"
        >
          <CloseSVG />
        </button>*/}
        </div>
        {textsearch.toLocaleLowerCase() == "" &&
          (favoritessave.length > 0 || routesave.length > 0) && (
            <div className="flex flex-col gap-[8px]">
              {routesave.length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-medium!">
                      {t("PastRoutes")}
                    </h1>
                    <Button
                      className="w-auto! h-auto! p-[4px]! hidden"
                      onClick={() => dispatch(clearRouteSave())}
                    >
                      {t("Clear")}
                    </Button>
                  </div>
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={8}
                    modules={[Mousewheel]}
                    mousewheel={{
                      enabled: true,
                    }}
                    className="w-full bg-(--primary-color) rounded-[10px] p-[8px]!"
                  >
                    {routesave.map((data, index) => {
                      const {
                        infostationstart,
                        infolinestart,
                        infostationend,
                        infolineend,
                        start,
                        end,
                      } = data;

                      return (
                        <SwiperSlide
                          key={index}
                          onClick={() => {
                            handleStation("A")(start, dispatch);
                            handleStation("B")(end, dispatch);
                            handlebackfunction();
                          }}
                        >
                          <div className="flex justify-around items-center border-solid border-[2px] border-(--primary-border-color) rounded-[10px] p-[8px]! cursor-pointer h-full">
                            <div className="flex flex-col gap-[8px] justify-center items-center w-full">
                              <img
                                className="w-[25px] h-[25px] object-contain"
                                src={infolinestart.icon}
                              />
                              <span className="text-center text-[14px]">
                                {
                                  infostationstart.name[
                                    i18next.language as AllLang
                                  ]
                                }
                              </span>
                            </div>
                            <div className="flex justify-center items-center">
                              <div className="h-[50px] w-[50px] rotate-90">
                                <NextSVG />
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px] justify-center items-center w-full">
                              <img
                                className="w-[25px] h-[25px] object-contain"
                                src={infolineend.icon}
                              />
                              <span className="text-center text-[14px]">
                                {
                                  infostationend.name[
                                    i18next.language as AllLang
                                  ]
                                }
                              </span>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              )}
              {favoritessave.length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <h1 className="text-[20px] font-medium!">{t("Favorites")}</h1>
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={8}
                    modules={[Mousewheel]}
                    mousewheel={{
                      enabled: true,
                    }}
                    className="w-full bg-(--primary-color) rounded-[10px] p-[8px]!"
                  >
                    {favoritessave.map((data, index) => {
                      const infostation = schema.stations.find(
                        (station) => station.id == data
                      ) as station;

                      const infoline = schema.lines.find(
                        (line) => infostation.lineId == line.id
                      ) as line;

                      return (
                        <SwiperSlide
                          key={index}
                          style={{ width: "auto" }}
                          onClick={() => {
                            handlestation(infostation.id);
                            handlebackfunction();
                          }}
                        >
                          <div className="flex flex-col w-[100px] gap-[6px] justify-center  items-center h-full border-solid border-[2px] border-(--primary-border-color) rounded-[10px] p-[8px]! cursor-pointer">
                            <img
                              className="w-[20px] h-[20px] object-contain"
                              src={infoline.icon}
                            />
                            <span className="text-center text-[14px]">
                              {infostation.name[i18next.language as AllLang]}
                            </span>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              )}
            </div>
          )}
        <div
          className="flex flex-col gap-[10px] h-full"
          style={{
            paddingBottom: ["macos", "ios", "mobile_iphone "].includes(
              AppPlatform
            )
              ? "34px"
              : "16px",
          }}
        >
          {stationsearch.length > 0 ? (
            stationsearch.map((station) => {
              const line = lines.find((line) => line.id == station.lineId);

              return (
                <div
                  key={station.id}
                  className="flex gap-[15px] items-center overflow-x-visible! cursor-pointer"
                  onClick={() => {
                    handlestation(station.id);
                    handlebackfunction();
                  }}
                >
                  <img
                    className="h-[30px] w-[30px] object-contain"
                    src={line?.icon}
                  />
                  <div>
                    <h1>{station.name[i18next.language as AllLang]}</h1>
                    <p className="text-[14px] text-[var(--primary-muted-color)]!">
                      {line?.name[i18next.language as AllLang]
                        ? line?.name[i18next.language as AllLang]
                        : line?.name.ru}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-full flex-col">
              <span className="text-[var(--primary-muted-color)]!">
                Станции по вашему запросу не найдены
              </span>
            </div>
          )}
        </div>
      </div>
    </PageAnimation>
  );
});

export default SearchStation;
