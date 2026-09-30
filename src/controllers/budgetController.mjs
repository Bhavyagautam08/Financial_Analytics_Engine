import Budget from "../models/Budget.mjs";
import mongoose from "mongoose";

// Create or update a budget
export const setBudget = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const { category, amount, period } = req.body;

        if (!category || !amount || !period) {
            return res.status(400).json({ message: "Category, amount, and period are required" });
        }

        // Upsert: update if exists, create if not
        const budget = await Budget.findOneAndUpdate(
            { userId, category, period },
            { amount },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            message: "Budget saved successfully",
            budget
        });
    } catch (error) {
        console.error("Set Budget Error:", error);
        return res.status(500).json({ message: "Failed to save budget" });
    }
};

// Get all budgets for user
export const getBudgets = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const budgets = await Budget.find({ userId });

        const totalBudget = budgets
            .filter(b => b.period === 'monthly')
            .reduce((acc, curr) => acc + curr.amount, 0);

        return res.status(200).json({
            budgets,
            totalMonthlyBudget: totalBudget
        });
    } catch (error) {
        console.error("Get Budgets Error:", error);
        return res.status(500).json({ message: "Failed to get budgets" });
    }
};
