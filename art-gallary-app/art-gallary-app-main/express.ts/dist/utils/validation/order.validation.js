"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
exports.orderValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=order.validation.js.map