import { Request, Response } from "express";
import { DbVkConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");

    const typenodes = req.body.typenodes as number;

    if ((typenodes || typenodes == 0) && !isNaN(typenodes) && typenodes < 3) {
      await DbVkConncet(`UPDATE users SET typenodes = ? WHERE vk_id = ?`, [
        typenodes,
        userid,
      ]);
    }

    const [infoprofile] = (await DbVkConncet(
      `SELECT typenodes FROM users WHERE vk_id = ?`,
      [userid]
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
