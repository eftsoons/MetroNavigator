import { NextFunction, Response, Request } from "express";

import { DbVkConncet } from "../../function/getDbConnection";
import { User } from "../../type";

import axios from "axios";

const tokenApiVK = process.env.VK_TOKEN_API!;

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const initData = new URLSearchParams(req.headers.authorization);
    const userid = initData.get("vk_user_id");
    const refid = Array.isArray(req.headers.refid)
      ? Number(req.headers.refid.join(""))
      : Number(req.headers.refid);
    const time = new Date().valueOf() / 1000;
    // const path = req.path;

    const data = (await axios.post(
      "https://api.vk.com/method/users.get",
      null,
      {
        params: {
          user_ids: Number(userid),
          access_token: tokenApiVK,
          fields: "photo_max_orig,domain",
          v: "5.199",
          lang: 0,
        },
      }
    )) as {
      data:
        | {
            response: Array<{
              id: number;
              domain: string;
              photo_max_orig: string;
              first_name: string;
              last_name: string;
            }>;
          }
        | { error: {} };
    };

    if ("response" in data.data) {
      const userinfo = data.data.response[0];

      if (userinfo) {
        const [userinfobd] = (await DbVkConncet(
          `SELECT first_name, last_name, last_time, username, photo, time FROM users WHERE vk_id = ?`,
          [userinfo.id]
        )) as Array<User>;

        if (!userinfobd) {
          if (!refid) {
            await DbVkConncet(
              `INSERT IGNORE INTO users(vk_id, last_time, first_name, last_name, username, photo) VALUES (?, ?, ?, ?, ?, ?)`,
              [
                userinfo.id,
                time,
                userinfo.first_name,
                userinfo.last_name,
                userinfo.domain,
                userinfo.photo_max_orig,
              ]
            );
          } else {
            if (!isNaN(refid) && refid != userinfo.id) {
              const [usermyrefbd] = (await DbVkConncet(
                `SELECT * FROM users WHERE vk_id = ?`,
                [refid]
              )) as Array<User>;

              if (usermyrefbd) {
                await DbVkConncet(
                  `INSERT INTO users(vk_id, last_time, first_name, last_name, username, photo, myref) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                  [
                    userinfo.id,
                    time,
                    userinfo.first_name,
                    userinfo.last_name,
                    userinfo.domain,
                    userinfo.photo_max_orig,
                    usermyrefbd.vk_id,
                  ]
                );

                const ref = usermyrefbd.ref ? JSON.parse(usermyrefbd.ref) : [];

                ref.push({ vk_id: userinfo.id });

                const resultref = JSON.stringify(ref);

                await DbVkConncet(
                  `UPDATE users SET ref=?, refcount = refcount + 1 WHERE vk_id = ?`,
                  [resultref, refid]
                );
              } else {
                await DbVkConncet(
                  `INSERT IGNORE INTO users(vk_id, last_time, first_name, last_name, username, photo) VALUES (?, ?, ?, ?, ?, ?)`,
                  [
                    userinfo.id,
                    time,
                    userinfo.first_name,
                    userinfo.last_name,
                    userinfo.domain,
                    userinfo.photo_max_orig,
                  ]
                );
              }
            } else {
              await DbVkConncet(
                `INSERT IGNORE INTO users(vk_id, last_time, first_name, last_name, username, photo) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                  userinfo.id,
                  time,
                  userinfo.first_name,
                  userinfo.last_name,
                  userinfo.domain,
                  userinfo.photo_max_orig,
                ]
              );
            }
          }
        } else {
          if (
            userinfobd.first_name != userinfo.first_name ||
            userinfobd.last_name != userinfo.last_name ||
            userinfobd.username != userinfo.domain ||
            userinfobd.photo != userinfo.photo_max_orig
          ) {
            await DbVkConncet(
              `UPDATE users SET first_name = ?, last_name = ?, username = ?, photo = ? WHERE vk_id = ?`,
              [
                userinfo.first_name,
                userinfo.last_name,
                userinfo.domain,
                userinfo.photo_max_orig,
                userinfo.id,
              ]
            );
          }

          // if (userinfobd.last_time && path == "/time") {
          //   if (time - userinfobd.last_time > 7) {
          //     await getDbConnection(
          //       `UPDATE users SET time = time + 10 WHERE vk_id = ?`,
          //       [userinfo.id]
          //     );
          //   }
          // }

          // await getDbConnection(
          //   `UPDATE users SET last_time = ? WHERE vk_id = ?`,
          //   [time, userinfo.id]
          // );
        }

        next();
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
