import { createPool } from "mysql";

const poolTG = createPool({
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATEBASE_MYSQL_TG,
  port: Number(process.env.DATEBASE_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

const poolVK = createPool({
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATEBASE_MYSQL_VK,
  port: Number(process.env.DATEBASE_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

async function DbTGConncet(query: string, params?: Array<any>) {
  const response = await new Promise((resolve, reject) => {
    poolTG.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  return response;
}

async function DbVkConncet(query: string, params?: Array<any>) {
  const response = await new Promise((resolve, reject) => {
    poolVK.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  return response;
}

export { DbTGConncet, DbVkConncet };
