import moment from "moment";

import { dbRequestExecution } from "../db/conecctionDB.js";
import {
  generateTokenEncrypt,
  hashPassword,
  verifyPassword,
} from "../utils/funcs.js";

export async function getStore(request, response) {
  try {
    const { success, data } = await dbRequestExecution(
      `SELECT tb1.created_at AS created_at, tb1.created_by AS created_by, tb1.first_name AS first_name, \
        tb1.id AS id, tb1.last_name AS last_name, tb1.login AS login, tb1.updated_at AS updated_at, \
        tb1.updated_by AS updated_by, tb1.role_id AS role_id, tb2.name AS role \
          FROM u3339950_timer_pwa.users AS tb1 \
        LEFT JOIN u3339950_timer_pwa.roles as tb2 ON tb1.role_id = tb2.id
        ORDER BY tb1.id`
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
        `INSERT u3339950_timer_pwa.users (first_name, last_name, login, password, role_id, created_at) \
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

export async function singIn(request, response) {
  try {
    const { login, password } = request.body.params;

    const { data, success } = await dbRequestExecution(
      `SELECT * FROM u3339950_timer_pwa.users WHERE login = '${login}'`
    );

    if (success && data.length === 1) {
      let password_hash = data[0].password;
      let user_id = data[0].id;

      let checkPassword = await verifyPassword(password, password_hash);

      if (checkPassword) {
        const token = generateTokenEncrypt(
          JSON.stringify({
            user_id: user_id,
          })
        );

        const { success } = await dbRequestExecution(
          `INSERT u3339950_timer_pwa.tokens (token)  VALUES ('${token}')`
        );

        if (success) {
          response.json({
            success: true,
            token,
            message: "",
          });
        } else {
          response.json({
            success: false,
            message: "Something went wrong, please try again later.",
          });
        }
      } else {
        response.json({
          success: false,
          message: "Incorrect login Or password has been entered",
        });
      }
    } else {
      response.json({
        success: false,
        message: "Incorrect login Or password has been entered",
      });
    }
  } catch (error) {
    response.json({
      success: false,
      message: "CATCH Error",
    });
  }
}

export async function deleteUser(request, response) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.users WHERE id = ${id}`
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
