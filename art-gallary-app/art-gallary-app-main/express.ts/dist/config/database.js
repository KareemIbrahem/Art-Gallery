"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    mongoose_1.default.connect(process.env.DB_URI).then((con) => {
        console.log(`database connected : ${con.connection.host}`);
    });
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=database.js.map