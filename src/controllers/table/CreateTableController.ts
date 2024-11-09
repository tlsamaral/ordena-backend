import type { Request, Response } from 'express'
import { CreateTableService } from '../../services/table/CreateTableService'

class CreateTableController {
  async handle(req: Request, res: Response) {
    const { name } = req.body

    if (!name) {
      throw new Error('Name is required')
    }
    const createTableService = new CreateTableService()
    const table = await createTableService.execute({ name })

    return res.json(table)
  }
}

export default new CreateTableController()
