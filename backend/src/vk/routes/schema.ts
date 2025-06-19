import { Request, Response } from "express";

import global from "../../global";
import IsCheckRegion from "../../function/IsCheckRegion";

export default async (req: Request, res: Response) => {
  try {
    // const initData = new URLSearchParams(req.headers.authorization);
    //const userinfo = JSON.parse(initData.get("user") as string);

    const region = req.headers.region;

    if (IsCheckRegion(region)) {
      if (global.info[region].schema) {
        res.send({ process: true, schema: global.info[region].schema });
      } else {
        res.status(503).send({ process: false, msg: "Error" });
      }
    } else {
      res.status(404).send({ process: false, msg: "Not Region" });
    }
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
