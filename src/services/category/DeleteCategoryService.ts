import prismaClient from '../../prisma'

interface CategoryRequest {
  category_id: string
}
class DeleteCategoryService {
  async execute({ category_id }: CategoryRequest) {
    const category = prismaClient.category.update({
      where: {
        id: category_id,
      },
      data: {
        deleted: true,
      },
    })
    return category
  }
}

export { DeleteCategoryService }
