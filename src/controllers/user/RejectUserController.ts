import type { Request, Response } from 'express'
import { RejectUserService } from '../../services/user/RejectUserService'

class RejectUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.body
    const rejectUserService = new RejectUserService()
    const user = await rejectUserService.execute(user_id)
    return res.json(user)
  }
}

export default new RejectUserController()
