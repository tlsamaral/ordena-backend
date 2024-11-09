import prismaClient from '../../prisma'

class GetTableService {
  async execute() {
    const tables = await prismaClient.table.findMany()
    return tables
  }
}

export { GetTableService }
