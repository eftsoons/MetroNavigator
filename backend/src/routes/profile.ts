import { Request, Response } from "express";
import getDbConnection from "../function/getDbConnection";
import { User } from "../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);
    const [infoprofile] = (await getDbConnection(
      `SELECT countroutes, ref, showtop, refcount, time, filterbank, filtercoffee, filtersales, filterparking, 
      filtercandy, filterelevator, filterbattery, filterfood,
      filterflowers, filtercarrier, filtervending, filterinvalid,
      filtertoilet, filterinfo, filterprint, filteroptics, filtertheatre, typenodes, routesave, favoritessave
      FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile) {
      const infoprofileref = infoprofile.ref ? JSON.parse(infoprofile.ref) : [];
      const inforoutesave = infoprofile.routesave
        ? JSON.parse(infoprofile.routesave)
        : [];

      const infofavoritessave = infoprofile.favoritessave
        ? JSON.parse(infoprofile.favoritessave)
        : [];
      const ref = [];

      for (let i = 0; i < infoprofileref.length; i++) {
        const [infoprofile] = (await getDbConnection(
          `SELECT 
          first_name, last_name, photo, username
          FROM users WHERE telegram_id = ?`,
          [infoprofileref[i].telegram_id]
        )) as Array<User>;

        ref.push(infoprofile);
      }

      res.send({
        process: true,
        profile: {
          countroutes: infoprofile.countroutes,
          ref: ref,
          refcount: infoprofile.refcount,
          showtop: infoprofile.showtop == 1,
          time: infoprofile.time,
          filter: {
            BANK: infoprofile.filterbank == 1,
            COFFEE: infoprofile.filtercoffee == 1,
            SALES: infoprofile.filtersales == 1,
            PARKING: infoprofile.filterparking == 1,
            CANDY: infoprofile.filtercandy == 1,
            ELEVATOR: infoprofile.filterelevator == 1,
            BATTERY: infoprofile.filterbattery == 1,
            FOOD: infoprofile.filterfood == 1,
            FLOWERS: infoprofile.filterflowers == 1,
            CARRIER: infoprofile.filtercarrier == 1,
            VENDING: infoprofile.filtervending == 1,
            INVALID: infoprofile.filterinvalid == 1,
            TOILET: infoprofile.filtertoilet == 1,
            INFO: infoprofile.filterinfo == 1,
            PRINT: infoprofile.filterprint == 1,
            OPTICS: infoprofile.filteroptics == 1,
            THEATRE: infoprofile.filtertheatre == 1,
          },
          typenodes: infoprofile.typenodes,
          routesave: inforoutesave,
          favoritessave: infofavoritessave,
        },
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
