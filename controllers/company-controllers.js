import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getList(request, reply) {
  try {
    const { data, success } = await dbRequestExecution(
      `SELECT tb1.id as id, tb1.name as name, tb1.short_name as short_name, \
        tb1.currency_id as currency_id, tb1.payment_method_id as payment_method_id, \
        tb2.name as currency_name, tb3.name as payment_method_name, tb3.period as payment_method_period \
          FROM u3339950_timer_pwa.companies as tb1 \
          LEFT JOIN u3339950_timer_pwa.currency_dictionary as tb2 ON tb1.currency_id = tb2.id \
          LEFT JOIN u3339950_timer_pwa.payment_method_dictionary as tb3 ON tb1.payment_method_id = tb3.id`
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

export async function getStore(request, reply) {
  try {
    const getCurrency = await dbRequestExecution(
      `SELECT * FROM u3339950_timer_pwa.currency_dictionary`
    );

    const getPM = await dbRequestExecution(
      `SELECT * FROM u3339950_timer_pwa.payment_method_dictionary`
    );

    return {
      success: true,
      data: {
        currency_options: getCurrency.success ? getCurrency.data : [],
        payment_method_options: getPM.success ? getPM.data : [],
      },
    };
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message || error,
    });
  }
}

export async function addCompany(request, reply) {
  try {
    const { name, short_name, currency_id, payment_method_id } =
      request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT u3339950_timer_pwa.companies (name, short_name, currency_id, payment_method_id) VALUES ('${name}', '${short_name}', ${currency_id}, ${payment_method_id})`
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

export async function deleteCompany(request, reply) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.companies WHERE id = ${id}`
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
