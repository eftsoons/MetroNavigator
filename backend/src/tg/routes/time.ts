import { Request, Response } from "express";
import { DbTGConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    const time = new Date().valueOf() / 1000;

    const [infoprofile] = (await DbTGConncet(
      `SELECT time, last_time FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile?.last_time) {
      if (time - infoprofile.last_time > 7) {
        await DbTGConncet(
          `UPDATE users SET time = time + 10, last_time = ? WHERE telegram_id = ?`,
          [time, userinfo.id]
        );

        res.send({
          process: true,
          time: infoprofile.time + 10,
        });
      } else {
        res.send({
          process: true,
          time: infoprofile.time,
        });
      }
    } else {
      if (infoprofile) {
        res.send({
          process: true,
          time: infoprofile.time,
        });
      } else {
        res.status(404).send({ process: false, msg: "Error" });
      }
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
