const mongoose = require("mongoose");

// Schema creation

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectedURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

// MOdel Creation

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
