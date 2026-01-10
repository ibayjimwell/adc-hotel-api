import { Database } from "../database/drizzle.js";
import { Rooms, RoomTypes } from "../models/index.js";
import { eq } from "drizzle-orm";

// Creating room
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, roomTypeId } = req.body;

    // Required field
    if (!roomNumber || !roomTypeId) {
        return res.status(400).json({
            success: false,
            type: "W-Missing Required",
            message: "Missing required fields, room number and room type is required."
        });
    }

    // Room number exist handler
    const existingRoom = await Database
      .select({ id: Rooms.id })
      .from(Rooms)
      .where(eq(Rooms.roomNumber, roomNumber))
      .limit(1);

    
    if (existingRoom.length > 0) {
      return res.status(409).json({
        success: false,
        type: "W-Room Number Exist",
        message: `Room number ${roomNumber} is already exists.`,
      });
    }

    // Creating record for room
    const [room] = await Database
      .insert(Rooms)
      .values({
        roomNumber,
        roomTypeId,
      })
      .returning();

    // Returning the created room
    res.status(201).json({
        success: true,
        message: `Room ${roomNumber} created.`,
        data: room
    });
  } catch (err) {
      return new Error("Failed to create room.");
  }
};

// Room listing with it's type
export const getRooms = async (req, res) => {
    try {
        // Query for listing room with it's type
        const result = await Database
        .select({
            id: Rooms.id,
            roomNumber: Rooms.roomNumber,
            status: Rooms.status,
            typeName: RoomTypes.name,
            basePrice: RoomTypes.basePrice,
            capacity: RoomTypes.capacity,
        })
        .from(Rooms)
        .innerJoin(RoomTypes, eq(Rooms.roomTypeId, RoomTypes.id));

        // Returning the rooms
        res.json(result);
  } catch (err) {
        return new Error("Failed to list rooms.");
    }
};

// Update room status
export const updateRoomStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Updating room status
    const [room] = await Database
      .update(Rooms)
      .set({ status })
      .where(eq(Rooms.id, id))
      .returning();

    // Returning updated room
    res.json({
        success: true,
        message: `Room status updated to ${status}.`,
        data: room
    });
  } catch (err) {
      return new Error("Failed to update room status.");
  }
};
