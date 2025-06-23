import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { servicesfilterdata } from "@/info";
import { AppDispatch } from "@/redux";
import { setFilter } from "@/redux/userinfo";
import { FilterKeys, Store } from "@/type";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function ServicesFilter({ backfunction }: { backfunction: () => void }) {
  const { t } = useTranslation();

  const servicesfilter = useSelector((data: Store) => data.userinfo.filter);
  const dispatch = useDispatch<AppDispatch>();

  const [checkbox, setcheckbox] = useState(servicesfilter);

  useEffect(() => {
    setcheckbox(servicesfilter);
  }, [servicesfilter]);

  return (
    checkbox && (
      <>
        <h1 className="w-full text-[20px] h-[32px] flex items-center">
          {t("Filter")}
        </h1>
        <div className="w-full h-full overflow-y-auto">
          <div className="flex flex-col gap-[8px]">
            {Object.entries(checkbox).map(([keys, data], index) => {
              const key = keys as FilterKeys;
              const info = servicesfilterdata[key];

              return (
                <div
                  onClick={() => {
                    setcheckbox({ ...checkbox, [key]: !checkbox[key] });
                  }}
                  key={index}
                  className="w-full flex justify-between cursor-pointer items-center"
                >
                  <div className="flex items-center gap-[8px] w-[85%]">
                    <div className="w-[40px] h-[40px] bg-[var(--primary-color)] p-[2px]! rounded-[8px] grid items-center">
                      {info.svg}
                    </div>
                    <p>{t(info.text)}</p>
                  </div>
                  <Checkbox id={`checkbox-${index}`} active={data} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full h-[40px] justify-center gap-[1rem]">
          <Button
            onClick={() => {
              dispatch(setFilter({}));
              backfunction();
            }}
            className="h-full w-full bg-(--primary-button) text-(--primary-text)! rounded-[10px]"
          >
            {t("Reset")}
          </Button>
          <Button
            onClick={() => {
              dispatch(setFilter({ filter: checkbox }));
              backfunction();
            }}
            className="h-full w-full bg-(--primary-button) text-(--primary-text)! rounded-[10px]"
          >
            {t("Apply")}
          </Button>
        </div>
      </>
    )
  );
}

export default ServicesFilter;
