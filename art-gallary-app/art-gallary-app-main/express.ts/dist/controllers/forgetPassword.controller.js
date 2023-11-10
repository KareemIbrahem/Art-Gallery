"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyResetCode = exports.forgetPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = require("../models/user.model");
const apiError_1 = require("../utils/apiError");
const sendEmail_1 = require("../utils/sendEmail");
exports.forgetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: req.body.email });
    if (!user) {
        next(new apiError_1.ApiError(`No user in this email`, 404));
        return;
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeHash = crypto_1.default.createHash("sha256").update(resetCode).digest("hex");
    user.resetPasswordCode = resetCodeHash;
    user.resetCodeExpire = Date.now() + 5 * 60 * 1000;
    user.resetCodeVerify = false;
    yield user.save();
    try {
        const message = `Hi ${user.name} \n 
        we recieved a request to reset the password on your E-commercy account \n
        ${resetCode} \n enter this code to reset password
        `;
        yield (0, sendEmail_1.sendEmail)({
            email: user.email,
            subject: "your password reset code valid for 5 min",
            message: message
        });
    }
    catch (error) {
        user.resetPasswordCode = undefined;
        user.resetCodeExpire = undefined;
        user.resetCodeVerify = undefined;
        yield user.save();
        next(new apiError_1.ApiError("we have an error to sending email please try again later", 500));
        return;
    }
    res.status(200).json({ status: "success", message: "reset code sent to your email" });
}));
exports.verifyResetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashResetCode = crypto_1.default.createHash("sha256").update(req.body.resetCode).digest("hex");
    const user = yield user_model_1.userModel.findOne({
        resetPasswordCode: hashResetCode,
        resetCodeExpire: { $gt: Date.now() }
    });
    if (!user) {
        next(new apiError_1.ApiError("invalid reset code or expire", 500));
        return;
    }
    user.resetCodeVerify = true;
    yield user.save();
    res.status(200).json({ status: "success" });
}));
exports.changePassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: req.body.email });
    if (!user) {
        next(new apiError_1.ApiError("no user in this email", 404));
        return;
    }
    if (!user.resetCodeVerify) {
        next(new apiError_1.ApiError("reset code not verifed", 400));
        return;
    }
    user.password = req.body.password;
    user.resetCodeExpire = undefined;
    user.resetCodeVerify = undefined;
    user.resetPasswordCode = undefined;
    yield user.save();
    res.status(200).json({ status: "success" });
}));
//# sourceMappingURL=forgetPassword.controller.js.map