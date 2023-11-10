"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const order_validation_1 = require("../utils/validation/order.validation");
exports.router = express_1.default.Router();
exports.router.get("/check-out-session", auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user"), order_controller_1.checkOutSession);
exports.router
    .route("/")
    .post(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user"), order_controller_1.createCashOrder)
    .get(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user", "admin", "superAdmin"), order_controller_1.filterOrderByCurrentUser, order_controller_1.getAllOrder);
exports.router
    .route("/:id")
    .get(auth_controller_1.auth, (0, auth_controller_1.allowedTo)("user", "admin", "superAdmin"), order_validation_1.orderValidation, order_controller_1.getSpecificOrderCheck, order_controller_1.getSpecificOrder);
exports.router.patch("/deliver/:id", auth_controller_1.auth, (0, auth_controller_1.allowedTo)("admin", "superAdmin"), order_validation_1.orderValidation, order_controller_1.updateIsDeliverd);
exports.router.patch("/pay/:id", auth_controller_1.auth, (0, auth_controller_1.allowedTo)("admin", "superAdmin"), order_validation_1.orderValidation, order_controller_1.updateIsPaid);
//# sourceMappingURL=order.routes.js.map