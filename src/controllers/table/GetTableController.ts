import type { Request, Response } from 'express'
import { GetTableService } from '../../services/table/GetTableService'

class GetTableController {
  async handle(req: Request, res: Response) {
    const getTableService = new GetTableService()
    const tables = await getTableService.execute()

    return res.json(tables)
  }
}

export default new GetTableController()
