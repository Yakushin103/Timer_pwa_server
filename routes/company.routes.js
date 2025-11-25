import { Router } from "express";

import {
  addCompany,
  deleteCompany,
  getList,
  getStore,
} from "../controllers/company-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/company/

router.get("/list", checkToken, getList);
router.get("/store", checkToken, getStore);
router.post("/add", checkToken, addCompany);
router.delete("/delete", checkToken, deleteCompany);

export default router;
