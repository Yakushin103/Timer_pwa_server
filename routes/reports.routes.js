import { Router } from "express";

import {
  addReport,
  deleteReport,
  getSettings,
  getStore,
  payReport,
} from "../controllers/reports-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/reports/

router.get("/store", checkToken, getStore);
router.get("/settings", checkToken, getSettings);

router.post("/add", checkToken, addReport);

router.put("/pay", checkToken, payReport);

router.delete("/delete", checkToken, deleteReport);

export default router;
