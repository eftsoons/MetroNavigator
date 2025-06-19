import { Request, Response } from "express";
import fs from "fs";

export default (req: Request, res: Response) => {
  try {
    const region = req.headers.region;

    res.set("Content-Type", "image/webp");
    res.send(fs.readFileSync(`./data/${region}/schema.webp`));
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
