"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.verifyResetCodeValidation = exports.forgetPasswordValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.forgetPasswordValidation = [
    (0, express_validator_1.check)("email").isEmail().withMessage("invalid email format"),
    validation_middleware_1.validationMiddleware
];
exports.verifyResetCodeValidation = [
    (0, express_validator_1.check)("resetCode").notEmpty().withMessage("reset code required")
        .isLength({ min: 6 }).withMessage("reset code must be 6 digits"),
    validation_middleware_1.validationMiddleware
];
exports.resetPasswordValidation = [
    (0, express_validator_1.check)("email").isEmail().withMessage("invalid email format"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("new password required"),
    (0, express_validator_1.check)("confirmPassword").custom((val, { req }) => {
        if (val != req.body.password) {
            throw new Error("incorrect confirm password");
        }
        else {
            return true;
        }
    }),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=forgetPassword.validation.js.map