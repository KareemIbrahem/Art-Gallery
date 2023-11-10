"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validation_1 = require("../utils/validation/auth.validation");
const forgetPassword_validation_1 = require("../utils/validation/forgetPassword.validation");
const forgetPassword_controller_1 = require("../controllers/forgetPassword.controller");
exports.router = express_1.default.Router();
exports.router.post("/signup", auth_validation_1.signUpValidation, auth_controller_1.signUp);
exports.router.post("/signup/verify", forgetPassword_validation_1.verifyResetCodeValidation, auth_controller_1.verifySignUp);
exports.router.post("/signup/resend", auth_controller_1.resendVerifySignUp);
exports.router.post("/login", auth_validation_1.loginValidation, auth_controller_1.login);
exports.router.post("/forgetPassword", forgetPassword_validation_1.forgetPasswordValidation, forgetPassword_controller_1.forgetPassword);
exports.router.post("/verifyResetCode", forgetPassword_validation_1.verifyResetCodeValidation, forgetPassword_controller_1.verifyResetCode);
exports.router.post("/resetPassword", forgetPassword_validation_1.resetPasswordValidation, forgetPassword_controller_1.changePassword);
//# sourceMappingURL=auth.routes.js.map