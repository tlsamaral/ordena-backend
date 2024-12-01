import prismaClient from '../../prisma'

class AcceptUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        permission: true,
      },
    })
    return user
  }
}

export { AcceptUserService }
