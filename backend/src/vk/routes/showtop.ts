import { Request, Response } from "express";
import { DbVkConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");

    await DbVkConncet(
      `UPDATE users SET showtop = NOT showtop WHERE vk_id = ?`,
      [userid]
    );

    const [infoprofile] = (await DbVkConncet(
      `SELECT showtop FROM users WHERE vk_id = ?`,
      [userid]
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
