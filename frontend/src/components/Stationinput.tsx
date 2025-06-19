import CloseSVG from "@/svg/close";
import { schema, Store } from "@/type";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";
import { useTranslation } from "react-i18next";

function StationInput({
  stationid,
  setstationid,
  type,
  onClick,
}: {
  stationid: number | null;
  setstationid: (id: number | null) => void;
  type: "A" | "B";
  onClick?: () => void;
}) {
  const { t } = useTranslation();

  const schema = useSelector((data: Store) => data.schema) as schema;

  const animtext = useRef<null | HTMLElement>(null);
  const animdivtext = useRef<null | HTMLDivElement>(null);

  const station = schema.stations.find((station) => station.id == stationid);
  const line =
    station && schema.lines.find((line) => line.id == station.lineId);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        animtext.current &&
        animdivtext.current &&
        animtext.current.clientWidth > animdivtext.current.clientWidth
      ) {
        animtext.current.classList.add("animtext1");

        setTimeout(() => {
          if (
            animtext.current &&
            animdivtext.current &&
            animtext.current.clientWidth > animdivtext.current.clientWidth
          ) {
            if (
              animtext.current.clientWidth > animdivtext.current.clientWidth
            ) {
              animtext.current.classList.remove("animtext1");
              animtext.current.classList.add("animtext2");
            } else {
              animtext.current.classList.remove("animtext1");
              animtext.current.classList.remove("animtext2");
            }
          }
        }, 3900);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [stationid]);

  return station && line && stationid ? (
    <button
      className="h-[40px] px-[10px]! flex items-center border-solid border-[2px] rounded-[10px] justify-between bg-(--primary-color)! w-full overflow-hidden duration-[0]"
      style={{ borderColor: line.color }}
      onClick={onClick}
    >
      <div className="flex items-center gap-[5px] w-[85%]">
        <img className="h-[15px] w-[15px] object-contain" src={line.icon} />
        <div className="w-full overflow-hidden" ref={animdivtext}>
          <span
            ref={animtext}
            className="flex items-center whitespace-nowrap"
            style={{
              width: `${
                station.name[i18next.language as AllLang].length * 10
              }px`,
            }}
          >
            {station.name[i18next.language as AllLang]}
          </span>
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setstationid(null);
        }}
        className="h-[15px] w-[15px]"
      >
        <CloseSVG />
      </div>
    </button>
  ) : (
    <button
      onClick={onClick}
      className="w-full h-[40px] px-[10px]! flex items-center rounded-[10px] gap-[5px] bg-(--primary-color)! border-none!"
    >
      {/* <img className="h-[15px] w-[15px]" src={line.icon} /> */}
      <div className="h-[20px] w-[20px] flex items-center border-solid border-[1px] border-[var(--primary-muted-color)] text-[var(--primary-muted-color)]! text-[0.75rem] justify-center rounded-[999px]">
        {type}
      </div>
      <span className="flex items-center text-[var(--primary-muted-color)]!">
        {type == "A" ? t("WhereFrom") : t("Where")}
      </span>
    </button>
  );
}

export default StationInput;
