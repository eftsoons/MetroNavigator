import { Page } from "@/components/PageOpacity";
import RatingSVG from "@/svg/ratingmetro";
import {
  initData,
  openTelegramLink,
  useSignal,
} from "@telegram-apps/sdk-react";
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

function Rating() {
  const raw = useSignal(initData.raw);

  const top = useSelector((data: Store) => data.top);
  const swiperindex = useSelector((data: Store) => data.info.swiperindex);
  const dispatch = useDispatch<AppDispatch>();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  useEffect(() => {
    raw && dispatch(fetchTop(raw));
  }, []);

  return top ? (
    <Page className="p-[16px]! flex flex-col h-full gap-[16px]">
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
          Маршруты
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
          Время
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
          Рефералы
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
                  Топ по маршрутам
                </span>
                <span className="text-center">
                  {!top.showtop
                    ? `Ваше возможное место: ${top.route.place}`
                    : `Ваше место: ${top.route.place}`}
                </span>
              </div>
              <div className="h-full w-[20%]  max-w-[100px] fill-(--primary-muted-color) rotate-20 grid items-center">
                <Vagon1 />
              </div>
            </div>
            <div className="p-[16px]! bg-(--primary-color) rounded-[8px] gap-[16px] flex flex-col">
              {top.route.users.length > 0
                ? top.route.users.map((data, index) => (
                    <button
                      onClick={() =>
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
                          {data.photo ? (
                            <PlacHolderImg
                              Placeholder={
                                <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button) absolute">
                                  {data.first_name[0]}
                                </div>
                              }
                            >
                              <img
                                className="rounded-[999px] h-[30px] w-[30px]"
                                src={data.photo}
                                loading="lazy"
                              />
                            </PlacHolderImg>
                          ) : (
                            <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button)">
                              {data.first_name[0]}
                            </div>
                          )}
                          <div className="flex flex-col w-full">
                            <span className="text-start truncate">
                              {data.first_name} {data.last_name}
                            </span>
                            <span className="text-start text-(--primary-muted-color)!">
                              {data.countroutes} машрута
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
                            <span>{index + 1} место</span>
                          )}
                        </div>
                      </div>
                      {index != top.route.users.length - 1 && (
                        <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                      )}
                    </button>
                  ))
                : "Отсутствует"}
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
                  Топ по времени
                </span>
                <span className="text-center">
                  {!top.showtop
                    ? `Ваше возможное место: ${top.time.place}`
                    : `Ваше место: ${top.time.place}`}
                </span>
              </div>
              <div className="h-full w-[20%] max-w-[100px] stroke-(--primary-muted-color) rotate-20 grid items-center">
                <Time />
              </div>
            </div>
            <div className="p-[16px]! bg-(--primary-color) rounded-[8px] gap-[16px] flex flex-col">
              {top.time.users.length > 0
                ? top.time.users.map((data, index) => (
                    <button
                      onClick={() =>
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
                          {data.photo ? (
                            <PlacHolderImg
                              Placeholder={
                                <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button) absolute">
                                  {data.first_name[0]}
                                </div>
                              }
                            >
                              <img
                                className="rounded-[999px] h-[30px] w-[30px]"
                                src={data.photo}
                                loading="lazy"
                              />
                            </PlacHolderImg>
                          ) : (
                            <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button)">
                              {data.first_name[0]}
                            </div>
                          )}
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
                            <span>{index + 1} место</span>
                          )}
                        </div>
                      </div>
                      {index != top.time.users.length - 1 && (
                        <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                      )}
                    </button>
                  ))
                : "Отсутствует"}
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
                  Топ по рефералам
                </span>
                <span className="text-center">
                  {!top.showtop
                    ? `Ваше возможное место: ${top.ref.place}`
                    : `Ваше место: ${top.ref.place}`}
                </span>
              </div>
              <div className="h-full w-[20%] max-w-[100px] fill-(--primary-muted-color) rotate-20 grid items-center">
                <Profile />
              </div>
            </div>
            <div className="p-[16px]! bg-(--primary-color) rounded-[8px] gap-[16px] flex flex-col">
              {top.ref.users.length > 0
                ? top.ref.users.map((data, index) => (
                    <button
                      onClick={() =>
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
                          {data.photo ? (
                            <PlacHolderImg
                              Placeholder={
                                <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button) absolute">
                                  {data.first_name[0]}
                                </div>
                              }
                            >
                              <img
                                className="rounded-[999px] h-[30px] w-[30px]"
                                src={data.photo}
                                loading="lazy"
                              />
                            </PlacHolderImg>
                          ) : (
                            <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button)">
                              {data.first_name[0]}
                            </div>
                          )}
                          <div className="flex flex-col w-full">
                            <span className="text-start truncate">
                              {data.first_name} {data.last_name}
                            </span>
                            <span className="text-start text-(--primary-muted-color)!">
                              {data.refcount} реферала
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
                            <span>{index + 1} место</span>
                          )}
                        </div>
                      </div>
                      {index != top.ref.users.length - 1 && (
                        <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                      )}
                    </button>
                  ))
                : "Отсутствует"}
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
