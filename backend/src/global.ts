import { notifications, route, schema } from "./type";

export default {
  info: {
    schema: null,
    notifications: null,
    routes: new Map(),
  },
} as {
  info: {
    schema: schema;
    notifications: notifications;
    routes: Map<string, route>;
    countuser?: number;
  };
};
