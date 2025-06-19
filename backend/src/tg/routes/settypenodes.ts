import { Request, Response } from "express";
import { DbTGConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    const typenodes = req.body.typenodes as number;

    if ((typenodes || typenodes == 0) && !isNaN(typenodes) && typenodes < 3) {
      await DbTGConncet(
        `UPDATE users SET typenodes = ? WHERE telegram_id = ?`,
        [typenodes, userinfo.id]
      );
    }

    const [infoprofile] = (await DbTGConncet(
      `SELECT typenodes FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile) {
      res.send({
        process: true,
        typenodes: infoprofile.typenodes,
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
