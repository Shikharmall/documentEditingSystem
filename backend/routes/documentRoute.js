var express = require("express");
var document_route = express();

//const isDDAdmin = require("../middleware/isVerified");

//const isLogin = require("../middleware/isLogin");

const userController = require("../controllers/User/userController");
const documentController = require("../controllers/Document/documentController");

//const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
document_route.use(bodyParser.json());
document_route.use(bodyParser.urlencoded({ extended: true }));

// api for adding document

document_route.post("/addDocument", documentController.addDocument);

// api for fetching document assign

document_route.get("/fetchDocument", documentController.getDocument);

// api for fetching document

document_route.get("/getDocumentAssign", documentController.getDocumentAssign);

// api for valid document assign

document_route.get(
  "/validDocumentAssign",
  documentController.validDocumentAssign
);

// api for editing document

document_route.post("/editDocument", documentController.editDocument);

module.exports = document_route;
