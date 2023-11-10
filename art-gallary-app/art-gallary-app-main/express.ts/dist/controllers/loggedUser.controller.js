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
exports.deleteLoggedUser = exports.updateLogedUserPassword = exports.updateLoggedUser = exports.getLoggedUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_model_1 = require("../models/user.model");
const apiError_1 = require("../utils/apiError");
const user_dto_1 = require("../utils/dto/user.dto");
exports.getLoggedUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.params.id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    next();
}));
exports.updateLoggedUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield user_model_1.userModel.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        userImg: req.body.userImg
    }, {
        new: true
    });
    if (!user) {
        next(new apiError_1.ApiError("no user in this id", 404));
        return;
    }
    res.status(200).json({ status: "success", data: (0, user_dto_1.normalizeUser)(user) });
}));
exports.updateLogedUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findById(req.user.id).select("+password");
    ;
    if (!user || !(yield user.validatePassword(req.body.oldpassword))) {
        next(new apiError_1.ApiError("invalid creditional", 401));
        return;
    }
    user.password = req.body.newPassword;
    yield user.save();
    res.status(200).json({ status: "success", data: (0, user_dto_1.normalizeUser)(user) });
}));
exports.deleteLoggedUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    req.params.id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    next();
}));
//# sourceMappingURL=loggedUser.controller.js.map