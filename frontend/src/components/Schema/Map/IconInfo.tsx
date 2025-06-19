import Station from "@/components/Station";
import { Store } from "@/type";
import { LegacyRef, memo } from "react";
import { useSelector } from "react-redux";

const IconInfo = memo(
  ({
    mapactivestation,
    arrayerrorstation,
  }: {
    mapactivestation: LegacyRef<SVGGElement> | undefined;
    arrayerrorstation: number[];
  }) => {
    const schema = useSelector((data: Store) => data.schema);
    const Astation = useSelector((data: Store) => data.info.Astation);
    const Bstation = useSelector((data: Store) => data.info.Bstation);
    const infostation = useSelector((data: Store) => data.info.infostation);
    const selectinfostation = useSelector(
      (data: Store) => data.info.infoselectstation
    );

    const activestation = useSelector((data: Store) => data.info.activestation);

    const height = schema?.height;
    const width = schema?.width;

    return (
      <>
        {((Astation && Bstation) || infostation) && (
          <div className="absolute top-[0] left-[0] w-full h-full bg-[var(--primary-bg)] opacity-75 pointer-events-none" />
        )}
        {(activestation ||
          Astation ||
          Astation == 0 ||
          Bstation ||
          Bstation == 0 ||
          infostation) && (
          <svg
            height="100%"
            width="100%"
            className="absolute top-[0] left-[0] pointer-events-none"
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
          >
            <g
              ref={mapactivestation}
              dangerouslySetInnerHTML={{
                __html: activestation.join(""),
              }}
            />
            {(Astation || Astation == 0) && (
              <Station
                stationid={Astation}
                type="A"
                arrayerrorstation={arrayerrorstation}
              />
            )}
            {(Bstation || Bstation == 0) && (
              <Station
                stationid={Bstation}
                type="B"
                arrayerrorstation={arrayerrorstation}
              />
            )}
            {infostation &&
              infostation[
                infostation.length > selectinfostation ? selectinfostation : 0
              ].station && (
                <Station
                  stationid={
                    infostation[
                      infostation.length > selectinfostation
                        ? selectinfostation
                        : 0
                    ].station.id
                  }
                  type={Astation ? "B" : "A"}
                  arrayerrorstation={arrayerrorstation}
                />
              )}
          </svg>
        )}
      </>
    );
  }
);

export default IconInfo;
