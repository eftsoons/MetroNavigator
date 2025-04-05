import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { CSSProperties, ReactNode, useEffect } from "react";

import CloseSVG from "@/svg/close";
import { useDispatch } from "react-redux";
import { backfunctiondeleted, backfunctionpush } from "@/redux/info";

import { Sheet } from "react-modal-sheet";

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
  const launchparams = retrieveLaunchParams();

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
    >
      <Sheet.Container
        style={{
          backgroundColor: "var(--primary-bg)",
          boxShadow: "none",
          borderTopLeftRadius: contentheight ? "16px" : 0,
          borderTopRightRadius: contentheight ? "16px" : 0,
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
            ...style,
            overflowY: "scroll",
            padding: "16px",
            paddingBottom: ["macos", "ios"].includes(launchparams.platform)
              ? "34px"
              : "16px",
          }}
        >
          {!backbuttondisabled && (
            <button
              onClick={() => {
                backfunction && backfunction();
              }}
              className="h-[28px] w-[28px] p-[8px]! bg-[var(--primary-button)] rounded-[999px] absolute right-[1rem] top-[1rem]"
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
