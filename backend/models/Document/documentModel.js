const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
