import PageAnimation from "@/components/PageAnimation";
import Filter from "@/svg/filter";
import Settings from "@/svg/settings";
import ServicesFilter from "./ServicesFilter";
import SettignsNodes from "./SettingsNodes";
import { useState, memo } from "react";
import { Store } from "@/type";
import { useSelector } from "react-redux";

const SettingsMap = memo(() => {
  const [servicesfiler, setservicesfiler] = useState(false);
  const [settingsnodes, setsettingsnodes] = useState(false);

  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  return (
    <>
      <div className="fixed top-[1rem] right-[1rem] flex bg-[var(--primary-color)] rounded-[10px] border-[2px] border-[var(--primary-border-color)] border-solid p-[6px]! gap-[8px]">
        <button
          onClick={() => setservicesfiler(true)}
          className="h-[35px] w-[35px]"
        >
          <Filter />
        </button>
        <button
          onClick={() => setsettingsnodes(true)}
          className="h-[35px] w-[35px]"
        >
          <Settings />
        </button>
      </div>
      <PageAnimation
        open={servicesfiler}
        back={true}
        backfunction={() => setservicesfiler(false)}
        className="w-full h-full flex flex-col gap-[12px] z-2"
        backbuttondisabled={TypePlatform != "vk"}
      >
        <ServicesFilter backfunction={() => setservicesfiler(false)} />
      </PageAnimation>
      <PageAnimation
        open={settingsnodes}
        back={true}
        className="w-full h-full flex flex-col gap-[16px] z-2"
        backfunction={() => setsettingsnodes(false)}
        backbuttondisabled={TypePlatform != "vk"}
      >
        <SettignsNodes />
      </PageAnimation>
    </>
  );
});

export default SettingsMap;
