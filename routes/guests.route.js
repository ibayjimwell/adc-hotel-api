import { Router } from "express";
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
} from "../controllers/guests.controller.js";

const guestRoutes = Router();

guestRoutes.post("/", createGuest);
guestRoutes.get("/", getGuests);
guestRoutes.get("/:id", getGuestById);
guestRoutes.put("/:id", updateGuest);

export default guestRoutes;
