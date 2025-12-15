import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

import { dbRequestExecution } from "../db/conecctionDB.js";

export function secondsToHms(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num) => num.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function calculatePayment(secondsWorked, hourlyRate, decimalPlaces = 2) {
  const hoursWorked = secondsWorked / 3600;
  const payment = hoursWorked * hourlyRate;

  return Number(payment.toFixed(decimalPlaces));
}

export async function hashPassword(plainTextPassword) {
  try {
    const hash = await bcrypt.hash(
      plainTextPassword,
      Number(process.env.SALTROUNDS)
    );
    return hash;
  } catch (err) {
    throw new Error("Error hashing password");
  }
}

export async function verifyPassword(plainTextPassword, storedHash) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, storedHash);
    return isMatch;
  } catch (err) {
    throw new Error("Error verifying password");
  }
}

export function generateTokenEncrypt(name) {
  return CryptoJS.AES.encrypt(name, process.env.SECRET_KEY).toString();
}

export function tokenDecrypt(token) {
  let bytes = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function checkToken(request, response, next) {
  try {
    const authHeader = request.header("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length);
      if (token) {
        let sql = `SELECT * FROM u3339950_timer_pwa.tokens WHERE token = '${token}'`;

        const findUser = await dbRequestExecution(sql, "users");

        if (findUser.success && findUser.data.length) {
          const user = JSON.parse(tokenDecrypt(token));

          next();
        } else {
          response.json({
            success: false,
            message: "Authorization is required",
          });
        }
      }
    } else {
      response.json({
        success: false,
        message: "Authorization is required",
      });
    }
  } catch (error) {
    response.json({
      success: false,
      message: "Authorization is required",
    });
  }
}
