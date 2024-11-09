import type { Request, Response } from 'express'
import { SendOrderService } from '../../services/order/SendOrderService'
import { SendOrderFullService } from '../../services/order/SendOrderFullService'

interface ProductInOrder {
  id: string
  amount: number
  name: string
}
export interface OrderFullRequest {
  order_id: string
  products: ProductInOrder[]
}
class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, products } = req.body as OrderFullRequest
    const sendOrder = new SendOrderFullService()
    const order = await sendOrder.execute({ order_id, products })

    return res.json(order)
  }
}

export default new SendOrderController()
