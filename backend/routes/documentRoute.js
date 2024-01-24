var express = require("express");
var document_route = express();

const isLogin = require("../middleware/isLogin");

const documentController = require("../controllers/Document/documentController");

//const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
document_route.use(bodyParser.json());
document_route.use(bodyParser.urlencoded({ extended: true }));

// api for adding document

document_route.post("/addDocument", isLogin, documentController.addDocument);

// api for fetching particular document

document_route.get("/fetchDocument", isLogin, documentController.getDocument);

// api for fetching all document

document_route.get(
  "/getAllDocument",
  isLogin,
  documentController.getAllDocument
);

// api for fetching particular document assign

document_route.get(
  "/getDocumentAssign",
  isLogin,
  documentController.getDocumentAssign
);

// api for valid document assign

document_route.get(
  "/validDocumentAssign",
  isLogin,
  documentController.validDocumentAssign
);

// api for editing document

document_route.post("/editDocument", isLogin, documentController.editDocument);

module.exports = document_route;
