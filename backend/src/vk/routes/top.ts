import { Request, Response } from "express";

import { DbVkConncet } from "../../function/getDbConnection";
import { User } from "../../type";

export default async (req: Request, res: Response) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");

    const route = (await DbVkConncet(
      `SELECT first_name, last_name, username, photo, countroutes FROM users WHERE showtop = 1 ORDER BY countroutes DESC, created_at ASC LIMIT 100`
    )) as Array<User>;

    const time = (await DbVkConncet(
      "SELECT first_name, last_name, username, photo, time FROM users WHERE showtop = 1 ORDER BY time DESC, created_at ASC LIMIT 100"
    )) as Array<User>;

    const ref = (await DbVkConncet(
      "SELECT first_name, last_name, username, photo, refcount FROM users WHERE showtop = 1 ORDER BY refcount DESC, created_at ASC LIMIT 100"
    )) as Array<User>;

    const [place] = (await DbVkConncet(
      `SELECT 
          ranked_users.placeroutes as placeroutes, 
          ranked_users.placetime as placetime, 
          ranked_users.placeref as placeref, 
          ranked_users.showtop as showtop
          FROM (
          SELECT 
              vk_id,
              DENSE_RANK() OVER (ORDER BY CASE WHEN showtop = 1 OR vk_id = ? THEN countroutes ELSE NULL END DESC, created_at ASC) AS placeroutes,
              DENSE_RANK() OVER (ORDER BY CASE WHEN showtop = 1 OR vk_id = ? THEN time ELSE NULL END DESC, created_at ASC) AS placetime,
              DENSE_RANK() OVER (ORDER BY CASE WHEN showtop = 1 OR vk_id = ? THEN refcount ELSE NULL END DESC, created_at ASC) AS placeref,
              showtop
          FROM users 
      ) AS ranked_users
      WHERE vk_id = ?`,
      [userid, userid, userid, userid]
    )) as Array<{
      placeroutes: number;
      placetime: number;
      placeref: number;
      showtop: number;
    }>;

    if (place) {
      res.send({
        process: true,
        top: {
          route: {
            place: place.placeroutes,
            users: route,
          },
          time: {
            place: place.placetime,
            users: time,
          },
          ref: { place: place.placeref, users: ref },
          showtop: place.showtop == 1,
        },
      });
    } else {
      res.status(404).send({ process: false, msg: "Error" });
    }
  } catch (error) {
    res.status(404).send({ process: false, msg: "Error" });
  }
};
