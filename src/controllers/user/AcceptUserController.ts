import type { Request, Response } from 'express'

import { AcceptUserService } from '../../services/user/AcceptUserService'

class AcceptUserController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.body
    const acceptUserService = new AcceptUserService()
    const user = await acceptUserService.execute(user_id)
    return res.json(user)
  }
}

export default new AcceptUserController()
