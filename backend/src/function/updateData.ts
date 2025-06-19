import axios from "axios";
import global from "../global";

import fs from "fs";

// import getDbConnection from "./getDbConnection";
import SetSchemaImg from "./SetSchemaImg";
import { AllMetro } from "../type";

const savefilestandard = {
  schema: {
    additional: [{ id: "add_vse", svg: "" }],
    connections: [],
    lines: [],
    stations: [],
    transitions: [],
    width: 2850,
    height: 3449,
  },
  notifications: [],
};

export default async () => {
  //const time = Math.floor(new Date().valueOf() / 1000);

  // await getDbConnection(
  //   `
  //   INSERT INTO statsday (countday, listuser, alluser)
  //   SELECT COUNT(telegram_id),
  //   JSON_ARRAYAGG(telegram_id),
  //   (SELECT COUNT(*) FROM users)
  //   FROM users
  //   WHERE last_time > ?;
  //   `,
  //   [time - 43200]
  // );

  // const [contuser] = (await getDbConnection(
  //   `SELECT COUNT(*) as countuser FROM users`
  // )) as Array<{ countuser: number }>;

  //global.countuser = contuser?.countuser ? contuser?.countuser : 0;

  try {
    const data = Object.keys(global.info) as Array<AllMetro>;

    for (const metro of data) {
      if (metro != "mos") {
        const checksavefile = fs.existsSync(`./data/${metro}/schema.json`);
        const savefile = checksavefile
          ? JSON.parse(fs.readFileSync(`./data/${metro}/schema.json`, "utf-8"))
          : null;

        if (savefile) {
          const schema = savefile.schema;
          const notifications = savefile.notifications;
          global.info[metro].schema = schema;
          global.info[metro].notifications = notifications;
          global.info[metro].routes.clear();
        } else {
          global.info[metro].schema = savefilestandard.schema;
          global.info[metro].notifications = savefilestandard.notifications;
          global.info[metro].routes.clear();
        }
      } else {
        const savefile = JSON.parse(
          fs.readFileSync("./data/mos/schema.json", "utf-8")
        );

        const schema = savefile.schema;
        const notifications = savefile.notifications;

        await axios
          .get(`${process.env.URL_MOS_API}/api/schema/v1.0`)
          .then((response) => {
            const schemadata = response.data.data;

            if (schemadata) {
              global.info.mos.schema = schemadata;
            } else {
              global.info.mos.schema = schema;
            }
          })
          .catch(() => {
            global.info.mos.schema = schema;
          });

        await axios
          .get(`${process.env.URL_MOS_API}/api/notifications/v2`)
          .then((response) => {
            const notificationsdata = response.data.data;

            if (notificationsdata) {
              global.info.mos.notifications = notificationsdata;
            } else {
              global.info.mos.notifications = notifications;
            }
          })
          .catch(() => {
            global.info.mos.notifications = notifications;
          });

        global.info.mos.routes.clear();

        fs.writeFileSync(
          "./data/mos/schema.json",
          JSON.stringify(global.info.mos),
          "utf-8"
        );
      }
    }
  } catch (error) {
    console.log(error);
    const data = Object.keys(global.info) as Array<AllMetro>;

    for (const metro of data) {
      const checksavefile = fs.existsSync(`./data/${metro}/schema.json`);
      const savefile = checksavefile
        ? JSON.parse(fs.readFileSync(`./data/${metro}/schema.json`, "utf-8"))
        : null;

      if (savefile) {
        const schema = savefile.schema;
        const notifications = savefile.notifications;
        global.info[metro].schema = schema;
        global.info[metro].notifications = notifications;
        global.info[metro].routes.clear();
      } else {
        global.info[metro].schema = savefilestandard.schema;
        global.info[metro].notifications = savefilestandard.notifications;
        global.info[metro].routes.clear();
      }
    }
  }

  await SetSchemaImg(global.info);
};
