import {
  deleteCurrency,
  getStore,
  editCurrency,
  addCurrency,
} from "../controllers/currency-controllers.js";

async function currencyRoutes(fastify, options) {
  fastify.get("/store", getStore);
  fastify.put("/edit", editCurrency);
  fastify.post("/add", addCurrency);
  fastify.delete("/delete", deleteCurrency);
}

export default currencyRoutes;
