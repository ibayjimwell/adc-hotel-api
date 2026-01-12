import { Router } from "express";
import guestRoutes from "./guests.route.js";
import roomTypeRoutes from "./room-types.route.js";
import roomRoutes from "./rooms.route.js";
import stayRoutes from "./stays.route.js";
import reservationRoutes from "./reservations.route.js";
import serviceRoutes from "./services.route.js";
import stayServiceRoutes from "./stay-services.route.js";
import invoiceRoutes from "./invoices.route.js";
import paymentRoutes from "./payments.route.js";

const router = Router();

router.use("/guests", guestRoutes);
router.use("/rooms/types", roomTypeRoutes);
router.use("/rooms", roomRoutes);
router.use("/stays", stayRoutes);
router.use("/reservations", reservationRoutes);
router.use("/services", serviceRoutes);
router.use("/stays", stayServiceRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/payments", paymentRoutes);

export default router;
