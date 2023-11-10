"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const review_validation_1 = require("../utils/validation/review.validation");
const auth_controller_1 = require("../controllers/auth.controller");
exports.router = express_1.default.Router({ mergeParams: true });
exports.router
    .route("/")
    .post(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user"), review_controller_1.createReviewMiddleWare, review_validation_1.createReviewValidation, review_controller_1.createReview)
    .get(review_controller_1.getAllReviewMiddleWare, review_controller_1.getReviews);
exports.router
    .route("/:id")
    .patch(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user"), review_validation_1.updateReviewValidation, review_controller_1.updateReview)
    .get(review_validation_1.getReviewValidation, review_controller_1.getReview)
    .delete(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user", "admin", "superAdmin"), review_validation_1.deleteReviewValidation, review_controller_1.deleteReview);
//# sourceMappingURL=review.routes.js.map