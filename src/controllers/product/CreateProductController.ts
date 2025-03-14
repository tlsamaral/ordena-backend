import type { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
	async handle(req: Request, res: Response) {
		const createProductService = new CreateProductService();
		const { name, price, description, category_id } = req.body;

		if (!req.file) {
			throw new Error("File is required");
		}
		const { filename: banner } = req.file;

		const product = await createProductService.execute({
			name,
			price,
			description,
			banner,
			category_id,
		});

		console.log(product)
		return res.json(product);
	}
}

export default new CreateProductController();
