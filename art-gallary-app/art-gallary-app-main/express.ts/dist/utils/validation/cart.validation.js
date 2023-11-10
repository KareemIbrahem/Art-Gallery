"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserQuantityValidation = exports.deleteSpecificItemValidation = exports.createCartValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.createCartValidation = [
    (0, express_validator_1.check)("productId").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.deleteSpecificItemValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.updateUserQuantityValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    (0, express_validator_1.check)("quantity").isNumeric()
        .withMessage("quantity must be a nubmer"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=cart.validation.js.map