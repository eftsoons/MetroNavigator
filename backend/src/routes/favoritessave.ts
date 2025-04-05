import { Request, Response } from "express";
import getDbConnection from "../function/getDbConnection";
import { User } from "../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userinfo = JSON.parse(initData.get("user") as string);

    const favoritesstationid = Number(req.body.favoritesstationid) as number;

    const [infoprofile] = (await getDbConnection(
      `SELECT favoritessave FROM users WHERE telegram_id = ?`,
      [userinfo.id]
    )) as Array<User>;

    if (infoprofile && !isNaN(favoritesstationid)) {
      const favoritessave = infoprofile.favoritessave
        ? JSON.parse(infoprofile.favoritessave)
        : [];

      if (favoritessave.includes(favoritesstationid)) {
        const favoritesid = favoritessave.indexOf(favoritesstationid);
        favoritessave.splice(favoritesid, 1);
      } else {
        favoritessave.push(favoritesstationid);
      }

      await getDbConnection(
        `UPDATE users SET favoritessave = ? WHERE telegram_id = ?`,
        [JSON.stringify(favoritessave), userinfo.id]
      );

      res.send({
        process: true,
        favoritessave: favoritessave,
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
