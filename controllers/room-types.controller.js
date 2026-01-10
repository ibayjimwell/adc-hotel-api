import { Database } from "../database/drizzle.js";
import { RoomTypes } from "../models/index.js";
import { eq } from "drizzle-orm";

// Creating room type
export const createRoomType = async (req, res) => {
    try {
        const { name, description, basePrice, capacity } = req.body;

        // Inserting the room type in a record
        const [roomType] = await Database
        .insert(RoomTypes)
        .values({
            name,
            description,
            basePrice,
            capacity,
        })
        .returning();
        
        // Returning the created room
        res.status(201).json({
            success: true,
            messaage: `Room type ${name} created.`,
            data: roomType
        });

    } catch (error) {
        return new Error("Failed to create room type.");
    }
}

// Listing room type
export const getRoomTypes = async (req, res) => {
  try {
    const result = await Database.select().from(RoomTypes);
    res.json(result);
  } catch (err) {
        return new Error("Failed to list room types.");
  }
};

// Update room type
export const updateRoomType = async (req, res) => {
  try {
    const { id } = req.params;

    // Updating query for room type
    const [roomType] = await Database
      .update(RoomTypes)
      .set(req.body)
      .where(eq(RoomTypes.id, id))
      .returning();
    
    // Returning updated room type
    res.json({
        success: true,
        messaage: `Room type updated.`,
        data: roomType
    });
  } catch (err) {
        return new Error("Failed to update room type.");
  }
};