import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

export const User = mongoose.model("User", userSchema);