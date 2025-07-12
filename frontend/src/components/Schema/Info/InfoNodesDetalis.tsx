import PeopleSVG from "@/svg/people";
import Time from "@/function/TimeToMinits";
import { node, wagon, wagons } from "@/type";
import TimeForDate from "@/function/TimeForDate";
import Time2 from "@/function/Time";
import Vagon1 from "@/svg/vagon1";
import Vagon from "@/svg/vagon";
import VagonVariant from "@/svg/vagonvariant";
import { useEffect, useState } from "react";
import axios from "axios";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";
import { useTranslation } from "react-i18next";
import Warn from "@/svg/warn";
import TimeSeconds from "@/function/TimeSeconds";

function InfoNodesDetalis({
  node,
  lastupdate,
}: {
  node: node;
  lastupdate: Date;
}) {
  const { t } = useTranslation();

  let time = lastupdate.getTime();

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem]">
        <div className="flex items-center w-full h-full justify-center">
          <div className="h-full w-[0.8em] fill-(--primary-muted-color)">
            <PeopleSVG />
          </div>
        </div>
        <div className="flex items-center w-full h-full justify-center">
          <div className="w-[1rem] h-[1rem] rounded-[999px] border-solid border-[4px] border-(--primary-muted-color)" />
        </div>
        <span>{t("GoStation")}</span>
      </div>
      <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem]">
        <div />
        <div className="flex flex-col gap-[4px] justify-center items-center">
          <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
          <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
          <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
        </div>
      </div>
      <div>
        {node.infonode.map((datainfo, index) => {
          const timestart = time;
          time += Number(Time(datainfo.pathLength)) * 60 * 1000;

          if (datainfo.type == "connect") {
            const [infowagon, setinfowagon] = useState<wagon | undefined>();

            const handleaxios = (response: {
              data: {
                data: wagons;
              };
            }) => {
              if (datainfo.station && datainfo.station.length > 1) {
                const info = response.data.data[datainfo.station[1].id];

                setinfowagon(info ? info[0] : undefined);
              }
            };

            useEffect(() => {
              if (datainfo.station.length > 1) {
                axios
                  .get(
                    `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
                      datainfo.station[0].id
                    }/wagons`
                  )
                  .then(handleaxios);

                const intervalid = setInterval(() => {
                  axios
                    .get(
                      `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
                        datainfo.station[0].id
                      }/wagons`
                    )
                    .then(handleaxios);
                }, 10000);

                const intervalid2 = setInterval(() => {
                  setinfowagon((prev) => {
                    if (prev) {
                      return { ...prev, arrivalTime: prev.arrivalTime - 1 };
                    } else {
                      return undefined;
                    }
                  });
                }, 1000);

                return () => {
                  clearInterval(intervalid);
                  clearInterval(intervalid2);
                };
              }
            }, []);

            const timecheck = new Date(time);

            const allworkstation = datainfo.station.some(
              (data) =>
                !data.workTime[timecheck.getDay()].open ||
                !data.workTime[timecheck.getDay()].close ||
                (TimeSeconds(TimeForDate(timecheck)) >=
                  TimeSeconds(data.workTime[timecheck.getDay()].open) &&
                  (TimeSeconds(TimeForDate(timecheck)) >=
                    TimeSeconds(data.workTime[timecheck.getDay()].close) ||
                    TimeSeconds(data.workTime[timecheck.getDay()].open) >=
                      TimeSeconds(data.workTime[timecheck.getDay()].close)))
            );

            return datainfo.station.map((data, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem] grid-rows-[60px]">
                    <div className="flex items-center w-full h-full justify-center">
                      {datainfo.station.length == 1 ||
                      index == datainfo.station.length - 1 ? (
                        allworkstation && (
                          <span className="text-[14px] color-(--primary-muted-color)">
                            {TimeForDate(new Date(time), "minuts")}
                          </span>
                        )
                      ) : index == 0 ? (
                        allworkstation && (
                          <span className="text-[14px] color-(--primary-muted-color)">
                            {TimeForDate(new Date(timestart), "minuts")}
                          </span>
                        )
                      ) : (
                        <div
                          className="w-[1rem] h-[1rem] rounded-[999px]"
                          style={{ backgroundColor: datainfo.line.color }}
                        />
                      )}
                    </div>
                    <div className="flex items-center w-full h-full justify-center">
                      {index == 0 ? (
                        <img
                          className="w-[1.5rem] object-contain"
                          src={datainfo.line.icon}
                        />
                      ) : index == datainfo.station.length - 1 ? (
                        <div
                          className="w-[1rem] h-[1rem] rounded-[999px] border-solid border-[4px]"
                          style={{ borderColor: datainfo.line.color }}
                        />
                      ) : (
                        <div
                          className="h-full w-[0.4rem]"
                          style={
                            index == 1 && index == datainfo.station.length - 2
                              ? {
                                  borderRadius: "8px",
                                  backgroundColor: datainfo.line.color,
                                }
                              : index == 1
                              ? {
                                  borderTopLeftRadius: "8px",
                                  borderTopRightRadius: "8px",
                                  backgroundColor: datainfo.line.color,
                                }
                              : index == datainfo.station.length - 2
                              ? {
                                  borderBottomLeftRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                  backgroundColor: datainfo.line.color,
                                }
                              : { backgroundColor: datainfo.line.color }
                          }
                        />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span>{data.name[i18next.language as AllLang]}</span>
                        {index == 0 && (
                          <span className="text-[12px]">
                            {datainfo.line.name[i18next.language as AllLang]
                              ? datainfo.line.name[i18next.language as AllLang]
                              : datainfo.line.name.ru}
                          </span>
                        )}
                      </div>
                      {index == 0 && datainfo.station.length > 1 && (
                        <span className="text-[14px] whitespace-nowrap text-(--primary-muted-color)!">
                          {Time(datainfo.pathLength)} {t("min")}
                        </span>
                      )}
                    </div>
                  </div>
                  {datainfo.notifications &&
                    datainfo.notifications.length > 0 &&
                    index == 0 && (
                      <div className="p-[12px]! my-[10px]! w-full bg-[var(--primary-warn)] border-solid border-[1px] border-[var(--primary-border-warn)] rounded-[10px] max-h-[100px] overflow-x-hidden">
                        <div className="gap-[10px] flex flex-col">
                          {datainfo.notifications.map((data, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-[10px]"
                            >
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
                  {(infowagon || (datainfo.wagon && datainfo.wagon)) &&
                    index == 0 && (
                      <div className="flex p-[16px]! bg-[var(--primary-color)] rounded-[10px] flex-col overflow-hidden gap-[8px] my-[16px]!">
                        <span
                          style={{
                            color:
                              infowagon && infowagon.arrivalTime <= 0
                                ? "var(--primary-accept)"
                                : "var(--primary-muted-color)",
                          }}
                        >
                          {infowagon
                            ? infowagon.arrivalTime >= 0
                              ? t("After", {
                                  time: Time2(infowagon.arrivalTime),
                                })
                              : t("Arrived")
                            : t("AfterNot")}
                        </span>
                        <div className="flex gap-[5px]">
                          {infowagon
                            ? Object.entries(infowagon.wagons).map(
                                ([_, key], index) => (
                                  <div
                                    key={index}
                                    className="h-[30px] w-[30px] flex flex-col gap-[5px] fill-(--primary-text)"
                                  >
                                    <div
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
                                    {datainfo.wagon && (
                                      <>
                                        {datainfo.wagon.types.includes(
                                          "ALL"
                                        ) && <VagonVariant />}
                                        {datainfo.wagon.types.includes(
                                          "FIRST"
                                        ) &&
                                          index == 0 && <VagonVariant />}
                                        {datainfo.wagon.types.includes(
                                          "NEAR_FIRST"
                                        ) &&
                                          index == 1 && <VagonVariant />}
                                        {datainfo.wagon.types.includes(
                                          "CENTER"
                                        ) &&
                                          index ==
                                            Math.floor(
                                              (Object.entries(infowagon.wagons)
                                                .length -
                                                1) /
                                                2
                                            ) && <VagonVariant />}
                                        {datainfo.wagon.types.includes(
                                          "NEAR_END"
                                        ) &&
                                          index ==
                                            Object.entries(infowagon.wagons)
                                              .length -
                                              2 && <VagonVariant />}
                                        {datainfo.wagon.types.includes("END") &&
                                          index ==
                                            Object.entries(infowagon.wagons)
                                              .length -
                                              1 && <VagonVariant />}
                                      </>
                                    )}
                                  </div>
                                )
                              )
                            : datainfo.wagon && (
                                <div className="flex gap-[6px]">
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon1 />
                                    <div className="fill-(--primary-text)">
                                      {(datainfo.wagon.types.includes(
                                        "FIRST"
                                      ) ||
                                        datainfo.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(datainfo.wagon.types.includes(
                                        "NEAR_FIRST"
                                      ) ||
                                        datainfo.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(datainfo.wagon.types.includes(
                                        "CENTER"
                                      ) ||
                                        datainfo.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(datainfo.wagon.types.includes(
                                        "NEAR_END"
                                      ) ||
                                        datainfo.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(datainfo.wagon.types.includes("END") ||
                                        datainfo.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                </div>
                              )}
                        </div>
                        <span className="text-[14px]">
                          {t("ForTransfer", {
                            action: datainfo.wagon
                              ? datainfo.wagon.types
                                  .map((data) =>
                                    data == "FIRST"
                                      ? t("FirstVagon")
                                      : data == "NEAR_FIRST"
                                      ? t("NearFirstVagon")
                                      : data == "CENTER"
                                      ? t("CenterVagon")
                                      : data == "NEAR_END"
                                      ? t("NearEndVagon")
                                      : data == "END"
                                      ? t("EndVagon")
                                      : t("AllVagon")
                                  )
                                  .join(", ")
                              : t("NotVagon"),
                          })}
                        </span>
                      </div>
                    )}
                </div>
              );
            });
          } else {
            return (
              <div key={index} className="my-[10px]!">
                <div className="flex flex-col gap-[20px]">
                  <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem]">
                    <div className="flex items-center w-full h-full justify-center">
                      <div className="h-full w-[0.8em] fill-(--primary-muted-color)">
                        <PeopleSVG />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[4px] justify-center items-center">
                      <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
                      <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
                      <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t("MakeTransfer")}</span>
                      <span className="text-[14px] whitespace-nowrap text-(--primary-muted-color)!">
                        {Time(datainfo.pathLength)} {t("min")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem]">
        <div />
        <div className="flex flex-col gap-[4px] justify-center items-center">
          <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
          <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
          <div className="w-[0.4rem] h-[0.4rem] bg-(--primary-muted-color) rounded-[999px]" />
        </div>
      </div>
      <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem]">
        <div className="flex items-center w-full h-full justify-center">
          <div className="h-full w-[0.8em] fill-(--primary-muted-color)">
            <PeopleSVG />
          </div>
        </div>
        <div className="flex items-center w-full h-full justify-center">
          <div className="w-[1rem] h-[1rem] rounded-[999px] border-solid border-[4px] border-(--primary-muted-color)" />
        </div>
        <span>{t("ExitStation")}</span>
      </div>
    </div>
  );
}

export default InfoNodesDetalis;
