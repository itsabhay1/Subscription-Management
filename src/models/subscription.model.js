import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    planId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED'],
        default: 'ACTIVE',
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    }
})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)