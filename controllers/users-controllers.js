import moment from "moment";

import { dbRequestExecution } from "../db/conecctionDB.js";
import { hashPassword } from "../utils/funcs.js";

export async function getStore(request, response) {
  try {
    const { success, data } = await dbRequestExecution(
      `SELECT created_at, created_by, first_name, id, last_name, login, updated_at, updated_by  FROM timer_pwa.users ORDER BY id`
    );

    if (success) {
      response.json({
        success: true,
        data: data,
      });
    } else {
      response.json({
        success: false,
        message: data,
      });
    }
  } catch (error) {
    response.json({
      success: false,
      message: error,
    });
  }
}

export async function addUser(request, response) {
  try {
    const { first_name, last_name, login, password, role_id } =
      request.body.params;

    let created_at = moment().format("DD-MM-YYYY");

    let getHashPassword = await hashPassword(password);

    if (getHashPassword === "Error hashing password") {
      response.json({
        success: false,
        message: getHashPassword,
      });
    } else {
      const { success, data } = await dbRequestExecution(
        `INSERT timer_pwa.users (first_name, last_name, login, password, role_id, created_at) \
         VALUES ('${first_name}', '${last_name}', '${login}', '${getHashPassword}', ${role_id}, '${created_at}')`
      );

      if (success) {
        response.json({
          success: true,
        });
      } else {
        response.json({
          success: false,
          message: data,
        });
      }
    }
  } catch (error) {
    response.json({
      success: false,
      message: error,
    });
  }
}

export async function deleteUser(request, response) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM timer_pwa.users WHERE id = ${id}`
    );

    if (success) {
      response.json({
        success: true,
      });
    } else {
      response.json({
        success: false,
        message: data,
      });
    }
  } catch (error) {
    response.json({
      success: false,
      message: error,
    });
  }
}