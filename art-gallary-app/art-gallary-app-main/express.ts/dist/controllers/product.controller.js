"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateView =
  exports.deleteProduct =
  exports.updateProduct =
  exports.getProduct =
  exports.getProducts =
  exports.createProduct =
  exports.productImageProcceing =
  exports.uploadImg =
    void 0;
const sharp_1 = __importDefault(require("sharp"));
const uid_1 = require("uid");
const express_async_handler_1 = __importDefault(
  require("express-async-handler")
);
const product_model_1 = require("../models/product.model");
const handlers_controller_1 = require("./handlers.controller");
const uploadImg_middleware_1 = require("../middleWares/uploadImg.middleware");
const apiError_1 = require("../utils/apiError");
exports.uploadImg = (0, uploadImg_middleware_1.uploadImage)("image");
exports.productImageProcceing = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (req.file) {
        const fileName = `product-${(0, uid_1.uid)()}-${Date.now()}.jpeg`;
        yield (0, sharp_1.default)(req.file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`src/uploads/product/${fileName}`);
        req.body.image = fileName;
      }
      next();
    })
);
exports.createProduct = (0, handlers_controller_1.createOne)(
  product_model_1.productModel
);
exports.getProducts = (0, handlers_controller_1.getAll)(
  product_model_1.productModel
);
exports.getProduct = (0, handlers_controller_1.getOne)(
  product_model_1.productModel,
  "reviews"
);
exports.updateProduct = (0, handlers_controller_1.updateOne)(
  product_model_1.productModel
);
exports.deleteProduct = (0, handlers_controller_1.deleteOne)(
  product_model_1.productModel
);
exports.updateView = (0, express_async_handler_1.default)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.productModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { view: 1 } },
      { new: true }
    );
    if (!product) {
      next(new apiError_1.ApiError("no product in this id", 404));
      return;
    }
    res.status(200).json({ status: "success" });
  })
);
//# sourceMappingURL=product.controller.js.map
