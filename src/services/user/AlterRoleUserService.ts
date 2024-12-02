import prismaClient from '../../prisma'

class AlterRoleUserService {
  async execute(user_id: string) {
    const userFind = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    })
    const user = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        admin: !userFind.admin,
      },
    })
    return user
  }
}

export { AlterRoleUserService }
