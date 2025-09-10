import { Router } from "express";

import {
  addPaymentMethod,
  deletePaymentMethod,
  editPaymentMethod,
  getStore,
} from "../controllers/payment_method-controllers.js";

const router = Router();
//  /api/payment_method/

router.get("/store", getStore);
router.put("/edit", editPaymentMethod);
router.post("/add", addPaymentMethod);
router.delete("/delete", deletePaymentMethod);

export default router;
