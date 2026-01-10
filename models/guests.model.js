import { 
    varchar,
    uuid,
    pgTable, 
    timestamp,
    index
} from "drizzle-orm/pg-core";

export const Guests = pgTable("guests", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),

    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 150 }),
        
    idType: varchar("id_type", { length: 50 }),
    idNumber: varchar("id_number", { length: 100 }),

    isActive: varchar("is_active", { length: 1 })
        .default("Y")
        .notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
},
    (table) => ({
        emailIdx: index("guests_email_idx").on(table.email),
        phoneIdx: index("guests_phone_idx").on(table.phone),
    })
);