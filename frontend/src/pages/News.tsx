import { Page } from "@/components/PageOpacity";
import { Store } from "@/type";
import { useDispatch, useSelector } from "react-redux";
import Reload from "./Reload";
import { openLink } from "@telegram-apps/sdk-react";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import { useEffect } from "react";
import { AppDispatch } from "@/redux";
import { getNotifications } from "@/redux/notifications";
import { useTranslation } from "react-i18next";

import i18next from "i18next";
import { AllLang } from "@/locales/i18n";

function News() {
  const { t } = useTranslation();

  const notifications = useSelector((data: Store) => data.notifications);
  const region = useSelector((data: Store) => data.info.region);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    region && !notifications && dispatch(getNotifications());
  }, [region]);

  const arraylines = notifications
    ? [
        ...new Set(
          notifications.flatMap((data) => data.lines.map((data) => data.id))
        ),
      ].sort((a, b) => a - b)
    : [];

  return notifications ? (
    <Page className="p-[16px]! flex flex-col gap-[20px] h-full">
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col gap-[8px]">
          {arraylines.map((data2, index) => {
            const info = notifications
              .map((data, index) => {
                return {
                  indexcheck: data.lines.findIndex((data) => data.id == data2),
                  index: index,
                };
              })
              .filter((data) => data.indexcheck != -1);

            const info2 =
              notifications[info[0].index].lines[info[0].indexcheck];

            return (
              <div key={index} className="flex flex-col gap-[8px]">
                <Accordion icon={info2.icon} title={info2.name}>
                  <div className="flex flex-col gap-[10px]">
                    {info.map((data, index2) => {
                      const { index } = data;
                      const info2 = notifications[index];

                      return (
                        <div
                          className="bg-[var(--primary-color)] rounded-[10px] p-[16px]! "
                          key={index2}
                        >
                          <h1>
                            {info2.title[i18next.language as AllLang]
                              ? info2.title[i18next.language as AllLang]
                              : info2.title.ru}
                          </h1>
                          <p className="text-[0.8rem] text-[var(--primary-muted-color)]! whitespace-pre-line">
                            {info2.description[i18next.language as AllLang]
                              ? info2.description[i18next.language as AllLang]
                              : info2.description.ru}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        href={TypePlatform == "vk" && "https://mosmetro.ru/news"}
        onClick={() =>
          TypePlatform == "tg" && openLink("https://mosmetro.ru/news")
        }
      >
        {t("ButtonMainNews")}
      </Button>
    </Page>
  ) : (
    <Reload />
  );
}

export default News;
