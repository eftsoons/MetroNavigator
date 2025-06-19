import { Request, Response } from "express";
import { DbTGConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    await DbTGConncet(
      `UPDATE users SET showtop = NOT showtop WHERE telegram_id = ?`,
      [userinfo.id]
    );

    const [infoprofile] = (await DbTGConncet(
      `SELECT showtop FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile) {
      res.send({
        process: true,
        showtop: infoprofile.showtop == 1,
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
