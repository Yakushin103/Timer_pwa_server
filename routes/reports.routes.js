import { Router } from "express";

import {
  addReport,
  deleteReport,
  getSettings,
  getStore,
  payReport,
} from "../controllers/reports-controllers.js";

const router = Router();
//  /api/reports/

router.get("/store", getStore);
router.get("/settings", getSettings);

router.post("/add", addReport);

router.put("/pay", payReport);

router.delete("/delete", deleteReport);

export default router;
