import { useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";
import { CSSProperties, ReactNode, useEffect } from "react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Store } from "@/type";

export function Page({
  children,
  back,
  className,
  style,
}: {
  children: ReactNode;
  back?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const AppPlatform = useSelector((data: Store) => data.platform.AppPlatform);

  const navigate = useNavigate();

  useEffect(() => {
    if (AppPlatform == "tg") {
      if (back) {
        backButton.show();

        return backButton.onClick(() => {
          navigate(-1);
        });
      }
      backButton.hide();
    }
  }, [back]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      style={{
        ...style,
        paddingBottom: ["macos", "ios", "mobile_iphone"].includes(AppPlatform)
          ? "34px"
          : "0",
        /*paddingTop: ["mobile_iphone", "mobile_ipad"].includes(AppPlatform)
          ? "85px"
          : ["mobile_android", "mobile_web"].includes(AppPlatform)
          ? "50px"
          : "0",*/
      }}
    >
      {children}
    </motion.div>
  );
}
