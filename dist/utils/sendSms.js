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
exports.SendSms = void 0;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilio_1 = require("twilio");
const client = new twilio_1.Twilio(accountSid, authToken);
class SendSms {
    constructor() {
        this.client = client;
    }
    execute(phone, message) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   await client.messages.create({
            //     body: message,
            //     from: phoneNumber,
            //     to: `+55${phone}`,
            //   })
            // } catch (error) {
            //   console.log(error)
            //   throw new Error(error.message)
            // }
        });
    }
}
exports.SendSms = SendSms;
