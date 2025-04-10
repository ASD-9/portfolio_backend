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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&<>])[A-Za-z\d@$!%*?&<>]{8,}$/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères")
]

const registerValidators = [
  body("username")
    .trim()
    .notEmpty().withMessage("Le nom d'utilisateur est requis")
    .isString().withMessage("Le nom d'utilisateur doit être une chaîne de caractères"),
  body("password")
    .trim()
    .notEmpty().withMessage("Le mot de passe est requis")
    .isString().withMessage("Le mot de passe doit être une chaîne de caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&<>])[A-Za-z\d@$!%*?&<>]{8,}$/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères"),
  body("companyName")
    .trim()
    .notEmpty().withMessage("Le nom de la compagnie est requis")
    .isString().withMessage("Le nom de la compagnie doit être une chaîne de caractères"),
  body("description")
    .trim()
    .notEmpty().withMessage("La description est requise")
    .isString().withMessage("La description doit être une chaîne de caractères"),
  body("reason")
    .optional()
    .isString().withMessage("La raison doit être une chaîne de caractères"),
  body("adminPassword")
    .trim()
    .notEmpty().withMessage("Le mot de passe de l'administrateur est requis")
    .isString().withMessage("Le mot de passe de l'administrateur doit être une chaîne de caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&<>])[A-Za-z\d@$!%*?&<>]{8,}$/).withMessage("Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères"),
]

module.exports = {
  loginValidators,
  registerValidators
};
