import { Page } from "@/components/PageOpacity";
import RatingSVG from "@/svg/ratingmetro";
import { openTelegramLink } from "@telegram-apps/sdk-react";
import Reload from "./Reload";
import Vagon1 from "@/svg/vagon1";
import { useEffect, useState } from "react";
import Profile from "@/svg/profile";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Time from "@/svg/time";

import { Store } from "@/type";
import { useDispatch, useSelector } from "react-redux";

import { fetchTop } from "@/redux/top";
import { AppDispatch } from "@/redux";
import { setswiperindex } from "@/redux/info";
import TimeToHour from "@/function/TimeToHour";
import PlacHolderImg from "@/components/PlaceHolderImg";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
// import Warn from "@/svg/warn";

function Rating() {
  const { t } = useTranslation();

  const top = useSelector((data: Store) => data.top);
  const swiperindex = useSelector((data: Store) => data.info.swiperindex);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);
  const dispatch = useDispatch<AppDispatch>();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchTop());
  }, []);

  return top ? (
    <Page className="p-[16px]! flex flex-col h-full gap-[16px]">
      {/* <div className="p-[12px]! bg-[var(--primary-warn)] border-solid border-[1px] border-[var(--primary-border-warn)] rounded-[10px] h-[100px] overflow-x-hidden">
        <div className="gap-[10px] flex flex-col">
          <div className="flex flex-col gap-[10px]">
            <div className="flex">
              <div className="min-w-[30px]">
                <div className="h-[20px] w-[20px] fill-[none] ">
                  <Warn />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-[0.8rem]"></span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex gap-[8px]">
        <button
          className="flex items-center justify-center w-full border-[2px] border-solid rounded-[8px] p-[8px]!"
          style={{
            borderColor:
              swiperindex == 0
                ? "var(--primary-text)"
                : "var(--primary-border-color)",
          }}
          onClick={() => swiperInstance?.slideTo(0)}
        >
          {t("TitleRoutes")}
        </button>
        <button
          className="flex items-center justify-center w-full border-[2px] border-solid rounded-[8px] p-[8px]!"
          style={{
            borderColor:
              swiperindex == 1
                ? "var(--primary-text)"
                : "var(--primary-border-color)",
          }}
          onClick={() => swiperInstance?.slideTo(1)}
        >
          {t("TitleTime")}
        </button>
        <button
          className="flex items-center justify-center w-full border-[2px] border-solid rounded-[8px] p-[8px]!"
          style={{
            borderColor:
              swiperindex == 2
                ? "var(--primary-text)"
                : "var(--primary-border-color)",
          }}
          onClick={() => swiperInstance?.slideTo(2)}
        >
          {t("TitleRef")}
        </button>
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={16}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
        initialSlide={swiperindex}
        onSnapIndexChange={(swiper) => {
          dispatch(setswiperindex(swiper.activeIndex));
        }}
        className="h-full w-full overflow-y-auto!"
      >
        <SwiperSlide>
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center w-full justify-around h-[180px] px-[8px]! gap-[5px]">
              <div className="h-full w-[20%] max-w-[100px] fill-(--primary-muted-color) rotate-340 grid items-center">
                <RatingSVG />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[24px] whitespace-nowrap text-center">
                  {t("TitleTopRoutes")}
                </span>
                <span className="text-center">
                  {!top.showtop
                    ? t("MyPlaceMaybe", { count: top.route.place })
                    : t("MyPlace", { count: top.route.place })}
                </span>
              </div>
              <div className="h-full w-[20%]  max-w-[100px] fill-(--primary-muted-color) rotate-20 grid items-center">
                <Vagon1 />
              </div>
            </div>
            <div className="p-[16px]! bg-(--primary-color) rounded-[8px] gap-[16px] flex flex-col">
              {top.route.users.length > 0
                ? top.route.users.map((data, index) => (
                    <Button
                      href={
                        TypePlatform == "vk" &&
                        `https://vk.com/${data.username}`
                      }
                      onClick={() =>
                        TypePlatform == "tg" &&
                        data.username &&
                        openTelegramLink(`https://t.me/${data.username}`)
                      }
                      key={index}
                      className="flex flex-col w-full gap-[16px]"
                      style={{ cursor: data.username ? "pointer" : "default" }}
                      disabled={!data.username}
                    >
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-[16px] w-[60%]">
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
                          <div className="flex flex-col w-full">
                            <span className="text-start truncate">
                              {data.first_name} {data.last_name}
                            </span>
                            <span className="text-start text-(--primary-muted-color)!">
                              {t("TheRoute", {
                                count: data.countroutes,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="h-[40px] w-[40px] flex justify-center items-center">
                          {index == 0 ? (
                            <div className="h-full w-full fill-[#daa520]">
                              <RatingSVG />
                            </div>
                          ) : index == 1 ? (
                            <div className="h-full w-full fill-[#A9A9A9]">
                              <RatingSVG />
                            </div>
                          ) : index == 2 ? (
                            <div className="h-full w-full fill-[#cd7f32]">
                              <RatingSVG />
                            </div>
                          ) : (
                            <span>{t("Place", { count: index + 1 })}</span>
                          )}
                        </div>
                      </div>
                      {index != top.route.users.length - 1 && (
                        <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                      )}
                    </Button>
                  ))
                : t("Null")}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center w-full justify-around h-[180px] px-[8px]!">
              <div className="h-full w-[20%] max-w-[100px] fill-(--primary-muted-color) rotate-340 grid items-center">
                <RatingSVG />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[24px] whitespace-nowrap text-center">
                  {t("TitleTopTime")}
                </span>
                <span className="text-center">
                  {!top.showtop
                    ? t("MyPlaceMaybe", { count: top.time.place })
                    : t("MyPlace", { count: top.time.place })}
                </span>
              </div>
              <div className="h-full w-[20%] max-w-[100px] stroke-(--primary-muted-color) rotate-20 grid items-center">
                <Time />
              </div>
            </div>
            <div className="p-[16px]! bg-(--primary-color) rounded-[8px] gap-[16px] flex flex-col">
              {top.time.users.length > 0
                ? top.time.users.map((data, index) => (
                    <Button
                      href={
                        TypePlatform == "vk" &&
                        `https://vk.com/${data.username}`
                      }
                      onClick={() =>
                        TypePlatform == "tg" &&
                        data.username &&
                        openTelegramLink(`https://t.me/${data.username}`)
                      }
                      key={index}
                      className="flex flex-col w-full gap-[16px]"
                      style={{ cursor: data.username ? "pointer" : "default" }}
                      disabled={!data.username}
                    >
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-[16px] w-[60%]">
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
                          <div className="flex flex-col w-full">
                            <span className="text-start truncate">
                              {data.first_name} {data.last_name}
                            </span>
                            <span className="text-start text-(--primary-muted-color)!">
                              {TimeToHour(data.time)}
                            </span>
                          </div>
                        </div>
                        <div className="h-[40px] w-[40px] flex justify-center items-center">
                          {index == 0 ? (
                            <div className="h-full w-full fill-[#daa520]">
                              <RatingSVG />
                            </div>
                          ) : index == 1 ? (
                            <div className="h-full w-full fill-[#A9A9A9]">
                              <RatingSVG />
                            </div>
                          ) : index == 2 ? (
                            <div className="h-full w-full fill-[#cd7f32]">
                              <RatingSVG />
                            </div>
                          ) : (
                            <span>{t("Place", { count: index + 1 })}</span>
                          )}
                        </div>
                      </div>
                      {index != top.time.users.length - 1 && (
                        <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                      )}
                    </Button>
                  ))
                : t("Null")}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center w-full justify-around h-[180px] px-[8px]!">
              <div className="h-full w-[20%] max-w-[100px] fill-(--primary-muted-color) rotate-340 grid items-center">
                <RatingSVG />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[24px] whitespace-nowrap text-center">
                  {t("TitleRef")}
                </span>
                <span className="text-center">
                  {!top.showtop
                    ? t("MyPlaceMaybe", { count: top.ref.place })
                    : t("MyPlace", { count: top.ref.place })}
                </span>
              </div>
              <div className="h-full w-[20%] max-w-[100px] fill-(--primary-muted-color) rotate-20 grid items-center">
                <Profile />
              </div>
            </div>
            <div className="p-[16px]! bg-(--primary-color) rounded-[8px] gap-[16px] flex flex-col">
              {top.ref.users.length > 0
                ? top.ref.users.map((data, index) => (
                    <Button
                      href={
                        TypePlatform == "vk" &&
                        `https://vk.com/${data.username}`
                      }
                      onClick={() =>
                        TypePlatform == "tg" &&
                        data.username &&
                        openTelegramLink(`https://t.me/${data.username}`)
                      }
                      key={index}
                      className="flex flex-col w-full gap-[16px]"
                      style={{ cursor: data.username ? "pointer" : "default" }}
                      disabled={!data.username}
                    >
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center gap-[16px] w-[60%]">
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
                          <div className="flex flex-col w-full">
                            <span className="text-start truncate">
                              {data.first_name} {data.last_name}
                            </span>
                            <span className="text-start text-(--primary-muted-color)!">
                              {t("TheRef", { count: data.refcount })}
                            </span>
                          </div>
                        </div>
                        <div className="h-[40px] w-[40px] flex justify-center items-center">
                          {index == 0 ? (
                            <div className="h-full w-full fill-[#daa520]">
                              <RatingSVG />
                            </div>
                          ) : index == 1 ? (
                            <div className="h-full w-full fill-[#A9A9A9]">
                              <RatingSVG />
                            </div>
                          ) : index == 2 ? (
                            <div className="h-full w-full fill-[#cd7f32]">
                              <RatingSVG />
                            </div>
                          ) : (
                            <span>{t("Place", { count: index + 1 })}</span>
                          )}
                        </div>
                      </div>
                      {index != top.ref.users.length - 1 && (
                        <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                      )}
                    </Button>
                  ))
                : t("Null")}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Page>
  ) : (
    <Reload />
  );
}

export default Rating;
