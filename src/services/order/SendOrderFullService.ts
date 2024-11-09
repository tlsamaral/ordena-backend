import type { OrderFullRequest } from '../../controllers/order/SendOrderFullController'
import prismaClient from '../../prisma'

class SendOrderFullService {
  async execute({ order_id, products }: OrderFullRequest) {
    const orderItems = products.map(async (product) => {
      await prismaClient.item.create({
        data: {
          order_id,
          product_id: product.id,
          amout: product.amount,
        },
      })
    })
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
    })
    return order
  }
}

export { SendOrderFullService }
