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
  retrieveLaunchParams,
} from "@telegram-apps/sdk";
import {
  setAppPlatform,
  setAppRaw,
  setInfoUser,
  setisDark,
  setPlatform,
  setRef,
  setstartParam,
} from "./redux/platform";

import bridge from "@vkontakte/vk-bridge";

/**
 * Initializes the application and configures its dependencies.
 */
export function init(store: any): void {
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

    store.dispatch(setPlatform("tg"));
    store.dispatch(setAppPlatform(lp.tgWebAppPlatform));
    store.dispatch(setAppRaw(raw));
    store.dispatch(setInfoUser(InfoUser));
    store.dispatch(setstartParam(startParam));
    store.dispatch(setisDark(isDark));

    console.log("It's tg");
  } else if (bridge.isEmbedded() && vkid) {
    store.dispatch(setPlatform("vk"));

    const dataURL = new URLSearchParams(location.search);

    store.dispatch(setAppRaw(location.origin + location.search));
    store.dispatch(setAppPlatform(dataURL.get("vk_platform")));
    store.dispatch(setInfoUser({ language_code: dataURL.get("vk_language") }));

    const startParam = location.hash.substring(1);

    if (startParam != "") {
      const startParams = JSON.parse(decodeURIComponent(atob(startParam)));

      if (startParams.ref_id) {
        store.dispatch(setRef(startParams.ref_id));
      }

      store.dispatch(setstartParam(startParam));
    }

    bridge.send("VKWebAppInit");

    bridge.send("VKWebAppGetConfig").then((data) => {
      store.dispatch(setisDark(data.appearance == "dark"));
    });

    bridge
      .send("VKWebAppCallAPIMethod", {
        method: "users.get",
        params: {
          user_id: vkid,
          v: "5.199",
          access_token: import.meta.env.VITE_API_TOKEN_VK,
          fields: "domain,photo_max_orig",
        },
      })
      .then((data) => {
        const [userinfo] = data.response;

        store.dispatch(
          setInfoUser({
            id: userinfo.id,
            first_name: userinfo.first_name,
            last_name: userinfo.last_name,
            photo_url: userinfo.photo_max_orig,
            username: userinfo.domain,
            //language_code: dataURL.get("vk_language"),
          })
        );
      });

    // bridge.send("VKWebAppGetUserInfo").then((data) => {
    //   //пофиксить username
    //   console.log(data);
    //   store.dispatch(
    //     setInfoUser({
    //       id: data.id,
    //       first_name: data.first_name,
    //       last_name: data.last_name,
    //       photo_url: data.photo_max_orig,
    //       username: data.id,
    //       language_code: dataURL.get("vk_language"),
    //     })
    //   );
    // });

    console.log("It's vk");
  } else {
    store.dispatch(setPlatform("web"));

    console.log("It's web");

    throw new Error("ERR_NOT_SUPPORTED");
  }
}
