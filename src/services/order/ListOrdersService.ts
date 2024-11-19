import prismaClient from '../../prisma'

class ListOrderService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: {
          not: 'F',
        },
      },
      orderBy: {
        created_at: 'desc',
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

    const productsWithBannerUrl = orders.map((order) => {
      return {
        ...order,
        items: order.items.map((item) => {
          return {
            ...item,
            product: {
              ...item.product,
              banner: `${process.env.BASE_URL}/files/${item.product.banner}`,
            },
          }
        }),
      }
    })

    return productsWithBannerUrl
  }
}

export { ListOrderService }
