import { miniApp, postEvent } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";

import Tabbar from "@/components/Tabbar";

import { routes } from "@/navigation/routes.tsx";
import { useEffect /*useLayoutEffect*/ } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Uptime } from "./redux/userinfo";
import { AppDispatch } from "./redux";
import {
  setAstation,
  setBstation,
  setinfoselectstation,
  setinfostation,
  setRegion,
} from "./redux/info";
import { Store } from "./type";
import { useTranslation } from "react-i18next";
import GetStation from "./function/GetStation";
import { getSchemaImg } from "./redux/schemaimg";
// import bridge from "@vkontakte/vk-bridge";

export function App() {
  const { i18n } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const schema = useSelector((data: Store) => data.schema);
  const schemaimg = useSelector((data: Store) => data.schemaimg);
  const AppPlatform = useSelector((data: Store) => data.platform.AppPlatform);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);
  const region = useSelector((data: Store) => data.info.region);
  const user = useSelector((data: Store) => data.platform.user);
  const isDark = useSelector((data: Store) => data.platform.isDark);
  const startParam = useSelector((data: Store) => data.platform.startParam);

  useEffect(() => {
    if (TypePlatform == "tg") {
      miniApp.ready();

      postEvent("web_app_expand");

      // console.log(window.location);

      //const startParams = JSON.parse(decodeURIComponent(atob(startParam)));
    }

    if (window.location.href == "http://localhost:5173/sbp") {
      dispatch(setRegion("sbp"));
    } else {
      dispatch(setRegion("mos"));
    }
  }, []);

  useEffect(() => {
    if (user?.language_code == "ru") {
      i18n.changeLanguage("ru");
    } else {
      i18n.changeLanguage("en");
    }
  }, [user]);

  useEffect(() => {
    if (region) {
      dispatch(getSchemaImg());

      const idinterval = setInterval(() => {
        dispatch(Uptime());
      }, 10000);

      return () => {
        clearInterval(idinterval);
        if (schemaimg.img) {
          URL.revokeObjectURL(schemaimg.img);
        }
      };
    }
  }, [region]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("theme", "dark");

      if (TypePlatform == "tg") {
        miniApp.setHeaderColor("#1a1a1a");
      }
    } else {
      document.documentElement.setAttribute("theme", "light");

      if (TypePlatform == "tg") {
        miniApp.setHeaderColor("#ffffff");
      }
    }
  }, [isDark]);

  useEffect(() => {
    if (startParam && schema) {
      const intervalid = setTimeout(() => {
        const startParams = JSON.parse(decodeURIComponent(atob(startParam)));

        if (startParams.stationA) {
          dispatch(setAstation(startParams.stationA));
        }

        if (startParams.stationB) {
          dispatch(setBstation(startParams.stationB));
        }

        if (startParams.station) {
          const info = GetStation(schema, startParams.station);

          dispatch(setinfoselectstation(0));

          dispatch(setinfostation(info));
        }
      }, 300);

      return () => clearInterval(intervalid);
    } //могут быть косяки с пустой схемой
  }, [startParam, schema]);

  /*useLayoutEffect(() => {
    if (TypePlatform == "vk") {
      bridge.send("VKWebAppCheckBannerAd").then((data) => {
        if (!data.result) {
          bridge
            .send("VKWebAppShowBannerAd", {
              banner_location: "top",
            })
            .catch(() => {
              console.log("Реклама не найдена");
            });
        }
      });
    }
  });*/

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(AppPlatform) ? "ios" : "base"}
      className="overflow-x-hidden flex flex-col h-full"
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={<Tabbar>{route.Element}</Tabbar>}
              {...route}
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
