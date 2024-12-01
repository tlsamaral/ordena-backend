"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromRequest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserIdFromRequest = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return null;
    const token = authHeader.split(' ')[1]; // Supondo que o token esteja no formato "Bearer <token>"
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT); // Substitua pelo seu segredo JWT
        return decoded.sub.toString();
    }
    catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
};
exports.getUserIdFromRequest = getUserIdFromRequest;
