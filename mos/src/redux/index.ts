import { configureStore } from "@reduxjs/toolkit";

import info from "./info";
import schema from "./schema";
import notifications from "./notifications";
import userinfo from "./userinfo";
import top from "./top";
import schemaimg from "./schemaimg";

const store = configureStore({
  reducer: {
    info: info,
    schema: schema,
    notifications: notifications,
    userinfo: userinfo,
    top: top,
    schemaimg: schemaimg,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
