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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOrderFullService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const sendSms_1 = require("../../utils/sendSms");
class SendOrderFullService {
    constructor(io) {
        this.sendSmsWithTwilio = new sendSms_1.SendSms();
        this.io = io;
        this.sendSmsWithTwilio = new sendSms_1.SendSms();
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id, products }) {
            yield Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
                yield prisma_1.default.item.create({
                    data: {
                        order_id,
                        product_id: product.id,
                        amount: product.amount,
                    },
                });
            })));
            const order = yield prisma_1.default.order.update({
                where: { id: order_id },
                data: { draft: false },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                    banner: true,
                                },
                            },
                        },
                    },
                    table: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            this.io.emit('orderCompleted', order);
            if (order.phone) {
                try {
                    const smsResponse = yield this.sendSmsWithTwilio.execute(order.phone, `
          Olá ${order.name}, seu pedido foi para a cozinha, por favor aguarde!

          Resumo do pedido:
          ${order.items.map((item) => `${item.product.name} x ${item.amount}`)}

          ${order.table.name} 
          Obrigado pela preferência
        `);
                }
                catch (error) {
                    console.log(error);
                }
            }
            return order;
        });
    }
}
exports.SendOrderFullService = SendOrderFullService;
