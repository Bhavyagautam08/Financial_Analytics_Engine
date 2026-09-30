import RecurringTransaction from "../models/RecurringTransactions.mjs";
import Expense from "../models/Expense.mjs";
import mongoose from "mongoose";

// Create a new recurring transaction
export const createRecurring = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const { amount, category, frequency, startDate, description } = req.body;

        if (!amount || !category || !frequency) {
            return res.status(400).json({ message: "Amount, category, and frequency are required" });
        }

        const nextRunDate = startDate ? new Date(startDate) : new Date();

        const recurring = new RecurringTransaction({
            userId,
            amount,
            category,
            frequency,
            startDate: nextRunDate,
            nextRunDate,
            description: description || `Recurring ${category}`,
            isActive: true
        });

        await recurring.save();

        return res.status(201).json({
            message: "Recurring transaction created",
            recurring
        });
    } catch (error) {
        console.error("Create Recurring Error:", error);
        return res.status(500).json({ message: "Failed to create recurring transaction" });
    }
};

// Get all recurring transactions for user
export const getRecurrings = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const recurrings = await RecurringTransaction.find({ userId }).sort({ nextRunDate: 1 });

        return res.status(200).json({ recurrings });
    } catch (error) {
        console.error("Get Recurrings Error:", error);
        return res.status(500).json({ message: "Failed to get recurring transactions" });
    }
};

// Update a recurring transaction
export const updateRecurring = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const { id } = req.params;
        const { amount, category, frequency, isActive } = req.body;

        const recurring = await RecurringTransaction.findOneAndUpdate(
            { _id: id, userId },
            { amount, category, frequency, isActive },
            { new: true }
        );

        if (!recurring) {
            return res.status(404).json({ message: "Recurring transaction not found" });
        }

        return res.status(200).json({
            message: "Recurring transaction updated",
            recurring
        });
    } catch (error) {
        console.error("Update Recurring Error:", error);
        return res.status(500).json({ message: "Failed to update recurring transaction" });
    }
};

// Delete a recurring transaction
export const deleteRecurring = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const { id } = req.params;

        const recurring = await RecurringTransaction.findOneAndDelete({ _id: id, userId });

        if (!recurring) {
            return res.status(404).json({ message: "Recurring transaction not found" });
        }

        return res.status(200).json({ message: "Recurring transaction deleted" });
    } catch (error) {
        console.error("Delete Recurring Error:", error);
        return res.status(500).json({ message: "Failed to delete recurring transaction" });
    }
};

// Toggle active state
export const toggleRecurring = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const { id } = req.params;

        const recurring = await RecurringTransaction.findOne({ _id: id, userId });

        if (!recurring) {
            return res.status(404).json({ message: "Recurring transaction not found" });
        }

        recurring.isActive = !recurring.isActive;
        await recurring.save();

        return res.status(200).json({
            message: `Recurring transaction ${recurring.isActive ? 'activated' : 'deactivated'}`,
            recurring
        });
    } catch (error) {
        console.error("Toggle Recurring Error:", error);
        return res.status(500).json({ message: "Failed to toggle recurring transaction" });
    }
};
