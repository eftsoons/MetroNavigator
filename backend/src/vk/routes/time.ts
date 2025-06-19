import { Request, Response } from "express";
import { DbVkConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");

    const time = new Date().valueOf() / 1000;

    const [infoprofile] = (await DbVkConncet(
      `SELECT time, last_time FROM users WHERE vk_id = ?`,
      [userid]
    )) as Array<User>;

    if (infoprofile?.last_time) {
      if (time - infoprofile.last_time > 7) {
        await DbVkConncet(
          `UPDATE users SET time = time + 10, last_time = ? WHERE vk_id = ?`,
          [time, userid]
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
