import {
  addUser,
  deleteUser,
  getStore,
  singIn,
} from "../controllers/users-controllers.js";

async function usersRoutes(fastify, options) {
  fastify.get("/store", getStore);
  fastify.post("/add", addUser);
  fastify.post("/sing_in", singIn);
  fastify.delete("/delete", deleteUser);
}

export default usersRoutes;