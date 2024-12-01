import prismaClient from '../../prisma'

class GetUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        admin: true,
        permission: true,
      },
    })
    return users
  }
}

export { GetUsersService }
