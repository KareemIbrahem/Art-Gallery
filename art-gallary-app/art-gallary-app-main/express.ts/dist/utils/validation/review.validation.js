"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewValidation = exports.deleteReviewValidation = exports.updateReviewValidation = exports.createReviewValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = require("../../middleWares/validation.middleware");
const review_model_1 = require("../../models/review.model");
exports.createReviewValidation = [
    (0, express_validator_1.check)("title").optional().notEmpty()
        .withMessage("review comment required"),
    (0, express_validator_1.check)("rating").optional()
        .notEmpty().withMessage("rating required")
        .isFloat({ min: 1, max: 5 }).withMessage("rating value must be between 1.0 and 5.0"),
    (0, express_validator_1.check)("product").isMongoId()
        .withMessage("invalid id format")
        .custom((val, { req }) => review_model_1.reviewModel.findOne({ user: req.user._id, product: req.body.product }).then(doc => {
        if (doc) {
            return Promise.reject(new Error("you already have areview for this product"));
        }
        return true;
    })).custom((val, { req }) => req.body.user = req.user._id),
    validation_middleware_1.validationMiddleware
];
exports.updateReviewValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id foemat")
        .custom((val, { req }) => review_model_1.reviewModel.findOne({ _id: val }).then(doc => {
        if (!doc) {
            return Promise.reject(new Error("no review in this id"));
        }
        if (doc.user.toString() != req.user._id.toString()) {
            return Promise.reject(new Error("you not owner for this review"));
        }
    })),
    (0, express_validator_1.check)("title").optional().notEmpty()
        .withMessage("review comment required"),
    (0, express_validator_1.check)("rating").optional()
        .notEmpty().withMessage("rating required")
        .isFloat({ min: 1, max: 5 }).withMessage("rating value must be between 1.0 and 5.0"),
    validation_middleware_1.validationMiddleware
];
exports.deleteReviewValidation = [
    (0, express_validator_1.check)("id").isMongoId()
        .withMessage("invalid id format")
        .custom((val, { req }) => {
        if (req.user.role === "user") {
            return review_model_1.reviewModel.findOne({ _id: val }).then(doc => {
                if (!doc) {
                    return Promise.reject(new Error("no review in this id"));
                }
                if (doc.user.toString() != req.user._id.toString()) {
                    return Promise.reject(new Error("you not owner for this review"));
                }
            });
        }
        return true;
    }),
    validation_middleware_1.validationMiddleware
];
exports.getReviewValidation = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("invalid id format"),
    validation_middleware_1.validationMiddleware
];
//# sourceMappingURL=review.validation.js.map