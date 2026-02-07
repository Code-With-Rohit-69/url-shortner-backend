import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortCode: {
        type: String,
        unique: true,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);

export default Url;