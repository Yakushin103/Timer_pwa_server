import express, { json } from "express";
import cors from "cors";

import companyRoutes from "./routes/company.routes.js";
import currencyRoutes from "./routes/currency.routes.js";
import paymentMethodRoutes from "./routes/payment_method.routes.js";
import timerRoutes from "./routes/timer.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

const app = express()
  .use(cors())
  .use(json())

  .use("/api/company", companyRoutes)
  .use("/api/currency", currencyRoutes)
  .use("/api/payment_method", paymentMethodRoutes)
  .use("/api/timer", timerRoutes)
  .use("/api/reports", reportsRoutes)

  .listen(3001, () => {
    console.log("Server runs !!!");
  });
