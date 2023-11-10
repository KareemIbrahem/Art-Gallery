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
exports.allowedTo = exports.auth = exports.login = exports.resendVerifySignUp = exports.verifySignUp = exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const apiError_1 = require("../utils/apiError");
const user_model_1 = require("../models/user.model");
const generateToken_1 = require("../utils/generateToken");
const user_dto_1 = require("../utils/dto/user.dto");
const sendEmail_1 = require("../utils/sendEmail");
exports.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield user_model_1.userModel.findOne({ email: req.body.email });
    if (currentUser) {
        if (!currentUser.signUpVerify) {
            (0, exports.resendVerifySignUp)(req, res, next);
            return;
        }
        else {
            next(new apiError_1.ApiError("you already have an account please try to login.. ", 400));
            return;
        }
    }
    const user = yield user_model_1.userModel.create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password,
    });
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeHash = crypto_1.default
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");
    user.signUpResetCode = resetCodeHash;
    user.signUpResetCodeExpire = Date.now() * 10 * 60 * 1000;
    yield user.save();
    try {
        const message = `Hi ${user.name} \n 
    we received a request to signUp in Art-Gallery please use the verifyCode to verify your self : \n
    ${resetCode} \n enter this code to signUp
    `;
        yield (0, sendEmail_1.sendEmail)({
            email: user.email,
            subject: "your signUp code valid for 5 min",
            message: message,
        });
    }
    catch (error) {
        user.signUpResetCode = undefined;
        user.signUpResetCodeExpire = undefined;
        yield user.save();
        next(new apiError_1.ApiError("we have an error to sending email please try again later", 500));
        return;
    }
    res
        .status(200)
        .json({ status: "success", message: "code sent in your email" });
}));
exports.verifySignUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashCode = crypto_1.default
        .createHash("sha256")
        .update(req.body.resetCode)
        .digest("hex");
    const user = yield user_model_1.userModel.findOne({
        signUpResetCode: hashCode,
        signUpResetCodeExpire: { $gt: Date.now() },
    });
    if (!user) {
        next(new apiError_1.ApiError("invalid reset code or expire", 500));
        return;
    }
    user.signUpVerify = true;
    user.signUpResetCodeExpire = undefined;
    user.signUpResetCode = undefined;
    yield user.save();
    const token = (0, generateToken_1.generateToken)({ userId: user._id });
    res
        .status(201)
        .json({ status: "success", data: (0, user_dto_1.normalizeUser)(user), token: token });
}));
exports.resendVerifySignUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_model_1.userModel.findOne({ email: email });
    if (!user) {
        next(new apiError_1.ApiError("no user in this email", 404));
        return;
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeHash = crypto_1.default
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");
    user.signUpResetCode = resetCodeHash;
    user.signUpResetCodeExpire = Date.now() * 10 * 60 * 1000;
    user.signUpVerify = false;
    yield user.save();
    try {
        const message = `Hi ${user.name} \n 
    we received a request to signUp in Art-Gallery please use the verifyCode to verify your self : \n
    ${resetCode} \n enter this code to signUp
    `;
        yield (0, sendEmail_1.sendEmail)({
            email: user.email,
            subject: "your signUp code valid for 5 min",
            message: message,
        });
    }
    catch (error) {
        user.signUpResetCode = undefined;
        user.signUpResetCodeExpire = undefined;
        yield user.save();
        next(new apiError_1.ApiError("we have an error to sending email please try again later", 500));
        return;
    }
    res.status(200).json({
        status: "success",
        message: "code sent in your email please check it now !",
    });
}));
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel
        .findOne({ email: req.body.email })
        .select("+password")
        .populate("wishList.product");
    if (!user || !(yield user.validatePassword(req.body.password))) {
        next(new apiError_1.ApiError("invalid conditional", 401));
        return;
    }
    if (!user.signUpVerify) {
        next(new apiError_1.ApiError("please verify your self first", 401));
        return;
    }
    const token = (0, generateToken_1.generateToken)({ userId: user._id });
    res
        .status(200)
        .json({ status: "success", data: (0, user_dto_1.normalizeUser)(user), token: token });
}));
exports.auth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        next(new apiError_1.ApiError("un authenticated", 401));
        return;
    }
    const decode = (yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
    const logedUser = yield user_model_1.userModel.findById(decode.userId);
    if (!logedUser) {
        next(new apiError_1.ApiError("this user doesn't exist", 404));
        return;
    }
    if (logedUser.changePasswordTime) {
        const changeTime = logedUser.changePasswordTime.getTime() / 1000;
        if (changeTime > decode.iat) {
            next(new apiError_1.ApiError("user change password please login again", 401));
            return;
        }
    }
    if (!logedUser.signUpVerify) {
        next(new apiError_1.ApiError("please verify your self first", 401));
        return;
    }
    req.user = logedUser;
    next();
}));
const allowedTo = (...roles) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
        next(new apiError_1.ApiError("you not allowed access this route", 403));
        return;
    }
    next();
}));
exports.allowedTo = allowedTo;
//# sourceMappingURL=auth.controller.js.map