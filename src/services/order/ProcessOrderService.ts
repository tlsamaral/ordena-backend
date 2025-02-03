import type { Server } from 'socket.io'
import prismaClient from '../../prisma'
import { SendSms } from '../../utils/sendSms'

interface OrderRequest {
  order_id: string
}

class ProcessOrderService {
  private io: Server
  private sendSmsWithTwilio = new SendSms()

  constructor(io: Server) {
    this.io = io
    this.sendSmsWithTwilio = new SendSms()
  }

  async execute({ order_id }: OrderRequest) {
    // Atualiza o status do pedido
    const order = await prismaClient.order.update({
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
    })

    // Transformação dos dados para incluir a URL do banner
    const orderWithBannerUrl = {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          banner: `${item.product.banner}`,
        },
      })),
    }

    this.io.emit('order:process', orderWithBannerUrl)

    if (order.phone) {
      try {
        const smsResponse = await this.sendSmsWithTwilio.execute(
          order.phone,
          `
          Olá ${order.name}, seu pedido está sendo preparado!
          Obrigado pela preferência
        `,
        )
        console.log(smsResponse)
      } catch (error) {
        console.log(error)
      }
    }

    return orderWithBannerUrl
  }
}

export { ProcessOrderService }
