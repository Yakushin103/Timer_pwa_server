import { Router } from "express";

import { addTime, getStore } from "../controllers/timer-controllers.js";

const router = Router();
//  /api/timer/

router.post("/add", addTime)
router.get("/store", getStore);
// router.get("/store", getStore);
// router.post("/add", addCompany);
// router.delete("/delete", deleteCompany);

export default router;
