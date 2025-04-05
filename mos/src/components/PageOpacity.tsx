import { useNavigate } from "react-router-dom";
import { backButton, retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { CSSProperties, ReactNode, useEffect } from "react";

import { motion } from "framer-motion";

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
  const lauchparams = retrieveLaunchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();

      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
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
        paddingBottom: ["macos", "ios"].includes(lauchparams.platform)
          ? "34px"
          : "0",
      }}
    >
      {children}
    </motion.div>
  );
}
