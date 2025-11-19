import { dbRequestExecution } from "../db/conecctionDB.js";

export async function addTime(request, response) {
  try {
    const { day, seconds, minutes, hours, company_id } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT timer_pwa.timer_list (day, company_id, seconds, minutes, hours) VALUES ('${day}', ${company_id}, ${seconds}, ${minutes}, ${hours})`
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

export async function getStore(request, response) {
  try {
    const { date } = request.query;

    const { success, data } = await dbRequestExecution(
      `SELECT * FROM timer_pwa.timer_list WHERE day = '${date}'`
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
    console.log("ERROR", error);
    response.json({
      success: false,
      message: error,
    });
  }
}
