import { Router } from "express";

import {
  addRole,
  deleteRole,
  getStore,
} from "../controllers/roles-controllers.js";

const router = Router();
//  /api/roles/

router.post("/add", addRole);
router.get("/store", getStore);
// router.put("/updated", updatedTime);
router.delete("/delete", deleteRole);

export default router;
