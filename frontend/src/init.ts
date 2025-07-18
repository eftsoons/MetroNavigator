import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
} from "@telegram-apps/sdk-react";

import {
  isTMA,
  locationManager,
  postEvent,
  retrieveLaunchParams,
} from "@telegram-apps/sdk";
import {
  setAppPlatform,
  setAppRaw,
  setisDark,
  setPlatform,
  setRef,
  setstartParam,
} from "./redux/platform";

import bridge from "@vkontakte/vk-bridge";
import { setInfoUser } from "./redux/userinfo";
import { setRegion } from "./redux/info";

import i18n from "i18next";
import { EnhancedStore } from "@reduxjs/toolkit";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(store: EnhancedStore): void {
  const dataURL = new URLSearchParams(location.search);

  const vkid = dataURL.get("vk_user_id");

  if (isTMA()) {
    // Set @telegram-apps/sdk-react debug mode.

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.

    initSDK();

    // Check if all required components are supported.
    if (!backButton.isSupported() || !miniApp.isSupported()) {
      throw new Error("ERR_NOT_SUPPORTED");
    }

    // Mount all components used in the project.
    backButton.mount();
    locationManager.mount();
    miniApp.mountSync();
    themeParams.mountSync();
    initData.restore();
    void viewport
      .mount()
      .catch((e) => {
        console.error("Something went wrong mounting the viewport", e);
      })
      .then(() => {
        viewport.bindCssVars();
      });

    const lp = retrieveLaunchParams();
    const raw = initData.raw();
    const InfoUser = initData.user();
    const startParam = initData.startParam();
    const isDark = miniApp.isDark();

    postEvent("web_app_ready");

    store.dispatch(setPlatform("tg"));
    store.dispatch(setAppPlatform(lp.tgWebAppPlatform));
    store.dispatch(setAppRaw(raw));
    store.dispatch(setInfoUser(InfoUser));
    store.dispatch(setstartParam(startParam));
    store.dispatch(setisDark(isDark));
    store.dispatch(setRegion("mos"));

    if (InfoUser) {
      i18n.changeLanguage(InfoUser.language_code);
    }

    console.log("It's tg");
  } else if (bridge.isEmbedded() && vkid) {
    const language = dataURL.get("vk_language");

    store.dispatch(setPlatform("vk"));
    store.dispatch(setAppRaw(location.origin + location.search));
    store.dispatch(setAppPlatform(dataURL.get("vk_platform")));
    store.dispatch(setRegion("mos"));

    try {
      const startParam = location.hash.substring(1);

      if (startParam != "") {
        const startParams = JSON.parse(decodeURIComponent(atob(startParam)));

        if (startParams.ref_id) {
          store.dispatch(setRef(startParams.ref_id));
        }

        store.dispatch(setstartParam(startParam));
      }
    } catch {
      store.dispatch(setstartParam({}));
    }

    bridge.send("VKWebAppInit");

    bridge.send("VKWebAppGetConfig").then((data) => {
      store.dispatch(setisDark(data.appearance == "dark"));
    });

    bridge.send("VKWebAppGetUserInfo").then((userinfo) => {
      store.dispatch(
        setInfoUser({
          id: userinfo.id,
          first_name: userinfo.first_name,
          last_name: userinfo.last_name,
          photo_url: userinfo.photo_max_orig,
          username: `id${userinfo.id}`,
          language_code: dataURL.get("vk_language"),
        })
      );
    });

    bridge.subscribe((data) => {
      if (data.detail.type == "VKWebAppUpdateConfig") {
        store.dispatch(setisDark(data.detail.data.appearance == "dark"));
      } else if (data.detail.type == "VKWebAppChangeFragment") {
        try {
          const startParam = data.detail.data.location;

          if (startParam != "") {
            const startParams = JSON.parse(
              decodeURIComponent(atob(startParam))
            );

            if (startParams.ref_id) {
              store.dispatch(setRef(startParams.ref_id));
            }

            store.dispatch(setstartParam(startParam));
          }
        } catch {
          store.dispatch(setstartParam({}));
        }
      }
    });

    if (language) {
      i18n.changeLanguage(language);
    }

    console.log("It's vk");
  } else {
    store.dispatch(setPlatform("web"));

    console.log("It's web");

    throw new Error("ERR_NOT_SUPPORTED");
  }
}
