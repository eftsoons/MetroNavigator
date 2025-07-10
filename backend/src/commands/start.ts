import { Message } from "node-telegram-bot-api";
import { DbTGConncet } from "../function/getDbConnection";
import { User } from "../type";
import bot from "../bot";

import { t, changeLanguage } from "i18next";

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

    changeLanguage(msg.from.language_code);

    const [userbd] = (await DbTGConncet(
      `SELECT * FROM users WHERE telegram_id = ${chatid}`
    )) as Array<User>;

    if (!userbd) {
      if (!usermyrefid) {
        await DbTGConncet(
          `INSERT INTO users(telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
          [chatid, first_name, last_name, username]
        );
      } else {
        if (!isNaN(usermyrefid) && usermyrefid != chatid) {
          const [usermyrefbd] = (await DbTGConncet(
            `SELECT * FROM users WHERE telegram_id = ?`,
            [usermyrefid]
          )) as Array<User>;

          if (usermyrefbd) {
            await DbTGConncet(
              `INSERT INTO users(telegram_id, first_name, last_name, username, myref) VALUES (?, ?, ?, ?, ?)`,
              [chatid, first_name, last_name, username, usermyrefbd.telegram_id]
            );

            const ref = usermyrefbd.ref ? JSON.parse(usermyrefbd.ref) : [];
            ref.push({ telegram_id: chatid });

            const resultref = JSON.stringify(ref);

            await DbTGConncet(
              `UPDATE users SET ref=?, refcount = refcount + 1 WHERE telegram_id = ?`,
              [resultref, usermyrefid]
            );
          } else {
            await DbTGConncet(
              `INSERT INTO users(telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
              [chatid, first_name, last_name, username]
            );
          }
        } else {
          await DbTGConncet(
            `INSERT INTO users(telegram_id, first_name, last_name, username) VALUES (?, ?, ?, ?)`,
            [chatid, first_name, last_name, username]
          );
        }
      }
    }

    await bot.sendMessage(
      chatid,
      t("start", {
        channel: channelurl,
        //countalluser: global.countuser,
      }),
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: t("mos"),
                web_app: {
                  url: `https://apps.miniappsmetro.ru`,
                },
              },
            ],
            /*[
              {
                text: t("sbp"),
                web_app: {
                  url: `https://sbp.miniappsmetro.ru`,
                },
              },
            ],*/
            [
              {
                text: t("Sourcecode"),
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
