import type { Request, Response } from 'express'
import { CreateOrderService } from '../../services/order/CreateOrderService'

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table_id, name, phone } = req.body
    const user_id = req.user_id

    const createOrderService = new CreateOrderService()
    const order = await createOrderService.execute({
      table_id,
      name,
      user_id,
      phone,
    })

    return res.json(order)
  }
}

export default new CreateOrderController()
