import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { PORT, NODE_ENV } from "./config/env.js";

import router from "./routes/index.js";
import HealthRouter from "./routes/health.route.js";
import { pool } from "./database/drizzle.js";

// Initialize app
const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.use("/api/v1", router);
app.use("/api/v1/health", HealthRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server
const startServer = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("Database: Connected");

        app.listen(PORT, async () => {
            console.log(`App is running on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server", error);
        process.exit(1);
    }
}
startServer();

export default app;
