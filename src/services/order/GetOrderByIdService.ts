import prismaClient from '../../prisma'

interface DetailRequest {
  order_id: string
}

class GetOrderByIdService {
  async execute({ order_id }: DetailRequest) {
    const order = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
      include: {
        table: true,
      },
    })

    return order
  }
}

export { GetOrderByIdService }
