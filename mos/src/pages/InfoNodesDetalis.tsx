import PeopleSVG from "@/svg/people";
import Time from "@/function/TimeToMinits";
import { node } from "@/type";
import TimeForDate from "@/function/TimeForDate";
import Vagon1 from "@/svg/vagon1";
import Vagon from "@/svg/vagon";
import VagonVariant from "@/svg/vagonvariant";

function InfoNodesDetalis({ node }: { node: node }) {
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
        <span>Пройдите на станцию</span>
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

        return (
          <div key={index}>
            {datamain.type == "line" ? (
              station.map((data, index) => {
                return (
                  <div key={index}>
                    <div className="grid grid-cols-[4.2rem_2rem_1fr] gap-[1rem] grid-rows-[50px]">
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
                          <span>{data.station.name.ru}</span>
                          {index == 0 && (
                            <span className="text-[12px]">
                              {datamain.line.name.ru}
                            </span>
                          )}
                        </div>
                        {index == 0 && station.length > 1 && (
                          <span className="text-[14px] whitespace-nowrap text-(--primary-muted-color)!">
                            {Time(datamain.pathLength)} мин
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-[20px]">
                {datamain.wagon && (
                  <div className="flex flex-col bg-(--primary-color) rounded-[12px] w-full p-[16px]! gap-[16px]">
                    <div className="flex flex-col">
                      <div className="flex gap-[6px]">
                        <div className="w-[40px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                          <Vagon1 />
                          <div className="fill-(--primary-text)">
                            {datamain.wagon.types.includes("FIRST") && (
                              <VagonVariant />
                            )}
                          </div>
                        </div>
                        <div className="w-[40px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                          <Vagon />
                          <div className="fill-(--primary-text)">
                            {datamain.wagon.types.includes("NEAR_FIRST") && (
                              <VagonVariant />
                            )}
                          </div>
                        </div>
                        <div className="w-[40px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                          <Vagon />
                          <div className="fill-(--primary-text)">
                            {datamain.wagon.types.includes("CENTER") && (
                              <VagonVariant />
                            )}
                          </div>
                        </div>
                        <div className="w-[40px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                          <Vagon />
                          <div className="fill-(--primary-text)">
                            {datamain.wagon.types.includes("NEAR_END") && (
                              <VagonVariant />
                            )}
                          </div>
                        </div>
                        <div className="w-[40px] fill-(--primary-muted-color) flex flex-col gap-[5px]">
                          <Vagon />
                          <div className="fill-(--primary-text)">
                            {datamain.wagon.types.includes("END") && (
                              <VagonVariant />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[14px]">
                      Для пересадки:{" "}
                      {datamain.wagon.types
                        .map((data) =>
                          data == "END"
                            ? "последний вагон"
                            : data == "CENTER"
                            ? "средний вагон"
                            : data == "NEAR_END"
                            ? "ближе к концу"
                            : data == "NEAR_FIRST"
                            ? "ближе к началу"
                            : "первый вагон"
                        )
                        .join(", ")}
                    </span>
                  </div>
                )}
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
                    <span>Сделайте пересадку</span>
                    <span className="text-[14px] whitespace-nowrap text-(--primary-muted-color)!">
                      {Time(datamain.pathLength)} мин
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
        <span>Выйдите со станции</span>
      </div>
    </div>
  );
}

export default InfoNodesDetalis;
