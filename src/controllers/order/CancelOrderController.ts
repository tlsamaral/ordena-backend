import type { Request, Response } from 'express'
import { CancelOrderService } from '../../services/order/CancelOrderService'
import { FinishOrderService } from '../../services/order/FinishOrderService'

class CancelOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body

    const finishOrderService = new CancelOrderService()
    const order = await finishOrderService.execute({ order_id })

    return res.json(order)
  }
}

export default new CancelOrderController()
