import BusSVG from "@/svg/bus";
import { station } from "@/type";

function InfoExit({ station }: { station: { station: station } }) {
  return (
    <>
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-medium! break-all w-[90%]">
            Выходы и транспорт
          </h1>
        </div>
      </div>
      {station.station.exits.map((data, index) => (
        <div key={index} className="flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-[10px]">
              <div className="h-full flex w-[50px]">
                <span className="bg-[var(--primary-color)] h-[50px] w-full flex items-center justify-center p-[10px]! rounded-[10px]">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-col w-full gap-[5px]">
                {data.title.ru.split(/(.+№\d+)/)[1] ? (
                  <>
                    <span>{data.title.ru.split(/(.+№\d+)/)[1]}</span>
                    <span className="text-[var(--primary-muted-color)]!">
                      {data.title.ru.split(/(.+№\d+)/)[2]}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Выход №{index + 1}</span>
                    <span className="text-[var(--primary-muted-color)]!">
                      {data.title.ru}
                    </span>
                  </>
                )}
                {data.bus && (
                  <>
                    <div className="w-full h-[1px] bg-[var(--primary-border-color)] my-[5px]!" />
                    <div className="flex flex-col gap-[5px]">
                      <span className="text-[var(--primary-muted-color)]!">
                        Автобусы
                      </span>
                      <div className="flex gap-[10px] flex-wrap">
                        {data.bus.split(",").map((data, index) => (
                          <div
                            key={index}
                            className="flex bg-[var(--primary-bus)] px-[7px]! py-[5px]! rounded-[6.4px] gap-[5px] fill-[none]! items-center"
                          >
                            <div className="w-[20px] h-[20px] grid items-center">
                              <BusSVG />
                            </div>
                            <span className="w-full text-(--primary-bus-text)!">
                              {data}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {station.station.exits.length - 1 != index && (
            <div className="w-full h-[1px] bg-[var(--primary-border-color)] mb-[15px]!" />
          )}
        </div>
      ))}
    </>
  );
}

export default InfoExit;
