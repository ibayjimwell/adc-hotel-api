import { NODE_ENV } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Log the error
    console.log(`
        Error Found - ${err.message}
        URL - ${req.originalUrl}
        Request Method - ${req.method}
        Error Name - ${err.name}
        Error Message - ${err.message}
        Stack Trace: ${err.stack}
    `);
    
    // Return the error
    res.status(statusCode).json({
        success: false,
        type: "E-Server Error",
        url: req.originalUrl,
        method: req.method,
        name: err.name,
        message: err.message,
        stack: NODE_ENV === "production" ? null : err.stack
    });
}