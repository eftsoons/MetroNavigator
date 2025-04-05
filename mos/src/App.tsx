import {
  useLaunchParams,
  miniApp,
  useSignal,
  initData,
  postEvent,
  getCurrentTime,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";

import Tabbar from "@/components/Tabbar";

import { routes } from "@/navigation/routes.tsx";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Uptime } from "./redux/userinfo";
import { AppDispatch } from "./redux";
import { setinfodate } from "./redux/info";
import { getSchemaDark, getSchemaLight } from "./redux/schemaimg";
import { Store } from "./type";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  const raw = useSignal(initData.raw);

  const dispatch = useDispatch<AppDispatch>();

  const schemaimgdark = useSelector((data: Store) => data.schemaimg.schemadark);
  const schemaimglight = useSelector(
    (data: Store) => data.schemaimg.schemalight
  );

  useEffect(() => {
    getCurrentTime().then((response) => {
      dispatch(setinfodate(response.toString()));
    });
  }, []);

  useEffect(() => {
    miniApp.ready();

    postEvent("web_app_expand");

    const idinterval = setInterval(() => {
      dispatch(Uptime(raw));
    }, 10000);

    return () => {
      clearInterval(idinterval);
      if (schemaimgdark) {
        URL.revokeObjectURL(schemaimgdark);
      }
      if (schemaimglight) {
        URL.revokeObjectURL(schemaimglight);
      }
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("theme", "dark");
      miniApp.setHeaderColor("#1a1a1a");
      !schemaimgdark && dispatch(getSchemaDark(raw));
    } else {
      document.documentElement.setAttribute("theme", "light");
      miniApp.setHeaderColor("#ffffff");
      !schemaimglight && dispatch(getSchemaLight(raw));
    }
  }, [isDark]);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
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
