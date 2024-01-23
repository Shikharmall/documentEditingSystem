const mongoose = require("mongoose");

const documentAssignSchema = new mongoose.Schema(
  {
    document_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DocumentAssign = mongoose.model("DocumentAssign", documentAssignSchema);

module.exports = DocumentAssign;
