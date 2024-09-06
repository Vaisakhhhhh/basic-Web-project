const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/adminController");


router.post("/login", admincontroller.loginpost);
router.get("/login", admincontroller.login);
router.get("/dashboard", admincontroller.dashboard);
router.get("/edit/:id", admincontroller.edit);
router.get("/delete/:id", admincontroller.delete);
router.post("/update/:id", admincontroller.update);
router.get("/createuser", admincontroller.create);
router.post("/createuser", admincontroller.register);
router.get("/signout", admincontroller.logout);

module.exports = router;

