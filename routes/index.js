import { Router } from "express";
import guestRoutes from "./guests.route.js";
import roomTypeRoutes from "./room-types.route.js";
import roomRoutes from "./rooms.route.js";
import stayRoutes from "./stays.route.js";

const router = Router();

router.use("/guests", guestRoutes);
router.use("/rooms/types", roomTypeRoutes);
router.use("/rooms", roomRoutes);
router.use("/stays", stayRoutes);

export default router;
