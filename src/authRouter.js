const { Router } = require("express");
const router = Router();

const authController = require("./authController");

const { loginValidators } = require("./validators");
const handleValidations = require("./handleValidations");

router.post("/login", loginValidators, handleValidations, authController.login);

module.exports = router;
