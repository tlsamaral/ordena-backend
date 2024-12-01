import nodemailer from 'nodemailer'

interface EmailProps {
  email: string
  title: string
  message: string
}
class EmailService {
  private transporter: nodemailer.Transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  async sendEmail({ email, title, message }: EmailProps) {
    console.log(process.env)
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: title,
        html: message,
      }

      await this.transporter.sendMail(mailOptions)
      return { ok: true }
    } catch (error) {
      console.error(error)
      return 'Não foi possível enviar o email com as informações do usuário.'
    }
  }
}

export default EmailService
