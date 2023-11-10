"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromWhishListValidation = exports.addProductToWhishListValidation = void 0;
const express_validator_1 = require("express-validator");
const product_model_1 = require("../../models/product.model");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.addProductToWhishListValidation = [
    (0, express_validator_1.check)("productId").isMongoId()
        .withMessage("invalid id format")
        .custom((val, { req }) => {
        return product_model_1.productModel.findById(val).then(product => {
            if (!product) {
                throw new Error("no product in this id");
            }
            else {
                return true;
            }
        });
    }),
    validation_middleware_1.validationMiddleware
];
exports.deleteProductFromWhishListValidation = [
    (0, express_validator_1.check)("productId").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=whishList.validation.js.map