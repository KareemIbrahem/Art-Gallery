"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const product_validation_1 = require("../utils/validation/product.validation");
const auth_controller_1 = require("../controllers/auth.controller");
const review_routes_1 = require("./review.routes");
exports.router = express_1.default.Router();
exports.router.use("/:productId/review", review_routes_1.router);
exports.router.get("/", product_controller_1.getProducts);
exports.router.get("/:id", product_validation_1.getProductValidation, product_controller_1.getProduct);
exports.router.patch("/view/:id", product_validation_1.updateViewValidation, product_controller_1.updateView);
exports.router.use(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("admin", "superAdmin"));
exports.router.post("/", product_controller_1.uploadImg, product_controller_1.productImageProcceing, product_validation_1.createProductValidation, product_controller_1.createProduct);
exports.router
    .route("/:id")
    .patch(product_controller_1.uploadImg, product_controller_1.productImageProcceing, product_validation_1.updateProductValidation, product_controller_1.updateProduct)
    .delete(product_validation_1.deleteProductValidation, product_controller_1.deleteProduct);
//# sourceMappingURL=product.routes.js.map