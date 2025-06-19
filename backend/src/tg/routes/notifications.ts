import { Request, Response } from "express";

import global from "../../global";
import IsCheckRegion from "../../function/IsCheckRegion";

export default async (req: Request, res: Response) => {
  try {
    // const initData = new URLSearchParams(req.headers.authorization);
    //const userinfo = JSON.parse(initData.get("user") as string);
    const region = req.headers.region;

    if (IsCheckRegion(region)) {
      if (global.info[region].notifications) {
        res.send({
          process: true,
          notifications: global.info[region].notifications,
        });
      } else {
        res.status(503).send({ process: false, msg: "Error" });
      }
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
