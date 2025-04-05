import Button from "@/components/Button";
import { AppDispatch } from "@/redux";
import { clearRouteSave } from "@/redux/userinfo";
import NextSVG from "@/svg/next";
import { station, Store, schema, line } from "@/type";
import {
  initData,
  retrieveLaunchParams,
  useSignal,
} from "@telegram-apps/sdk-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function SearchStation({
  backfunction,
  clickfunction,
  astationid,
  bstationid,
  handleAstation,
  handleBstation,
}: {
  backfunction: () => void;
  clickfunction: (stationId: number) => void;
  astationid: number | null;
  bstationid: number | null;
  handleAstation: (stationid: number) => void;
  handleBstation: (stationid: number) => void;
}) {
  const raw = useSignal(initData.raw);

  const launchparams = retrieveLaunchParams();
  const [textsearch, settextsearch] = useState("");

  const schema = useSelector((data: Store) => data.schema) as schema;
  const favoritessave = useSelector(
    (data: Store) => data.userinfo.favoritessave
  );
  const routesave = useSelector((data: Store) => data.userinfo.routesave);

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
    settextsearch("");
    backfunction();
  };

  return (
    <div className="h-full flex flex-col gap-[20px]">
      <div className="flex gap-[15px] items-center">
        <input
          id="searchstation"
          className="bg-[var(--primary-color)]! rounded-[10px] p-[16px]! w-full"
          placeholder="Поиск по станциям"
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
                  <h1 className="text-[20px] font-medium!">Прошлые маршруты</h1>
                  <Button
                    className="w-auto! h-auto! p-[4px]! hidden"
                    onClick={() => dispatch(clearRouteSave(raw))}
                  >
                    Очистить
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

                    return (
                      <SwiperSlide
                        key={index}
                        onClick={() => {
                          handleAstation(data.start);
                          handleBstation(data.end);
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
                              {infostationstart.name.ru}
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
                              {infostationend.name.ru}
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
                <h1 className="text-[20px] font-medium!">Избранное</h1>
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
                          clickfunction(infostation.id);
                          handlebackfunction();
                        }}
                      >
                        <div className="flex flex-col w-[100px] gap-[6px] justify-center  items-center h-full border-solid border-[2px] border-(--primary-border-color) rounded-[10px] p-[8px]! cursor-pointer">
                          <img
                            className="w-[20px] h-[20px] object-contain"
                            src={infoline.icon}
                          />
                          <span className="text-center text-[14px]">
                            {infostation.name.ru}
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
        className="flex flex-col gap-[10px]"
        style={{
          paddingBottom: ["macos", "ios"].includes(launchparams.platform)
            ? "34px"
            : "16px",
        }}
      >
        {station
          .filter(
            (data) =>
              data.name.ru
                .toLocaleLowerCase()
                .includes(textsearch.toLocaleLowerCase()) &&
              data.id != astationid &&
              data.id != bstationid
          )
          .map((station) => {
            const line = lines.find((line) => line.id == station.lineId);

            return (
              <div
                key={station.id}
                className="flex gap-[15px] items-center overflow-x-visible! cursor-pointer"
                onClick={() => {
                  clickfunction(station.id);
                  handlebackfunction();
                }}
              >
                <img
                  className="h-[30px] w-[30px] object-contain"
                  src={line?.icon}
                />
                <div>
                  <h1>{station.name.ru}</h1>
                  <p className="text-[14px] text-[var(--primary-muted-color)]!">
                    {line?.name.ru}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchStation;
