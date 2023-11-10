"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountRoutes = void 0;
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
const category_routes_1 = require("./category.routes");
const product_routes_1 = require("./product.routes");
const review_routes_1 = require("./review.routes");
const cart_routes_1 = require("./cart.routes");
const order_routes_1 = require("./order.routes");
const whishList_routes_1 = require("./whishList.routes");
const mountRoutes = (app) => {
    app.use("/api/v1/users", user_routes_1.router);
    app.use("/api/v1/auth", auth_routes_1.router);
    app.use("/api/v1/category", category_routes_1.router);
    app.use("/api/v1/product", product_routes_1.router);
    app.use("/api/v1/review", review_routes_1.router);
    app.use("/api/v1/cart", cart_routes_1.router);
    app.use("/api/v1/order", order_routes_1.router);
    app.use("/api/v1/whishList", whishList_routes_1.router);
};
exports.mountRoutes = mountRoutes;
//# sourceMappingURL=mount.routes.js.map