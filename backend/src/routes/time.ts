import { Request, Response } from "express";
import getDbConnection from "../function/getDbConnection";
import { User } from "../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    const [infoprofile] = (await getDbConnection(
      `SELECT time, last_time FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile) {
      res.send({
        process: true,
        time: infoprofile.time,
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
