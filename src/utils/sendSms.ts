const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER
import { Twilio } from 'twilio'

const client = new Twilio(accountSid, authToken)

class SendSms {
  private client: Twilio
  constructor() {
    this.client = client
  }
  async execute(phone: string, message: string) {
    try {
      await client.messages.create({
        body: message,
        from: phoneNumber,
        to: `+55${phone}`,
      })
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}

export { SendSms }
