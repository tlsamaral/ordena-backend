import { hash } from 'bcryptjs'
import prismaClient from '../../prisma'

interface UpdateUserPasswordRequest {
  user_id: string
  password: string
}
class UpdateUserPasswordService {
  async execute({ user_id, password }: UpdateUserPasswordRequest) {
    const passwordHash = await hash(password, 8)
    const user = await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: passwordHash,
        alter_password: false,
      },
    })
    return user
  }
}

export { UpdateUserPasswordService }
