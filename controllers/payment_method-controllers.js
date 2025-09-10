import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getStore(request, response) {
  try {
    const { data, success } = await dbRequestExecution(
      `SELECT * FROM timer_pwa.payment_method_dictionary`
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

export async function deletePaymentMethod(request, response) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM timer_pwa.payment_method_dictionary WHERE id = ${id}`
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

export async function editPaymentMethod(request, response) {
  try {
    const { id, name, description, period } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `UPDATE timer_pwa.payment_method_dictionary SET name = '${name}', description = '${description}', period = '${period}' WHERE id = ${id}`
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

export async function addPaymentMethod(request, response) {
  try {
    const { name, description, period } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT timer_pwa.payment_method_dictionary (name, description, period) VALUES ('${name}', '${description}', '${period}')`
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