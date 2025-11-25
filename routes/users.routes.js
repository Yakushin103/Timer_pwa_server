import { Router } from "express";

import {
  addUser,
  deleteUser,
  getStore,
  singIn,
} from "../controllers/users-controllers.js";

import { checkToken } from "../utils/funcs.js";

const router = Router();
//  /api/users/

router.post("/add", checkToken, addUser);
router.post("/sing_in", singIn);
router.get("/store", checkToken, getStore);
// router.put("/updated", updatedTime);
router.delete("/delete", checkToken, deleteUser);

export default router;
