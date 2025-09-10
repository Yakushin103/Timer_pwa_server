import { dbRequestExecution } from "../db/conecctionDB.js";

export async function getStore(request, response) {
  try {
    const { data, success } = await dbRequestExecution(
      `SELECT * FROM timer_pwa.companies`
    );

    if ( success ) {
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
