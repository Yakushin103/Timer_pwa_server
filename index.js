import express, { json } from "express";
import cors from "cors";

import companyRoutes from "./routes/company.routes.js";
import currencyRoutes from "./routes/currency.routes.js";
import paymentMethodRoutes from "./routes/payment_method.routes.js";
import timerRoutes from "./routes/timer.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import usersRoutes from "./routes/users.routes.js";
import rolesRoutes from "./routes/roles.routes.js";

const app = express()
  .use(
    cors({
      origin: [
        "http://timer.yakushin103.tech:8080",
        "https://timer.yakushin103.tech:8443",
        "http://localhost:5173",
      ],
      credentials: true,
    })
  )
  .use(json())

  .use("/api/company", companyRoutes)
  .use("/api/currency", currencyRoutes)
  .use("/api/payment_method", paymentMethodRoutes)
  .use("/api/timer", timerRoutes)
  .use("/api/reports", reportsRoutes)
  .use("/api/users", usersRoutes)
  .use("/api/roles", rolesRoutes)

  .listen(3001, () => {
    console.log("Server runs !!!");
  });
