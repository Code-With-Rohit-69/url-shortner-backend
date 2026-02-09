import mongoose, { Schema, Document, Model } from "mongoose";

export interface UrlDocument extends Document {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<UrlDocument>(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      unique: true,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Url: Model<UrlDocument> =
  mongoose.models.Url || mongoose.model<UrlDocument>("Url", urlSchema);

export default Url;
