import prismaClient from '../../prisma'

class RejectUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        permission: false,
      },
    })
    return user
  }
}

export { RejectUserService }
