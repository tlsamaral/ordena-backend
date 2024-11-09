import prismaClient from '../../prisma'

interface CreateTableProps {
  name: string
}
class CreateTableService {
  async execute({ name }: CreateTableProps) {
    if (!name) {
      return 'Name is required'
    }

    const table = await prismaClient.table.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    })

    return table
  }
}

export { CreateTableService }
