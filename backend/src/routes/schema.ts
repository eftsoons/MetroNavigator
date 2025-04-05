import { Request, Response } from "express";

import global from "../global";

export default async (_: Request, res: Response) => {
  try {
    // const initData = new URLSearchParams(req.headers.authorization);
    //const userinfo = JSON.parse(initData.get("user") as string);

    if (global.info.schema) {
      res.send({ process: true, schema: global.info.schema });
    } else {
      res.status(503).send({ process: false, msg: "Error" });
    }
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
