import axios from "axios";
import global from "../global";

import fs from "fs";

import getDbConnection from "./getDbConnection";
import SetSchemaImg from "./SetSchemaImg";

export default async () => {
  const savefile = JSON.parse(
    fs.readFileSync("./data/schemamos.json", "utf-8")
  );

  const time = Math.floor(new Date().valueOf() / 1000);

  await getDbConnection(
    `
    INSERT INTO statsday (countday, listuser, alluser) 
    SELECT COUNT(telegram_id), 
    JSON_ARRAYAGG(telegram_id),
    (SELECT COUNT(*) FROM users)
    FROM users
    WHERE last_time > ?;
    `,
    [time - 43200]
  );

  try {
    const schema = await axios.get(
      `${process.env.URL_MOS_API}/api/schema/v1.0`
    );

    const notifications = await axios.get(
      `${process.env.URL_MOS_API}/api/notifications/v2`
    );

    const schemadata = schema.data.data;
    const notificationsdata = notifications.data.data;

    if (schemadata && notificationsdata) {
      global.info.schema = schemadata;
      global.info.notifications = notificationsdata;
      global.info.routes.clear();

      fs.writeFileSync(
        "./data/schemamos.json",
        JSON.stringify(global.info),
        "utf-8"
      );

      await SetSchemaImg(schemadata, notificationsdata);
    } else {
      const schema = savefile.schema;
      const notifications = savefile.notifications;

      global.info.schema = schema;
      global.info.notifications = notifications;
    }
  } catch (error) {
    const schema = savefile.schema;
    const notifications = savefile.notifications;

    global.info.schema = schema;
    global.info.notifications = notifications;
  }
};
