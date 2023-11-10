"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.signUpValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.signUpValidation = [
    (0, express_validator_1.check)("name").notEmpty()
        .withMessage("name is required..."),
    (0, express_validator_1.check)("email").notEmpty()
        .withMessage("email is required")
        .isEmail().withMessage("invalid email format"),
    (0, express_validator_1.check)("phone").isMobilePhone(["ar-EG", "ar-SA"])
        .withMessage("invalid phone number only eg and ksa numbers"),
    (0, express_validator_1.check)("address").notEmpty()
        .withMessage("user address required"),
    (0, express_validator_1.check)("password").notEmpty()
        .withMessage("password required"),
    validation_middleware_1.validationMiddleware
];
exports.loginValidation = [
    (0, express_validator_1.check)("email").notEmpty()
        .withMessage("email is required")
        .isEmail().withMessage("invalid email format"),
    (0, express_validator_1.check)("password").notEmpty()
        .withMessage("password required"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=auth.validation.js.map