import express from "express";
import cors from "cors";
import { schedule } from "node-cron";

import updateData from "./function/updateData";
import auth from "./middleware/auth";
import routes from "./routes";

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

app.use(auth);
app.use(routes);

app.listen(port, () => {
  console.log(`server metro start, port - ${port}`);
});
