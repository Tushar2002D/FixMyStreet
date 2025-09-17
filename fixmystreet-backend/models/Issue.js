const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["garbage", "road", "water", "electricity", "other"],
      default: "other",
    },
    imageURL: { type: String, default: "" },
    location: {
      lat: Number,
      lng: Number,
      address: String,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
