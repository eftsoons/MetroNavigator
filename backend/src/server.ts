import express from "express";
import cors from "cors";
import { schedule } from "node-cron";

import updateData from "./function/updateData";
import auth from "./tg/middleware/auth";
import routes from "./tg/routes";
import CheckValidTelegram from "./function/CheckValidTelegram";
import CheckValidVK from "./function/CheckValidVK";
import routeVK from "./vk/routes";
import routeTG from "./tg/routes";

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

schedule(
  "0 0 * * *",
  () => {
    updateData();
  },
  {
    scheduled: true,
    timezone: "Europe/Moscow",
  }
);

updateData();

app.use((req, res, next) => {
  try {
    if (CheckValidTelegram(req.headers.authorization)) {
      routeTG(req, res, next);
    } else if (CheckValidVK(req.headers.authorization)) {
      routeVK(req, res, next);
    } else {
      res.status(401).send({ process: false, msg: "No authorization" });
    }
  } catch {
    res.status(404).send({ process: false, msg: "Error" });
  }
});

app.use(auth);
app.use(routes);

app.listen(port, () => {
  console.log(`server metro start, port - ${port}`);
});
