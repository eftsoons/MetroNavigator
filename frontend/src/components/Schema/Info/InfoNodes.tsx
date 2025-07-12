import Button from "@/components/Button";
import PageAnimation from "@/components/PageAnimation";
import StationInput from "@/components/Stationinput";
import TimeForDate from "@/function/TimeForDate";
import Time from "@/function/TimeToMinits";
import Switch from "@/svg/switch";
import { Store } from "@/type";
import { memo, useEffect, useState } from "react";
import InfoNodesDetalis from "./InfoNodesDetalis";
import CloseSVG from "@/svg/close";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setAstation,
  setBstation,
  setsearchstation,
  setselectnode,
} from "@/redux/info";
import TimeSeconds from "@/function/TimeSeconds";

const InfoNodes = memo(
  ({
    opennodes,
    openerrorroute,
    nodesrouteback,
    errorrouteback,
    reloadnodes,
  }: {
    opennodes: boolean;
    openerrorroute: boolean;
    nodesrouteback: Function;
    errorrouteback: Function;
    reloadnodes: () => void;
  }) => {
    const { t } = useTranslation();

    const [opendetalis, setopendetalis] = useState(false);

    const dispatch = useDispatch();

    const Astation = useSelector((data: Store) => data.info.Astation);
    const Bstation = useSelector((data: Store) => data.info.Bstation);
    const nodes = useSelector((data: Store) => data.info.nodes);
    const selectnode = useSelector((data: Store) => data.info.selectnode);
    const TypePlatform = useSelector(
      (data: Store) => data.platform.TypePlatform
    );

    const [lastupdate, setlastupdate] = useState(new Date());

    useEffect(() => {
      const intervalid = setInterval(() => {
        if (opennodes || openerrorroute) {
          setlastupdate(new Date());
        }
      }, 10000);

      return () => clearInterval(intervalid);
    }, []);

    return (
      <PageAnimation
        open={opennodes || openerrorroute}
        className="h-auto!"
        contentheight={true}
        headerbackbuttonfixed={openerrorroute}
        backfunction={() => {
          nodesrouteback();
          if (openerrorroute) {
            errorrouteback();
          }
        }}
        back={true}
        headeractive={true}
        style={{ zIndex: "-1" }}
      >
        {!openerrorroute ? (
          <>
            <div className="flex flex-col gap-[20px] max-h-[100%]">
              <div className="w-full flex bg-[var(--primary-bg)] rounded-[10px] gap-[10px] items-center">
                <div className="w-full flex flex-col gap-[8px] min-w-[60%]">
                  <StationInput
                    stationid={Astation}
                    setstationid={(stationid) =>
                      dispatch(setAstation(stationid))
                    }
                    type="A"
                    onClick={() => dispatch(setsearchstation("A"))}
                  />
                  <StationInput
                    stationid={Bstation}
                    setstationid={(stationid) =>
                      dispatch(setBstation(stationid))
                    }
                    type="B"
                    onClick={() => dispatch(setsearchstation("B"))}
                  />
                </div>
                <div className="max-w-[40%] flex gap-[10px] items-center">
                  <div className="w-[50px] h-[50px] flex items-center">
                    <button
                      onClick={() => {
                        const astation = Astation;
                        dispatch(setAstation(Bstation));
                        dispatch(setBstation(astation));
                      }}
                      className="w-[50px] h-[50px]"
                    >
                      <Switch />
                    </button>
                  </div>
                  <div className="h-[30px] w-[30px] flex items-center p-[8px]! bg-(--primary-button) rounded-[999px]">
                    <button
                      onClick={() => nodesrouteback()}
                      className="w-[30px] h-[30px]"
                    >
                      <CloseSVG />
                    </button>
                  </div>
                </div>
              </div>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                modules={[Mousewheel]}
                mousewheel={{
                  enabled: true,
                }}
                className="w-full pr-[20px]!"
              >
                {nodes.map((data, index) => {
                  const minuts = Number(Time(data.time));

                  const times = new Date(lastupdate);

                  times.setMinutes(times.getMinutes() + minuts);

                  const allworkstation = data.infonode.every(
                    (data) =>
                      data.type == "transfer" ||
                      data.station.some(
                        (data) =>
                          !data.workTime[times.getDay()].open ||
                          !data.workTime[times.getDay()].close ||
                          (TimeSeconds(TimeForDate(times)) >=
                            TimeSeconds(data.workTime[times.getDay()].open) &&
                            (TimeSeconds(TimeForDate(times)) >=
                              TimeSeconds(
                                data.workTime[times.getDay()].close
                              ) ||
                              TimeSeconds(data.workTime[times.getDay()].open) >=
                                TimeSeconds(
                                  data.workTime[times.getDay()].close
                                )))
                      )
                  );

                  return (
                    <SwiperSlide key={index} style={{ width: "auto" }}>
                      <button
                        onClick={() => {
                          dispatch(setselectnode(index));
                        }}
                        key={index}
                        className="border-solid border-[1px] p-[16px]! rounded-[10px] flex flex-col gap-[5px]"
                        style={{
                          borderColor:
                            index == selectnode
                              ? "var(--primary-text)"
                              : "var(--primary-border-color)",
                        }}
                      >
                        <div className="flex gap-[5px]">
                          <span>
                            {minuts} {t("m")}
                          </span>
                          {allworkstation && (
                            <span className="text-(--primary-muted-color)!">
                              ~{TimeForDate(times)}
                            </span>
                          )}
                        </div>
                        <div className="flex w-full">
                          {t("NumTransfers", { count: data.transfer })}
                        </div>
                        <div className="flex gap-[5px]">
                          {data.infonode.map(
                            (data, index) =>
                              data.type == "connect" && (
                                <div
                                  key={index}
                                  className="flex items-center gap-[5px]"
                                >
                                  {index != 0 && (
                                    <div className="h-[4px] w-[4px] rounded-[999px] bg-(--primary-muted-color)" />
                                  )}
                                  <img
                                    className="h-[15px] w-[15px] object-contain"
                                    src={data.line.icon}
                                  />
                                </div>
                              )
                          )}
                        </div>
                      </button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Button onClick={() => setopendetalis(true)}>
                {t("DetalisRoute")}
              </Button>
            </div>
            {(selectnode || selectnode == 0) && nodes[selectnode] && (
              <PageAnimation
                open={opendetalis}
                backfunction={() => {
                  setopendetalis(false);
                }}
                className="flex flex-col gap-[12px] z-1"
                backbuttondisabled={TypePlatform != "vk"}
                back={true}
                headerbackbuttonfixed={TypePlatform == "vk"}
              >
                <InfoNodesDetalis
                  node={nodes[selectnode]}
                  lastupdate={lastupdate}
                />
              </PageAnimation>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-[16px] justify-center items-center h-[100px]">
            <span className="h-[28px]">{t("ErrorRoute")}</span>
            <Button onClick={reloadnodes}>{t("Reload")}</Button>
          </div>
        )}
      </PageAnimation>
    );
  }
);

export default InfoNodes;
