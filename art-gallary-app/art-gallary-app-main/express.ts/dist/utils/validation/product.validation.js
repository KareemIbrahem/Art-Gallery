"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateViewValidation = exports.getProductValidation = exports.deleteProductValidation = exports.updateProductValidation = exports.createProductValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
const category_model_1 = require("../../models/category.model");
exports.createProductValidation = [
    (0, express_validator_1.check)("name").notEmpty()
        .withMessage("product name required")
        .isLength({ min: 4 }).withMessage("very short name")
        .isLength({ max: 30 }).withMessage("very long name"),
    (0, express_validator_1.check)("description").notEmpty()
        .withMessage("description is required")
        .isLength({ min: 50 }).withMessage("very short dexcription")
        .isLength({ max: 300 }).withMessage("very long dexcription"),
    (0, express_validator_1.check)("price").notEmpty()
        .withMessage("price is required")
        .isNumeric().withMessage("price must be a number"),
    (0, express_validator_1.check)("stock").notEmpty()
        .withMessage("stock is required")
        .isNumeric().withMessage("stock must be a number"),
    (0, express_validator_1.check)("image").notEmpty()
        .withMessage("image required"),
    (0, express_validator_1.check)("category").isMongoId()
        .withMessage("invalid id format")
        .custom((val) => {
        return category_model_1.categoryModel.findById(val).then(cat => {
            if (!cat) {
                throw new Error("no category for this id");
            }
            else {
                return true;
            }
        });
    }),
    validation_middleware_1.validationMiddleware
];
exports.updateProductValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.check)("name").optional().notEmpty()
        .withMessage("product name required")
        .isLength({ min: 4 }).withMessage("very short name")
        .isLength({ max: 30 }).withMessage("very long name"),
    (0, express_validator_1.check)("description").optional().notEmpty()
        .withMessage("description is required")
        .isLength({ min: 50 }).withMessage("very short dexcription")
        .isLength({ max: 300 }).withMessage("very long dexcription"),
    (0, express_validator_1.check)("price").optional().notEmpty()
        .withMessage("price is required")
        .isNumeric().withMessage("price must be a number"),
    (0, express_validator_1.check)("stock").optional().notEmpty()
        .withMessage("stock is required")
        .isNumeric().withMessage("stock must be a number"),
    (0, express_validator_1.check)("image").optional().notEmpty()
        .withMessage("image required"),
    (0, express_validator_1.check)("category").optional().isMongoId()
        .withMessage("invalid id format")
        .custom((val) => {
        return category_model_1.categoryModel.findById(val).then(cat => {
            if (!cat) {
                throw new Error("no category for this id");
            }
            else {
                return true;
            }
        });
    }),
    validation_middleware_1.validationMiddleware
];
exports.deleteProductValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.getProductValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.updateViewValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=product.validation.js.map