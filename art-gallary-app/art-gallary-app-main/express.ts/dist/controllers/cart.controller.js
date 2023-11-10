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
exports.updateUserCartQuantity = exports.deleteUserCart = exports.deleteSpecificCart = exports.getLoggedUserCart = exports.addProductToCart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const product_model_1 = require("./../models/product.model");
const cart_model_1 = require("./../models/cart.model");
const apiError_1 = require("../utils/apiError");
const calcTotalPrice = (cart) => {
    // calculate total cart price 
    let totalPrice = 0;
    cart.cartItems.forEach(ele => totalPrice += ele.quantity * ele.price);
    return totalPrice;
};
exports.addProductToCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const currentProduct = yield product_model_1.productModel.findById(productId);
    let cart = yield cart_model_1.cartModel.findOne({ user: req.user._id });
    if (!cart) {
        cart = yield cart_model_1.cartModel.create({
            cartItems: {
                product: productId,
                price: currentProduct.price,
            },
            user: req.user._id
        });
    }
    else {
        const existProduct = cart.cartItems.findIndex(pro => pro.product.toString() == productId);
        if (existProduct > -1) {
            cart.cartItems[existProduct].quantity += 1;
        }
        else {
            cart.cartItems.push({ product: productId, price: currentProduct.price, quantity: 1 });
        }
    }
    cart.totalPrice = calcTotalPrice(cart);
    yield cart.save();
    res.status(200).json({ status: "success", message: "product added to cart", cartLength: cart.cartItems.length, data: cart });
}));
exports.getLoggedUserCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.cartModel.findOne({ user: req.user._id }).populate({
        path: 'cartItems.product',
        select: 'name ratingsAverage price stock image',
    });
    if (!cart) {
        next(new apiError_1.ApiError("no cart for exist user", 404));
        return;
    }
    res.status(200).json({ status: "success", cartLength: cart.cartItems.length, data: cart });
}));
exports.deleteSpecificCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.cartModel.findOneAndUpdate({ user: req.user._id }, {
        $pull: { cartItems: { product: req.params.id } }
    }, { new: true });
    cart.totalPrice = calcTotalPrice(cart);
    yield cart.save();
    res.status(200).json({ status: "success", message: "product removed from cart ", cartLength: cart.cartItems.length, data: cart });
}));
exports.deleteUserCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.cartModel.findOneAndDelete({ user: req.user._id });
    res.status(204).send();
}));
exports.updateUserCartQuantity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body;
    const cart = yield cart_model_1.cartModel.findOne({ user: req.user._id }).populate({
        path: 'cartItems.product',
        select: ' name ratingsAverage price stock image',
    });
    if (!cart) {
        next(new apiError_1.ApiError("no cart for this user", 404));
        return;
    }
    const cartItemIndex = cart.cartItems.findIndex((pro) => pro.product._id.toString() === req.params.id);
    if (cartItemIndex > -1) {
        cart.cartItems[cartItemIndex].quantity = quantity;
    }
    else {
        next(new apiError_1.ApiError("no cart item in this id", 404));
        return;
    }
    cart.totalPrice = calcTotalPrice(cart);
    yield cart.save();
    res.status(200).json({ status: "success", cartLength: cart.cartItems.length, data: cart });
}));
//# sourceMappingURL=cart.controller.js.map