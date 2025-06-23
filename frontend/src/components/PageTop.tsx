import { CSSProperties, ReactNode, useEffect } from "react";

import CloseSVG from "@/svg/close";
import { useDispatch, useSelector } from "react-redux";
import { backfunctiondeleted, backfunctionpush } from "@/redux/platform";

import { Sheet } from "react-modal-sheet";
import { Store } from "@/type";

export function Page({
  open,
  children,
  back,
  backfunction,
  className,
  style,
  contentheight,
  ref,
  backbuttondisabled,
  headeractive,
}: {
  open: boolean;
  children: ReactNode;
  back?: boolean;
  backfunction?: () => void;
  className?: string;
  style?: CSSProperties;
  contentheight?: boolean;
  ref?: React.LegacyRef<HTMLDivElement>;
  backbuttondisabled?: boolean;
  headeractive?: boolean;
}) {
  const AppPlatform = useSelector((data: Store) => data.platform.AppPlatform);

  const dispatch = useDispatch();

  useEffect(() => {
    if (back && open) {
      dispatch(backfunctionpush(backfunction));
    } else {
      dispatch(backfunctiondeleted());
    }
  }, [back, open]);

  return (
    <Sheet
      isOpen={open}
      onClose={() => backfunction && backfunction()}
      detent={contentheight ? "content-height" : "full-height"}
      tweenConfig={{ ease: "easeInOut", duration: 0.3 }}
      ref={ref}
      onCloseEnd={() => {
        // backfunction && backfunction();
        // console.log(123);
        //поменять
      }}
    >
      <Sheet.Container
        style={{
          backgroundColor: "var(--primary-bg)",
          boxShadow: "none",
          borderTopLeftRadius: contentheight ? "16px" : 0,
          borderTopRightRadius: contentheight ? "16px" : 0,
          /*paddingTop: ["mobile_iphone", "mobile_ipad"].includes(AppPlatform)
            ? "85px"
            : ["mobile_android", "mobile_web"].includes(AppPlatform)
            ? "50px"
            : "16px",*/
        }}
        className={`max-h-full! ${contentheight ? "h-auto!" : "h-full!"}`}
      >
        {headeractive && <Sheet.Header />}
        <Sheet.Content
          disableDrag
          className={className}
          style={{
            display: "static",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--primary-bg)",
            overflowY: "scroll",
            padding: "16px",
            paddingBottom: ["macos", "ios", "mobile_iphone"].includes(
              AppPlatform
            )
              ? "34px"
              : "16px",
            ...style,
          }}
        >
          {!backbuttondisabled && (
            <button
              onClick={() => {
                backfunction && backfunction();
              }}
              className="h-[28px] w-[28px] p-[8px]! bg-[var(--primary-button)] rounded-[999px] absolute right-[1rem] top-[1.5rem] z-2"
            >
              <CloseSVG />
            </button>
          )}
          {children}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
