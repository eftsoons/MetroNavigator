import { AppDispatch } from "@/redux";
import { setTypeNodes } from "@/redux/userinfo";
import { Store } from "@/type";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function SettignsNodes() {
  const { t } = useTranslation();

  const typenodes = useSelector((data: Store) => data.userinfo.typenodes);
  const dispatch = useDispatch<AppDispatch>();

  const handlebuttonradio = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTypeNodes({ typenodes: Number(e.target.value) }));
  };

  return (
    <>
      <div className="flex flex-col w-full gap-[16px]">
        <label className="flex justify-between cursor-pointer">
          <span>{t("PriorityTimeAndTransfer")}</span>
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
          <span>{t("PriorityTime")}</span>
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
          <span>{t("PriorityTranfer")}</span>
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
