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
exports.deleteFromUserWhishList = exports.addToWhishList = void 0;
const user_model_1 = require("../models/user.model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("../utils/apiError");
const user_dto_1 = require("../utils/dto/user.dto");
exports.addToWhishList = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userWhishList = yield user_model_1.userModel.findByIdAndUpdate(req.user.id, { $push: { wishList: { product: req.body.productId } } }, { new: true }).populate({
        path: 'wishList.product'
    });
    if (!userWhishList) {
        next(new apiError_1.ApiError("No User in this id", 404));
        return;
    }
    res.status(201).json({ status: "success", data: (0, user_dto_1.normalizeUser)(userWhishList) });
}));
exports.deleteFromUserWhishList = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userWhishList = yield user_model_1.userModel.findByIdAndUpdate(req.user._id, { $pull: { wishList: { product: req.params.productId } } }, { new: true }).populate({
        path: 'wishList.product'
    });
    if (!userWhishList) {
        next(new apiError_1.ApiError("no user in this id", 404));
        return;
    }
    res.status(200).json({ status: "success", data: (0, user_dto_1.normalizeUser)(userWhishList) });
}));
//# sourceMappingURL=whishList.controller.js.map