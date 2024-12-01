import type { Request, Response } from 'express'
import { AlterRoleUserService } from '../../services/user/AlterRoleUserService'

class AcceptUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.body
    const alterRoleUserService = new AlterRoleUserService()
    const user = await alterRoleUserService.execute(user_id)
    return res.json(user)
  }
}

export default new AcceptUserController()
