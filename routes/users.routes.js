import { Router } from "express";

import {
  addUser,
  deleteUser,
  getStore,
} from "../controllers/users-controllers.js";

const router = Router();
//  /api/users/

router.post("/add", addUser);
router.get("/store", getStore);
// router.put("/updated", updatedTime);
router.delete("/delete", deleteUser);

export default router;
