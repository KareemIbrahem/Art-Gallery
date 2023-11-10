"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidation = exports.deleteCategoryValidation = exports.getCategoryValidation = exports.createCategoryValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.createCategoryValidation = [
    (0, express_validator_1.check)("name").notEmpty()
        .withMessage("category name required")
        .isLength({ min: 4 }).withMessage("to short category name")
        .isLength({ max: 18 }).withMessage("to long category name"),
    validation_middleware_1.validationMiddleware
];
exports.getCategoryValidation = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.deleteCategoryValidation = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
exports.updateCategoryValidation = [
    (0, express_validator_1.check)("name").optional().notEmpty()
        .withMessage("category name required")
        .isLength({ min: 4 }).withMessage("to short category name")
        .isLength({ max: 18 }).withMessage("to long category name"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=category.validation.js.map