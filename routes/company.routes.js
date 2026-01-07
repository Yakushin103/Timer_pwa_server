import {
  addCompany,
  deleteCompany,
  getList,
  getStore,
} from "../controllers/company-controllers.js";

async function companyRoutes(fastify, options) {
  fastify.get("/list", getList);
  fastify.get("/store", getStore);
  fastify.post("/add", addCompany);
  fastify.delete("/add", deleteCompany);
}

export default companyRoutes;
