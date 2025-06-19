import { backfunctiondeletedall } from "@/redux/platform";
import LogoSVG from "@/svg/logo";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

function PageErrorTimeout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(backfunctiondeletedall());
  }, []);

  const { t } = useTranslation();

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-[20px] p-[16px]!">
      <div className="fill-(--primary-text) w-[200px]">
        <LogoSVG />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-center">{t("Sorry")}</span>
        <span className="text-center">{t("Reason")}</span>
      </div>
      <span className="text-center">{t("Answer")}</span>
    </div>
  );
}

export default PageErrorTimeout;
