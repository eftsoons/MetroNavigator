import { Request, Response } from "express";

import { DbTGConncet } from "../../.../../function/getDbConnection";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    await DbTGConncet(
      `UPDATE users SET routesave = NULL WHERE telegram_id = ?`,
      [userinfo.id]
    );

    res.send({
      process: true,
      routesave: [],
    });
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
