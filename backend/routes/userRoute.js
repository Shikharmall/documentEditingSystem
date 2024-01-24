var express = require("express");
var user_route = express();

const isLogin = require("../middleware/isLogin");

const userController = require("../controllers/User/userController");
//const questionController = require("../controllers/Document/documentController");

const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// api for register user

user_route.post("/registerUser", validateForm, userController.registerUser);

// api for login

user_route.post("/login", userController.loginUser);

// api for logout

user_route.post("/logout", isLogin, userController.logout);

// api for getting all users

user_route.get("/getAllUserDetails", isLogin, userController.getAllUserDetails);

module.exports = user_route;
