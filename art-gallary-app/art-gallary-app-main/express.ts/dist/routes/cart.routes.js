"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const cart_validation_1 = require("../utils/validation/cart.validation");
const auth_controller_1 = require("../controllers/auth.controller");
exports.router = express_1.default.Router();
exports.router.use(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user"));
exports.router
    .route("/").post(cart_validation_1.createCartValidation, cart_controller_1.addProductToCart)
    .get(cart_controller_1.getLoggedUserCart)
    .delete(cart_controller_1.deleteUserCart);
exports.router
    .route("/:id")
    .delete(cart_validation_1.deleteSpecificItemValidation, cart_controller_1.deleteSpecificCart)
    .patch(cart_validation_1.updateUserQuantityValidation, cart_controller_1.updateUserCartQuantity);
//# sourceMappingURL=cart.routes.js.map