import prismaClient from '../../prisma'

interface ProductRequest {
  id: string
}

class DeleteProductService {
  async execute({ id }: ProductRequest) {
    const product = await prismaClient.product.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })

    return product
  }
}

export { DeleteProductService }
