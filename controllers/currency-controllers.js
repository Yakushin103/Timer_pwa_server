import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getStore(request, response) {
  try {
    const { data, success } = await dbRequestExecution(
      `SELECT * FROM u3339950_timer_pwa.currency_dictionary`
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

export async function deleteCurrency(request, response) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.currency_dictionary WHERE id = ${id}`
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

export async function editCurrency(request, response) {
  try {
    const { id, name, short_name } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `UPDATE u3339950_timer_pwa.currency_dictionary SET name = '${name}', short_name = '${short_name}' WHERE id = ${id}`
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

export async function addCurrency(request, response) {
  try {
    const { name, short_name } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT u3339950_timer_pwa.currency_dictionary (name, short_name) VALUES ('${name}', '${short_name}')`
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
