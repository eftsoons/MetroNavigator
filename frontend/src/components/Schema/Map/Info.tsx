import { Store } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import {
  setsearchstation,
  setBstation,
  setAstation,
  setsnackbar,
  setnodes,
  setactivestation,
} from "@/redux/info";
import { useTranslation } from "react-i18next";
import { shareURL } from "@telegram-apps/sdk-react";
import StationInput from "@/components/Stationinput";
import Switch from "@/svg/switch";
import CloseSVG from "@/svg/close";
import Button from "@/components/Button";
import Copy from "@/function/Copy";
import { memo } from "react";
import bridge from "@vkontakte/vk-bridge";

const Info = memo(
  ({
    openerrorroute,
    setopennodes,
  }: {
    openerrorroute: boolean;
    setopennodes: Function;
  }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const AppPlatform = useSelector((data: Store) => data.platform.AppPlatform);

    const Astation = useSelector((data: Store) => data.info.Astation);
    const Bstation = useSelector((data: Store) => data.info.Bstation);
    const region = useSelector((data: Store) => data.info.region);
    const TypePlatform = useSelector(
      (data: Store) => data.platform.TypePlatform
    );

    return (
      <div
        className="fixed left-[50%] w-[95%] transform-[translate(-50%)] bottom-[80px] flex bg-[var(--primary-bg)] rounded-[10px] p-[6px]! gap-[10px] flex-col"
        style={{
          bottom: ["macos", "ios", "mobile_iphone"].includes(AppPlatform)
            ? "100px"
            : "80px",
        }}
      >
        <div className="flex w-full gap-[5px] ">
          <div className="flex gap-[5px] w-full overflow-hidden">
            <StationInput
              stationid={Astation}
              setstationid={(stationId) => {
                dispatch(setAstation(stationId));
              }}
              type="A"
              onClick={() => dispatch(setsearchstation("A"))}
            />
            <StationInput
              stationid={Bstation}
              setstationid={(stationId) => {
                dispatch(setBstation(stationId));
              }}
              type="B"
              onClick={() => dispatch(setsearchstation("B"))}
            />
          </div>
          <div className="flex gap-[10px]">
            <div className="h-full flex items-center">
              <button
                onClick={() => {
                  const astation = Astation;
                  dispatch(setAstation(Bstation));
                  dispatch(setBstation(astation));
                }}
                className="w-[35px] h-[35px]"
              >
                <Switch />
              </button>
            </div>
            {Astation && Bstation && (
              <div className="h-full flex items-center">
                <button
                  onClick={() => {
                    dispatch(setAstation(null));
                    dispatch(setBstation(null));
                    dispatch(setactivestation([]));
                    dispatch(setnodes([]));
                  }}
                  className="w-[20px] h-[20px]"
                >
                  <CloseSVG />
                </button>
              </div>
            )}
          </div>
        </div>
        {!openerrorroute && Astation && Bstation && (
          <>
            <div className="flex gap-[8px]">
              <Button
                onClick={() => {
                  let url = "";

                  if (TypePlatform == "vk") {
                    url = `https://vk.com/app53543259#${btoa(
                      encodeURIComponent(
                        JSON.stringify({
                          stationA: Astation,
                          stationB: Bstation,
                        })
                      )
                    )}`;
                  } else {
                    url = `https://t.me/MetroNavigatorBot/${region}?startapp=${btoa(
                      encodeURIComponent(
                        JSON.stringify({
                          stationA: Astation,
                          stationB: Bstation,
                        })
                      )
                    )}`;
                  }

                  Copy(url);

                  dispatch(
                    setsnackbar({
                      time: 5000,
                      title: t("TitleCopy"),
                      text: `${t("TextCopyRoutes", {
                        route: `${Astation}-${Bstation}`,
                      })}`,
                      icon: "copy",
                    })
                  );
                }}
              >
                {t("Copy")}
              </Button>
              <Button
                onClick={() => {
                  if (TypePlatform == "tg") {
                    shareURL(
                      t(`ShareRoutes${region}`, {
                        route: `${Astation}-${Bstation}`,
                        url: `https://t.me/MetroNavigatorBot/${region}?startapp=${btoa(
                          encodeURIComponent(
                            JSON.stringify({
                              stationA: Astation,
                              stationB: Bstation,
                            })
                          )
                        )}`,
                      })
                    );
                  } else {
                    /*
                    t(`ShareRoutes${region}`, {
                        route: `${Astation}-${Bstation}`,
                        url: `https://vk.com/app53543259#${btoa(
                          encodeURIComponent(
                            JSON.stringify({
                              stationA: Astation,
                              stationB: Bstation,
                            })
                          )
                        )}`,
                      })
                    */
                    bridge.send("VKWebAppShare", {
                      link: `https://vk.com/app53543259#${btoa(
                        encodeURIComponent(
                          JSON.stringify({
                            stationA: Astation,
                            stationB: Bstation,
                          })
                        )
                      )}`,
                    });
                  }
                }}
              >
                {t("Share")}
              </Button>
            </div>
            <Button onClick={() => setopennodes(true)}>{t("More")}</Button>
          </>
        )}
      </div>
    );
  }
);

export default Info;
