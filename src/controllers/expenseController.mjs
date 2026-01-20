import Expense from "../models/Expense.mjs";
import Budget from "../models/Budget.mjs";
import { predictEndOfMonth } from "../utils/forecast.mjs";
import mongoose from "mongoose";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    if (!amount || !category || !date || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      amount,
      category,
      date,
      description,
      userId: req.user._id,
    });

    const savedExpense = await newExpense.save();

    return res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category, page = 1, limit = 10 } = req.query;

    // Always 
    const filter = {
      userId: req.user._id
    }

    if (category) {
      filter.category = category
    }

    if (startDate || endDate) {
      filter.date = {}
      if (startDate) {
        filter.date.$gte = new Date(startDate)
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate)
      }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * (limitNumber);

    const Expenses = await Expense.find(filter).sort({ date: -1 }).skip(skip).limit(limitNumber);

    const totalExpenses = await Expense.countDocuments(filter);

    return res.status(200).json(
      {
        Expenses,
        totalExpenses,
        currentNumber: pageNumber,
        totalPages: Math.ceil(totalExpenses) / limitNumber
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Error");
  }
}

export const getExpenseAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const endDate = new Date();
    const startDate = new Date();

    startDate.setMonth(startDate.getMonth() - 12); // 12 months back 

    const analyticsResult = await Expense.aggregate(
      [
        // Always to filter first 
        {
          $match: {
            userId: userId,
            date: {
              $gte: startDate,
              $lte: endDate
            }
          }
        },

        // parallel pipelines 
        {
          $facet: {
            categoryStats: [
              {
                $group: {
                  _id: "$category",
                  totalAmount: { $sum: "$amount" }
                },
              },
              {
                $sort: { totalAmount: -1 }
              }
            ],
            monthlyStats: [
              {
                $group: {
                  _id: {
                    yearly: { $year: "$date" },
                    monthly: { $month: "$date" }
                  },
                  totalAmount: { $sum: "$amount" }
                }
              },
              {
                $sort: {
                  "_id.yearly": 1,
                  "_id.monthly": 1
                }
              }
            ]
          }
        }
      ]
    );

    //Extracting data 
    const { categoryStats, monthlyStats } = analyticsResult[0];

    res.status(200).json({
      success: true,
      categoryStats,
      monthlyStats
    });

  } catch (error) {
    console.error("Expense analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get expense analytics"
    });
  }
}

export const getBudgetForecast = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 1. Aggregation Pipeline
    const dailyExpenses = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startOfMonth, $lte: now } // Match expenses for this month up to now
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$date" }, // Extract day
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 } // Sort by day ascending
      }
    ]);


    // 2. Data Transformation for Utility
    const dailySpending = dailyExpenses.map(item => ({
      day: item._id,
      amount: item.totalAmount
    }));

    if (dailySpending.length === 0) {
      return res.status(200).json({
        predictedTotal: 0,
        budgetLimit: 0,
        status: 'On Track', // Or specific "No Data" status
        message: "No expenses found for this month."
      });
    }

    // 3. Call Utility
    const predictedTotal = predictEndOfMonth(dailySpending);

    // 4. Budget Comparison
    const budgets = await Budget.find({
      userId: userId,
      period: 'monthly'
    });

    const budgetLimit = budgets.reduce((acc, curr) => acc + curr.amount, 0);

    let status = 'On Track';
    if (budgetLimit > 0 && predictedTotal > budgetLimit) {
      status = 'Danger';
    }

    return res.status(200).json({
      predictedTotal,
      budgetLimit,
      status
    });

  } catch (error) {
    console.error("Prediction error:", error);
    return res.status(500).json({ message: "Error calculating forecast" });
  }
}

// Update an expense
export const updateExpense = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const { id } = req.params;
    const { amount, category, date, description } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId },
      { amount, category, date, description },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense updated",
      expense
    });
  } catch (error) {
    console.error("Update Expense Error:", error);
    return res.status(500).json({ message: "Failed to update expense" });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    return res.status(500).json({ message: "Failed to delete expense" });
  }
};