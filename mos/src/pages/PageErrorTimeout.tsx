import { backfunctiondeletedall } from "@/redux/info";
import LogoSVG from "@/svg/logo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function PageErrorTimeout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(backfunctiondeletedall());
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-[20px] p-[16px]!">
      <div className="fill-(--primary-text) w-[200px]">
        <LogoSVG />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-center">
          Извините, но вам необходимо перезагрузить mini-apps перезайдя в него.
        </span>
        <span className="text-center">
          Причиной этого служит ваше превышение лимитов нахождения в mini-apps
          (2 часа).
        </span>
      </div>
      <span className="text-center">
        Такой лимит был поставлен для обеспечения защиты данных и api в целом.
      </span>
    </div>
  );
}

export default PageErrorTimeout;
