import type { Server } from 'socket.io'
import prismaClient from '../../prisma'
import type { CustomSocketServer } from '../types/socket'

interface OrderRequest {
  order_id: string
}

class FinishOrderService {
  private io: CustomSocketServer
  private userSockets: Map<string, string> // Mapeamento de userId -> socketId

  constructor(io: CustomSocketServer) {
    this.io = io
  }

  async execute({ order_id }: OrderRequest) {
    // Atualiza o status do pedido no banco de dados
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: true,
      },
      select: {
        created_at: true,
        status: true,
        table: true,
        user_id: true,
        name: true,
      },
    })

    // Obtém o socketId associado ao user_id do pedido
    const socketId = this.io.userSockets.get(order.user_id)
    if (socketId) {
      console.log(
        `Emitindo evento para user_id: ${order.user_id} com socketId: ${socketId}`,
      )
      // Emite o evento apenas para o socket específico do usuário
      this.io.to(socketId).emit('order:finish', order)
    } else {
      console.log(`Usuário ${order.user_id} não está conectado no momento.`)
    }

    return order
  }
}

export { FinishOrderService }
