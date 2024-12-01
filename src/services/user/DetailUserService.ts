import prismaClient from '../../prisma'

class DetailUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        alter_password: true,
        admin: true,
      },
    })
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      alter_password: user.alter_password,
      admin: user.admin,
    }
  }
}

export { DetailUserService }
