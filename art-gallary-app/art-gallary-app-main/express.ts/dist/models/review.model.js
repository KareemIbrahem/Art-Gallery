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
exports.reviewModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
const reviewSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    rating: {
        type: Number,
        min: [1, "min rating is 1.0"],
        max: [5, "max rating is 5.0"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "review must belong to user"]
    },
    product: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "products",
        required: [true, "review must belong to product"]
    },
}, { timestamps: true });
reviewSchema.pre(["find", "findOneAndDelete", "findOneAndUpdate"], function (next) {
    this.populate({ path: "user", select: "name userImg" });
    next();
});
reviewSchema.statics.calculateAverageRationgAndCount = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield this.aggregate([
            { $match: { product: productId } },
            {
                $group: {
                    _id: "product",
                    avgRating: { $avg: "$rating" },
                    ratingQuantity: { $sum: 1 }
                }
            }
        ]);
        if (result.length > 0) {
            yield product_model_1.productModel.findByIdAndUpdate(productId, {
                ratingsAverage: result[0].avgRating,
                ratingsQuantity: result[0].ratingQuantity,
            });
        }
        else {
            yield product_model_1.productModel.findByIdAndUpdate(productId, {
                ratingsAverage: 0,
                ratingsQuantity: 0,
            });
        }
    });
};
reviewSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.constructor.calculateAverageRationgAndCount(this.product);
    });
});
reviewSchema.post(/^findOneAnd/, function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc)
            yield doc.constructor.calculateAverageRationgAndCount(doc.product);
    });
});
exports.reviewModel = mongoose_1.default.model("reviews", reviewSchema);
//# sourceMappingURL=review.model.js.map