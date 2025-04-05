import { createPool } from "mysql";

const pool = createPool({
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATEBASE_MYSQL,
  port: Number(process.env.DATEBASE_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

export default async (query: string, params?: Array<any>) => {
  const response = await new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

  return response;
};
