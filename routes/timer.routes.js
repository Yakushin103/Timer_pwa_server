import { Router } from "express";

import {
  addTime,
  deleteTime,
  getStore,
  updatedTime,
} from "../controllers/timer-controllers.js";

const router = Router();
//  /api/timer/

router.post("/add", addTime);
router.get("/store", getStore);
router.put("/updated", updatedTime);
router.delete("/delete", deleteTime);

export default router;
