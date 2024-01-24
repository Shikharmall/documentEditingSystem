const Document = require("../../models/Document/documentModel");
const DocumentAssign = require("../../models/Document/documentAssignModel");
const mongoose = require("mongoose");
const { Types } = mongoose;

//add document

const addDocument = async (req, res) => {
  try {
    const { name, content, owner_id, userIDs } = req.body;

    const documentData = new Document({
      name: name,
      content: content,
      owner_id: owner_id,
    });

    const documentAdded = await documentData.save();

    if (documentAdded) {
      const assignIDPromises = userIDs.map(async (obj) => {
        const assignIDData = new DocumentAssign({
          document_id: documentAdded._id,
          user_id: obj,
        });
        await assignIDData.save();
      });

      const assignData = await Promise.all(assignIDPromises);
      if (assignData) {
        return res.status(201).json({ status: "success", data: documentAdded });
      }
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get document

const getDocument = async (req, res) => {
  try {
    const { document_id } = req.query;

    const documentData = await Document.findById({ _id: document_id });

    if (documentData) {
      return res.status(200).json({ status: "success", data: documentData });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get document assign

const getDocumentAssign = async (req, res) => {
  try {
    const { document_id } = req.query;

    const documentAssignData = await DocumentAssign.find({
      document_id: document_id,
    }).populate("user_id", "name");

    if (documentAssignData) {
      return res
        .status(200)
        .json({ status: "success", data: documentAssignData });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get document assign

const validDocumentAssign = async (req, res) => {
  try {
    const { user_id, document_id } = req.query;

    // Validate if user_id is a valid ObjectId
    if (!Types.ObjectId.isValid(user_id)) {
      return res
        .status(400)
        .json({ status: "bad request", message: "Invalid user_id format." });
    }

    // Convert user_id to a valid ObjectId
    const userIdObject = new Types.ObjectId(user_id);

    const assignedDocuments = await DocumentAssign.find({
      user_id: userIdObject,
      document_id: document_id,
    });

    console.log("assignedDocuments:", assignedDocuments);

    if (assignedDocuments && assignedDocuments.length > 0) {
      return res
        .status(200)
        .json({ status: "success", data: assignedDocuments });
    } else {
      return res.status(404).json({
        status: "not found",
        message: "No assigned documents found for the user.",
      });
    }
  } catch (error) {
    console.error("Error in getDocumentsByUserId:", error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//edit document

const editDocument = async (req, res) => {
  try {
    const { content, document_id } = req.body;

    const editDocument = await Document.findByIdAndUpdate(
      { _id: document_id },
      {
        $set: {
          content: content,
        },
      }
    );

    if (editDocument) {
      return res
        .status(201)
        .json({ status: "success", message: "Document Editted Successfully." });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};


module.exports = {
  addDocument,
  getDocument,
  editDocument,
  getDocumentAssign,
  validDocumentAssign,
};
