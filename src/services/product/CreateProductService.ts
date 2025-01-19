import path from "node:path";
import { cloudinary } from "../../lib/cloudinary";
import prismaClient from "../../prisma";

interface ProductRequest {
	name: string;
	price: string;
	description: string;
	banner: string;
	category_id: string;
}

class CreateProductService {
	async execute({
		name,
		description,
		price,
		banner,
		category_id,
	}: ProductRequest) {
		const filePath = path.resolve(__dirname, "..", "..", "..", "tmp", banner);

		
		try {
			const uploadData = await cloudinary.uploader.upload(filePath, {
				folder: 'snapfood-products',
				use_filename: true,
				unique_filename: false
			})
			
			const product = await prismaClient.product.create({
				data: {
					name,
					description,
					price,
					banner: uploadData.url,
					category_id,
				},
				include: {
					category: true,
				},
			})


			return {
				...product,
				category: product.category.name,
			}
		} catch (error) {
			throw new Error(error)
		}
	 }
}

export { CreateProductService };
