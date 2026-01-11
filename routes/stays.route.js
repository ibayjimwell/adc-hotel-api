import { Router } from "express";
import { checkIn, checkOut } from "../controllers/stays.controller.js";

const stayRoutes = Router();

stayRoutes.post("/checkin", checkIn);
stayRoutes.patch("/:stayId/checkout", checkOut);

export default stayRoutes;