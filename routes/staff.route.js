import { Router } from "express";
import {
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  changePassword,
  login,
} from "../controllers/staff.controller.js";

const staffRoutes = Router();

// CRUD
staffRoutes.post("/", createStaff);
staffRoutes.get("/", getStaff);
staffRoutes.put("/:id", updateStaff);
staffRoutes.delete("/:id", deleteStaff);

// Auth
staffRoutes.post("/login", login);
staffRoutes.patch("/:id/change/password", changePassword);

export default staffRoutes;
