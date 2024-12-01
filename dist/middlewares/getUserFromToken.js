"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = getUserIdFromToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUserIdFromToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT); // Substitua pelo seu segredo JWT
        req.user_id = decoded.sub.toString();
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}
