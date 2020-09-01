"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./socket");
const app = express_1.default();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
socket_1.initSocketIoServer(server);
