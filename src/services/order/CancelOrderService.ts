import type { Server } from 'socket.io'
import prismaClient from '../../prisma'
import { SendSms } from '../../utils/sendSms'
import type { CustomSocketServer } from '../types/socket'

interface OrderRequest {
  order_id: string
}

class CancelOrderService {
  async execute({ order_id }: OrderRequest) {
    // Atualiza o status do pedido no banco de dados
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: {
          set: 'C',
        },
      },
    })
    return order
  }
}

export { CancelOrderService }
