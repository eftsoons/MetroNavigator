import { AppDispatch } from "@/redux";
import { setTypeNodes } from "@/redux/userinfo";
import { Store } from "@/type";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { useDispatch, useSelector } from "react-redux";

function SettignsNodes() {
  const typenodes = useSelector(
    (data: Store) => data.userinfo.loaded && data.userinfo.typenodes
  );
  const dispatch = useDispatch<AppDispatch>();
  const raw = useSignal(initData.raw);

  const handlebuttonradio = (e: React.ChangeEvent<HTMLInputElement>) => {
    raw &&
      dispatch(setTypeNodes({ raw: raw, typenodes: Number(e.target.value) }));
  };

  return (
    <>
      <div>
        <h1 className="text-[20px]">Настройки маршрутов</h1>
        <p className="text-[15px] text-[var(--primary-muted-color)]!">
          Приоритет маршрута
        </p>
      </div>
      <div className="flex flex-col w-full gap-[16px]">
        <label className="flex justify-between cursor-pointer">
          <span>По времени и пересадкам</span>
          <input
            type="radio"
            checked={typenodes == 0}
            value={0}
            onChange={handlebuttonradio}
            className="cursor-pointer appearance-none border-solid border-[var(--primary-text)] h-[24px] w-[24px] rounded-[999px] duration-150"
            style={{ borderWidth: typenodes == 0 ? "7px" : "1px" }}
          />
        </label>
        <label className="flex justify-between cursor-pointer">
          <span>По времени</span>
          <input
            type="radio"
            checked={typenodes == 1}
            value={1}
            onChange={handlebuttonradio}
            className="cursor-pointer appearance-none border-solid border-[var(--primary-text)] h-[24px] w-[24px] rounded-[999px] duration-150"
            style={{ borderWidth: typenodes == 1 ? "7px" : "1px" }}
          />
        </label>
        <label className="flex justify-between cursor-pointer">
          <span>По пересадкам</span>
          <input
            type="radio"
            checked={typenodes == 2}
            value={2}
            onChange={handlebuttonradio}
            className="cursor-pointer appearance-none border-solid border-[var(--primary-text)] h-[24px] w-[24px] rounded-[999px] duration-150"
            style={{ borderWidth: typenodes == 2 ? "7px" : "1px" }}
          />
        </label>
      </div>
    </>
  );
}

export default SettignsNodes;
