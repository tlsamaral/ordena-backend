import prismaClient from '../../prisma'

class GetAllProductsService {
  async execute() {
    const products = await prismaClient.product.findMany({
      where: {
        deleted: {
          equals: false,
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    const baseURL = process.env.BASE_URL

    const productsWithBannerUrl = products.map((product) => {
      return {
        ...product,
        banner: `${baseURL}/files/${product.banner}`,
        category: product.category.name,
      }
    })

    return productsWithBannerUrl
  }
}

export { GetAllProductsService }
