"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReview = exports.getReviews = exports.createReview = exports.getAllReviewMiddleWare = exports.createReviewMiddleWare = void 0;
const review_model_1 = require("../models/review.model");
const handlers_controller_1 = require("./handlers.controller");
const createReviewMiddleWare = (req, res, next) => {
    if (req.params.productId) {
        req.body.product = req.params.productId;
    }
    next();
};
exports.createReviewMiddleWare = createReviewMiddleWare;
const getAllReviewMiddleWare = (req, res, next) => {
    let filterObj = {};
    if (req.params.productId) {
        filterObj = { product: req.params.productId };
    }
    req.filterObj = filterObj;
    next();
};
exports.getAllReviewMiddleWare = getAllReviewMiddleWare;
exports.createReview = (0, handlers_controller_1.createOne)(review_model_1.reviewModel);
exports.getReviews = (0, handlers_controller_1.getAll)(review_model_1.reviewModel);
exports.getReview = (0, handlers_controller_1.getOne)(review_model_1.reviewModel);
exports.updateReview = (0, handlers_controller_1.updateOne)(review_model_1.reviewModel);
exports.deleteReview = (0, handlers_controller_1.deleteOne)(review_model_1.reviewModel);
//# sourceMappingURL=review.controller.js.map