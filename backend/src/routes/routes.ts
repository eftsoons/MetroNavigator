import axios from "axios";
import { Request, Response } from "express";

import getDbConnection from "../function/getDbConnection";
import { User } from "../type";

import global from "../global";

export default async (req: Request, res: Response) => {
  try {
    const Astation = req.body.A as number;
    const Bstation = req.body.B as number;

    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    if (
      typeof Astation == "number" &&
      typeof Bstation == "number" &&
      Astation < 10000 &&
      Bstation < 10000
    ) {
      const [infoprofile] = (await getDbConnection(
        `SELECT routesave
        FROM users WHERE telegram_id = ?`,
        [userinfo.id]
      )) as Array<User>;

      if (infoprofile) {
        const routesave = (
          infoprofile.routesave ? JSON.parse(infoprofile.routesave) : []
        ) as Array<{ start: number; end: number }>;

        if (global.info.routes.has(`${Astation}-${Bstation}`)) {
          if (
            !routesave.some(
              (data) => data.start == Astation && data.end == Bstation
            )
          ) {
            routesave.push({ start: Astation, end: Bstation });
          }

          res.send({
            process: true,
            routes: global.info.routes.get(`${Astation}-${Bstation}`),
            routesave: routesave,
          });
        } else {
          const routes = await axios.post(
            `https://mosmetro.ru/router/api/routes`,
            {
              from: Astation,
              to: Bstation,
            }
          );

          if (routes.data.data) {
            global.info.routes.set(`${Astation}-${Bstation}`, routes.data.data);

            if (
              !routesave.some(
                (data) => data.start == Astation && data.end == Bstation
              )
            ) {
              routesave.splice(0, 0, { start: Astation, end: Bstation });
            }

            const route = routesave.slice(0, 5);

            await getDbConnection(
              `UPDATE users SET countroutes = countroutes + 1, routesave = ? WHERE telegram_id = ?`,
              [JSON.stringify(route), userinfo.id]
            );

            res.send({
              process: true,
              routes: routes.data.data,
              routesave: route,
            });
          } else {
            res.status(409).send({ process: false, msg: "Error api" });
          }
        }
      } else {
        res.status(404).send({ process: false, msg: "Error" });
      }
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
