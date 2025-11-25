import bcrypt from "bcrypt";

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
    const hash = await bcrypt.hash(plainTextPassword, Number(process.env.SALTROUNDS));
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
