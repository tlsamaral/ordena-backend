import prismaClient from '../../prisma'
import { SendSms } from '../../utils/sendSms'

interface OrderRequest {
  table_id: string
  name: string
  user_id: string
  phone: string
}

class CreateOrderService {
  async execute({ table_id, name, user_id, phone }: OrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        table_id,
        name,
        user_id,
        status: 'A',
        draft: true,
        phone,
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

    const newOrder = {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          banner: item.product.banner
            ? `${process.env.BASE_URL}/files/${item.product.banner}`
            : null,
        },
      })),
    }

    return newOrder
  }
}

export { CreateOrderService }
