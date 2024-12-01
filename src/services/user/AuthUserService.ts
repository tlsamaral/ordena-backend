import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import prismaClient from '../../prisma'

interface AuthRequest {
  email: string
  password: string
}
class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })
    console.log(user)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const passwordMatch = await compare(password, user.password)

    if (!user.permission) {
      throw new Error('Este usuário não tem permissão para acessar o sistema')
    }

    if (!passwordMatch) {
      throw new Error('Senha inválida')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_JWT,
      {
        subject: user.id,
        expiresIn: '30d',
      },
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }
  }
}

export { AuthUserService }
