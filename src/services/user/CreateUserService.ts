import { hash } from 'bcryptjs'
import prismaClient from '../../prisma'
import { createNewUserMessage } from '../../utils/createNewUserMessage'

interface UserRequest {
  name: string
  email: string
  password: string
  alter_password?: boolean
  permission?: boolean
}
class CreateUserService {
  async execute({
    name,
    email,
    password,
    alter_password = false,
    permission = false,
  }: UserRequest) {
    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    })
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        alter_password: alter_password,
        permission,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  }
}

export { CreateUserService }
