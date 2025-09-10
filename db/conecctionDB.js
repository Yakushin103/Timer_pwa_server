import { createPool } from "mysql2/promise";

import "dotenv/config";

const pool = createPool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: "",
});

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
