import {
  addReport,
  deleteReport,
  getSettings,
  getStore,
  payReport,
} from "../controllers/reports-controllers.js";

async function reportsRoutes(fastify, options) {
  fastify.get("/store", getStore);
  fastify.get("/settings", getSettings);
  fastify.put("/pay", payReport);
  fastify.post("/add", addReport);
  fastify.delete("/delete", deleteReport);
}

export default reportsRoutes;
