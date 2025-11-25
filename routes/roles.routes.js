import { Router } from "express";

import {
  addRole,
  deleteRole,
  getStore,
} from "../controllers/roles-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/roles/

router.post("/add", checkToken, addRole);
router.get("/store", checkToken, getStore);
// router.put("/updated", updatedTime);
router.delete("/delete", checkToken, deleteRole);

export default router;
