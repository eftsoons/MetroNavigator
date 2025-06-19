import Button from "@/components/Button";
import { Page } from "@/components/PageOpacity";
import { Store } from "@/type";
import { openLink, openTelegramLink } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Support() {
  const { t } = useTranslation();

  const region = useSelector((data: Store) => data.info.region);

  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  return (
    <Page className="p-[16px]! flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="text-[24px] font-medium!">{t("OfficalSourcesMetro")}</h1>
        {region == "mos" ? (
          <>
            <Button
              href={
                TypePlatform == "vk"
                  ? "https://t.me/transport_mos_bot"
                  : undefined
              }
              onClick={() =>
                TypePlatform == "tg" &&
                openTelegramLink("https://t.me/transport_mos_bot")
              }
            >
              {t("OfficalMetroChatBotMos")}
            </Button>
            <Button
              href={TypePlatform == "vk" ? "https://mosmetro.ru/" : undefined}
              onClick={() =>
                TypePlatform == "tg" && openLink("https://mosmetro.ru/")
              }
            >
              {t("OfficalSite")}
            </Button>
            <Button
              href={
                TypePlatform == "vk" ? "https://vk.com/mosmetro" : undefined
              }
              onClick={() =>
                TypePlatform == "tg" && openLink("https://vk.com/mosmetro")
              }
            >
              {t("OfficalGroupVK")}
            </Button>
            <Button
              href={TypePlatform == "vk" ? "https://t.me/DtRoad" : undefined}
              onClick={() =>
                TypePlatform == "tg" && openTelegramLink("https://t.me/DtRoad")
              }
            >
              {t("OfficalChannelTG")}
            </Button>
            <Button
              href={
                TypePlatform == "vk"
                  ? "https://lk.mosmetro.ru/sign-in"
                  : undefined
              }
              onClick={() =>
                TypePlatform == "tg" &&
                openLink("https://lk.mosmetro.ru/sign-in")
              }
            >
              {t("ReplenishBalance")}
            </Button>
          </>
        ) : region == "sbp" ? (
          <>
            <Button
              href={TypePlatform == "vk" ? "https://metro.spb.ru/" : undefined}
              onClick={() =>
                TypePlatform == "tg" && openLink("https://metro.spb.ru/")
              }
            >
              {t("OfficalSite")}
            </Button>
            <Button
              href={
                TypePlatform == "vk"
                  ? "https://vk.com/metrospbofficial"
                  : undefined
              }
              onClick={() =>
                TypePlatform == "tg" &&
                openLink("https://vk.com/metrospbofficial")
              }
            >
              {t("OfficalGroupVK")}
            </Button>
            <Button
              href={TypePlatform == "vk" ? "https://t.me/spbmetro" : undefined}
              onClick={() =>
                TypePlatform == "tg" &&
                openTelegramLink("https://t.me/spbmetro")
              }
            >
              {t("OfficalChannelTG")}
            </Button>
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-[8px]">
        <h1 className="text-[24px] font-medium!">{t("ContactDeveloper")}</h1>
        <Button
          href={TypePlatform == "vk" ? "https://t.me/FedinLive" : undefined}
          onClick={() =>
            TypePlatform == "tg" && openTelegramLink("https://t.me/FedinLive")
          }
        >
          {t("ChannelAuthorTG")}
        </Button>
        <Button
          href={TypePlatform == "vk" ? "https://t.me/shishkin666" : undefined}
          onClick={() =>
            TypePlatform == "tg" && openTelegramLink("https://t.me/shishkin666")
          }
        >
          {t("Author")}
        </Button>
      </div>
    </Page>
  );
}

export default Support;
