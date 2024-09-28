import prismaClient from '../../prisma'

interface ProductRequest {
  name: string
  price: string
  description: string
  banner: string
  category_id: string
}
class CreateProductService {
  async execute({
    name,
    description,
    price,
    banner,
    category_id,
  }: ProductRequest) {
    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        banner,
        category_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        banner: true,
        category_id: true,
      },
    })

    return product
  }
}

export { CreateProductService }
