"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema(
  {
    name: {
      type: String,
      required: [true, "product name required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "product description required"],
    },
    price: {
      type: Number,
      required: [true, "product price required"],
    },
    stock: {
      type: Number,
      required: [true, "product stock required"],
    },
    image: {
      type: String,
      required: [true, "product image required"],
    },
    category: {
      type: mongoose_1.default.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must belong to category"],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    fav: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
productSchema.virtual("reviews", {
  ref: "reviews",
  foreignField: "product",
  localField: "_id",
  justOne: false, // Set justOne to false to return an array of reviews
});
const setImageUrl = (doc) => {
  if (doc.image) {
    const imgUrl = `${process.env.BASE_URL}/product/${doc.image}`;
    imgUrl;
  }
};
productSchema.post("save", (doc) => {
  setImageUrl(doc);
});
productSchema.post("init", (doc) => {
  setImageUrl(doc);
});
exports.productModel = mongoose_1.default.model("products", productSchema);
//# sourceMappingURL=product.model.js.map
