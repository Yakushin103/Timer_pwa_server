import moment from "moment";

import { dbRequestExecution } from "../db/conecctionDB.js";
import {
  generateTokenEncrypt,
  hashPassword,
  verifyPassword,
} from "../utils/funcs.js";

export async function getStore(request, reply) {
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
      return {
        success: true,
        data: data,
      };
    } else {
      return reply.code(400).send({
        success: false,
        message: data,
      });
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message || error,
    });
  }
}

export async function addUser(request, reply) {
  try {
    const { first_name, last_name, login, password, role_id } =
      request.body.params;

    let created_at = moment().format("DD-MM-YYYY");

    let getHashPassword = await hashPassword(password);

    if (getHashPassword === "Error hashing password") {
      return reply.code(400).send({
        success: false,
        message: getHashPassword,
      });
    } else {
      const { success, data } = await dbRequestExecution(
        `INSERT u3339950_timer_pwa.users (first_name, last_name, login, password, role_id, created_at) \
         VALUES ('${first_name}', '${last_name}', '${login}', '${getHashPassword}', ${role_id}, '${created_at}')`
      );

      if (success) {
        return {
          success: true,
        };
      } else {
        return reply.code(400).send({
          success: false,
          message: data,
        });
      }
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message || error,
    });
  }
}

export async function singIn(request, reply) {
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
          return {
            success: true,
            token,
            message: "",
          };
        } else {
          return reply.code(500).send({
            success: false,
            message: "Something went wrong, please try again later.",
          });
        }
      } else {
        return reply.code(401).send({
          success: false,
          message: "Incorrect login Or password has been entered",
        });
      }
    } else {
      return reply.code(401).send({
        success: false,
        message: "Incorrect login Or password has been entered",
      });
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: "CATCH Error: " + (error.message || error),
    });
  }
}

export async function deleteUser(request, reply) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.users WHERE id = ${id}`
    );

    if (success) {
      return {
        success: true,
      };
    } else {
      return reply.code(400).send({
        success: false,
        message: data,
      });
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message || error,
    });
  }
}
