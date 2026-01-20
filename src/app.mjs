import express from "express";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import "./jobs/cronJob.mjs";
import cors from "cors";
import connectDB from "./config/db.mjs";

dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/v1", expenseRoutes);
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is live on ${PORT}`);
})