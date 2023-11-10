"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoggedUserPasswordValidation = exports.updateLoggedUservalidation = exports.updateUserPasswordValidation = exports.updateUservalidation = exports.deleteUserValidation = exports.getUserValidation = exports.createUserValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.createUserValidation = [
    (0, express_validator_1.check)("name").notEmpty()
        .withMessage("name is required..."),
    (0, express_validator_1.check)("email").notEmpty()
        .withMessage("email is required")
        .isEmail().withMessage("invalid email format"),
    (0, express_validator_1.check)("phone").isMobilePhone(["ar-EG", "ar-SA"])
        .withMessage("invalid phone number only eg and ksa numbers"),
    (0, express_validator_1.check)("userImg").optional().notEmpty()
        .withMessage("userImg required"),
    (0, express_validator_1.check)("address").notEmpty()
        .withMessage("user address required"),
    (0, express_validator_1.check)("role").optional(),
    validation_middleware_1.validationMiddleware
];
exports.getUserValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.deleteUserValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.updateUservalidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.check)("name").optional().notEmpty()
        .withMessage("name is required..."),
    (0, express_validator_1.check)("email").optional().notEmpty()
        .withMessage("email is required")
        .isEmail().withMessage("invalid email format"),
    (0, express_validator_1.check)("phone").optional().isMobilePhone(["ar-EG", "ar-SA"])
        .withMessage("invalid phone number only eg and ksa numbers"),
    (0, express_validator_1.check)("address").optional().notEmpty()
        .withMessage("user address required"),
    (0, express_validator_1.check)("role").optional(),
    validation_middleware_1.validationMiddleware
];
exports.updateUserPasswordValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.check)("password").notEmpty()
        .withMessage("password required"),
    (0, express_validator_1.check)("confirmPassword").custom((val, { req }) => {
        if (val != req.body.password) {
            throw new Error("Passord Confirmation incorrect");
        }
        else {
            return true;
        }
    }),
    validation_middleware_1.validationMiddleware
];
exports.updateLoggedUservalidation = [
    (0, express_validator_1.check)("name").optional().notEmpty()
        .withMessage("name is required..."),
    (0, express_validator_1.check)("email").optional().notEmpty()
        .withMessage("email is required")
        .isEmail().withMessage("invalid email format"),
    (0, express_validator_1.check)("phone").optional().isMobilePhone(["ar-EG", "ar-SA"])
        .withMessage("invalid phone number only eg and ksa numbers"),
    (0, express_validator_1.check)("address").optional().notEmpty()
        .withMessage("user address required"),
    validation_middleware_1.validationMiddleware
];
exports.updateLoggedUserPasswordValidation = [
    (0, express_validator_1.check)("newPassword").notEmpty()
        .withMessage("password required"),
    (0, express_validator_1.check)("confirmPassword").custom((val, { req }) => {
        if (val != req.body.newPassword) {
            throw new Error("new password Confirmation incorrect");
        }
        else {
            return true;
        }
    }),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=user.validate.js.map