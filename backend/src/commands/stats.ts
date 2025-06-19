import { Message } from "node-telegram-bot-api";

import { DbTGConncet } from "../function/getDbConnection";
import bot from "../bot";

const adminlist = JSON.parse(process.env.ADMIN_LIST!);

export default async (msg: Message) => {
  if (msg.from) {
    const chatid = msg.from.id;

    if (adminlist.includes(chatid)) {
      const [statsday] = (await DbTGConncet(
        "SELECT id, countday, listuser, alluser FROM statsday ORDER BY id DESC LIMIT 1;"
      )) as Array<{
        id: number;
        countday: number;
        listuser: string | null;
        alluser: number;
      }>;

      if (statsday) {
        await bot.sendMessage(
          chatid,
          `Статистика:\nВсего пользователей за последний день: ${statsday.alluser}\nПользователей онлайн за последний день: ${statsday.countday}\nID последнего дня: ${statsday.id}`
        );
      } else {
        await bot.sendMessage(chatid, "Статистики нет");
      }
    }
  }
};
