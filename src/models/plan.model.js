import mongoose, {Schema} from "mongoose";

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    features: [String],
    duration: {
        type: Number,
        required: true,
    },
})

export const Plan = mongoose.model("Plan", planSchema);