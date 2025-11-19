import { Router } from "express";

import {
  addCompany,
  deleteCompany,
  getList,
  getStore,
} from "../controllers/company-controllers.js";

const router = Router();
//  /api/company/

router.get("/list", getList);
router.get("/store", getStore);
router.post("/add", addCompany);
router.delete("/delete", deleteCompany);

export default router;
