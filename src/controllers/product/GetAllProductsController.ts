import type { Request, Response } from 'express'
import { GetAllProductsService } from '../../services/product/GetAllProductsService'
class GetAllProductsController {
  async handle(req: Request, res: Response) {
    const getProducts = new GetAllProductsService()
    const products = await getProducts.execute()
    return res.json(products)
  }
}

export default new GetAllProductsController()
