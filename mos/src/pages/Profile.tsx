import { Page } from "@/components/PageOpacity";
import {
  initData,
  openTelegramLink,
  useSignal,
  shareURL,
} from "@telegram-apps/sdk-react";

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

import {
  fetchUser,
  setuserinfotimeadd,
  setUserShowTop,
} from "@/redux/userinfo";
import { AppDispatch } from "@/redux";
import TimeToHour from "@/function/TimeToHour";

function Profile() {
  const user = useSignal(initData.user);
  const raw = useSignal(initData.raw);

  const userinfo = useSelector((data: Store) => data.userinfo);
  const dispatch = useDispatch<AppDispatch>();

  const [vagon1, setvagon1] = useState<Array<string>>([]);
  const [vagon2, setvagon2] = useState<Array<string>>([]);
  const [limitref, setlimitref] = useState(5);

  useEffect(() => {
    raw && dispatch(fetchUser(raw));

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

  return userinfo.loaded && user ? (
    <Page className="px-[16px]! flex flex-col gap-[20px] min-h-[100%] relative">
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
              <img
                className="w-[30%] max-w-[180px] h-full rounded-[999px]"
                src={user.photoUrl}
              />
              <div className="h-full w-[20%] max-w-[100px] rotate-15">
                <Sport14SVG />
              </div>
            </div>
            <span className="text-center">
              {user.firstName} {user.lastName}
            </span>
          </div>
          {user.username && <span>@{user.username}</span>}
        </div>
        <div className="bg-(--primary-color) p-[8px]! rounded-[8px] w-full flex flex-col">
          <span>Количество маршрутов: {userinfo.countroutes}</span>
          <span>Время нахождения в mini-apps: {TimeToHour(userinfo.time)}</span>
          <span>Количество рефералов: {userinfo.refcount}</span>
        </div>
        <div className="bg-(--primary-color) p-[8px]! rounded-[8px] flex flex-col">
          <div className="flex flex-col gap-[16px]">
            {/* {typeuser == "my" && ( */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col">
                <span>Реферальная ссылка:</span>
                <span className="select-all! break-all!">
                  https://t.me/MetroNavigatorBot?start={user.id}
                </span>
              </div>
              <div className="flex items-center gap-[16px]">
                <Button
                  onClick={() =>
                    Copy(`https://t.me/MetroNavigatorBot?start=${user.id}`)
                  }
                >
                  Скопировать
                </Button>
                <Button
                  onClick={() =>
                    shareURL(`https://t.me/MetroNavigatorBot?start=${user.id}`)
                  }
                >
                  Поделиться
                </Button>
              </div>
            </div>
            {/* )} */}
            <div className="flex flex-col gap-[8px]">
              <span>Ваши рефералы:</span>
              <div className="p-[16px]! bg-(--primary-bg) rounded-[8px] gap-[16px] flex flex-col">
                {userinfo.ref.length > 0 ? (
                  <>
                    {userinfo.ref.map(
                      (data, index) =>
                        limitref - 1 >= index && (
                          <button
                            onClick={() =>
                              data.username &&
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
                                  {data.photo ? (
                                    <img
                                      className="rounded-[999px] h-[30px] w-[30px]"
                                      src={data.photo}
                                    />
                                  ) : (
                                    <div className="rounded-[999px] h-[30px] w-[30px] flex justify-center items-center bg-(--primary-button)">
                                      {data.first_name[0]}
                                    </div>
                                  )}
                                  <span className="text-start truncate">
                                    {data.first_name} {data.last_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {index != limitref - 1 && (
                              <div className="w-full h-[1px] bg-[var(--primary-border-color)]" />
                            )}
                          </button>
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
                        Показать ещё
                      </Button>
                    )}
                  </>
                ) : (
                  <span>Отсутствуют</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-(--primary-color) p-[12px]! rounded-[8px] cursor-pointer gap-[16px] flex flex-col">
          <div
            className="flex w-full justify-between items-center"
            onClick={() => dispatch(setUserShowTop(raw))}
          >
            <span>Показывать себя в топе</span>
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
