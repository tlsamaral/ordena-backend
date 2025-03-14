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
exports.ProcessOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const sendSms_1 = require("../../utils/sendSms");
class ProcessOrderService {
    constructor(io) {
        this.sendSmsWithTwilio = new sendSms_1.SendSms();
        this.io = io;
        this.sendSmsWithTwilio = new sendSms_1.SendSms();
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id }) {
            // Atualiza o status do pedido
            const order = yield prisma_1.default.order.update({
                where: {
                    id: order_id,
                },
                data: {
                    status: {
                        set: 'P',
                    },
                },
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
            // Transformação dos dados para incluir a URL do banner
            const orderWithBannerUrl = Object.assign(Object.assign({}, order), { items: order.items.map((item) => (Object.assign(Object.assign({}, item), { product: Object.assign(Object.assign({}, item.product), { banner: `${process.env.BASE_URL}/files/${item.product.banner}` }) }))) });
            this.io.emit('order:process', orderWithBannerUrl);
            if (order.phone) {
                try {
                    const smsResponse = yield this.sendSmsWithTwilio.execute(order.phone, `
          Olá ${order.name}, seu pedido está sendo preparado!
          Obrigado pela preferência
        `);
                    console.log(smsResponse);
                }
                catch (error) {
                    console.log(error);
                }
            }
            return orderWithBannerUrl;
        });
    }
}
exports.ProcessOrderService = ProcessOrderService;
