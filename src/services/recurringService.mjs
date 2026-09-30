import RecurringTransactions from "../models/RecurringTransactions.mjs";
import Expense from "../models/Expense.mjs";

export const processRecurringTransactions = async () => {
    try {
        const recurringDocuments = await RecurringTransactions.find({
            isActive: true,
            nextRunDate: { $lte: new Date() }
        });

        for (const recurring of recurringDocuments) {
            try {
                await Expense.create({
                    userId: recurring.userId,
                    amount: recurring.amount,
                    category: recurring.category,
                    date: new Date(),
                    description: `Auto-generated: ${recurring.description || recurring.title || recurring.category} (${recurring.frequency})`,
                    isRecurring: true
                });

                let nextDate = new Date(recurring.nextRunDate);
                const now = new Date();

                while (nextDate <= now) {
                    if (recurring.frequency === "daily") {
                        nextDate.setDate(nextDate.getDate() + 1);
                    } else if (recurring.frequency === "weekly") {
                        nextDate.setDate(nextDate.getDate() + 7);
                    } else if (recurring.frequency === "monthly") {
                        nextDate.setMonth(nextDate.getMonth() + 1);
                    } else if (recurring.frequency === "yearly") {
                        nextDate.setFullYear(nextDate.getFullYear() + 1);
                    }
                }

                await RecurringTransactions.findByIdAndUpdate(
                    recurring._id,
                    { nextRunDate: nextDate }
                );

            } catch (innerError) {
                console.error("Failed recurring transaction:", recurring._id);
                console.error(innerError);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
