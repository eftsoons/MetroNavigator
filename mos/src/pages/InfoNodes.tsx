import Button from "@/components/Button";
import PageAnimation from "@/components/PageAnimation";
import StationInput from "@/components/Stationinput";
import TimeForDate from "@/function/TimeForDate";
import Time from "@/function/TimeToMinits";
import Switch from "@/svg/switch";
import { nodes } from "@/type";
import { useState } from "react";
import InfoNodesDetalis from "./InfoNodesDetalis";
import CloseSVG from "@/svg/close";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";

function InfoNodes({
  setAstation,
  setBstation,
  setsearchAstation,
  setsearchBstation,
  Astation,
  Bstation,
  nodes,
  selectnode,
  setselectnode,
  backfunction,
  openerrorroute,
  reloadnodes,
}: {
  setAstation: (id: number | null) => void;
  setBstation: (id: number | null) => void;
  setsearchAstation: (bool: boolean) => void;
  setsearchBstation: (bool: boolean) => void;
  Astation: number | null;
  Bstation: number | null;
  nodes: nodes;
  selectnode: number | null;
  setselectnode: (id: number) => void;
  backfunction: () => void;
  openerrorroute: boolean;
  reloadnodes: () => void;
}) {
  const [opendetalis, setopendetalis] = useState(false);

  const time = Date.now();

  return !openerrorroute ? (
    <>
      <div className="flex flex-col gap-[20px] max-h-[100%]">
        <div className="w-full flex bg-[var(--primary-bg)] rounded-[10px] gap-[10px] items-center">
          <div className="w-full flex flex-col gap-[8px] min-w-[60%]">
            <StationInput
              stationid={Astation}
              setstationid={setAstation}
              type="A"
              onClick={() => setsearchAstation(true)}
            />
            <StationInput
              stationid={Bstation}
              setstationid={setBstation}
              type="B"
              onClick={() => setsearchBstation(true)}
            />
          </div>
          <div className="max-w-[40%] flex gap-[10px] items-center">
            <div className="w-[50px] h-[50px] flex items-center">
              <button
                onClick={() => {
                  const astation = Astation;
                  setAstation(Bstation);
                  setBstation(astation);
                }}
                className="w-[50px] h-[50px]"
              >
                <Switch />
              </button>
            </div>
            <div className="h-[30px] w-[30px] flex items-center p-[8px]! bg-(--primary-button) rounded-[999px]">
              <button onClick={backfunction} className="w-[30px] h-[30px]">
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
                    setselectnode(index);
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
                    <span>{minuts} м</span>
                    <span className="text-(--primary-muted-color)!">
                      ~{TimeForDate(times)}
                    </span>
                  </div>
                  <div className="flex w-full">
                    {!data.transfer || data.transfer == 0
                      ? "Без пересадок"
                      : data.transfer == 1
                      ? "1 пересадка"
                      : `${data.transfer} пересадки`}
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
        <Button onClick={() => setopendetalis(true)}>Детали маршрута</Button>
      </div>
      {(selectnode || selectnode == 0) && nodes[selectnode] && (
        <PageAnimation
          open={opendetalis}
          backfunction={() => {
            setopendetalis(false);
          }}
          className="flex flex-col gap-[12px] z-1"
          backbuttondisabled={true}
          back={true}
        >
          <InfoNodesDetalis node={nodes[selectnode]} />
        </PageAnimation>
      )}
    </>
  ) : (
    <div className="flex flex-col gap-[16px] justify-center items-center h-[100px]">
      <span className="h-[28px]">Ошибка загрузки машрута!</span>
      <Button onClick={reloadnodes}>Перезагрузить</Button>
    </div>
  );
}

export default InfoNodes;
