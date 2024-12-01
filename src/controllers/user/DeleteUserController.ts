import type { Request, Response } from 'express'
import { DeleteUserService } from '../../services/user/DeleteUserService'

class AcceptUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const deleteUserService = new DeleteUserService()
    const user = await deleteUserService.execute(id)
    return res.json(user)
  }
}

export default new AcceptUserController()
