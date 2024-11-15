import prismaClient from '../../prisma'

interface OrderRequest {
  table_id: string
  name: string
  user_id: string
}

class CreateOrderService {
  async execute({ table_id, name, user_id }: OrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        table_id,
        name,
        user_id,
      },
      select: {
        id: true,
        table: true,
        name: true,
      },
    })

    return order
  }
}

export { CreateOrderService }
