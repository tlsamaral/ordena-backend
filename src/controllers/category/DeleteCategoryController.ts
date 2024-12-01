import type { Request, Response } from 'express'
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService'

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const deleteCategoryService = new DeleteCategoryService()
    const category = await deleteCategoryService.execute({ category_id: id })

    return res.json(category)
  }
}

export default new DeleteCategoryController()
