import { Request, Response } from "express";
import { filterstation, User } from "../../type";
import { DbTGConncet } from "../../function/getDbConnection";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    const typefilter = req.body.typefilter as filterstation | undefined;

    if (typefilter) {
      await DbTGConncet(
        `UPDATE users SET 
        filterbank = ?,
        filtercoffee = ?,
        filtersales = ?,
        filterparking = ?,
        filtercandy = ?,
        filterelevator = ?,
        filterbattery = ?,
        filterfood = ?,
        filterflowers = ?,
        filtercarrier = ?,
        filtervending = ?,
        filterinvalid = ?,
        filtertoilet = ?,
        filterinfo = ?,
        filterprint = ?,
        filteroptics = ?,
        filtertheatre = ?
        WHERE telegram_id = ?`,
        [
          typefilter.BANK ? 1 : 0,
          typefilter.COFFEE ? 1 : 0,
          typefilter.SALES ? 1 : 0,
          typefilter.PARKING ? 1 : 0,
          typefilter.CANDY ? 1 : 0,
          typefilter.ELEVATOR ? 1 : 0,
          typefilter.BATTERY ? 1 : 0,
          typefilter.FOOD ? 1 : 0,
          typefilter.FLOWERS ? 1 : 0,
          typefilter.CARRIER ? 1 : 0,
          typefilter.VENDING ? 1 : 0,
          typefilter.INVALID ? 1 : 0,
          typefilter.TOILET ? 1 : 0,
          typefilter.INFO ? 1 : 0,
          typefilter.PRINT ? 1 : 0,
          typefilter.OPTICS ? 1 : 0,
          typefilter.THEATRE ? 1 : 0,
          userinfo.id,
        ]
      );
    } else {
      await DbTGConncet(
        `UPDATE users SET 
        filterbank = 0,
        filtercoffee = 0,
        filtersales = 0,
        filterparking = 0,
        filtercandy = 0,
        filterelevator = 0,
        filterbattery = 0,
        filterfood = 0,
        filterflowers = 0,
        filtercarrier = 0,
        filtervending = 0,
        filterinvalid = 0,
        filtertoilet = 0,
        filterinfo = 0,
        filterprint = 0,
        filteroptics = 0,
        filtertheatre = 0
        WHERE telegram_id = ?`,
        [userinfo.id]
      );
    }

    const [infoprofile] = (await DbTGConncet(
      `
      SELECT 
      filterbank, filtercoffee, filtersales, filterparking, 
      filtercandy, filterelevator, filterbattery, filterfood,
      filterflowers, filtercarrier, filtervending, filterinvalid,
      filtertoilet, filterinfo, filterprint, filteroptics, filtertheatre 
      FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile) {
      res.send({
        process: true,
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
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
