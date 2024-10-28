import type { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
	async handle(req: Request, res: Response) {
		const deleteProductService = new DeleteProductService();
		const { id } = req.params;

		const product = await deleteProductService.execute({ id });

		return res.json(product);
	}
}

export default new DeleteProductController();
