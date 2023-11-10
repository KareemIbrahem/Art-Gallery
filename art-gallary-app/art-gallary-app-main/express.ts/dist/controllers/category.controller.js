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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const category_model_1 = require("../models/category.model");
const handlers_controller_1 = require("./handlers.controller");
exports.createCategory = (0, handlers_controller_1.createOne)(category_model_1.categoryModel);
exports.getCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const catogry = yield category_model_1.categoryModel.find();
    res.status(200).json({ status: "success", data: catogry });
}));
exports.getCategory = (0, handlers_controller_1.getOne)(category_model_1.categoryModel);
exports.updateCategory = (0, handlers_controller_1.updateOne)(category_model_1.categoryModel);
exports.deleteCategory = (0, handlers_controller_1.deleteOne)(category_model_1.categoryModel);
//# sourceMappingURL=category.controller.js.map