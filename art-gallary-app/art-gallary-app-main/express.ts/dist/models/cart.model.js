"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    cartItems: [{
            product: {
                type: mongoose_1.default.Schema.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number
            }
        }],
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "users"
    },
    totalPrice: {
        type: Number
    }
}, { timestamps: true });
exports.cartModel = mongoose_1.default.model("cart", cartSchema);
//# sourceMappingURL=cart.model.js.map