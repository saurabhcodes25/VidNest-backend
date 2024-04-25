import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //jo subscribe kr rha hai
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //jisko subscribe kr rha hai
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = new mongoose.model(
  "Subscription",
  subscriptionSchema,
);
