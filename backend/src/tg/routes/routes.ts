import axios from "axios";
import { Request, Response } from "express";

import { DbTGConncet } from "../../function/getDbConnection";
import { RouteProfile, User } from "../../type";

import global from "../../global";
import IsCheckRegion from "../../function/IsCheckRegion";

export default async (req: Request, res: Response) => {
  try {
    const Astation = req.body.A as number;
    const Bstation = req.body.B as number;

    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    const region = req.headers.region;

    if (
      typeof Astation == "number" &&
      typeof Bstation == "number" &&
      Astation < 10000 &&
      Bstation < 10000 &&
      IsCheckRegion(region)
    ) {
      const [infoprofile] = (await DbTGConncet(
        `SELECT routesave
        FROM users WHERE telegram_id = ?`,
        [userinfo.id]
      )) as Array<User>;

      if (infoprofile) {
        const route: RouteProfile = (
          infoprofile.routesave ? JSON.parse(infoprofile.routesave) : []
        ) as RouteProfile;

        const routeregion = route[region]
          ? route[region].filter(
              (data) => data.start != Astation || data.end != Bstation
            )
          : [];

        routeregion.splice(0, 0, { start: Astation, end: Bstation });

        const routesave = {
          ...route,
          [region]: routeregion,
        };

        await DbTGConncet(
          `UPDATE users SET countroutes = countroutes + 1, routesave = ? WHERE telegram_id = ?`,
          [JSON.stringify(routesave), userinfo.id]
        );

        if (global.info[region].routes.has(`${Astation}-${Bstation}`)) {
          res.send({
            process: true,
            routes: global.info[region].routes.get(`${Astation}-${Bstation}`),
            routesave: routesave[region],
          });
        } else {
          //Написать свою функцию
          const routes = await axios.post(
            `https://mosmetro.ru/router/api/routes`,
            {
              from: Astation,
              to: Bstation,
            }
          );

          if (routes.data.data) {
            global.info[region].routes.set(
              `${Astation}-${Bstation}`,
              routes.data.data
            );

            res.send({
              process: true,
              routes: routes.data.data,
              routesave: routesave[region],
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
    console.log(error);
    res.status(404).send({ process: false, msg: "Error" });
  }
};
