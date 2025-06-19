import { NextFunction, Response, Request } from "express";

import { DbTGConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);
    const auth_date = initData.get("auth_date");
    const time = new Date().valueOf() / 1000;
    // const path = req.path;

    if (time - Number(auth_date) <= 7200) {
      const [userinfobd] = (await DbTGConncet(
        `SELECT first_name, last_name, last_time, username, photo, time FROM users WHERE telegram_id = ?`,
        [userinfo.id]
      )) as Array<User>;

      if (!userinfobd) {
        await DbTGConncet(
          `INSERT IGNORE INTO users(telegram_id, last_time, first_name, last_name, username, photo) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            userinfo.id,
            time,
            userinfo.first_name,
            userinfo.last_name,
            userinfo.username,
            userinfo.photo_url,
          ]
        );
      } else {
        if (
          userinfobd.first_name != userinfo.first_name ||
          userinfobd.last_name != userinfo.last_name ||
          userinfobd.username != userinfo.username ||
          userinfobd.photo != userinfo.photo_url
        ) {
          await DbTGConncet(
            `UPDATE users SET first_name = ?, last_name = ?, username = ?, photo = ? WHERE telegram_id = ?`,
            [
              userinfo.first_name,
              userinfo.last_name,
              userinfo.username,
              userinfo.photo_url,
              userinfo.id,
            ]
          );
        }

        // if (userinfobd.last_time && path == "/time") {
        //   if (time - userinfobd.last_time > 7) {
        //     await getDbConnection(
        //       `UPDATE users SET time = time + 10 WHERE telegram_id = ?`,
        //       [userinfo.id]
        //     );
        //   }
        // }

        // await getDbConnection(
        //   `UPDATE users SET last_time = ? WHERE telegram_id = ?`,
        //   [time, userinfo.id]
        // );
      }

      next();
    } else {
      res.status(408).send({ process: false, msg: "Timeout" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
