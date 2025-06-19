import { Request, Response } from "express";

import { DbVkConncet } from "../../function/getDbConnection";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");

    await DbVkConncet(`UPDATE users SET routesave = NULL WHERE vk_id = ?`, [
      userid,
    ]);

    res.send({
      process: true,
      routesave: [],
    });
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
