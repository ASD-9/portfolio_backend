const { Router } = require("express");
const router = Router();

const authController = require("./authController");

const { loginValidators, registerValidators } = require("./validators");
const handleValidations = require("./handleValidations");

router.post("/login", loginValidators, handleValidations, authController.login);

router.post("/register", registerValidators, handleValidations, authController.register);

module.exports = router;
