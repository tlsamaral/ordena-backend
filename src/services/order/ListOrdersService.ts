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
                price: true,
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

    // Verifica se não há ordens
    if (!orders || orders.length === 0) {
      return [] // Retorna um array vazio ou uma mensagem, dependendo do que você espera
    }

    // Processa as ordens caso existam
    const productsWithBannerUrl = orders.map((order) => {
      return {
        ...order,
        items: order.items.map((item) => {
          return {
            ...item,
            product: {
              ...item.product,
              banner: item.product.banner,
            },
          }
        }),
      }
    })

    return productsWithBannerUrl
  }
}

export { ListOrderService }
