import { createPool } from "mysql2/promise";

import "dotenv/config";

const pool = createPool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// const pool = createPool({
//   user: "u3339950_yakushin103",
//   host: "31.31.197.6",
//   port: "3306",
//   password: "aWuepD8NK!",
//   database: "u3339950_timer_pwa",
// });

export async function dbRequestExecution(sql) {
  try {
    const conn = await pool.getConnection();

    const result = await conn.query(sql);
    conn.release();
    return { success: true, data: result[0] };
  } catch (error) {
    return { success: false, data: error };
  }
}
