import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getStore(request, reply) {
  try {
    const { data, success } = await dbRequestExecution(
      `SELECT * FROM u3339950_timer_pwa.currency_dictionary`
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

export async function deleteCurrency(request, reply) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.currency_dictionary WHERE id = ${id}`
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

export async function editCurrency(request, reply) {
  try {
    const { id, name, short_name } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `UPDATE u3339950_timer_pwa.currency_dictionary SET name = '${name}', short_name = '${short_name}' WHERE id = ${id}`
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

export async function addCurrency(request, reply) {
  try {
    const { name, short_name } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT u3339950_timer_pwa.currency_dictionary (name, short_name) VALUES ('${name}', '${short_name}')`
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
