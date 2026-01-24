import express from "express";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import "./jobs/cronJob.mjs";
import cors from "cors";
import connectDB from "./config/db.mjs";

// Rate Limiting
import { apiLimiter, authLimiter, docsLimiter } from "./middlewares/rateLimiter.mjs";

// Swagger Documentation
import { swaggerSpec, swaggerUi } from "./config/swagger.mjs";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Apply rate limiters
app.use("/api/v1/auth", authLimiter);  // Stricter limit for auth
app.use("/api/v1", apiLimiter);         // General API limit
app.use("/api-docs", docsLimiter);      // Docs limit

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is live on ${PORT}`);
    console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});