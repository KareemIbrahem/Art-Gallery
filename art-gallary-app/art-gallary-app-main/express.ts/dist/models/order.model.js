"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = exports.orderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "users"
    },
    cartItems: [
        {
            product: {
                type: mongoose_1.default.Schema.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ],
    shippingAdress: {
        type: String
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    totalOrederPrice: {
        type: Number
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "card"],
        default: "cash"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    isDeliverd: {
        type: Boolean,
        default: false
    },
    deliverdAt: Date
}, { timestamps: true });
exports.orderModel = mongoose_1.default.model("orders", exports.orderSchema);
//# sourceMappingURL=order.model.js.map