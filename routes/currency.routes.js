import { Router } from "express";

import {
  deleteCurrency,
  getStore,
  editCurrency,
  addCurrency,
} from "../controllers/currency-controllers.js";

const router = Router();
//  /api/currency/

router.get("/store", getStore);
router.put("/edit", editCurrency);
router.post("/add", addCurrency);
router.delete("/delete", deleteCurrency);

export default router;
