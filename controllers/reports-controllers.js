import moment from "moment";

import { dbRequestExecution } from "../db/conecctionDB.js";
import { calculatePayment, secondsToHms } from "../utils/funcs.js";

export async function getStore(request, response) {
  try {
    let min_date = "";
    let max_date = "";

    const { data, success } = await dbRequestExecution(
      `SELECT tb1.company_id AS company_id, tb1.create_date AS create_date, tb1.end_date AS end_date, \
        tb1.id AS id, tb1.is_payout AS is_payout, tb1.payout AS payout, tb1.payout_date AS payout_date, \
        tb1.start_date AS start_date, tb2.name AS company_name
      FROM timer_pwa.reports AS tb1
      LEFT JOIN timer_pwa.companies as tb2 ON tb1.company_id = tb2.id`
    );

    const res = await dbRequestExecution(
      `SELECT * FROM timer_pwa.timer_list WHERE is_payout IS NOT TRUE ORDER BY 
      SUBSTRING(day, 7, 4) DESC,
      SUBSTRING(day, 4, 2) DESC,  
      SUBSTRING(day, 1, 2) DESC`
    );

    if (res.success && !!res.data.length) {
      min_date = moment(res.data[res.data.length - 1].day, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      max_date = moment(res.data[0].day, "DD-MM-YYYY").format("YYYY-MM-DD");
    }

    if (success) {
      response.json({
        success: true,
        data: data,
        min_date,
        max_date,
      });
    } else {
      response.json({
        success: false,
        message: data,
        min_date,
        max_date,
      });
    }
  } catch (error) {
    response.json({
      success: false,
      message: error,
    });
  }
}

export async function getSettings(request, response) {
  try {
    const { start_date, end_date, company_id } = request.query;

    let where = "";
    let order = `ORDER BY SUBSTRING(day, 7, 4) DESC, SUBSTRING(day, 4, 2) DESC, SUBSTRING(day, 1, 2) DESC`;

    let min_date = "";
    let max_date = "";
    let total_payout = "";
    let total_seconds = 0;

    const getCompany = await dbRequestExecution(`
        SELECT tb1.currency_id AS currency_id, tb1.payment_method_id AS payment_method_id,
        tb1.payout AS payout, tb2.short_name AS currency_short_name, tb3.period AS payment_method_period 
          FROM timer_pwa.companies as tb1  
        LEFT JOIN timer_pwa.currency_dictionary as tb2 ON tb1.currency_id = tb2.id
        LEFT JOIN timer_pwa.payment_method_dictionary as tb3 ON tb1.payment_method_id = tb3.id
          WHERE tb1.id = ${company_id}
        `);

    if (!!start_date && !!end_date) {
      where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE AND STR_TO_DATE(day, '%d-%m-%Y') BETWEEN STR_TO_DATE('${moment(
        start_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', '%d-%m-%Y') AND STR_TO_DATE('${moment(
        end_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', '%d-%m-%Y')`;
    } else if (!!start_date && !end_date) {
      where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE AND STR_TO_DATE(day, '%d-%m-%Y') BETWEEN STR_TO_DATE('${moment(
        start_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', '%d-%m-%Y') AND STR_TO_DATE('${moment().format(
        "DD-MM-YYYY"
      )}', '%d-%m-%Y')`;
    } else {
      where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE `;
    }

    const { data, success } = await dbRequestExecution(
      `SELECT * FROM timer_pwa.timer_list ${where} ${order}`
    );

    if (success) {
      data.forEach((item) => {
        total_seconds =
          Number(total_seconds) +
          Number(item.seconds) +
          Number(item.minutes) * 60 +
          Number(item.hours) * 3600;
      });

      min_date = moment(data[data.length - 1].day, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      max_date = moment(data[0].day, "DD-MM-YYYY").format("YYYY-MM-DD");

      if (getCompany.success) {
        getCompany.data.forEach((item) => {
          if (item.payment_method_period === "hour") {
            total_payout = `${calculatePayment(total_seconds, item.payout)} ${
              item.currency_short_name
            }`;
          }
        });
      }

      response.json({
        success: true,
        min_date: !start_date ? min_date : "",
        max_date: !start_date ? max_date : "",
        total_hours: secondsToHms(total_seconds),
        total_payout,
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

export async function addReport(request, response) {
  try {
    const { start_date, end_date, payout, company_id } = request.body.params;

    let create_date = moment().format("DD-MM-YYYY");
    let end_date_string = moment().format("DD-MM-YYYY");

    let where = "";

    if (!!start_date && !!end_date) {
      where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE AND STR_TO_DATE(day, '%d-%m-%Y') BETWEEN STR_TO_DATE('${moment(
        start_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', '%d-%m-%Y') AND STR_TO_DATE('${moment(
        end_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', '%d-%m-%Y')`;
    } else if (!!start_date && !end_date) {
      where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE AND STR_TO_DATE(day, '%d-%m-%Y') BETWEEN STR_TO_DATE('${moment(
        start_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', '%d-%m-%Y') AND STR_TO_DATE('${moment().format(
        "DD-MM-YYYY"
      )}', '%d-%m-%Y')`;
    } else {
      where = `WHERE company_id = ${company_id} AND is_payout IS NOT TRUE `;
    }

    if (!!end_date) {
      end_date_string = moment(end_date, "YYYY-MM-DD").format("DD-MM-YYYY");
    }

    const { success, data } = await dbRequestExecution(
      `INSERT timer_pwa.reports (create_date, company_id, start_date, end_date, payout, is_payout) \
       VALUES ('${create_date}', ${company_id}, '${moment(
        start_date,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY")}', \
        '${end_date_string}', '${payout}', ${false})`
    );

    const res = await dbRequestExecution(
      `UPDATE timer_pwa.timer_list SET is_payout = ${true} ${where}`
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

export async function deleteReport(request, response) {
  try {
    const { id, company_id, start_date, end_date } = request.query;

    let where = `WHERE company_id = ${company_id} AND is_payout IS TRUE AND STR_TO_DATE(day, '%d-%m-%Y') BETWEEN STR_TO_DATE('${start_date}', '%d-%m-%Y') AND STR_TO_DATE('${end_date}', '%d-%m-%Y')`;

    const res = await dbRequestExecution(
      `UPDATE timer_pwa.timer_list SET is_payout = ${false} ${where}`
    );

    if (res.success) {
      const { success, data } = await dbRequestExecution(
        `DELETE FROM timer_pwa.reports WHERE id = ${id}`
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
    } else {
      response.json({
        success: false,
        message: res.data,
      });
    }
  } catch (error) {
    response.json({
      success: false,
      message: error,
    });
  }
}

export async function payReport(request, response) {
  try {
    const { id } = request.body.params;
    let payout_date = moment().format('DD-MM-YYYY')

    const { success, data } = await dbRequestExecution(
      `UPDATE timer_pwa.reports SET payout_date = '${payout_date}', is_payout = ${true} WHERE id = ${id}`
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
