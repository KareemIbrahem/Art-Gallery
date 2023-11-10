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
exports.webHookCheckOut =
  exports.checkOutSession =
  exports.updateIsDeliverd =
  exports.updateIsPaid =
  exports.getSpecificOrder =
  exports.getSpecificOrderCheck =
  exports.getAllOrder =
  exports.filterOrderByCurrentUser =
  exports.createCashOrder =
    void 0;
const express_async_handler_1 = __importDefault(
  require("express-async-handler")
);
const stripe_1 = require("stripe");
const order_model_1 = require("./../models/order.model");
const apiError_1 = require("../utils/apiError");
const cart_model_1 = require("../models/cart.model");
const product_model_1 = require("../models/product.model");
const handlers_controller_1 = require("./handlers.controller");
const user_model_1 = require("../models/user.model");
exports.createCashOrder = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      // app setting
      const shippingPrice = req.body.shippingPrice || 0;
      const cart = yield cart_model_1.cartModel.findOne({ user: req.user._id });
      if (!cart) {
        next(new apiError_1.ApiError("No cart for You", 404));
        return;
      }
      const order = yield order_model_1.orderModel.create({
        cartItems: cart.cartItems,
        user: req.user._id,
        shippingAdress: req.user.address,
        totalOrederPrice: cart.totalPrice + shippingPrice,
        shippingPrice: shippingPrice,
      });
      if (order) {
        const bulkOptions = cart.cartItems.map((item) => ({
          updateOne: {
            filter: { _id: item.product },
            update: { $inc: { stock: -item.quantity, sold: +item.quantity } },
          },
        }));
        yield product_model_1.productModel.bulkWrite(bulkOptions, {});
        yield cart_model_1.cartModel.findOneAndDelete({ user: req.user._id });
      }
      res.status(200).json({ status: "success", data: order });
    })
);
exports.filterOrderByCurrentUser = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      let filterObj = {};
      if (req.user.role === "user") {
        filterObj = { user: req.user._id };
      }
      req.filterObj = filterObj;
      next();
    })
);
exports.getAllOrder = (0, handlers_controller_1.getAll)(
  order_model_1.orderModel
);
exports.getSpecificOrderCheck = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (req.user.role === "user") {
        const order = yield order_model_1.orderModel.find({
          user: req.user._id,
        });
        const specificOrder = order.filter(
          (order) => order._id.toString() == req.params.id
        );
        if (specificOrder.length < 1) {
          next(new apiError_1.ApiError("you not owner for this order", 404));
          return;
        }
      }
      next();
    })
);
exports.getSpecificOrder = (0, handlers_controller_1.getOne)(
  order_model_1.orderModel
);
exports.updateIsPaid = (0, express_async_handler_1.default)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.orderModel.findById(req.params.id);
    if (!order) {
      next(new apiError_1.ApiError("no order in this id", 404));
      return;
    }
    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    const updatedOrder = yield order.save();
    res.status(200).json({ status: "success", data: updatedOrder });
  })
);
exports.updateIsDeliverd = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const order = yield order_model_1.orderModel.findById(req.params.id);
      if (!order) {
        next(new apiError_1.ApiError("no order in this id", 404));
        return;
      }
      order.isDeliverd = true;
      order.deliverdAt = new Date(Date.now());
      const updatedOrder = yield order.save();
      res.status(200).json({ status: "success", data: updatedOrder });
    })
);
// create stripe session
exports.checkOutSession = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      // app setting
      const shippingPrice = req.body.shippingPrice || 0;
      const cart = yield cart_model_1.cartModel.findOne({ user: req.user._id });
      if (!cart) {
        next(new apiError_1.ApiError("no cart in for this user", 404));
        return;
      }
      const totalOrderPrice = cart.totalPrice + shippingPrice;
      const stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET, {
        apiVersion: "2023-08-16",
      });
      const session = yield stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "egp",
              unit_amount: totalOrderPrice * 100,
              product_data: {
                name: req.user.name,
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:8000/api/v1/users/shop`,
        cancel_url: `${req.protocol}://${req.get("host")}/users/cart`,
        customer_email: req.user.email,
        metadata: {
          address: req.user.address,
          cartId: cart._id.toString(),
          shippingPrice: shippingPrice,
        },
      });
      res.status(200).json({ status: "success", session });
    })
);
const createOnlineOrder = (session, req) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const metaData = session.metadata;
    const orderPrice = session.amount_total / 100;
    const userEmail = session.customer_email;
    const cart = yield cart_model_1.cartModel.findById(metaData.cartId);
    const user = yield user_model_1.userModel.findOne({ email: userEmail });
    const order = yield order_model_1.orderModel.create({
      cartItems: cart.cartItems,
      user: user._id,
      shippingAdress: metaData.address,
      totalOrederPrice: orderPrice,
      shippingPrice: metaData.shippingPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentMethod: "card",
    });
    if (order) {
      const bulkOptions = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { stock: -item.quantity, sold: +item.quantity } },
        },
      }));
      yield product_model_1.productModel.bulkWrite(bulkOptions, {});
      yield cart_model_1.cartModel.findOneAndDelete({ user: user._id });
    }
  });
exports.webHookCheckOut = (0, express_async_handler_1.default)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET, {
        apiVersion: "2023-08-16",
      });
      const sig = req.headers["stripe-signature"];
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.WEBHOOK_STRIPE_SECRET
        );
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      if (event.type === "checkout.session.completed") {
        createOnlineOrder(event.data.object, req);
      }
      console.log(true);
      res.status(200).json({ recieved: true });
    })
);
//# sourceMappingURL=order.controller.js.map
