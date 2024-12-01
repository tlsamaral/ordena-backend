import type { Request, Response } from 'express'
import { AlterRoleUserService } from '../../services/user/AlterRoleUserService'
import { UpdateUserPasswordService } from '../../services/user/UpdateUserPasswordService'

class UpdateUserPasswordController {
  async handle(req: Request, res: Response) {
    const { user_id, password } = req.body
    const updateUserPasswordService = new UpdateUserPasswordService()
    const user = await updateUserPasswordService.execute({ user_id, password })
    return res.json(user)
  }
}

export default new UpdateUserPasswordController()
