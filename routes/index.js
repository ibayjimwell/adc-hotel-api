import { Router } from "express";
import guestRoutes from "./guests.route.js";

const router = Router();

router.use("/guests", guestRoutes);

export default router;
