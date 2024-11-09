import type { Request, Response } from 'express'
import { GetOrderByIdService } from '../../services/order/GetOrderByIdService'

class GetOrderByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const getOrderByIdService = new GetOrderByIdService()
    const order = await getOrderByIdService.execute({ order_id: id })
    return res.json(order)
  }
}

export default new GetOrderByIdController()
