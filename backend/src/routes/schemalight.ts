import { Request, Response } from "express";

import fs from "fs";

export default (_: Request, res: Response) => {
  res.set("Content-Type", "image/webp");
  res.send(fs.readFileSync("./data/schemalight.webp"));
};
