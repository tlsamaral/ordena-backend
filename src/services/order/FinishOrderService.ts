import type { Server } from 'socket.io'
import prismaClient from '../../prisma'
import { SendSms } from '../../utils/sendSms'
import type { CustomSocketServer } from '../types/socket'

interface OrderRequest {
  order_id: string
}

class FinishOrderService {
  private io: CustomSocketServer

  private sendSmsWithTwilio = new SendSms()

  constructor(io: CustomSocketServer) {
    this.io = io
    this.sendSmsWithTwilio = new SendSms()
  }

  async execute({ order_id }: OrderRequest) {
    // Atualiza o status do pedido no banco de dados
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: {
          set: 'F',
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
    })

    const socketId = this.io.userSockets.get(order.user_id)
    if (socketId) {
      console.log(
        `Emitindo evento para user_id: ${order.user_id} com socketId: ${socketId}`,
      )
      this.io.to(socketId).emit('order:finish', order)
    } else {
      console.log(`Usuário ${order.user_id} não está conectado no momento.`)
    }

    if (order.phone) {
      try {
        const smsResponse = await this.sendSmsWithTwilio.execute(
          order.phone,
          `
          Olá ${order.name}, seu pedido está pronto!
          Aguarde, que logo logo um garçom o levará para você.

          Resumo do pedido:
          ${order.items.map((item) => `${item.product.name} x ${item.amount}`)}

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

export { FinishOrderService }
