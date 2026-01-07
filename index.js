import Fastify from "fastify";
import cors from "@fastify/cors";

import companyRoutes from "./routes/company.routes.js";
import currencyRoutes from "./routes/currency.routes.js";
import paymentMethodRoutes from "./routes/payment_method.routes.js";
import timerRoutes from "./routes/timer.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import usersRoutes from "./routes/users.routes.js";
import rolesRoutes from "./routes/roles.routes.js";

import { checkToken } from "./utils/updetedFuncs.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: [
    "http://timer.yakushin103.tech:8080",
    "https://timer.yakushin103.tech",
    "http://localhost:5173",
  ],
  credentials: true,
});

fastify.addHook("onRequest", async (request, reply) => {
  const publicRoutes = ["/api/users/sing_in"];

  if (publicRoutes.includes(request.url)) {
    return;
  }

  await checkToken(request, reply);
});

fastify.register(companyRoutes, { prefix: "/api/company" });
fastify.register(currencyRoutes, { prefix: "/api/currency" });
fastify.register(paymentMethodRoutes, { prefix: "/api/payment_method" });
fastify.register(timerRoutes, { prefix: "/api/timer" });
fastify.register(reportsRoutes, { prefix: "/api/reports" });
fastify.register(usersRoutes, { prefix: "/api/users" });
fastify.register(rolesRoutes, { prefix: "/api/roles" });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server runs on port 3001!");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
