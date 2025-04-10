const { body } = require("express-validator");

const loginValidators = [
  body("username")
    .trim()
    .notEmpty().withMessage("Le nom d'utilisateur est requis")
    .isString().withMessage("Le nom d'utilisateur doit être une chaîne de caractères"),
  body("password")
    .trim()
    .notEmpty().withMessage("Le mot de passe est requis")
    .isString().withMessage("Le mot de passe doit être une chaîne de caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères")
]

module.exports = { loginValidators };
