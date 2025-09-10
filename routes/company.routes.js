import { Router } from "express";

import { getStore } from "../controllers/company-controllers.js";

const router = Router();
//  /api/company/

router.get("/store", getStore);

export default router;
