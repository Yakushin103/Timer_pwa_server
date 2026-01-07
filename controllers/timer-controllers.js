import { dbRequestExecution } from "../db/conecctionDB.js";
import { secondsToHms } from "../utils/funcs.js";

export async function addTime(request, reply) {
  try {
    const { day, seconds, minutes, hours, company_id } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `INSERT u3339950_timer_pwa.timer_list (day, company_id, seconds, minutes, hours) VALUES ('${day}', ${company_id}, ${seconds}, ${minutes}, ${hours})`
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

export async function updatedTime(request, reply) {
  try {
    const { seconds, minutes, hours, id } = request.body.params;

    const { success, data } = await dbRequestExecution(
      `UPDATE u3339950_timer_pwa.timer_list SET hours = ${hours}, minutes = ${minutes}, seconds = ${seconds} WHERE id = ${id}`
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

export async function getStore(request, reply) {
  try {
    const { date, company_id } = request.query;

    if (date === "all") {
      let where = "WHERE is_payout IS NOT TRUE";

      if (!!company_id) {
        where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE`;
      }

      const { success, data } = await dbRequestExecution(
        `SELECT * FROM u3339950_timer_pwa.timer_list ${where} ORDER BY 
        SUBSTRING(day, 7, 4) DESC,
        SUBSTRING(day, 4, 2) DESC,  
        SUBSTRING(day, 1, 2) DESC`
      );

      let total_seconds = 0;

      data.forEach((item) => {
        total_seconds =
          Number(total_seconds) +
          Number(item.seconds) +
          Number(item.minutes) * 60 +
          Number(item.hours) * 3600;
      });

      if (success) {
        return {
          success: true,
          data: data,
          total_time: secondsToHms(total_seconds),
        };
      } else {
        return reply.code(400).send({
          success: false,
          message: data,
          total_time: "",
        });
      }
    } else {
      const { success, data } = await dbRequestExecution(
        `SELECT * FROM u3339950_timer_pwa.timer_list WHERE day = '${date}' AND is_payout IS NOT TRUE ORDER BY 
        SUBSTRING(day, 7, 4) DESC,
        SUBSTRING(day, 4, 2) DESC,  
        SUBSTRING(day, 1, 2) DESC`
      );

      let total_seconds = 0;

      data.forEach((item) => {
        total_seconds =
          Number(total_seconds) +
          Number(item.seconds) +
          Number(item.minutes) * 60 +
          Number(item.hours) * 3600;
      });

      if (success) {
        return {
          success: true,
          data: data,
          total_time: secondsToHms(total_seconds),
        };
      } else {
        return reply.code(400).send({
          success: false,
          message: data,
          total_time: "",
        });
      }
    }
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message || error,
      total_time: "",
    });
  }
}

export async function deleteTime(request, reply) {
  try {
    const { id } = request.query;

    const { success, data } = await dbRequestExecution(
      `DELETE FROM u3339950_timer_pwa.timer_list WHERE id = ${id}`
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
