import type { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, alter_password, permission, admin } =
      req.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({
      name,
      email,
      password,
      alter_password,
      permission,
      admin,
    })
    return res.json(user)
  }
}

export default new CreateUserController()
