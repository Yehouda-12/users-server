import express from "express";
import {
  getUsers,
  getUserByID,
  getUserByContry,
  updateUser,
  createUser,
  deleteUserByID,
} from "../controllers/users.js";
const router = express.Router();
router.route("/")
.get(getUsers)
.post(createUser);
router.route("/search")
.get(getUserByContry);
router.route("/:id")
.get(getUserByID)
.put(updateUser)
.delete(deleteUserByID);

export default router;

