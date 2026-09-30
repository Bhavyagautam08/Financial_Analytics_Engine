import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import expenseRoutes from "./routes/expenseRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import { processRecurringTransactions } from "./services/recurringService.mjs";

// Rate Limiting
import { apiLimiter, authLimiter, docsLimiter } from "./middlewares/rateLimiter.mjs";

// Swagger Documentation
import { swaggerSpec, swaggerUi } from "./config/swagger.mjs";

// Only start cron jobs in non-serverless (local dev) environments
if (process.env.NODE_ENV !== "production") {
    const { default: cronSetup } = await import("./jobs/cronJob.mjs");
}

let isConnected = false;

const connectOnce = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to ensure DB is connected before every request
app.use(async (req, res, next) => {
    try {
        await connectOnce();
        next();
    } catch (err) {
        console.error("DB connection failed:", err);
        return res.status(500).json({ message: "Database connection failed" });
    }
});

// Apply rate limiters
app.use("/api/v1/auth", authLimiter);
app.use("/api/v1", apiLimiter);
app.use("/api-docs", docsLimiter);

// Routes
app.use("/api/v1", expenseRoutes);
app.use("/api/v1/auth", authRoutes);

// Swagger Documentation UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Expense Tracker API Docs"
}));

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Vercel Cron Endpoint for Recurring Transactions
app.get("/api/v1/cron/recurring", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        await processRecurringTransactions();
        res.status(200).json({ message: "Recurring transactions processed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process recurring transactions" });
    }
});

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is live on ${PORT}`);
        console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
    });
}

export default app;