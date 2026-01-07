import moment from "moment";

import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getStore(request, reply) {
  try {
    const { success, data } = await dbRequestExecution(
      `SELECT tb1.id AS id, tb1.name AS name, tb1.short_name AS short_name, \
        tb1.created_by AS created_by, tb1.updated_by AS updated_by,
        tb1.created_at AS created_at, tb2.login AS created_by_name, \
        tb1.updated_at AS updated_at, tb3.login AS updated_by_name
          FROM u3339950_timer_pwa.roles AS tb1  \
        LEFT JOIN u3339950_timer_pwa.users as tb2 ON tb1.created_by = tb2.id
        LEFT JOIN u3339950_timer_pwa.users as tb3 ON tb1.updated_by = tb3.id
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

export async function addRole(request, reply) {
  try {
    const { name, short_name, created_by } = request.body.params;

    let created_at = moment().format("DD-MM-YYYY");

    const { success, data } = await dbRequestExecution(
      `INSERT u3339950_timer_pwa.roles (name, short_name, created_at, created_by) \
         VALUES ('${name}', '${short_name}', '${created_at}', ${
        created_by ? created_by : 1
      })`
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

export async function deleteRole(request, reply) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.roles WHERE id = ${id}`
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
