import cron from 'node-cron';
import { Subscription } from '../models/subscription.model.js';

// Runs every day at midnight
const checkAndExpireSubscriptions = async () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const now = new Date();
            const result = await Subscription.updateMany(
                { endDate: { $lt: now }, status: 'ACTIVE' },
                { status: 'EXPIRED' }
            );
            console.log(`[CRON] Expired ${result.modifiedCount} subscriptions`);
            
        } catch (err) {
            console.error("[CRON] Error expiring subscriptions:", err.message);
        }
    });
}

export default checkAndExpireSubscriptions;