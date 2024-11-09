import type { Server } from 'socket.io'
import type { OrderFullRequest } from '../../controllers/order/SendOrderFullController'
import prismaClient from '../../prisma'

class SendOrderFullService {
  private io: Server

  constructor(io: Server) {
    this.io = io
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

    return order
  }
}

export { SendOrderFullService }
