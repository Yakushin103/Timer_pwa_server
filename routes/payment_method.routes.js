import { Router } from "express";

import {
  addPaymentMethod,
  deletePaymentMethod,
  editPaymentMethod,
  getStore,
} from "../controllers/payment_method-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/payment_method/

router.get("/store", checkToken, getStore);
router.put("/edit", checkToken, editPaymentMethod);
router.post("/add", checkToken, addPaymentMethod);
router.delete("/delete", checkToken, deletePaymentMethod);

export default router;
