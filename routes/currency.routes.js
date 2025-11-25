import { Router } from "express";

import {
  deleteCurrency,
  getStore,
  editCurrency,
  addCurrency,
} from "../controllers/currency-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/currency/

router.get("/store", checkToken, getStore);
router.put("/edit", checkToken, editCurrency);
router.post("/add", checkToken, addCurrency);
router.delete("/delete", checkToken, deleteCurrency);

export default router;
