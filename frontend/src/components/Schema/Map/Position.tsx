import haversineDistance from "@/function/haversineDistance";
import {
  setinfostation,
  setsnackbar,
  setinfoselectstation,
} from "@/redux/info";
import NearestSVG from "@/svg/nearest";
import { station, Store, line } from "@/type";
import { locationManager } from "@telegram-apps/sdk";
import bridge from "@vkontakte/vk-bridge";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Position = memo(() => {
  const dispatch = useDispatch();
  const schema = useSelector((data: Store) => data.schema);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);
  const { t } = useTranslation();

  const handlegeoPosition = async () => {
    if (TypePlatform == "tg") {
      if (locationManager.isSupported()) {
        const location = await locationManager.requestLocation();

        const lat = location.latitude;
        const lon = location.longitude;

        let searchstation = undefined as undefined | station;

        schema?.stations.forEach((data) => {
          if (
            !searchstation ||
            haversineDistance(data.location.lat, data.location.lon, lat, lon) <
              haversineDistance(
                searchstation.location.lat,
                searchstation.location.lon,
                lat,
                lon
              )
          ) {
            searchstation = data;
          }
        });

        if (location && searchstation) {
          const line = schema?.lines.find(
            (data) => data.id == searchstation?.lineId
          ) as line;

          const stationall = schema?.stations
            ? schema.stations
                .filter(
                  (data) =>
                    data.name.ru == searchstation?.name.ru &&
                    data.id != searchstation?.id
                )
                .map((station) => {
                  const line = schema.lines.find(
                    (data) => data.id == station.lineId
                  ) as line;

                  return { station: station, line: line };
                })
            : [];

          dispatch(setinfoselectstation(0));

          dispatch(
            setinfostation([
              { station: searchstation, line: line },
              ...stationall,
            ])
          );
        } else {
          dispatch(
            setsnackbar({
              time: 5000,
              title: t("ErrorPosition"),
              text: t("NotLocation"),
              icon: "error",
            })
          );
        }
      } else {
        dispatch(
          setsnackbar({
            time: 5000,
            title: t("ErrorPosition"),
            text: t("NotLocation"),
            icon: "error",
          })
        );
      }
    } else if (TypePlatform == "vk") {
      bridge.send("VKWebAppGetGeodata").then((data) => {
        if (data.available) {
          const lat = data.lat;
          const lon = data.long;

          let searchstation = undefined as undefined | station;

          schema?.stations.forEach((data) => {
            if (
              !searchstation ||
              haversineDistance(
                data.location.lat,
                data.location.lon,
                lat,
                lon
              ) <
                haversineDistance(
                  searchstation.location.lat,
                  searchstation.location.lon,
                  lat,
                  lon
                )
            ) {
              searchstation = data;
            }
          });

          if (searchstation) {
            const line = schema?.lines.find(
              (data) => data.id == searchstation?.lineId
            ) as line;

            const stationall = schema?.stations
              ? schema.stations
                  .filter(
                    (data) =>
                      data.name.ru == searchstation?.name.ru &&
                      data.id != searchstation?.id
                  )
                  .map((station) => {
                    const line = schema.lines.find(
                      (data) => data.id == station.lineId
                    ) as line;

                    return { station: station, line: line };
                  })
              : [];

            dispatch(setinfoselectstation(0));

            dispatch(
              setinfostation([
                { station: searchstation, line: line },
                ...stationall,
              ])
            );
          } else {
            dispatch(
              setsnackbar({
                time: 5000,
                title: t("ErrorPosition"),
                text: t("NotLocation"),
                icon: "error",
              })
            );
          }
        } else {
          dispatch(
            setsnackbar({
              time: 5000,
              title: t("ErrorPosition"),
              text: t("NotLocation"),
              icon: "error",
            })
          );
        }
      });
    }
  };

  return (
    <div className="fixed top-[1rem] left-[1rem] flex bg-[var(--primary-color)] rounded-[10px] border-[2px] border-[var(--primary-border-color)] border-solid p-[6px]! gap-[8px]">
      <button onClick={handlegeoPosition} className="h-[30px] w-[30px]">
        <NearestSVG />
      </button>
    </div>
  );
});

export default Position;
