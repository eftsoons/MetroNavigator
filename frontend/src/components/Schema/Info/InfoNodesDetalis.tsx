import PeopleSVG from "@/svg/people";
import Time from "@/function/TimeToMinits";
import { node, wagon, wagons, wagontransitions } from "@/type";
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

function InfoNodesDetalis({ node }: { node: node }) {
  const { t } = useTranslation();

  let time = Date.now();

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
      {node.infonode.line.map((datamain, index) => {
        const station = node.infonode.station.filter(
          (data) =>
            datamain.type == "line" && data.station.lineId == datamain.line.id
        );

        const timestart = time;
        time += Number(Time(datamain.pathLength)) * 60 * 1000;

        const [infowagon, setinfowagon] = useState<wagon | undefined>();

        const handleaxios = (response: {
          data: {
            data: wagons;
          };
        }) => {
          if (station && station.length > 1) {
            const info = response.data.data[station[1].station.id];

            setinfowagon(info ? info[0] : undefined);
          }
        };

        useEffect(() => {
          if (station.length > 1) {
            axios
              .get(
                `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
                  station[0].station.id
                }/wagons`
              )
              .then(handleaxios);

            const intervalid = setInterval(() => {
              axios
                .get(
                  `${import.meta.env.VITE_API_URL_MOS}/api/stations/v2/${
                    station[0].station.id
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

        const transfer = node.infonode.line.find((data, indexsearch) => {
          if (indexsearch > index) {
            const previnfo = node.infonode.line[indexsearch - 1];

            return (
              previnfo &&
              previnfo.type == "line" &&
              datamain.type == "line" &&
              previnfo.line.id == datamain.line.id &&
              data.type == "transfer"
            );
          }
        }) as
          | {
              type: "transfer";
              wagon?: wagontransitions;
              pathLength: number;
            }
          | undefined;

        return (
          <div key={index}>
            {datamain.type == "line" ? (
              station.map((data, index) => (
                <div key={index}>
                  <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem] grid-rows-[60px]">
                    <div className="flex items-center w-full h-full justify-center">
                      {station.length == 1 || index == station.length - 1 ? (
                        <span className="text-[14px] color-(--primary-muted-color)">
                          {TimeForDate(new Date(time), "minuts")}
                        </span>
                      ) : index == 0 ? (
                        <span className="text-[14px] color-(--primary-muted-color)">
                          {TimeForDate(new Date(timestart), "minuts")}
                        </span>
                      ) : (
                        <div
                          className="w-[1rem] h-[1rem] rounded-[999px]"
                          style={{ backgroundColor: datamain.line.color }}
                        />
                      )}
                    </div>
                    <div className="flex items-center w-full h-full justify-center">
                      {index == 0 ? (
                        <img
                          className="w-[1.5rem] object-contain"
                          src={datamain.line.icon}
                        />
                      ) : index == station.length - 1 ? (
                        <div
                          className="w-[1rem] h-[1rem] rounded-[999px] border-solid border-[4px]"
                          style={{ borderColor: datamain.line.color }}
                        />
                      ) : (
                        <div
                          className="h-full w-[0.4rem]"
                          style={
                            index == 1 && index == station.length - 2
                              ? {
                                  borderRadius: "8px",
                                  backgroundColor: datamain.line.color,
                                }
                              : index == 1
                              ? {
                                  borderTopLeftRadius: "8px",
                                  borderTopRightRadius: "8px",
                                  backgroundColor: datamain.line.color,
                                }
                              : index == station.length - 2
                              ? {
                                  borderBottomLeftRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                  backgroundColor: datamain.line.color,
                                }
                              : { backgroundColor: datamain.line.color }
                          }
                        />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span>
                          {data.station.name[i18next.language as AllLang]}
                        </span>
                        {index == 0 && (
                          <span className="text-[12px]">
                            {datamain.line.name[i18next.language as AllLang]
                              ? datamain.line.name[i18next.language as AllLang]
                              : datamain.line.name.ru}
                          </span>
                        )}
                      </div>
                      {index == 0 && station.length > 1 && (
                        <span className="text-[14px] whitespace-nowrap text-(--primary-muted-color)!">
                          {Time(datamain.pathLength)} {t("min")}
                        </span>
                      )}
                    </div>
                  </div>
                  {(infowagon || (transfer && transfer.wagon)) &&
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
                                    {transfer && transfer.wagon && (
                                      <>
                                        {transfer.wagon.types.includes(
                                          "ALL"
                                        ) && <VagonVariant />}
                                        {transfer.wagon.types.includes(
                                          "FIRST"
                                        ) &&
                                          index == 0 && <VagonVariant />}
                                        {transfer.wagon.types.includes(
                                          "NEAR_FIRST"
                                        ) &&
                                          index == 1 && <VagonVariant />}
                                        {transfer.wagon.types.includes(
                                          "CENTER"
                                        ) &&
                                          index ==
                                            Math.floor(
                                              (Object.entries(infowagon.wagons)
                                                .length -
                                                1) /
                                                2
                                            ) && <VagonVariant />}
                                        {transfer.wagon.types.includes(
                                          "NEAR_END"
                                        ) &&
                                          index ==
                                            Object.entries(infowagon.wagons)
                                              .length -
                                              2 && <VagonVariant />}
                                        {transfer.wagon.types.includes("END") &&
                                          index ==
                                            Object.entries(infowagon.wagons)
                                              .length -
                                              1 && <VagonVariant />}
                                      </>
                                    )}
                                  </div>
                                )
                              )
                            : transfer &&
                              transfer.wagon && (
                                <div className="flex gap-[6px]">
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon1 />
                                    <div className="fill-(--primary-text)">
                                      {(transfer.wagon.types.includes(
                                        "FIRST"
                                      ) ||
                                        transfer.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(transfer.wagon.types.includes(
                                        "NEAR_FIRST"
                                      ) ||
                                        transfer.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(transfer.wagon.types.includes(
                                        "CENTER"
                                      ) ||
                                        transfer.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(transfer.wagon.types.includes(
                                        "NEAR_END"
                                      ) ||
                                        transfer.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                  <div className="w-[30px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                                    <Vagon />
                                    <div className="fill-(--primary-text)">
                                      {(transfer.wagon.types.includes("END") ||
                                        transfer.wagon.types.includes(
                                          "ALL"
                                        )) && <VagonVariant />}
                                    </div>
                                  </div>
                                </div>
                              )}
                        </div>
                        <span className="text-[14px]">
                          {t("ForTransfer", {
                            action:
                              transfer && transfer.wagon
                                ? transfer.wagon.types
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
              ))
            ) : (
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
                      {Time(datamain.pathLength)} {t("min")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
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
