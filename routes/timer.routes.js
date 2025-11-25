import { Router } from "express";

import {
  addTime,
  deleteTime,
  getStore,
  updatedTime,
} from "../controllers/timer-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/timer/

router.post("/add", checkToken, addTime);
router.get("/store", checkToken, getStore);
router.put("/updated", checkToken, updatedTime);
router.delete("/delete", checkToken, deleteTime);

export default router;
