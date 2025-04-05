import { Request, Response } from "express";

import getDbConnection from "../function/getDbConnection";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    await getDbConnection(
      `UPDATE users SET routesave = '[]' WHERE telegram_id = ?`,
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
