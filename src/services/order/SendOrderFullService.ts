import type { Server } from 'socket.io'
import type { OrderFullRequest } from '../../controllers/order/SendOrderFullController'
import prismaClient from '../../prisma'
import { SendSms } from '../../utils/sendSms'

class SendOrderFullService {
  private io: Server
  private sendSmsWithTwilio = new SendSms()

  constructor(io: Server) {
    this.io = io
    this.sendSmsWithTwilio = new SendSms()
  }

  async execute({ order_id, products }: OrderFullRequest) {
    await Promise.all(
      products.map(async (product) => {
        await prismaClient.item.create({
          data: {
            order_id,
            product_id: product.id,
            amount: product.amount,
          },
        })
      }),
    )

    const order = await prismaClient.order.update({
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
    })

    this.io.emit('orderCompleted', order)

    if (order.phone) {
      try {
        const smsResponse = await this.sendSmsWithTwilio.execute(
          order.phone,
          `
          Olá ${order.name}, seu pedido foi para a cozinha, por favor aguarde!

          Resumo do pedido:
          ${order.items.map((item) => `${item.product.name} x ${item.amount}`)}

          ${order.table.name} 
          Obrigado pela preferência
        `,
        )
      } catch (error) {
        console.log(error)
      }
    }

    return order
  }
}

export { SendOrderFullService }
