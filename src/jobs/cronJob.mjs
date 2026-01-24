import cron from "node-cron"
import { processRecurringTransactions } from "../services/recurringService.mjs"

// Run immediately on server startup to catch any missed transactions
console.log("Processing any missed recurring transactions on startup...");
processRecurringTransactions()
    .then(() => console.log("Startup recurring check completed"))
    .catch(err => console.error("Startup recurring check failed:", err));

// Schedule daily execution at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Cron Job started ");

    try {
        await processRecurringTransactions();
        console.log("Cron Job is done ");
    } catch (error) {
        console.error(error);
    }
})