import {
  addRole,
  deleteRole,
  getStore,
} from "../controllers/roles-controllers.js";

async function rolesRoutes(fastify, options) {
  fastify.get("/store", getStore);
  fastify.post("/add", addRole);
  fastify.delete("/delete", deleteRole);
}

export default rolesRoutes;
