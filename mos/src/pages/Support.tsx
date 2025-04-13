import Button from "@/components/Button";
import { Page } from "@/components/PageOpacity";
import { openLink, openTelegramLink } from "@telegram-apps/sdk-react";

function Support() {
  return (
    <Page className="p-[16px]! flex flex-col gap-[8px]">
      <Button
        onClick={() => openTelegramLink("https://t.me/transport_mos_bot")}
      >
        Офицальный чат бот "Александр"
      </Button>
      <Button onClick={() => openLink("https://mosmetro.ru/")}>
        Офицальный сайт
      </Button>
      <Button onClick={() => openLink("https://vk.com/mosmetro")}>
        Офицальная группа в вк
      </Button>
      <Button onClick={() => openTelegramLink("https://t.me/DtRoad")}>
        Новости транспорта в телеграмм
      </Button>
      <Button onClick={() => openTelegramLink("https://t.me/FedinLive")}>
        Канал автора mini-apps
      </Button>
      <Button onClick={() => openTelegramLink("https://t.me/shishkin666")}>
        Поддержка
      </Button>
      <Button onClick={() => openLink("https://lk.mosmetro.ru/sign-in")}>
        Пополнить баланс
      </Button>
    </Page>
  );
}

export default Support;
