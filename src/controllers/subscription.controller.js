import { Subscription } from "../models/subscription.model.js";
import { Plan } from "../models/plan.model.js";
import { publisher } from "../redis/pubsub.redis.js";

const createSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { planId } = req.body;
        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration);

        const subscription = await Subscription.create({ userId, planId, endDate });
        publisher.publish("subscription created", JSON.stringify({ userId, planId }));
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            subscription
        });
    } catch (error) {
        next(error);
    }
};

const getSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id: subscriptionId } = req.params;
        const subscription = await Subscription.findOne({ _id: subscriptionId, userId }).populate("planId");
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }
        res.status(200).json({
            success: true,
            subscription
        });
    } catch (error) {
        next(error);
    }
};

const updateSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id: subscriptionId } = req.params;
        const { planId } = req.body;
        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        const subscription = await Subscription.findOne({ _id: subscriptionId, userId });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }

        if (subscription.status !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Only ACTIVE subscriptions can be upgraded or downgraded."
            });
        }

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration);

        subscription.planId = planId;
        subscription.endDate = endDate;
        await subscription.save();

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            subscription,
        });
    } catch (err) {
        next(err);
    }
};

const cancelSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id: subscriptionId } = req.params;
        const subscription = await Subscription.findOneAndUpdate(
            { _id: subscriptionId, userId },
            { status: 'CANCELLED' },
            { new: true }
        );
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
            subscription
        });
    } catch (error) {
        next(error);
    }
};

export {
    createSubscription,
    getSubscription,
    updateSubscription,
    cancelSubscription
}
