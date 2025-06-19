import { setsnackbar } from "@/redux/info";
import CopySVG from "@/svg/copy";
import ErrorSVG from "@/svg/error";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function SnackBar({
  title,
  text,
  icon,
  onClick,
  onExit,
  time,
}: {
  title?: string;
  text?: string;
  icon?: "copy" | "error";
  onClick?: () => void;
  onExit?: () => void;
  time: number;
}) {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) {
      setActive(true);
      const idtimouot = setTimeout(() => {
        dispatch(setsnackbar(null));
        setActive(false);
        onExit && onExit();
      }, time);

      return () => clearTimeout(idtimouot);
    }
  }, []);

  return (
    <div
      className="snackbar font-normal border-solid border-[2px] border-(--primary-border-color) fixed w-[95%] h-auto bottom-px w-0.9 p-[8px]! bg-(--primary-bg) left-[5%] transform-[translateX(-2.5%)] rounded-[8px]"
      style={{ animationDuration: `${(time + 100) / 1000}s` }}
      onClick={onClick}
    >
      <div className="flex gap-[8px] items-center justify-between">
        <div className="flex flex-col">
          {title && <span className="select-text!">{title}</span>}
          {text && <span className="text-[12px] select-text!">{text}</span>}
        </div>
        {icon && (
          <div className="h-full flex justify-center items-center fill-(--primary-bg)!">
            {icon == "copy" ? (
              <CopySVG />
            ) : icon == "error" ? (
              <ErrorSVG width={25} height={25} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default SnackBar;
