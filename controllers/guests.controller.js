import { success } from "zod";
import { Database } from "../database/drizzle.js";
import { Guests } from "../models/index.js";
import { eq, ilike, or } from "drizzle-orm";

// Creating Guest
export const createGuest = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            idType,
            idNumber
        } = req.body;
      
        const { updateExist } = req.query;
      
        // Find out if the guest is already exist in a record
        if (email || phone) {
          const [existingGuest] = await Database
            .select()
            .from(Guests)
            .where(
              or(
                email ? eq(Guests.email, email) : undefined,
                phone ? eq(Guests.phone, phone) : undefined
              )
          );

          // Update name if different
          if (existingGuest && updateExist) {
            await Database
              .update(Guests)
              .set({
                firstName,
                lastName,
                updatedAt: new Date()
              })
              .where(eq(Guests.id, existingGuest.id));

            return res.json({
              success: true,
              message: `Existing guest ${firstName} ${lastName} reused.`,
              data: existingGuest,
            });
          }

          // Response existing guest
          if (existingGuest) {
            return res.status(409).json({
              success: false,
              type: "W-Guest Already Exist",
              message: `Existing record of ${email} and ${phone} found.`,
              data: existingGuest,
            });
          }
        }

        // First and last name is required
        if (!firstName || !lastName) {
            return res.status(400).json({
              success: false,
              type: "W-Name Required",
              message: "Name are required to fill up."
            });
        }

        // Create the guest
        const [guest] = await Database
            .insert(Guests)
            .values({
                firstName,
                lastName,
                phone,
                email,
                idType,
                idNumber
            })
            .returning();
        
        // Return the created guest
        res.status(201).json({
          success: true,
          message: `Guest ${firstName} ${lastName} created.`,
          data: guest
        });

    } catch (error) {
        return new Error("Failed to create guest");
    }
}

// Get all Guest
export const getGuests = async (req, res) => {
  try {
    const { search } = req.query;

    // Condition based on search
    const query = search
      ? Database
          .select()
          .from(Guests)
          .where(
              or(
                  ilike(Guests.lastName, `%${search}%`),
                  ilike(Guests.firstName, `%${search}%`)
            )
          )
      : Database.select().from(Guests);

    // Returning the result
    const result = await query;
    res.json({
        success: true,
        data: result
    });
      
  } catch (err) {
        return new Error("Failed to load guests.");
  }
};

// Get Single Guest
export const getGuestById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query to get the guest
    const [guest] = await Database
      .select()
      .from(Guests)
      .where(eq(Guests.id, id));

    // Guest not found handler
    if (!guest) {
        return res.status(404).json({
          success: false,
          type: "W-No Guest Found",
          message: "Guest not found create guest."
        });
    }

    // Return the guest
      res.json({
          success: true,
          data: guest
      });
      
  } catch (err) {
        return new Error("Failed to load guest.");
  }
};

// Update Guest
export const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;

    // Query for updating guest
    const [guest] = await Database
      .update(Guests)
      .set(req.body)
      .where(eq(Guests.id, id))
      .returning();

      // Return the updated guest
      res.json({
          success: true,
          data: guest,
          message: `Guest ${req.firstName} ${req.lastName} updated.`
      });
      
  } catch (err) {
        return new Error("Failed to update guest.");
  }
};