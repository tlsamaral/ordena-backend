import type { Request, Response } from 'express'
import { ProcessOrderService } from '../../services/order/ProcessOrderService'

class ProcessOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body
    const socketio = req.app.get('socketio')

    const processOrderService = new ProcessOrderService(socketio)
    const order = await processOrderService.execute({ order_id })

    return res.json(order)
  }
}

export default new ProcessOrderController()
