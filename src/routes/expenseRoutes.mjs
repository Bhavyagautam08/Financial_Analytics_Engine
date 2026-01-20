import express from "express";
import { addExpense, getExpenses, getExpenseAnalytics, getBudgetForecast, updateExpense, deleteExpense } from "../controllers/expenseController.mjs";
import { setBudget, getBudgets } from "../controllers/budgetController.mjs";
import { createRecurring, getRecurrings, updateRecurring, deleteRecurring, toggleRecurring } from "../controllers/recurringController.mjs";
import { validation } from "../middlewares/validation.mjs";

const router = express.Router();

// Expense routes
router.post("/expenses", validation, addExpense);
router.get("/expenses", validation, getExpenses);
router.get("/expenses/analytics", validation, getExpenseAnalytics);
router.put("/expenses/:id", validation, updateExpense);
router.delete("/expenses/:id", validation, deleteExpense);

// Forecast route
router.get("/forecast", validation, getBudgetForecast);

// Budget routes
router.post("/budgets", validation, setBudget);
router.get("/budgets", validation, getBudgets);

// Recurring transaction routes
router.post("/recurring", validation, createRecurring);
router.get("/recurring", validation, getRecurrings);
router.put("/recurring/:id", validation, updateRecurring);
router.delete("/recurring/:id", validation, deleteRecurring);
router.patch("/recurring/:id/toggle", validation, toggleRecurring);

export default router;
