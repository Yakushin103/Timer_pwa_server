import {
  addPaymentMethod,
  deletePaymentMethod,
  editPaymentMethod,
  getStore,
} from "../controllers/payment_method-controllers.js";

async function paymentMethodRoutes(fastify, options) {
  fastify.get("/store", getStore);
  fastify.put("/edit", editPaymentMethod);
  fastify.post("/add", addPaymentMethod);
  fastify.delete("/delete", deletePaymentMethod);
}

export default paymentMethodRoutes;
