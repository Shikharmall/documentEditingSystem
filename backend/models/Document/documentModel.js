const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
