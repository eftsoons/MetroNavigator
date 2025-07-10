import { Page } from "@/components/PageOpacity";
import { openTelegramLink, shareURL } from "@telegram-apps/sdk-react";

import "swiper/css";
import Reload from "./Reload";
import Button from "@/components/Button";
import Vagon1 from "@/svg/vagon1";
import Vagon from "@/svg/vagon";
import Checkbox from "@/components/Checkbox";
import { useEffect, useState } from "react";
import Sport14SVG from "@/svg/sport14";
import A4SVG from "@/svg/a4";
import RandomVagon from "@/function/RandomVagon";
import Copy from "@/function/Copy";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/type";

import { setuserinfotimeadd, setUserShowTop } from "@/redux/userinfo";
import { AppDispatch } from "@/redux";
import TimeToHour from "@/function/TimeToHour";
import PlacHolderImg from "@/components/PlaceHolderImg";
import { setsnackbar } from "@/redux/info";
import { useTranslation } from "react-i18next";
import bridge from "@vkontakte/vk-bridge";

function Profile() {
  const { t } = useTranslation();

  const userinfo = useSelector((data: Store) => data.userinfo);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);
  const dispatch = useDispatch<AppDispatch>();

  const [vagon1, setvagon1] = useState<Array<string>>([]);
  const [vagon2, setvagon2] = useState<Array<string>>([]);
  const [limitref, setlimitref] = useState(5);

  useEffect(() => {
    setvagon1(RandomVagon());

    setvagon2(RandomVagon());

    const idinterval1 = setInterval(() => {
      setvagon1(RandomVagon());
    }, 3000);

    const idinterval2 = setInterval(() => {
      setvagon2(RandomVagon());
    }, 2000);

    return () => {
      clearInterval(idinterval1);
      clearInterval(idinterval2);
    };
  }, []);

  useEffect(() => {
    const idinterval = setInterval(() => {
      dispatch(setuserinfotimeadd());
    }, 1000);

    return () => clearInterval(idinterval);
  }, []);

  return userinfo.info ? (
    <Page className="p-[16px]! flex flex-col gap-[20px] min-h-[100%] relative">
      <div className="flex gap-[5px] relative animation-vagon-profile">
        {vagon1.map((data, index) => (
          <div key={index} className="h-[30px] w-[30px]" style={{ fill: data }}>
            {index == 0 ? <Vagon1 /> : <Vagon />}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[16px] mb-[40px]!">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex items-center justify-around w-full">
              <div className="h-full w-[20%] max-w-[100px] rotate-345">
                <A4SVG />
              </div>
              <PlacHolderImg
                Placeholder={
                  <div className="min-w-[90px] min-h-[90px] rounded-[999px] absolute flex justify-center items-center bg-(--primary-button)">
                    <span style={{ fontSize: "clamp(2rem, 50vw, 3rem)" }}>
                      {userinfo.info.first_name[0]}
                    </span>
                  </div>
                }
                className={"w-[30%] h-full flex justify-center items-center"}
              >
                <img
                  className="w-full max-w-[180px] h-full rounded-[999px]"
                  src={userinfo.info.photo_url}
                  loading="lazy"
                />
              </PlacHolderImg>
              <div className="h-full w-[20%] max-w-[100px] rotate-15">
                <Sport14SVG />
              </div>
            </div>
            <span className="text-center">
              {userinfo.info.first_name} {userinfo.info.last_name}
            </span>
          </div>
          {userinfo.info.username && <span>@{userinfo.info.username}</span>}
        </div>
        <div className="bg-(--primary-color) p-[8px]! rounded-[8px] w-full flex flex-col">
          <span>
            {t("CountRoutes")} {userinfo.countroutes}
          </span>
          <span>
            {t("CountTime")} {TimeToHour(userinfo.time)}
          </span>
          <span>
            {t("CountRef")} {userinfo.refcount}
          </span>
        </div>
        <div className="bg-(--primary-color) p-[8px]! rounded-[8px] flex flex-col">
          <div className="flex flex-col gap-[16px]">
            {/* {typeuser == "my" && ( */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col">
                <span>{t("RefSite")}</span>
                <span className="select-all! break-all!">
                  {TypePlatform == "tg"
                    ? `https://t.me/MetroNavigatorBot?start=${userinfo.info.id}`
                    : `https://vk.com/app53543259#${btoa(
                        encodeURIComponent(
                          JSON.stringify({ ref_id: userinfo.info.id })
                        )
                      )}`}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <Button
                  onClick={() => {
                    let url = "";

                    if (TypePlatform == "tg") {
                      url = userinfo.info
                        ? `https://t.me/MetroNavigatorBot?start=${userinfo.info.id}`
                        : "";
                    } else {
                      url = userinfo.info
                        ? `https://vk.com/app53543259#${btoa(
                            encodeURIComponent(
                              JSON.stringify({ ref_id: userinfo.info.id })
                            )
                          )}`
                        : "";
                    }

                    Copy(url);
                    dispatch(
                      setsnackbar({
                        time: 5000,
                        title: `${t("TitleCopy")}`,
                        text: `${t("TextCopyRefSite", {
                          site: url,
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
                        userinfo.info
                          ? `https://t.me/MetroNavigatorBot?start=${userinfo.info.id}`
                          : ""
                      );
                    } else if (TypePlatform == "vk") {
                      bridge.send("VKWebAppShare", {
                        link: userinfo.info
                          ? `https://vk.com/app53543259#${btoa(
                              encodeURIComponent(
                                JSON.stringify({ ref_id: userinfo.info.id })
                              )
                            )}`
                          : "",
                      });
                    }
                  }}
                >
                  {t("Share")}
                </Button>
              </div>
            </div>
            {/* )} */}
            <div className="flex flex-col gap-[8px]">
              <span>{t("MyRef")}</span>
              <div className="p-[16px]! bg-(--primary-bg) rounded-[8px] gap-[16px] flex flex-col">
                {userinfo.ref.length > 0 ? (
                  <>
                    {userinfo.ref.map(
                      (data, index) =>
                        limitref - 1 >= index && (
                          <Button
                            href={
                              TypePlatform == "vk" &&
                              `https://vk.com/${data.username}`
                            }
                            onClick={() =>
                              data.username &&
                              TypePlatform == "tg" &&
                              openTelegramLink(`https://t.me/${data.username}`)
                            }
                            key={index}
                            className="flex flex-col w-full gap-[16px]"
                            style={{
                              cursor: data.username ? "pointer" : "default",
                            }}
                            disabled={!data.username}
                          >
                            <div
                              key={index}
                              className="flex justify-between w-full"
                            >
                              <div className="flex items-center gap-[8px] w-full">
                                <div className="flex items-center gap-[8px] w-full">
                                  <div>
                                    {data.photo ? (
                                      <PlacHolderImg
                                        Placeholder={
                                          <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button) absolute">
                                            {data.first_name[0]}
                                          </div>
                                        }
                                      >
                                        <div className="h-[30px] w-[30px]">
                                          <img
                                            className="rounded-[999px] h-[30px] w-[30px]"
                                            src={data.photo}
                                            loading="lazy"
                                          />
                                        </div>
                                      </PlacHolderImg>
                                    ) : (
                                      <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button)">
                                        {data.first_name[0]}
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-start truncate">
                                    {data.first_name} {data.last_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {index != limitref - 1 &&
                              index != userinfo.ref.length - 1 && (
                                <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                              )}
                          </Button>
                        )
                    )}
                    {userinfo.ref.length > limitref && (
                      <Button
                        onClick={() => {
                          setlimitref(
                            userinfo.ref.length - limitref >= 5
                              ? limitref + 5
                              : userinfo.ref.length
                          );
                        }}
                      >
                        {t("ShowMore")}
                      </Button>
                    )}
                  </>
                ) : (
                  <span>{t("NullRef")}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-(--primary-color) p-[12px]! rounded-[8px] cursor-pointer gap-[16px] flex flex-col">
          <div
            className="flex w-full justify-between items-center"
            onClick={() => dispatch(setUserShowTop())}
          >
            <span>{t("ShowingTop")}</span>
            <Checkbox id="checkbox-profile-top" active={userinfo.showtop} />
          </div>
        </div>
      </div>
      <div className="flex gap-[5px] animation-vagon-profile2 absolute bottom-[0]">
        {vagon2.map((data, index) => (
          <div key={index} className="h-[30px] w-[30px]" style={{ fill: data }}>
            {index == 0 ? <Vagon1 /> : <Vagon />}
          </div>
        ))}
      </div>
    </Page>
  ) : (
    <Reload />
  );
}

export default Profile;
