import {
  addTime,
  deleteTime,
  getStore,
  updatedTime,
} from "../controllers/timer-controllers.js";

async function timerRoutes(fastify, options) {
  fastify.get("/store", getStore);
  fastify.post("/add", addTime);
  fastify.put("/updated", updatedTime);
  fastify.delete("/delete", deleteTime);
}

export default timerRoutes;
