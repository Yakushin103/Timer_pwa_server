import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getStore(request, reply) {
  try {
    const { data, success } = await dbRequestExecution(
      `SELECT * FROM u3339950_timer_pwa.payment_method_dictionary`
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

export async function deletePaymentMethod(request, reply) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.payment_method_dictionary WHERE id = ${id}`
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

export async function editPaymentMethod(request, reply) {
  try {
    const { id, name, description, period } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `UPDATE u3339950_timer_pwa.payment_method_dictionary SET name = '${name}', description = '${description}', period = '${period}' WHERE id = ${id}`
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

export async function addPaymentMethod(request, reply) {
  try {
    const { name, description, period } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT u3339950_timer_pwa.payment_method_dictionary (name, description, period) VALUES ('${name}', '${description}', '${period}')`
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
