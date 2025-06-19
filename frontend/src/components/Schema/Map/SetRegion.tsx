import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Store } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import { setopenmenucity } from "@/redux/info";
import Vagon1SVG from "@/svg/vagon1";

const SetRegion = memo(() => {
  const dispatch = useDispatch();

  const region = useSelector((data: Store) => data.info.region);
  const openmenucity = useSelector((data: Store) => data.info.openmenucity);

  // const handleSetRegion = (regionset: Store["info"]["region"]) => {
  //   if (region !== regionset) {
  //     dispatch(setRegion(regionset));

  //     setTimeout(() => {
  //       dispatch(setopenmenucity(false));
  //     }, 300);
  //   }
  // };

  return (
    <div
      className="fixed bottom-[136px] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center gap-[8px] user"
      hidden
    >
      <AnimatePresence>
        {openmenucity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex bg-[var(--primary-color)] rounded-[10px] border-[2px] border-[var(--primary-border-color)] border-solid p-[10px]! w-full flex-col gap-[8px]"
          >
            <a
              // onClick={() => handleSetRegion("mos")}
              className="flex gap-[8px] items-center justify-center cursor-pointer"
              href={"http://localhost:5173/mos"}
            >
              <AnimatePresence>
                {region == "mos" && (
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                      x: `0%`,
                      opacity: 1,
                    }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="h-[30px] w-[30px] grid items-center fill-(--primary-accept)"
                  >
                    <Vagon1SVG />
                  </motion.div>
                )}
              </AnimatePresence>
              <span>Москва</span>
            </a>
            <a
              // onClick={() => handleSetRegion("sbp")}
              className="flex gap-[8px] items-center justify-center cursor-pointer"
              href={"http://localhost:5173/sbp"}
            >
              <AnimatePresence>
                {region == "sbp" && (
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                      x: `0%`,
                      opacity: 1,
                    }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="h-[30px] w-[30px] grid items-center fill-(--primary-accept)"
                  >
                    <Vagon1SVG />
                  </motion.div>
                )}
              </AnimatePresence>
              <span>Санкт-Петербург</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => dispatch(setopenmenucity(!openmenucity))}
        className="flex bg-[var(--primary-color)] rounded-[10px] border-[2px] border-[var(--primary-border-color)] border-solid p-[10px]!"
      >
        {region == "mos" ? "Москва" : "Санкт-Петербург"}
      </button>
    </div>
  );
});

export default SetRegion;
