"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket");
const logger_1 = require("./logger");
const app = express_1.default();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 8080;
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.send('Socket IO server is online');
});
server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
app.use((err, req, res, next) => {
    logger_1.logger.error(req.url);
    logger_1.logger.error(err.message, err);
    res.status(400).json({
        error: err.message,
    });
    next();
});
socket_1.initSocketIoServer(server);
