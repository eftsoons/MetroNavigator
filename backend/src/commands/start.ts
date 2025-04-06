import { Message } from "node-telegram-bot-api";
import getDbConnection from "../function/getDbConnection";
import { User } from "../type";
import bot from "../bot";
import global from "../global";

const webappurl = process.env.WEB_APP_URL!;
const channelurl = process.env.CHANNEL_URL!;
const githuburl = process.env.GITHUB_URL!;

export default async (msg: Message) => {
  const text = msg.text;
  const usermyrefid = text ? Number(text.split(" ")[1]) : NaN;

  if (msg.from) {
    const chatid = msg.from.id;
    const first_name = msg.from.first_name;
    const last_name = msg.from.last_name;
    const username = msg.from.username;

    const [userbd] = (await getDbConnection(
      `SELECT * FROM users WHERE telegram_id = ${chatid}`
    )) as Array<User>;

    if (!userbd) {
      if (!usermyrefid) {
        await getDbConnection(
          `INSERT INTO users(telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
          [chatid, first_name, last_name, username]
        );
      } else {
        if (!isNaN(usermyrefid) && usermyrefid != chatid) {
          const [usermyrefbd] = (await getDbConnection(
            `SELECT * FROM users WHERE telegram_id = ?`,
            [usermyrefid]
          )) as Array<User>;

          if (usermyrefbd) {
            await getDbConnection(
              `INSERT INTO users(telegram_id, first_name, last_name, username, myref) VALUES (?, ?, ?, ?, ?)`,
              [chatid, first_name, last_name, username, usermyrefbd.telegram_id]
            );

            const ref = usermyrefbd.ref ? JSON.parse(usermyrefbd.ref) : [];
            ref.push({ telegram_id: chatid });

            const resultref = JSON.stringify(ref);

            getDbConnection(
              `UPDATE users SET ref=?, refcount = refcount + 1 WHERE telegram_id = ?`,
              [resultref, usermyrefid]
            );
          } else {
            await getDbConnection(
              `INSERT INTO users(telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
              [chatid, first_name, last_name, username]
            );
          }
        } else {
          await getDbConnection(
            `INSERT INTO users(telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
            [chatid, first_name, last_name, username]
          );
        }
      }
    }

    await bot.sendMessage(
      chatid,
      `Здраствуйте!\nДанный бот был создан для осуществление более удобной навигации в метрополитенах мира.\n\nТелеграмм канал проекта - <a href="${channelurl}">канал</a> ℹ️${
        global.info.countuser
          ? `\nВсего пользователей: ${global.info.countuser} (Обновляется раз в день) 📈`
          : ""
      }\n\nНа данный момент доступны схемы навигации в метрополитенах:`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Москва",
                web_app: { url: webappurl },
              },
            ],
            [
              {
                text: "Исходный код проекта",
                url: githuburl,
              },
            ],
          ],
        },
        parse_mode: "HTML",
      }
    );
  }
};
