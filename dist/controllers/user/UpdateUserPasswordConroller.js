"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateUserPasswordService_1 = require("../../services/user/UpdateUserPasswordService");
class UpdateUserPasswordController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, password } = req.body;
            const updateUserPasswordService = new UpdateUserPasswordService_1.UpdateUserPasswordService();
            const user = yield updateUserPasswordService.execute({ user_id, password });
            return res.json(user);
        });
    }
}
exports.default = new UpdateUserPasswordController();
