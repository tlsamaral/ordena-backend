"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const http_1 = __importDefault(require("http"));
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Ajuste conforme necessário
    },
});
io.userSockets = new Map();
io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    if (userId) {
        console.log(`Conectado: userId ${userId} com socketId ${socket.id}`);
        io.userSockets.set(userId, socket.id);
    }
    console.log(io.userSockets);
    socket.on('disconnect', () => {
        console.log(`Desconectado: userId ${userId}`);
        io.userSockets.delete(userId);
    });
});
app.set('socketio', io);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
server.listen(3333, () => {
    console.log('🔥 Server is running!!!');
});
