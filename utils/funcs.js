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