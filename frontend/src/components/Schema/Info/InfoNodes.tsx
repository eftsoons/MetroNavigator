import Button from "@/components/Button";
import PageAnimation from "@/components/PageAnimation";
import StationInput from "@/components/Stationinput";
import TimeForDate from "@/function/TimeForDate";
import Time from "@/function/TimeToMinits";
import Switch from "@/svg/switch";
import { Store } from "@/type";
import { memo, useState } from "react";
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

const InfoNodes = memo(
  ({
    opennodes,
    openerrorroute,
    setopennodes,
    setopenerrorroute,
    reloadnodes,
  }: {
    opennodes: boolean;
    openerrorroute: boolean;
    setopennodes: Function;
    setopenerrorroute: Function;
    reloadnodes: () => void;
  }) => {
    const { t } = useTranslation();

    const [opendetalis, setopendetalis] = useState(false);

    const dispatch = useDispatch();

    const Astation = useSelector((data: Store) => data.info.Astation);
    const Bstation = useSelector((data: Store) => data.info.Bstation);
    const nodes = useSelector((data: Store) => data.info.nodes);
    const selectnode = useSelector((data: Store) => data.info.selectnode);
    const infostation = useSelector((data: Store) => data.info.infostation);
    const TypePlatform = useSelector(
      (data: Store) => data.platform.TypePlatform
    );

    const time = Date.now();

    const backfunction = () => {
      setopennodes(false);
    };

    return (
      <PageAnimation
        open={(opennodes && !Boolean(infostation)) || openerrorroute}
        className="h-auto!"
        contentheight={true}
        backbuttondisabled={!openerrorroute}
        backfunction={() => {
          setopennodes(false);
          if (openerrorroute) {
            dispatch(setAstation(null));
            dispatch(setBstation(null));

            setopenerrorroute(false);
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
                      onClick={backfunction}
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
                className="w-full"
              >
                {nodes.map((data, index) => {
                  const minuts = Number(Time(data.time));

                  const times = new Date(time + minuts * 60 * 1000);

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
                          <span className="text-(--primary-muted-color)!">
                            ~{TimeForDate(times)}
                          </span>
                        </div>
                        <div className="flex w-full">
                          {t("NumTransfers", { count: data.transfer })}
                        </div>
                        <div className="flex gap-[5px]">
                          {data.infonode.line.map(
                            (data, index) =>
                              data.type == "line" && (
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
                <InfoNodesDetalis node={nodes[selectnode]} />
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
