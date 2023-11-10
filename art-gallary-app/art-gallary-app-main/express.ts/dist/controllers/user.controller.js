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
exports.createUser = exports.updateUserPassword = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.userImgProccessing = exports.uploadImg = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sharp_1 = __importDefault(require("sharp"));
const uid_1 = require("uid");
const user_model_1 = require("../models/user.model");
const apiError_1 = require("../utils/apiError");
const user_dto_1 = require("../utils/dto/user.dto");
const uploadImg_middleware_1 = require("../middleWares/uploadImg.middleware");
const handlers_controller_1 = require("./handlers.controller");
exports.uploadImg = (0, uploadImg_middleware_1.uploadImage)("userImg");
exports.userImgProccessing = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const fileName = `user-${(0, uid_1.uid)()}-${Date.now()}.jpeg`;
        yield (0, sharp_1.default)(req.file.buffer)
            .resize(200, 200)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`src/uploads/users/${fileName}`);
        req.body.userImg = fileName;
    }
    next();
}));
exports.getUsers = (0, handlers_controller_1.getAll)(user_model_1.userModel);
exports.getUser = (0, handlers_controller_1.getOne)(user_model_1.userModel, 'wishList.product');
exports.deleteUser = (0, handlers_controller_1.deleteOne)(user_model_1.userModel);
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((req.body.role === "admin" || req.body.role === "superAdmin") && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin") {
        next(new apiError_1.ApiError("only superAdmin can create admin user", 401));
        return;
    }
    const user = yield user_model_1.userModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
        userImg: req.body.userImg
    }, { new: true });
    if (!user) {
        next(new apiError_1.ApiError(`no user in this id :${req.params.id}`, 404));
        return;
    }
    res.status(200).json({ status: "success", data: (0, user_dto_1.normalizeUser)(user) });
}));
exports.updateUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findByIdAndUpdate(req.params.id, {
        password: yield bcryptjs_1.default.hash(req.body.password, 12),
        changePasswordTime: Date.now(),
    }, { new: true });
    if (!user) {
        next(new apiError_1.ApiError(`no user in this id :${req.params.id}`, 404));
        return;
    }
    res.status(200).json({ status: "success", data: (0, user_dto_1.normalizeUser)(user) });
}));
exports.createUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if ((req.body.role === "admin" || req.body.role === "superAdmin") && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin") {
        next(new apiError_1.ApiError("only superAdmin can create admin user", 401));
        return;
    }
    const user = yield user_model_1.userModel.create(req.body);
    res.status(201).json({ status: "success", data: (0, user_dto_1.normalizeUser)(user) });
}));
//# sourceMappingURL=user.controller.js.map