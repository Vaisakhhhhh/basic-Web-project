const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.signup );
router.post("/", userController.signuppost);
router.get("/login", userController.login);
router.post("/login", userController.loginpost);
router.get("/home", userController.home);
router.get("/signout", userController.logout);




module.exports = router;