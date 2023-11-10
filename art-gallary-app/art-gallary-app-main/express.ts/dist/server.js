"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const express_mongo_sanitize_1 = __importDefault(
  require("express-mongo-sanitize")
);
dotenv_1.default.config();
const database_1 = require("./config/database");
const globalError_middleware_1 = require("./middleWares/globalError.middleware");
const mount_routes_1 = require("./routes/mount.routes");
const order_controller_1 = require("./controllers/order.controller");
// connect db
(0, database_1.dbConnection)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// compress all response
app.use((0, compression_1.default)());
// stripe webhook
app.post(
  "/webHook-checkout",
  express_1.default.raw({ type: "application/json" }),
  order_controller_1.webHookCheckOut
);
//middleware
app.use(express_1.default.json({ limit: "20kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// to serve all image
app.use(
  express_1.default.static(
    path_1.default.join(path_1.default.dirname("src/uploads"), "uploads")
  )
);
// to apply data sanitization
app.use((0, express_mongo_sanitize_1.default)());
// to protect against http parameters pollution attack
app.use(
  (0, hpp_1.default)({
    whitelist: ["price", "sold", "stock", "ratingsQuantity", "ratingsAverage"],
  })
);
const limiter = (0, express_rate_limit_1.default)({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message:
    "Too many requests created from this IP, please try again after an 15 min",
});
// Apply the rate limiting middleware to forgot password requests
app.use("/api/v1/auth/forgetPassword", limiter);
//mount routes
(0, mount_routes_1.mountRoutes)(app);
// handle express global error
app.use(globalError_middleware_1.globalError);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("app run in port 8000");
});
//handle error outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection : ${err.name}|${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
//# sourceMappingURL=server.js.map
