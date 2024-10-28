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
		const product = await prismaClient.product.create({
			data: {
				name,
				description,
				price,
				banner,
				category_id,
			},
			include: {
				category: true,
			},
		});
		const baseURL = process.env.BASE_URL;
		return {
			...product,
			category: product.category.name,
			banner: `${baseURL}/files/${product.banner}`,
		};
	}
}

export { CreateProductService };
