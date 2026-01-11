import { Database } from "../database/drizzle.js";
import { Stays, Rooms } from "../models/index.js";
import { eq } from "drizzle-orm";

// Check In
export const checkIn = async (req, res, next) => {
  try {
    const { guestId, roomId, checkinAt } = req.body;

    // Required field handler
    if (!guestId || !roomId || !checkinAt) {
      return res.status(400).json({
        success: false,
        type: "W-Missing Required",
        message: "Guest ID, Room ID, and Checkin Date are required.",
      });
    }

    // Convert string into Date
    const checkinDate = new Date(checkinAt);

    // Validate date
    if (isNaN(checkinDate.getTime())) {
      return res.status(400).json({
        success: false,
        type: "W-Invalid Date",
        message: "Invalid checkin date format.",
      });
    }

    // Check room availability
    const [room] = await Database
      .select()
      .from(Rooms)
      .where(eq(Rooms.id, roomId))
      .limit(1);

    if (!room) {
      return res.status(404).json({
        success: false,
        type: "W-Room Not Found",
        message: "There is no room found.",
      });
    }

    if (room.status !== "available") {
      return res.status(409).json({
        success: false,
        type: "W-Room Not Available",
        message: `Room ${room.roomNumber} is not available.`,
      });
    }

    // Creating record for stay
    const [stay] = await Database
      .insert(Stays)
      .values({
        guestId,
        roomId,
        checkinAt: checkinDate,
        status: "active",
      })
      .returning();

    // Updating room status
    await Database
      .update(Rooms)
      .set({ status: "occupied" })
      .where(eq(Rooms.id, roomId));

    // Returning message
    return res.status(201).json({
      success: true,
      message: "Guest checked in successfully.",
      data: stay,
    });

  } catch (error) {
      return next(new Error(error.message));
  }
};

// Check Out
export const checkOut = async (req, res, next) => {
  try {
    const { stayId } = req.params;
    const { checkoutAt } = req.body;

    // Required handler
    if (!checkoutAt) {
      return res.status(400).json({
        success: false,
        type: "W-Missing Required",
        message: "Checkout Date is required.",
      });
    }

    // Convert string into Date
    const checkoutDate = new Date(checkoutAt);

    // Validate date
    if (isNaN(checkoutDate.getTime())) {
      return res.status(400).json({
        success: false,
        type: "W-Invalid Date",
        message: "Invalid checkout date format.",
      });
    }

    // Find active stay and handler for that
    const [stay] = await Database
      .select()
      .from(Stays)
      .where(eq(Stays.id, stayId))
      .limit(1);

    if (!stay || stay.status !== "active") {
      return res.status(409).json({
        success: false,
        type: "W-Stay Not Active",
        message: "Stay not found or already closed.",
      });
    }

    // Update stay
    await Database
      .update(Stays)
      .set({
        checkoutAt: checkoutDate,
        status: "completed",
      })
      .where(eq(Stays.id, stayId));

    // Release room
    await Database
      .update(Rooms)
      .set({ status: "cleaning" })
      .where(eq(Rooms.id, stay.roomId));

    // Returning message
    return res.json({
      success: true,
      message: "Guest checked out successfully.",
    });

  } catch (error) {
      return next(new Error(error.message));
  }
};
