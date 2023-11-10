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
exports.getAll = exports.createOne = exports.updateOne = exports.getOne = exports.deleteOne = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("../utils/apiError");
const apiFeature_1 = require("../utils/apiFeature");
const user_model_1 = require("../models/user.model");
const user_dto_1 = require("../utils/dto/user.dto");
const deleteOne = (modelName) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield modelName.findByIdAndDelete(req.params.id);
    if (!document) {
        next(new apiError_1.ApiError(`no category for this id : ${req.params.id}`, 404));
        return;
    }
    res.status(204).send();
}));
exports.deleteOne = deleteOne;
const getOne = (modelName, populationOpt) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // build query
    let query = modelName.findById(req.params.id);
    if (populationOpt) {
        query.populate(populationOpt);
    }
    const document = yield query;
    if (!document) {
        next(new apiError_1.ApiError(`no document for this id : ${req.params.id}`, 404));
        return;
    }
    if (modelName === user_model_1.userModel) {
        res.status(200).json({ status: "success", data: (0, user_dto_1.normalizeUser)(document) });
        return;
    }
    res.status(200).json({ status: "success", data: document });
}));
exports.getOne = getOne;
const updateOne = (modelName) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield modelName.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) {
        next(new apiError_1.ApiError(`no category for this id : ${req.params.id}`, 404));
        return;
    }
    res.status(200).json({ status: "success", data: document });
}));
exports.updateOne = updateOne;
const createOne = (modelName) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield modelName.create(req.body);
    res.status(201).json({ status: "success", data: document });
}));
exports.createOne = createOne;
const getAll = (modelName) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let filterObj = {};
    if (req.filterObj) {
        filterObj = req.filterObj;
    }
    const documentCount = yield modelName.countDocuments();
    const apiFeature = new apiFeature_1.Api_Feature(modelName.find(filterObj), req.query)
        .filter().sort().limitFields().search().pagination(documentCount);
    const { mongooseQuery, paginateResult } = apiFeature;
    const document = yield mongooseQuery;
    res.status(200).json({ result: document.length, paginateResult, data: document });
}));
exports.getAll = getAll;
//# sourceMappingURL=handlers.controller.js.map