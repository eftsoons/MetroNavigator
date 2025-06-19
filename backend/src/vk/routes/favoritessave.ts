import { Request, Response } from "express";
import { DbVkConncet } from "../../function/getDbConnection";
import { User } from "../../type";
import IsCheckRegion from "../../function/IsCheckRegion";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");

    const region = req.headers.region;

    const favoritesstationid = Number(req.body.favoritesstationid) as number;

    const [infoprofile] = (await DbVkConncet(
      `SELECT favoritessave FROM users WHERE vk_id = ?`,
      [userid]
    )) as Array<User>;

    if (infoprofile && !isNaN(favoritesstationid) && IsCheckRegion(region)) {
      const favorites = JSON.parse(infoprofile.favoritessave);

      const favoritessave = infoprofile.favoritessave
        ? favorites[region]
          ? favorites[region]
          : []
        : [];

      if (favoritessave.includes(favoritesstationid)) {
        const favoritesid = favoritessave.indexOf(favoritesstationid);
        favoritessave.splice(favoritesid, 1);
      } else {
        favoritessave.push(favoritesstationid);
      }

      await DbVkConncet(`UPDATE users SET favoritessave = ? WHERE vk_id = ?`, [
        JSON.stringify({ ...favorites, [region]: favoritessave }),
        userid,
      ]);

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
