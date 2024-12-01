"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = __importDefault(require("node:crypto"));
const multer_1 = __importDefault(require("multer"));
const node_path_1 = require("node:path");
exports.default = {
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                destination: (0, node_path_1.resolve)(__dirname, '..', '..', folder),
                filename: (req, file, cb) => {
                    const fileHash = node_crypto_1.default.randomBytes(10).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;
                    return cb(null, fileName);
                },
            }),
        };
    },
};
